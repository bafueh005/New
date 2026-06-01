/**
 * AI content engine. Drafts per-channel content from the 90-day calendar using
 * Claude, and writes markdown drafts to content/drafts/.
 *
 * Usage:
 *   npm run content:generate -- --week 1
 *   npm run content:generate -- --week 1 --model sonnet   # cheaper, for bulk
 *   npm run content:generate -- --all                     # every week (costs $$)
 *
 * Requires ANTHROPIC_API_KEY in the environment (or a .env.local that you've
 * sourced). Per the Anthropic guidance: defaults to claude-opus-4-8, uses
 * adaptive thinking, streams the response, and prompt-caches the brand-voice
 * system block so the cache is reused across every calendar entry in the run.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import Anthropic from "@anthropic-ai/sdk";
import { BRAND_SYSTEM } from "../lib/content/brand";
import { CONTENT_CALENDAR, getWeek, type ContentWeek } from "../lib/content/calendar";

const MODEL_ALIASES: Record<string, string> = {
  opus: "claude-opus-4-8",
  sonnet: "claude-sonnet-4-6",
  haiku: "claude-haiku-4-5",
};

function parseArgs() {
  const args = process.argv.slice(2);
  const get = (flag: string) => {
    const i = args.indexOf(flag);
    return i >= 0 ? args[i + 1] : undefined;
  };
  const modelArg = get("--model");
  return {
    week: get("--week") ? Number(get("--week")) : undefined,
    all: args.includes("--all"),
    model: modelArg ? MODEL_ALIASES[modelArg] ?? modelArg : "claude-opus-4-8",
  };
}

function userPrompt(week: ContentWeek): string {
  const posts = week.posts
    .map(
      (p, i) =>
        `${i + 1}. [${p.channel}] format: ${p.format}\n   hook: ${p.hook}\n   funnel stage: ${p.funnelStage}\n   CTA goal: ${p.cta}\n   target keyword: ${p.keyword}`,
    )
    .join("\n");

  return `Draft the content for Week ${week.week}. Weekly theme: "${week.theme}".

Produce a ready-to-publish draft for EACH item below. Match the channel's format and the per-channel intent from your instructions, weave in the target keyword naturally, and finish with the specified CTA.

For each item include, under a "## [channel] — [hook]" heading:
- YouTube: a title (<=70 chars), a 2-3 sentence description, 8-12 tags, and a full spoken script with light [b-roll] cues.
- LinkedIn: the full post text (hook first line, line breaks for skimmability) plus 3-5 hashtags.
- Instagram: the on-screen hook, caption, and 8-12 hashtags. For reels, give a shot-by-shot outline.
- Facebook: the full post text and a suggested image/thumbnail idea.
- Blog: an SEO title, meta description (<=155 chars), an H2 outline, and the first 150-word intro.

Items:
${posts}

Output clean Markdown only. Begin with "# Week ${week.week}: ${week.theme}".`;
}

async function generateWeek(client: Anthropic, model: string, week: ContentWeek) {
  const stream = client.messages.stream({
    model,
    max_tokens: 16000,
    thinking: { type: "adaptive" },
    system: [
      {
        type: "text",
        text: BRAND_SYSTEM,
        // Cached so every week in an --all run reuses this prefix.
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [{ role: "user", content: userPrompt(week) }],
  });

  const message = await stream.finalMessage();
  const text = message.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n");

  const dir = join(process.cwd(), "content", "drafts");
  mkdirSync(dir, { recursive: true });
  const file = join(dir, `week-${String(week.week).padStart(2, "0")}.md`);
  writeFileSync(file, text, "utf8");

  const u = message.usage;
  console.log(
    `✓ Week ${week.week} → ${file}  (in ${u.input_tokens}, cache_read ${u.cache_read_input_tokens ?? 0}, out ${u.output_tokens})`,
  );
}

async function main() {
  const { week, all, model } = parseArgs();
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY is not set. Add it to your environment or .env.local.");
    process.exit(1);
  }
  if (!all && !week) {
    console.error("Specify --week <n> (1-13) or --all.");
    process.exit(1);
  }

  const client = new Anthropic();
  const weeks = all ? CONTENT_CALENDAR : [getWeek(week!)].filter(Boolean) as ContentWeek[];
  if (weeks.length === 0) {
    console.error(`No calendar entry for week ${week}.`);
    process.exit(1);
  }

  console.log(`Generating ${weeks.length} week(s) with ${model}...`);
  for (const w of weeks) {
    await generateWeek(client, model, w);
  }
  console.log("Done. Drafts are in content/drafts/ — review before publishing.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
