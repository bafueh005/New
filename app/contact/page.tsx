"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  CalendarCheck2,
  MessageSquare,
  Upload,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";

const PROGRAMS = [
  "Resume Review",
  "Career Consultation",
  "Interview Coaching",
  "Infrastructure Mentorship",
  "Cloud & DevOps Accelerator",
  "Premium Career Transformation",
  "Not sure yet",
];

const TIME_SLOTS = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [slot, setSlot] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      currentRole: String(data.get("currentRole") ?? ""),
      targetRole: String(data.get("targetRole") ?? ""),
      program: String(data.get("program") ?? ""),
      slot: slot ?? "",
      message: String(data.get("message") ?? ""),
      uploadResume: data.get("resume") === "on",
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={<>Let&apos;s get you <span className="gradient-text">into interviews</span>.</>}
        description="Book a free 30-minute consultation, upload your resume, or just send us a question. A senior mentor responds within one business day."
      />

      <section className="section">
        <div className="container-px mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-5">
            <InfoCard icon={CalendarCheck2} title="Schedule a free call" body={<>30 minutes, video on, no sales pitch. We&apos;ll diagnose what&apos;s blocking your interviews and tell you what we&apos;d do next — even if it isn&apos;t with us.</>} />
            <InfoCard icon={Mail} title="Email us" body={<a href="mailto:info@boasystemz.com" className="font-semibold text-navy-900 underline-offset-4 hover:underline dark:text-white">info@boasystemz.com</a>} />
            <InfoCard icon={Phone} title="Call or text" body="+1 (240) 784-3133 · Mon–Fri 9am–6pm PT" />
            <InfoCard icon={MapPin} title="Remote-first" body="Headquartered in California. Mentors operate across US, EMEA, and APAC." />

            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300">
                Or jump straight in
              </p>
              <div className="mt-3 grid gap-2">
                <Link href="/upload-resume" className="btn-secondary justify-between"><span className="inline-flex items-center gap-2"><Upload className="h-4 w-4" />Upload resume</span><ArrowRight className="h-4 w-4" /></Link>
                <Link href="/onboarding" className="btn-secondary justify-between"><span className="inline-flex items-center gap-2"><MessageSquare className="h-4 w-4" />Start onboarding</span><ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/[0.03] sm:p-9">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid place-items-center py-16 text-center"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
                  <CheckCircle2 className="h-7 w-7" />
                </span>
                <h2 className="mt-5 text-2xl font-semibold text-navy-950 dark:text-white">Got it. We&apos;re on it.</h2>
                <p className="mt-2 max-w-sm text-sm text-slate-600 dark:text-slate-300">
                  A senior mentor will reach out within one business day to confirm your session and share a short prep questionnaire.
                </p>
                <Link href="/" className="btn-secondary mt-6">Back to home</Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-navy-950 dark:text-white">Book a free consultation</h2>
                  <span id="chat" className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:border-white/10 dark:text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live chat 9–6 PT
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name"><input name="name" required className="input" placeholder="Adaeze Nwosu" /></Field>
                  <Field label="Work email"><input name="email" required type="email" className="input" placeholder="you@company.com" /></Field>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Current role">
                    <input name="currentRole" className="input" placeholder="e.g. Systems Engineer" />
                  </Field>
                  <Field label="Target role">
                    <input name="targetRole" className="input" placeholder="e.g. Sr. Cloud Engineer" />
                  </Field>
                </div>

                <Field label="Program of interest">
                  <select name="program" className="input" defaultValue={PROGRAMS[6]}>
                    {PROGRAMS.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </Field>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Preferred time (next available)
                  </label>
                  <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {TIME_SLOTS.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setSlot(t)}
                        className={`rounded-lg border px-2 py-2 text-xs font-medium transition-colors ${
                          slot === t
                            ? "border-cyan-400 bg-cyan-400/10 text-cyan-700 dark:text-cyan-200"
                            : "border-slate-200 text-slate-700 hover:border-cyan-400/50 dark:border-white/10 dark:text-slate-300"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <p className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                    Calendly will confirm the exact slot in your timezone after submission.
                  </p>
                </div>

                <Field label="What would you like to focus on?">
                  <textarea name="message" rows={4} className="input resize-none" placeholder="Quick context: where you are, where you want to go, what's been blocking interviews so far." />
                </Field>

                <div className="flex items-center gap-3">
                  <input type="checkbox" id="resume" name="resume" className="h-4 w-4 rounded border-slate-300" />
                  <label htmlFor="resume" className="text-sm text-slate-600 dark:text-slate-300">I&apos;ll upload my resume after this form.</label>
                </div>

                {error && (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
                    {error}
                  </p>
                )}

                <button type="submit" disabled={submitting} className="btn-primary mt-2 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
                  {submitting ? "Sending…" : <>Submit and schedule <ArrowRight className="h-4 w-4" /></>}
                </button>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  By submitting you agree to our <Link href="/legal/privacy" className="underline">privacy policy</Link> and to receive a follow-up email from a Boasystemz mentor.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function InfoCard({ icon: Icon, title, body }: { icon: React.ComponentType<{ className?: string }>; title: string; body: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-navy-900 to-cyan-600 text-white">
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-semibold text-navy-950 dark:text-white">{title}</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{body}</p>
        </div>
      </div>
    </div>
  );
}
