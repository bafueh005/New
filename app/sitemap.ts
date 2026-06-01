import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog";
import { PROGRAMS } from "@/lib/programs-data";
import { SERVICES } from "@/lib/services-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://boasystemz.com";

// Static, publicly-indexable routes. (Auth/app routes like /dashboard, /admin,
// /login, /onboarding are intentionally excluded — see robots.ts.)
const STATIC_PATHS = [
  "",
  "/about",
  "/services",
  "/programs",
  "/pricing",
  "/blog",
  "/resources",
  "/resources/ai-resume-review",
  "/resources/it-career-toolkit",
  "/contact",
  "/upload-resume",
  "/legal/privacy",
  "/legal/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const dynamicEntries = [
    ...BLOG_POSTS.map((p) => `/blog/${p.slug}`),
    ...PROGRAMS.map((p) => `/programs/${p.slug}`),
    ...SERVICES.map((s) => `/services/${s.slug}`),
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...dynamicEntries];
}
