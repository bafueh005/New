import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — IT Career, Cloud, DevOps, and Infrastructure Insights",
  description:
    "Career roadmaps, interview prep, and infrastructure deep dives for engineers. Topics include VMware, Azure, AWS, Kubernetes, Linux, DevOps, and cybersecurity.",
};

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;
  return (
    <>
      <PageHeader
        eyebrow="Blog & Resources"
        title={<>The Boasystemz <span className="gradient-text">career playbook</span>.</>}
        description="Roadmaps, interview question banks, and hard-earned guidance from senior engineers and hiring managers."
      />

      <section className="section">
        <div className="container-px mx-auto max-w-7xl">
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid gap-6 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 transition-colors hover:border-cyan-400/40 dark:border-white/10 dark:bg-white/[0.03] lg:grid-cols-[1.1fr_1fr] lg:p-10"
          >
            <div className="relative h-56 overflow-hidden rounded-2xl bg-gradient-to-br from-navy-950 via-navy-900 to-cyan-700 lg:h-full">
              <div className="absolute inset-0 grid-bg opacity-40" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-cyan-300">Featured</p>
                  <p className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{featured.category}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-2.5 py-1 font-medium text-cyan-700 dark:text-cyan-300"><Tag className="h-3 w-3" />{featured.category}</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{featured.readTime}</span>
                <span>·</span>
                <span>{featured.date}</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-navy-950 group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-300 sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-base text-slate-600 dark:text-slate-300">{featured.excerpt}</p>
              <div className="mt-auto pt-6">
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-600 dark:text-cyan-300">
                  Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-cyan-400/40 hover:shadow-xl hover:shadow-cyan-500/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-400/40"
              >
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-cyan-500/10 px-2.5 py-1 font-medium text-cyan-700 dark:text-cyan-300">{p.category}</span>
                  <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400"><Clock className="h-3 w-3" />{p.readTime}</span>
                </div>
                <h3 className="mt-4 h-card text-navy-950 group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-300">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{p.excerpt}</p>
                <div className="mt-auto pt-5 flex items-center gap-2.5">
                  <span className={`grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br ${p.author.color} text-xs font-semibold text-white`}>{p.author.initials}</span>
                  <div>
                    <p className="text-xs font-medium text-navy-900 dark:text-white">{p.author.name}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{p.date}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
