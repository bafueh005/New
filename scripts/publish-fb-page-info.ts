/**
 * Fills in the Boasystemz Facebook Page's basic info via the Graph API
 * (the "Finish setting up your Page" essentials), using the same content as
 * the website so everything stays consistent.
 *
 * Sets each field with its own request so one rejected field (e.g. a phone
 * format Facebook dislikes) doesn't block the others.
 *
 * Note: some Page fields are NOT writable via the API and must be set by hand
 * in Meta Business Suite — category, username/@handle, profile/cover images
 * (use fb:cover / fb:profile), the action button (e.g. "Book Now"), and hours.
 *
 * Usage:
 *   npm run fb:page-info            # apply the values below to the Page
 *   npm run fb:page-info -- --dry-run   # print what it would set, call nothing
 *
 * Required environment (.env.local, gitignored):
 *   FB_PAGE_ID            - numeric Page id
 *   FB_PAGE_ACCESS_TOKEN  - Page token with pages_manage_metadata
 * Optional:
 *   FB_GRAPH_VERSION      - Graph API version (default: v21.0)
 */

// Single source of truth — mirrors components/json-ld.tsx + the site footer.
const PAGE_INFO: Record<string, string> = {
  about:
    "Career acceleration for IT professionals — land interviews and offers faster through resume optimization, senior-engineer mentorship, and real interview prep.",
  description:
    "Boasystemz helps IT professionals stop endlessly applying and start landing interviews and offers. Our mentors run production systems at Fortune 500 companies — every engagement is 1:1 or small-cohort, and we track real outcomes: callbacks, interviews, offers, and time-to-offer. We offer resume optimization, LinkedIn branding, cloud / DevOps / cybersecurity / infrastructure mentorship, technical mock interviews, and a Premium Career Transformation with an offer guarantee for qualifying engineers. We don't teach you to apply to 500 jobs — we teach you to win the 20 that matter.",
  website: "https://boasystemz.com",
  phone: "+1 240-784-3133",
  emails: JSON.stringify(["info@boasystemz.com"]),
};

const DEFAULT_GRAPH_VERSION = "v21.0";

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
  const dryRun = process.argv.slice(2).includes("--dry-run");
  const graphVersion = process.env.FB_GRAPH_VERSION ?? DEFAULT_GRAPH_VERSION;
  const pageId = requireEnv("FB_PAGE_ID");
  const token = requireEnv("FB_PAGE_ACCESS_TOKEN");

  console.log(`Page:  ${pageId}`);
  console.log(`Graph: ${graphVersion}\n`);
  console.log("Fields to set:");
  for (const [k, v] of Object.entries(PAGE_INFO)) console.log(`  ${k}: ${v}`);

  if (dryRun) {
    console.log("\n--dry-run: nothing sent.");
    return;
  }

  const base = `https://graph.facebook.com/${graphVersion}/${pageId}`;
  let ok = 0;
  const failures: string[] = [];

  console.log("");
  for (const [field, value] of Object.entries(PAGE_INFO)) {
    const body = new URLSearchParams({ [field]: value, access_token: token });
    const res = await fetch(base, { method: "POST", body });
    const json = (await res.json().catch(() => ({}))) as {
      success?: boolean;
      error?: { message?: string; code?: number };
    };
    if (res.ok && !json.error) {
      console.log(`  ✅ ${field}`);
      ok++;
    } else {
      const msg = json.error ? `(${json.error.code ?? res.status}) ${json.error.message}` : `HTTP ${res.status}`;
      console.log(`  ⚠️  ${field}: ${msg}`);
      failures.push(field);
    }
  }

  console.log(`\nDone: ${ok}/${Object.keys(PAGE_INFO).length} fields set.`);
  if (failures.length) {
    console.log(`Not set via API (set these by hand in Meta Business Suite): ${failures.join(", ")}`);
  }
  console.log(`Verify: https://www.facebook.com/${pageId}`);
}

main().catch((err) => {
  console.error(`\n❌ Failed: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
