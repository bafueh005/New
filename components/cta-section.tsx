"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck2, Upload, MessageSquare } from "lucide-react";

export function CtaSection() {
  return (
    <section className="section">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 px-6 py-14 text-white shadow-2xl shadow-cyan-500/10 sm:px-12 sm:py-16"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 left-1/2 h-72 w-[140%] -translate-x-1/2 bg-hero-glow" />
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
          </div>

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="eyebrow !border-cyan-300/30 !bg-cyan-300/10 !text-cyan-200">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                Ready when you are
              </span>
              <h2 className="h-section mt-4 text-white">
                Your next role isn&apos;t a numbers game. <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                  It&apos;s a strategy game.
                </span>
              </h2>
              <p className="mt-4 max-w-xl text-base text-slate-300">
                Book a free 30-minute consultation. We&apos;ll map out exactly what&apos;s blocking
                your interviews and offers — and the fastest path through it.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-navy-950 transition hover:bg-cyan-300"
                >
                  <CalendarCheck2 className="h-4 w-4" />
                  Book a free consultation
                </Link>
                <Link
                  href="/upload-resume"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <Upload className="h-4 w-4" /> Upload resume
                </Link>
                <Link
                  href="/contact#chat"
                  className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200 hover:text-white"
                >
                  <MessageSquare className="h-4 w-4" /> Chat with us <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                  What you&apos;ll leave with
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-200">
                  {[
                    "A clear diagnosis of why you're not getting interviews",
                    "Your 90-day path to interviews and offers",
                    "An honest assessment of your resume and brand",
                    "Recommendation of the right program (or none, if you don't need it)",
                  ].map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-300" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Next available slot · Today
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
