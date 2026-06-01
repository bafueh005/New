"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Mail } from "lucide-react";
import { track } from "@/lib/analytics";

type Props = {
  /** Lead-magnet id from lib/content/lead-magnets.ts. Omit for newsletter capture. */
  magnet?: string;
  /** Where on the site this form lives, for attribution. */
  source: string;
  /** Optional heading + subcopy override. */
  heading?: string;
  subcopy?: string;
  cta?: string;
  /** "card" (default) or "band" (compact horizontal for footers/CTAs). */
  variant?: "card" | "band";
};

function readUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const k of ["source", "medium", "campaign", "term", "content"]) {
    const v = p.get(`utm_${k}`);
    if (v) out[k] = v;
  }
  return out;
}

export function LeadCapture({
  magnet,
  source,
  heading = "Get the free IT Career Toolkit",
  subcopy = "The resume, interview, and job-search playbook our mentors use with clients. Straight to your inbox.",
  cta = "Send it to me",
  variant = "card",
}: Props) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setState("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, magnet, source, utm: readUtm() }),
      });
      if (!res.ok) {
        const b = await res.json().catch(() => ({}));
        throw new Error(b.error ?? "Something went wrong.");
      }
      track("lead_submitted", { source, magnet: magnet ?? "newsletter" });
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-800 dark:text-emerald-200"
      >
        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
        <span>Check your inbox — it&apos;s on the way. (Peek in spam if you don&apos;t see it.)</span>
      </motion.div>
    );
  }

  const isBand = variant === "band";

  return (
    <div
      className={
        isBand
          ? "rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]"
          : "rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-400/10 to-transparent p-6 sm:p-8"
      }
    >
      {!isBand && (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
          <Mail className="h-3.5 w-3.5" /> Free download
        </span>
      )}
      <h3 className={`${isBand ? "text-base" : "mt-3 text-xl"} font-semibold text-navy-950 dark:text-white`}>
        {heading}
      </h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{subcopy}</p>
      <form onSubmit={submit} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="input flex-1"
          aria-label="Email address"
        />
        <button type="submit" disabled={state === "submitting"} className="btn-primary shrink-0 disabled:opacity-60">
          {state === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending
            </>
          ) : (
            <>
              {cta} <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
      {error && <p className="mt-2 text-xs text-red-600 dark:text-red-300">{error}</p>}
      <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
