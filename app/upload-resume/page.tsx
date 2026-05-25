"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Sparkles,
  Upload,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";

type State = "idle" | "uploading" | "analyzed";

export default function UploadResumePage() {
  const [state, setState] = useState<State>("idle");
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleFiles(files: FileList | null) {
    if (!files || !files[0]) return;
    setName(files[0].name);
    setState("uploading");
    setProgress(0);
    const tick = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + 8 + Math.random() * 7);
        if (next >= 100) {
          clearInterval(tick);
          setTimeout(() => setState("analyzed"), 400);
        }
        return next;
      });
    }, 160);
  }

  return (
    <>
      <PageHeader
        eyebrow="Resume portal"
        title={<>Upload your resume. <span className="gradient-text">Get diagnosed</span> in 60 seconds.</>}
        description="Senior-engineer review combined with an AI ATS scan. We'll tell you exactly what's blocking your applications."
      />

      <section className="section">
        <div className="container-px mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_1fr]">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFiles(e.dataTransfer.files);
            }}
            className="relative overflow-hidden rounded-3xl border-2 border-dashed border-slate-300 bg-white p-10 text-center transition-colors hover:border-cyan-400 dark:border-white/15 dark:bg-white/[0.03]"
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
            <AnimatePresence mode="wait">
              {state === "idle" && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-navy-900 to-cyan-600 text-white shadow-md shadow-cyan-500/20">
                    <Upload className="h-6 w-6" />
                  </span>
                  <h2 className="mt-5 text-xl font-semibold text-navy-950 dark:text-white">Drop your resume here</h2>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">PDF, DOC, or DOCX up to 10 MB.</p>
                  <button onClick={() => inputRef.current?.click()} className="btn-primary mt-6">
                    Choose file
                  </button>
                  <p className="mt-3 inline-flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Encrypted upload · Not shared with third parties
                  </p>
                </motion.div>
              )}

              {state === "uploading" && (
                <motion.div key="up" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-navy-900 to-cyan-600 text-white">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </span>
                  <h2 className="mt-5 text-xl font-semibold text-navy-950 dark:text-white">Analyzing {name}...</h2>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Running ATS scan, keyword extraction, and structure review.</p>
                  <div className="mx-auto mt-6 h-2 max-w-md rounded-full bg-slate-100 dark:bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-slate-500">{Math.round(progress)}%</p>
                </motion.div>
              )}

              {state === "analyzed" && (
                <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-500/15 text-emerald-500">
                    <CheckCircle2 className="h-7 w-7" />
                  </span>
                  <h2 className="mt-5 text-xl font-semibold text-navy-950 dark:text-white">Analysis ready</h2>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">We saved your resume and ran a full diagnostic.</p>
                  <div className="mx-auto mt-6 flex max-w-sm flex-wrap items-center justify-center gap-3">
                    <Link href="/resources/ai-resume-review" className="btn-primary">View AI report <ArrowRight className="h-4 w-4" /></Link>
                    <Link href="/contact" className="btn-secondary">Book mentor review</Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300">
                <Sparkles className="h-3.5 w-3.5" /> What you&apos;ll get
              </div>
              <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                {[
                  "AI-powered ATS score with keyword gap analysis",
                  "Structure & formatting feedback for top recruiters",
                  "Action-verb density and outcome-line scoring",
                  "Senior-engineer review within 1 business day",
                  "Optional 1:1 rewrite session with a mentor",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="mt-0.5 grid h-4 w-4 place-items-center rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-300">
                      <CheckCircle2 className="h-3 w-3" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <FileText className="h-3.5 w-3.5" /> Tips before you upload
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li>• Use your most recent role-specific resume (cloud, infra, etc.).</li>
                <li>• PDF preferred for the most accurate ATS parse.</li>
                <li>• Include 3–5 outcome-driven bullets per role.</li>
                <li>• Don&apos;t over-design, keep it clean and parseable.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
