"use client";

import { motion } from "framer-motion";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 dark:border-white/10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="absolute inset-x-0 top-0 h-[420px] bg-hero-glow" />
      </div>
      <div className="container-px mx-auto max-w-7xl pt-16 pb-16 sm:pt-20 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          {eyebrow && <span className="eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />{eyebrow}</span>}
          <h1 className="h-display mt-4 text-navy-950 dark:text-white">{title}</h1>
          {description && <p className="mt-5 text-lg text-slate-600 dark:text-slate-300">{description}</p>}
          {children && <div className="mt-7">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}
