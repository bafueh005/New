"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, PlayCircle } from "lucide-react";
import type { ProgramModule, ProgramFaq } from "@/lib/programs-data";

export function Curriculum({ modules }: { modules: readonly ProgramModule[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="space-y-3">
      {modules.map((m, i) => {
        const isOpen = open === i;
        return (
          <li
            key={m.title}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03]"
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.04]"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-navy-900 to-cyan-600 text-sm font-semibold text-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1">
                <span className="block h-card text-navy-950 dark:text-white">{m.title}</span>
                <span className="mt-0.5 block text-sm text-slate-600 dark:text-slate-400">
                  {m.summary}
                </span>
              </span>
              <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 sm:inline-flex dark:bg-white/10 dark:text-slate-300">
                <PlayCircle className="h-3.5 w-3.5" /> {m.lessons} lessons
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <ul className="grid gap-2 border-t border-slate-200 px-5 py-5 sm:grid-cols-2 dark:border-white/10">
                    {m.topics.map((t) => (
                      <li
                        key={t}
                        className="flex gap-2.5 text-sm text-slate-700 dark:text-slate-200"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-500" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

export function Faq({ faqs }: { faqs: readonly ProgramFaq[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ul className="space-y-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <li
            key={f.q}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03]"
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.04]"
            >
              <span className="flex-1 text-sm font-semibold text-navy-950 dark:text-white">
                {f.q}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="border-t border-slate-200 px-5 py-5 text-sm leading-relaxed text-slate-600 dark:border-white/10 dark:text-slate-300">
                    {f.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
