import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Tag, Share2, BookmarkPlus } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog";
import { CtaSection } from "@/components/cta-section";

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return { title: "Article" };
  return { title: post.title, description: post.excerpt };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const others = BLOG_POSTS.filter((p) => p.slug !== params.slug).slice(0, 3);

  return (
    <>
      <article className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-hero-glow opacity-50" />

        <div className="container-px mx-auto max-w-3xl pt-12">
          <Link href="/blog" className="link-muted inline-flex items-center gap-1.5 text-sm">
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-2.5 py-1 font-medium text-cyan-700 dark:text-cyan-300"><Tag className="h-3 w-3" />{post.category}</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
            <span>·</span><span>{post.date}</span>
          </div>

          <h1 className="h-display mt-5 text-navy-950 dark:text-white">{post.title}</h1>
          <p className="mt-5 text-lg text-slate-600 dark:text-slate-300">{post.excerpt}</p>

          <div className="mt-8 flex items-center justify-between border-y border-slate-200 py-4 dark:border-white/10">
            <div className="flex items-center gap-3">
              <span className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${post.author.color} text-sm font-semibold text-white`}>{post.author.initials}</span>
              <div>
                <p className="text-sm font-semibold text-navy-950 dark:text-white">{post.author.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Senior Mentor · Boasystemz</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 dark:border-white/10 dark:text-slate-400"><BookmarkPlus className="h-4 w-4" /></button>
              <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 dark:border-white/10 dark:text-slate-400"><Share2 className="h-4 w-4" /></button>
            </div>
          </div>
        </div>

        <div className="container-px mx-auto max-w-3xl py-10">
          <div className="prose-content space-y-6 text-base leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              The most common career mistake we see in IT is treating job-hunting like a numbers game. Engineers apply to
              200, 300, sometimes 500 roles — and end up with a handful of phone screens and zero offers. The fix isn&apos;t
              applying more. It&apos;s applying differently, to different roles, with a different story.
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-navy-950 dark:text-white">Where engineers get stuck</h2>
            <p>
              Three patterns repeat across every cohort we&apos;ve mentored: weak positioning (the resume reads like a job
              description), shallow technical narrative (no production scars on the page), and untested interview answers
              (no one has ever pushed back on the engineer&apos;s explanations).
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-navy-950 dark:text-white">The system that works</h2>
            <p>
              Position the work first. Translate every project into outcomes: uptime, latency, cost, mean-time-to-recovery.
              Then move into targeted applications — 10–15 great fits at a time, not 200 random ones. Then live mock
              interviews until the answers feel boring to deliver. By the time you walk into a real loop, you&apos;ve already
              done this five times under pressure.
            </p>
            <blockquote className="rounded-r-2xl border-l-4 border-cyan-500 bg-cyan-500/5 p-5 text-base italic text-navy-900 dark:text-cyan-100">
              &ldquo;Most engineers don&apos;t need more skills. They need a sharper story and tighter interview reps.&rdquo;
            </blockquote>
            <h2 className="text-2xl font-semibold tracking-tight text-navy-950 dark:text-white">What to do next</h2>
            <p>
              Pick one project from your past two years. Rewrite it in three lines: what you were asked to do, what you
              actually did, and what changed. Most engineers find the second line is the weakest — and the most important.
            </p>
            <p>
              When you&apos;re ready for senior feedback, book a free consultation. We&apos;ll diagnose what&apos;s
              actually blocking your interviews and tell you what we&apos;d do next — even if it isn&apos;t with us.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">Book a free consultation</Link>
            <Link href="/blog" className="btn-secondary">Back to all articles</Link>
          </div>
        </div>
      </article>

      <section className="section">
        <div className="container-px mx-auto max-w-7xl">
          <h2 className="h-section text-navy-950 dark:text-white">More from the playbook</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-cyan-400/40 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-400/40">
                <span className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-300">{p.category}</span>
                <h3 className="mt-3 h-card text-navy-950 group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-300">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
