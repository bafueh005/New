import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarCheck2, Clock, PlayCircle, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { CtaSection } from "@/components/cta-section";
import { PROGRAMS, totalLessons } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Programs, Cohorts, Bootcamps & Mentorship Sprints",
  description:
    "Structured, mentor-led programs from Boasystemz: the Cloud Engineer Career Sprint, DevOps Accelerator, Cybersecurity Analyst Launchpad, Zero to Hired Bootcamp, and more, built by senior engineers.",
};

export default function ProgramsPage() {
  const featured = PROGRAMS.find((p) => p.featured);
  const rest = PROGRAMS.filter((p) => !p.featured);

  return (
    <>
      <PageHeader
        eyebrow="Programs"
        title={
          <>
            Structured paths from <span className="gradient-text">where you are</span> to hired.
          </>
        }
        description="Pick a mentor-led cohort, a self-paced intensive, or a focused 1:1 sprint. Every program is built and taught by senior engineers, and ends with you interview-ready, not just certificate-ready."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn-primary">
            <CalendarCheck2 className="h-4 w-4" /> Talk to a mentor
          </Link>
          <Link href="/pricing" className="btn-secondary">
            See pricing
          </Link>
        </div>
      </PageHeader>

      {featured && (
        <section className="section !pb-0">
          <div className="container-px mx-auto max-w-7xl">
            <Link
              href={`/programs/${featured.slug}`}
              className="group relative block overflow-hidden rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 p-8 text-white shadow-2xl shadow-cyan-500/10 transition hover:-translate-y-0.5 sm:p-12"
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 left-1/2 h-72 w-[140%] -translate-x-1/2 bg-hero-glow" />
                <div className="absolute inset-0 grid-bg opacity-30" />
              </div>
              <div className="relative grid items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
                <div>
                  <span className="eyebrow !border-cyan-300/30 !bg-cyan-300/10 !text-cyan-200">
                    <Sparkles className="h-3.5 w-3.5" /> {featured.tag} program
                  </span>
                  <h2 className="h-section mt-4 text-white">{featured.title}</h2>
                  <p className="mt-4 max-w-xl text-base text-slate-300">{featured.tagline}</p>
                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-cyan-300" /> {featured.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <PlayCircle className="h-4 w-4 text-cyan-300" /> {totalLessons(featured)} lessons
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarCheck2 className="h-4 w-4 text-cyan-300" /> {featured.format}
                    </span>
                  </div>
                  <span className="mt-7 inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-navy-950 transition group-hover:bg-cyan-300">
                    Explore the program <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
                <ul className="space-y-2.5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                    You&apos;ll walk away able to
                  </p>
                  {featured.outcomes.map((o) => (
                    <li key={o} className="flex gap-2 text-sm text-slate-200">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-300" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container-px mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300">
            All programs
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.slug}
                  href={`/programs/${p.slug}`}
                  aria-label={`Learn more about ${p.title}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-cyan-400/40 hover:shadow-xl hover:shadow-cyan-500/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-400/40"
                >
                  <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/0 blur-2xl transition-all group-hover:bg-cyan-400/20" />
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-navy-900 to-cyan-600 text-white shadow-md shadow-cyan-500/20">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {p.format}
                    </span>
                  </div>
                  <h3 className="mt-5 h-card text-navy-950 dark:text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {p.desc}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {p.duration}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <PlayCircle className="h-3.5 w-3.5" /> {totalLessons(p)} lessons
                    </span>
                  </div>
                  <div className="mt-auto pt-5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-600 transition-transform group-hover:translate-x-0.5 dark:text-cyan-300">
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
