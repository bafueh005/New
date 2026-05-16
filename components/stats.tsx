"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, Trophy, Building2, Headphones } from "lucide-react";
import { AnimatedCounter } from "./animated-counter";

const STATS = [
  { icon: Users, value: 500, suffix: "+", label: "Professionals Mentored" },
  { icon: TrendingUp, value: 90, suffix: "%", label: "Increased Interview Callbacks" },
  { icon: Trophy, value: 200, suffix: "+", label: "Successful Career Transformations" },
  { icon: Building2, value: 75, suffix: "+", label: "Enterprise Companies Hired Into" },
  { icon: Headphones, value: 4200, suffix: "+", label: "Mock Interview Hours Conducted" },
];

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 text-white sm:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-60">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute left-1/2 top-0 h-64 w-[120%] -translate-x-1/2 bg-hero-glow" />
      </div>

      <div className="relative container-px mx-auto max-w-7xl">
        <div className="grid items-end gap-6 md:grid-cols-[1.5fr_1fr]">
          <div>
            <span className="eyebrow !border-cyan-300/30 !bg-cyan-300/10 !text-cyan-200">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
              Results
            </span>
            <h2 className="h-section mt-4 text-white">
              Numbers that <span className="text-cyan-300">compound careers</span>.
            </h2>
          </div>
          <p className="text-sm text-slate-300/80">
            Every metric below is grounded in real engineers, real interviews, and real
            offers — tracked across our active and alumni cohorts.
          </p>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur"
            >
              <s.icon className="h-5 w-5 text-cyan-300" />
              <div className="mt-4 text-4xl font-semibold tracking-tight">
                <AnimatedCounter to={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-1 text-xs text-slate-300/80">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
