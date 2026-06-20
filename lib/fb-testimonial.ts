import { STORIES, type Story } from "@/lib/testimonials-data";
import { dashFree } from "@/lib/fb-spotlight";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://boasystemz.com";
const DAY_MS = 24 * 60 * 60 * 1000;
const EPOCH = Date.UTC(2024, 0, 1); // a Monday

/** Index into STORIES for the testimonial that should run on `date` (one per week). */
export function testimonialIndexFor(date: Date = new Date()): number {
  const week = Math.floor((date.getTime() - EPOCH) / DAY_MS / 7);
  const n = STORIES.length;
  return ((week % n) + n) % n;
}

/** Build a dash-free testimonial post. Role keeps the → arrow (not a dash). */
export function buildTestimonialPost(story: Story): { message: string; link: string } {
  const raise =
    story.salaryFrom > 0
      ? `$${story.salaryFrom}k → $${story.salaryTo}k`
      : `now $${story.salaryTo}k`;
  const message =
    `⭐ Success Story: ${story.name}\n` +
    `${dashFree(story.role)} @ ${story.company}  (${raise})\n\n` +
    `"${dashFree(story.quote)}"\n\n` +
    `Your transformation could be next. 👇\n` +
    `🌐 ${SITE_URL.replace(/^https?:\/\//, "")}   📩 info@boasystemz.com`;
  return { message, link: SITE_URL };
}
