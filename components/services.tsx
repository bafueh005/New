"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { SERVICES } from "@/lib/services-data";

export { SERVICES, getServiceBySlug, type Service } from "@/lib/services-data";

export function Services() {
  return (
    <section id="services" className="section">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="What we do"
          title={<>One platform. Every part of the <span className="gradient-text">career stack</span>.</>}
          description="Strategy, mentorship, technical skill-building, and execution — designed by senior engineers who've hired into the teams you want to join."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: (i % 6) * 0.04 }}
            >
              <ServiceCard
                icon={s.icon}
                title={s.title}
                desc={s.desc}
                tag={s.tag}
                href={`/services/${s.slug}`}
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-white/[0.03]">
          <div>
            <p className="text-sm font-semibold text-navy-900 dark:text-white">
              Not sure where to start?
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Tell us about your career goals. We&apos;ll recommend the right path in a 30-minute consultation.
            </p>
          </div>
          <Link href="/contact" className="btn-primary">
            Get my plan <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  desc,
  tag,
  href,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  tag: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      aria-label={`Learn more about ${title}`}
      className="group relative block h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-cyan-400/40 hover:shadow-xl hover:shadow-cyan-500/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-400/40"
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/0 blur-2xl transition-all group-hover:bg-cyan-400/20" />
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-navy-900 to-cyan-600 text-white shadow-md shadow-cyan-500/20">
          <Icon className="h-5 w-5" />
        </span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {tag}
        </span>
      </div>
      <h3 className="mt-5 h-card text-navy-950 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{desc}</p>
      <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-cyan-600 transition-transform group-hover:translate-x-0.5 dark:text-cyan-300">
        Get started <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </Link>
  );
}
