import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  Clock,
  GraduationCap,
  Layers,
  PlayCircle,
  Quote,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { CtaSection } from "@/components/cta-section";
import { Curriculum, Faq } from "@/components/program-sections";
import { PROGRAMS, getProgramBySlug, totalLessons } from "@/lib/programs-data";
import { JsonLd, serviceSchema, faqSchema } from "@/components/json-ld";

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const program = getProgramBySlug(params.slug);
  if (!program) return { title: "Program not found" };
  return {
    title: program.title,
    description: program.desc,
    alternates: { canonical: `/programs/${program.slug}` },
    openGraph: {
      title: program.title,
      description: program.desc,
      url: `/programs/${program.slug}`,
    },
  };
}

export default function ProgramDetailPage({ params }: { params: { slug: string } }) {
  const program = getProgramBySlug(params.slug);
  if (!program) notFound();

  const lessons = totalLessons(program);
  const related = PROGRAMS.filter((p) => p.slug !== program.slug).slice(0, 3);

  const meta = [
    { icon: CalendarCheck2, label: program.format },
    { icon: Clock, label: program.duration },
    { icon: Layers, label: `${program.curriculum.length} modules` },
    { icon: PlayCircle, label: `${lessons} lessons` },
    { icon: GraduationCap, label: program.level },
  ];

  return (
    <>
      <JsonLd data={serviceSchema({ title: program.title, description: program.desc, path: `/programs/${program.slug}` })} />
      {program.faqs?.length ? <JsonLd data={faqSchema(program.faqs)} /> : null}
      <PageHeader eyebrow={`${program.tag} program`} title={<>{program.title}</>} description={program.tagline}>
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2.5">
            {meta.map((m) => {
              const MIcon = m.icon;
              return (
                <span
                  key={m.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-slate-700 backdrop-blur dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"
                >
                  <MIcon className="h-3.5 w-3.5 text-cyan-500" /> {m.label}
                </span>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href={`/contact?program=${program.slug}`} className="btn-primary">
              <CalendarCheck2 className="h-4 w-4" /> Enroll / book a call
            </Link>
            <Link href="/programs" className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-700 hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200">
              <ArrowLeft className="h-4 w-4" /> All programs
            </Link>
          </div>
        </div>
      </PageHeader>

      <section className="section">
        <div className="container-px mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-14">
            {/* Outcomes */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300">
                Outcomes
              </p>
              <h2 className="h-card mt-2 text-navy-950 dark:text-white">
                What you&apos;ll walk away able to do.
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {program.outcomes.map((o) => (
                  <li
                    key={o}
                    className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-500" />
                    <span className="text-sm text-slate-700 dark:text-slate-200">{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Curriculum */}
            <div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300">
                    Curriculum
                  </p>
                  <h2 className="h-card mt-2 text-navy-950 dark:text-white">
                    {program.curriculum.length} modules · {lessons} lessons
                  </h2>
                </div>
              </div>
              <div className="mt-6">
                <Curriculum modules={program.curriculum} />
              </div>
            </div>

            {/* What's included */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300">
                What&apos;s included
              </p>
              <h2 className="h-card mt-2 text-navy-950 dark:text-white">
                Everything you need to actually finish.
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {program.includes.map((inc) => (
                  <li
                    key={inc}
                    className="flex gap-3 text-sm text-slate-700 dark:text-slate-200"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-500" />
                    {inc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Testimonial */}
            {program.testimonial && (
              <figure className="relative overflow-hidden rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 p-8 text-white shadow-xl shadow-cyan-500/10">
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl" />
                <Quote className="h-8 w-8 text-cyan-300/60" />
                <blockquote className="mt-4 text-lg leading-relaxed text-slate-100">
                  &ldquo;{program.testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-sm font-semibold text-white shadow">
                    {program.testimonial.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{program.testimonial.name}</p>
                    <p className="text-xs text-slate-300">
                      {program.testimonial.role} · {program.testimonial.company}
                    </p>
                  </div>
                </figcaption>
              </figure>
            )}

            {/* FAQ */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300">
                FAQ
              </p>
              <h2 className="h-card mt-2 text-navy-950 dark:text-white">Common questions.</h2>
              <div className="mt-6">
                <Faq faqs={program.faqs} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 p-6 text-white shadow-xl shadow-cyan-500/10">
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                Investment
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-tight">{program.price.amount}</p>
              <p className="text-sm text-slate-300">{program.price.cadence}</p>
              <p className="mt-3 text-sm text-slate-300">{program.price.note}</p>
              <Link
                href={`/contact?program=${program.slug}`}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-navy-950 transition hover:bg-cyan-300"
              >
                <CalendarCheck2 className="h-4 w-4" /> Enroll now
              </Link>
              <p className="mt-3 text-center text-[11px] text-slate-400">
                Not sure yet? Book a free 30-minute call first.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Other programs
              </p>
              <ul className="mt-3 space-y-2">
                {related.map((r) => {
                  const RIcon = r.icon;
                  return (
                    <li key={r.slug}>
                      <Link
                        href={`/programs/${r.slug}`}
                        className="group flex items-center gap-3 rounded-xl p-2 transition hover:bg-slate-50 dark:hover:bg-white/[0.04]"
                      >
                        <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-navy-900 to-cyan-600 text-white">
                          <RIcon className="h-4 w-4" />
                        </span>
                        <span className="flex-1 text-sm font-medium text-navy-950 dark:text-white">
                          {r.title}
                        </span>
                        <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-cyan-500" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
