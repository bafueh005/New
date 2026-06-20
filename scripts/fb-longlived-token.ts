/**
 * Mints a long-lived Facebook Page access token and writes it to .env.local,
 * so `npm run fb:cover` / `npm run fb:profile` keep working without redoing the
 * Graph API Explorer dance every ~1-2 hours.
 *
 * Why this is needed: tokens generated in the Graph API Explorer are short-lived.
 * You extend them in two hops:
 *   1. exchange the short-lived USER token -> long-lived USER token (~60 days)
 *   2. read the Page token off that long-lived user token. Page tokens derived
 *      from a long-lived user token do not expire while you remain Page admin.
 *
 * Setup (all in .env.local, gitignored; never commit these):
 *   FB_APP_ID         - your app id (Boasystemz Tools)
 *   FB_APP_SECRET     - app secret, from the app's Settings -> Basic
 *   FB_PAGE_ID        - the Page id
 *   FB_USER_TOKEN     - a *fresh* short-lived USER token from the Graph API
 *                       Explorer, with scopes: pages_show_list,
 *                       pages_read_engagement, pages_manage_metadata,
 *                       pages_manage_posts. (Get User Access Token -> copy it.)
 *
 * Run:
 *   npm run fb:token
 *
 * On success it replaces FB_PAGE_ACCESS_TOKEN in .env.local with the long-lived
 * Page token and prints its expiry (should read "never"). You can then delete the
 * FB_USER_TOKEN line; it is only needed for this one run.
 *
 * Optional:
 *   FB_GRAPH_VERSION  - Graph API version (default: v21.0)
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const ENV_PATH = resolve(process.cwd(), ".env.local");
const GRAPH_VERSION = process.env.FB_GRAPH_VERSION ?? "v21.0";
const BASE = `https://graph.facebook.com/${GRAPH_VERSION}`;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.startsWith("REPLACE_") || value.startsWith("PASTE_")) {
    console.error(`Missing/placeholder env var: ${name}`);
    console.error("See the header of scripts/fb-longlived-token.ts for setup.");
    process.exit(1);
  }
  return value;
}

async function graph<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}/${path}`);
  const body = (await res.json()) as T & { error?: { message?: string; code?: number } };
  if (!res.ok || body.error) {
    const e = body.error;
    throw new Error(e ? `Graph (${e.code ?? res.status}): ${e.message}` : `HTTP ${res.status}`);
  }
  return body;
}

/** Replace FB_PAGE_ACCESS_TOKEN= in .env.local in place, or append it. */
function writePageToken(token: string) {
  const lines = existsSync(ENV_PATH) ? readFileSync(ENV_PATH, "utf8").split("\n") : [];
  let replaced = false;
  const next = lines.map((l) => {
    if (l.startsWith("FB_PAGE_ACCESS_TOKEN=")) {
      replaced = true;
      return `FB_PAGE_ACCESS_TOKEN=${token}`;
    }
    return l;
  });
  if (!replaced) next.push(`FB_PAGE_ACCESS_TOKEN=${token}`);
  writeFileSync(ENV_PATH, next.join("\n"));
}

async function main() {
  const appId = requireEnv("FB_APP_ID");
  const appSecret = requireEnv("FB_APP_SECRET");
  const pageId = requireEnv("FB_PAGE_ID");
  const userToken = requireEnv("FB_USER_TOKEN");

  console.log(`App:   ${appId}`);
  console.log(`Page:  ${pageId}`);
  console.log(`Graph: ${GRAPH_VERSION}`);

  // 1. short-lived user token -> long-lived user token
  console.log("\n[1/3] Exchanging for a long-lived user token...");
  const exchanged = await graph<{ access_token: string }>(
    `oauth/access_token?grant_type=fb_exchange_token` +
      `&client_id=${encodeURIComponent(appId)}` +
      `&client_secret=${encodeURIComponent(appSecret)}` +
      `&fb_exchange_token=${encodeURIComponent(userToken)}`,
  );

  // 2. long-lived user token -> Page token (inherits the long life)
  console.log("[2/3] Reading the Page token...");
  const page = await graph<{ access_token: string; name?: string }>(
    `${pageId}?fields=access_token,name&access_token=${encodeURIComponent(exchanged.access_token)}`,
  );
  if (!page.access_token) throw new Error("no Page token returned — are you an admin of this Page?");

  // 3. persist + report expiry
  console.log("[3/3] Writing FB_PAGE_ACCESS_TOKEN to .env.local...");
  writePageToken(page.access_token);

  const debug = await graph<{ data?: { expires_at?: number; scopes?: string[] } }>(
    `debug_token?input_token=${encodeURIComponent(page.access_token)}` +
      `&access_token=${encodeURIComponent(appId + "|" + appSecret)}`,
  );
  const exp = debug.data?.expires_at;
  const expLabel = !exp || exp === 0 ? "never" : new Date(exp * 1000).toISOString();

  console.log(`\n✅ Long-lived Page token saved for "${page.name ?? pageId}".`);
  console.log(`   Expires: ${expLabel}`);
  console.log(`   Scopes:  ${debug.data?.scopes?.join(", ") ?? "(unknown)"}`);
  console.log("\n   You can now delete the FB_USER_TOKEN line from .env.local.");
}

main().catch((err) => {
  console.error(`\n❌ Failed: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
