"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Hammer, HeartHandshake, ScrollText } from "lucide-react";
import { SectionHeading } from "./section-heading";

const PILLARS = [
  {
    icon: Hammer,
    title: "Built by senior practitioners",
    desc: "Our mentors run production systems at Fortune 500 companies. No bootcamp instructors, no theory-only coaches.",
  },
  {
    icon: ScrollText,
    title: "Mentorship-driven, not lecture-driven",
    desc: "Every engagement is 1:1 or small-cohort. You ship work, get feedback, and iterate, like a real team.",
  },
  {
    icon: HeartHandshake,
    title: "Outcomes we actually measure",
    desc: "We track callbacks, interviews, offers, salary deltas, and time-to-offer. If it doesn't ship results, we change it.",
  },
  {
    icon: Compass,
    title: "Strategy over volume",
    desc: "We don't teach you to apply to 500 jobs. We teach you to win the 20 that matter.",
  },
];

export function AboutSection() {
  return (
    <section className="section">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid items-start gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="About Boasystemz"
              title={<>We were the engineers <span className="gradient-text">stuck applying too</span>.</>}
              description={
                <>
                  Boasystemz was founded by senior infrastructure and cloud engineers who
                  spent years on both sides of the hiring table, building enterprise
                  platforms by day, coaching peers and juniors by night. We saw too many
                  talented engineers stuck in a loop of cold applications, generic resumes,
                  and untested interview prep.
                  <br />
                  <br />
                  So we built the system we wished existed: senior mentorship, real
                  enterprise context, ATS-aware branding, technical labs, and a job
                  application strategy that actually converts.
                </>
              }
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="btn-primary">
                Read our story <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Talk to a mentor
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-navy-900 to-cyan-600 text-white">
                  <p.icon className="h-4 w-4" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-navy-950 dark:text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
