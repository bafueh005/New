import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarCheck2, CheckCircle2, Upload } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { CtaSection } from "@/components/cta-section";
import { SERVICES, getServiceBySlug } from "@/lib/services-data";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.title,
    description: service.desc,
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const Icon = service.icon;
  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={service.tag}
        title={<>{service.title}</>}
        description={service.desc}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link href={`/contact?service=${service.slug}`} className="btn-primary">
            <CalendarCheck2 className="h-4 w-4" /> Book a free consultation
          </Link>
          <Link href="/upload-resume" className="btn-secondary">
            <Upload className="h-4 w-4" /> Upload resume
          </Link>
          <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-700 hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200">
            <ArrowLeft className="h-4 w-4" /> All services
          </Link>
        </div>
      </PageHeader>

      <section className="section">
        <div className="container-px mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-navy-900 to-cyan-600 text-white shadow-md shadow-cyan-500/20">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300">
                  What&apos;s included
                </p>
                <h2 className="h-card text-navy-950 dark:text-white">
                  Built around the work you&apos;ll actually do.
                </h2>
              </div>
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.bullets.map((b) => (
                <li
                  key={b}
                  className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-500" />
                  <span className="text-sm text-slate-700 dark:text-slate-200">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-white/[0.03]">
              <p className="text-sm font-semibold text-navy-900 dark:text-white">
                Not sure if this is the right fit?
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Tell us your goals in a 30-minute call. If a different program serves you better, we&apos;ll say so.
              </p>
              <Link href={`/contact?service=${service.slug}`} className="btn-primary mt-4">
                Get my plan <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 p-6 text-white shadow-xl shadow-cyan-500/10">
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                Start here
              </p>
              <h3 className="mt-2 text-lg font-semibold">Free 30-minute consultation</h3>
              <p className="mt-2 text-sm text-slate-300">
                Talk to a senior mentor. We&apos;ll diagnose what&apos;s blocking your interviews and map your next step.
              </p>
              <Link
                href={`/contact?service=${service.slug}`}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-navy-950 transition hover:bg-cyan-300"
              >
                <CalendarCheck2 className="h-4 w-4" /> Book now
              </Link>
              <p className="mt-3 text-[11px] text-slate-400">
                Next available slot · Today
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Related programs
              </p>
              <ul className="mt-3 space-y-2">
                {related.map((r) => {
                  const RIcon = r.icon;
                  return (
                    <li key={r.slug}>
                      <Link
                        href={`/services/${r.slug}`}
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
