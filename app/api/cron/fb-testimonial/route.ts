import { NextResponse } from "next/server";
import { STORIES } from "@/lib/testimonials-data";
import { testimonialIndexFor, buildTestimonialPost } from "@/lib/fb-testimonial";

// Weekly Facebook success-story post. Scheduled by Vercel Cron (see vercel.json:
// Mondays). Picks the next testimonial via stateless week-based rotation and
// publishes it to the Page feed via the Graph API.
//
// Protected by CRON_SECRET: Vercel Cron sends `Authorization: Bearer <secret>`.
// No-ops cleanly when FB_PAGE_ID / FB_PAGE_ACCESS_TOKEN are unset, and supports
// ?dry=1 to preview the chosen post without publishing.

export const dynamic = "force-dynamic";

const GRAPH = "https://graph.facebook.com/v21.0";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const index = testimonialIndexFor();
  const story = STORIES[index];
  const { message, link } = buildTestimonialPost(story);

  const pageId = process.env.FB_PAGE_ID;
  const token = process.env.FB_PAGE_ACCESS_TOKEN;
  const dry = new URL(request.url).searchParams.get("dry") === "1";

  if (!pageId || !token || dry) {
    return NextResponse.json({
      ok: true,
      posted: false,
      reason: dry ? "dry-run" : "facebook not configured",
      index,
      name: story.name,
      message,
    });
  }

  const body = new URLSearchParams({ message, link, access_token: token });
  const res = await fetch(`${GRAPH}/${pageId}/feed`, { method: "POST", body });
  const json = (await res.json().catch(() => ({}))) as { id?: string; error?: unknown };

  if (!res.ok || json.error || !json.id) {
    return NextResponse.json(
      { ok: false, index, name: story.name, error: json.error ?? `HTTP ${res.status}` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, posted: true, index, name: story.name, postId: json.id });
}
