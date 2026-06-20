/**
 * Publishes a cover photo to the Boasystemz Facebook Page via the Graph API.
 *
 * Two-step flow (the only supported way to set a Page cover):
 *   1. Upload the image to /{PAGE_ID}/photos with published=false  -> returns a photo id
 *   2. POST /{PAGE_ID} with cover=<photo_id>                       -> sets it as the cover
 *
 * Usage:
 *   npm run fb:cover                       # uploads assets/social/facebook-cover.png
 *   npm run fb:cover -- --image path.png   # a different file
 *   npm run fb:cover -- --dry-run          # validate config + file, call nothing
 *   npm run fb:cover -- --no-story         # don't push a feed story about the change
 *
 * Required environment (never hardcode the token; keep it in .env.local, gitignored):
 *   FB_PAGE_ID            - numeric id of the Boasystemz Page
 *   FB_PAGE_ACCESS_TOKEN  - a *Page* access token (not a user token) for an admin of
 *                           that Page, with scopes: pages_manage_metadata,
 *                           pages_read_engagement.
 *
 * How to get a Page access token (one-time, in the Graph API Explorer or your app):
 *   1. Get a user token with: pages_show_list, pages_manage_metadata, pages_read_engagement
 *   2. GET /me/accounts  -> copy the `access_token` of the Boasystemz Page entry
 *   3. (Optional) exchange it for a long-lived token so it doesn't expire in ~1h.
 *
 * Optional environment:
 *   FB_GRAPH_VERSION      - Graph API version (default: v21.0)
 */
import { readFileSync, existsSync, statSync } from "node:fs";
import { basename, resolve } from "node:path";

const DEFAULT_IMAGE = "assets/social/facebook-cover.png";
const DEFAULT_GRAPH_VERSION = "v21.0";

function parseArgs() {
  const args = process.argv.slice(2);
  const has = (flag: string) => args.includes(flag);
  const get = (flag: string) => {
    const i = args.indexOf(flag);
    return i !== -1 && i + 1 < args.length ? args[i + 1] : undefined;
  };
  return {
    image: get("--image") ?? DEFAULT_IMAGE,
    dryRun: has("--dry-run"),
    noStory: has("--no-story"),
  };
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing required env var: ${name}`);
    console.error("See the header of scripts/publish-fb-cover.ts for how to obtain it.");
    process.exit(1);
  }
  return value;
}

/** Throws with the Graph API's own error message when a call fails. */
async function graph<T>(url: string, init: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  const text = await res.text();
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    body = text;
  }
  if (!res.ok) {
    const err = (body as { error?: { message?: string; type?: string; code?: number } })?.error;
    const detail = err
      ? `${err.type ?? "GraphError"} (${err.code ?? res.status}): ${err.message ?? "unknown"}`
      : `HTTP ${res.status}: ${typeof body === "string" ? body : JSON.stringify(body)}`;
    throw new Error(detail);
  }
  return body as T;
}

async function main() {
  const { image, dryRun, noStory } = parseArgs();
  const graphVersion = process.env.FB_GRAPH_VERSION ?? DEFAULT_GRAPH_VERSION;

  const imagePath = resolve(process.cwd(), image);
  if (!existsSync(imagePath) || !statSync(imagePath).isFile()) {
    console.error(`Image not found: ${imagePath}`);
    process.exit(1);
  }

  const pageId = requireEnv("FB_PAGE_ID");
  const token = requireEnv("FB_PAGE_ACCESS_TOKEN");

  const sizeKb = (statSync(imagePath).size / 1024).toFixed(0);
  console.log(`Page:    ${pageId}`);
  console.log(`Image:   ${imagePath} (${sizeKb} KB)`);
  console.log(`Graph:   ${graphVersion}`);

  if (dryRun) {
    console.log("\n--dry-run: config and image validated, no API calls made.");
    return;
  }

  const base = `https://graph.facebook.com/${graphVersion}`;

  // Step 1: upload the photo, unpublished, to obtain its id.
  console.log("\n[1/2] Uploading photo (unpublished)...");
  const form = new FormData();
  form.append("published", "false");
  form.append("access_token", token);
  const bytes = readFileSync(imagePath);
  form.append("source", new Blob([bytes], { type: "image/png" }), basename(imagePath));

  const uploaded = await graph<{ id: string }>(`${base}/${pageId}/photos`, {
    method: "POST",
    body: form,
  });
  console.log(`      -> photo id ${uploaded.id}`);

  // Step 2: set that photo as the Page cover.
  console.log("[2/2] Setting it as the Page cover...");
  const coverForm = new FormData();
  coverForm.append("cover", uploaded.id);
  coverForm.append("access_token", token);
  if (noStory) coverForm.append("no_feed_story", "true");

  await graph<{ success?: boolean; id?: string }>(`${base}/${pageId}`, {
    method: "POST",
    body: coverForm,
  });

  console.log("\n✅ Cover photo published.");
  console.log(`   Verify: https://www.facebook.com/${pageId}`);
}

main().catch((err) => {
  console.error(`\n❌ Failed: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
