"use client";

import { motion } from "framer-motion";

const AUDIENCES = [
  "Cloud Engineers",
  "DevOps Engineers",
  "Cybersecurity Professionals",
  "System Administrators",
  "Systems Engineers",
  "VMware Engineers",
  "Network Engineers",
  "Infrastructure Engineers",
  "Linux Administrators",
  "Windows Server Engineers",
  "Platform Engineers",
  "Site Reliability Engineers",
  "IT Support Engineers",
  "Software Engineers",
  "International Professionals",
  "Career Changers",
  "Recent Graduates",
];

export function AudienceStrip() {
  return (
    <section className="border-y border-slate-200 bg-slate-50/60 py-10 dark:border-white/10 dark:bg-white/[0.02]">
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <p className="shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Built for
          </p>
          <div className="flex flex-wrap gap-2">
            {AUDIENCES.map((a, i) => (
              <motion.span
                key={a}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-navy-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"
              >
                {a}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
