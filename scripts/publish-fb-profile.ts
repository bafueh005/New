/**
 * Sets the Boasystemz Facebook Page profile picture via the Graph API.
 *
 * The /{PAGE_ID}/picture endpoint only accepts a public image URL (not a file or
 * photo id), so the flow is:
 *   1. Upload the image to /{PAGE_ID}/photos with published=false  -> photo id
 *   2. GET /{photo_id}?fields=images                               -> a public fbcdn URL
 *   3. POST /{PAGE_ID}/picture with picture=<that url>             -> sets the profile pic
 *
 * Usage:
 *   npm run fb:profile                       # uploads assets/social/facebook-profile.png
 *   npm run fb:profile -- --image path.png   # a different file
 *   npm run fb:profile -- --dry-run          # validate config + file, call nothing
 *
 * Required environment (keep in .env.local, gitignored; never hardcode):
 *   FB_PAGE_ID            - numeric id of the Page
 *   FB_PAGE_ACCESS_TOKEN  - a *Page* access token (admin) with scopes
 *                           pages_manage_metadata + pages_manage_posts.
 * Optional:
 *   FB_GRAPH_VERSION      - Graph API version (default: v21.0)
 *
 * See scripts/publish-fb-cover.ts for how to obtain the token.
 */
import { readFileSync, existsSync, statSync } from "node:fs";
import { basename, resolve } from "node:path";

const DEFAULT_IMAGE = "assets/social/facebook-profile.png";
const DEFAULT_GRAPH_VERSION = "v21.0";

function parseArgs() {
  const args = process.argv.slice(2);
  const get = (flag: string) => {
    const i = args.indexOf(flag);
    return i !== -1 && i + 1 < args.length ? args[i + 1] : undefined;
  };
  return { image: get("--image") ?? DEFAULT_IMAGE, dryRun: args.includes("--dry-run") };
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
  const { image, dryRun } = parseArgs();
  const graphVersion = process.env.FB_GRAPH_VERSION ?? DEFAULT_GRAPH_VERSION;

  const imagePath = resolve(process.cwd(), image);
  if (!existsSync(imagePath) || !statSync(imagePath).isFile()) {
    console.error(`Image not found: ${imagePath}`);
    process.exit(1);
  }

  const pageId = requireEnv("FB_PAGE_ID");
  const token = requireEnv("FB_PAGE_ACCESS_TOKEN");

  console.log(`Page:    ${pageId}`);
  console.log(`Image:   ${imagePath} (${(statSync(imagePath).size / 1024).toFixed(0)} KB)`);
  console.log(`Graph:   ${graphVersion}`);

  if (dryRun) {
    console.log("\n--dry-run: config and image validated, no API calls made.");
    return;
  }

  const base = `https://graph.facebook.com/${graphVersion}`;

  // Step 1: upload unpublished -> photo id
  console.log("\n[1/3] Uploading photo (unpublished)...");
  const form = new FormData();
  form.append("published", "false");
  form.append("access_token", token);
  form.append(
    "source",
    new Blob([readFileSync(imagePath)], { type: "image/png" }),
    basename(imagePath),
  );
  const uploaded = await graph<{ id: string }>(`${base}/${pageId}/photos`, { method: "POST", body: form });
  console.log(`      -> photo id ${uploaded.id}`);

  // Step 2: resolve a public CDN URL for that photo
  console.log("[2/3] Resolving public image URL...");
  const { images } = await graph<{ images: { source: string; width: number }[] }>(
    `${base}/${uploaded.id}?fields=images&access_token=${encodeURIComponent(token)}`,
    { method: "GET" },
  );
  if (!images?.length) throw new Error("photo returned no image URLs");
  const url = images.sort((a, b) => b.width - a.width)[0].source;

  // Step 3: set it as the Page profile picture
  console.log("[3/3] Setting it as the Page profile picture...");
  const pic = new FormData();
  pic.append("access_token", token);
  pic.append("picture", url);
  await graph<{ success?: boolean }>(`${base}/${pageId}/picture`, { method: "POST", body: pic });

  console.log("\n✅ Profile picture published.");
  console.log(`   Verify: https://www.facebook.com/${pageId}`);
}

main().catch((err) => {
  console.error(`\n❌ Failed: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
