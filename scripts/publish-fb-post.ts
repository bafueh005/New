/**
 * Publishes a text post (optionally with a link) to the Boasystemz Facebook
 * Page feed via the Graph API.
 *
 * Note: pinning is NOT supported by the Graph API — to pin a post, use the
 * post's ⋯ menu on the Page ("Pin to top of Page"). This script only publishes.
 *
 * Usage:
 *   npm run fb:post -- --message "Hello from Boasystemz!"
 *   npm run fb:post -- --file path/to/post.txt          # message from a file
 *   npm run fb:post -- --message "New blog up" --link https://boasystemz.com/blog/x
 *   npm run fb:post -- --message "..." --dry-run         # validate, send nothing
 *
 * Required environment (.env.local, gitignored):
 *   FB_PAGE_ID            - numeric Page id
 *   FB_PAGE_ACCESS_TOKEN  - Page token with pages_manage_posts
 * Optional:
 *   FB_GRAPH_VERSION      - Graph API version (default: v21.0)
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const DEFAULT_GRAPH_VERSION = "v21.0";

function parseArgs() {
  const args = process.argv.slice(2);
  const get = (flag: string) => {
    const i = args.indexOf(flag);
    return i !== -1 && i + 1 < args.length ? args[i + 1] : undefined;
  };
  return {
    message: get("--message"),
    file: get("--file"),
    link: get("--link"),
    dryRun: args.includes("--dry-run"),
  };
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.startsWith("REPLACE_") || value.startsWith("PASTE_")) {
    console.error(`Missing/placeholder env var: ${name}`);
    console.error("See the header of scripts/publish-fb-cover.ts for how to obtain it.");
    process.exit(1);
  }
  return value;
}

async function main() {
  const { message, file, link, dryRun } = parseArgs();

  let text = message;
  if (file) {
    const p = resolve(process.cwd(), file);
    if (!existsSync(p)) {
      console.error(`Message file not found: ${p}`);
      process.exit(1);
    }
    text = readFileSync(p, "utf8").trim();
  }
  if (!text) {
    console.error("Nothing to post. Provide --message \"...\" or --file <path>.");
    process.exit(1);
  }

  const graphVersion = process.env.FB_GRAPH_VERSION ?? DEFAULT_GRAPH_VERSION;
  const pageId = requireEnv("FB_PAGE_ID");
  const token = requireEnv("FB_PAGE_ACCESS_TOKEN");

  console.log(`Page:    ${pageId}`);
  console.log(`Graph:   ${graphVersion}`);
  if (link) console.log(`Link:    ${link}`);
  console.log(`Message:\n${text.replace(/^/gm, "  ")}`);

  if (dryRun) {
    console.log("\n--dry-run: nothing published.");
    return;
  }

  const body = new URLSearchParams({ message: text, access_token: token });
  if (link) body.append("link", link);

  const res = await fetch(`https://graph.facebook.com/${graphVersion}/${pageId}/feed`, {
    method: "POST",
    body,
  });
  const json = (await res.json().catch(() => ({}))) as {
    id?: string;
    error?: { message?: string; code?: number };
  };
  if (!res.ok || json.error || !json.id) {
    const msg = json.error ? `(${json.error.code ?? res.status}) ${json.error.message}` : `HTTP ${res.status}`;
    throw new Error(msg);
  }

  console.log(`\n✅ Published. Post id: ${json.id}`);
  console.log(`   View on the Page, then ⋯ → "Pin to top of Page" if you want it pinned.`);
}

main().catch((err) => {
  console.error(`\n❌ Failed: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
