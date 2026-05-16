"use client";

import Link from "next/link";
import { ArrowRight, Github, Mail, ShieldCheck } from "lucide-react";
import { AuthShell } from "@/components/auth-shell";

export default function SignupPage() {
  return (
    <AuthShell mode="signup">
      <h2 className="text-2xl font-semibold tracking-tight text-navy-950 dark:text-white">Create your workspace</h2>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Free to start. Mentorship programs are opt-in.</p>

      <div className="mt-7 grid gap-2">
        <button className="btn-secondary justify-center"><Github className="h-4 w-4" /> Sign up with GitHub</button>
        <button className="btn-secondary justify-center"><Mail className="h-4 w-4" /> Sign up with Google</button>
      </div>

      <div className="my-6 flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
        <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
        OR
        <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = "/onboarding";
        }}
        className="space-y-4"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">First name</span>
            <input required className="input mt-1.5" placeholder="Adaeze" />
          </label>
          <label className="block">
            <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Last name</span>
            <input required className="input mt-1.5" placeholder="Nwosu" />
          </label>
        </div>
        <label className="block">
          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Work email</span>
          <input type="email" required className="input mt-1.5" placeholder="you@company.com" />
        </label>
        <label className="block">
          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Create password</span>
          <input type="password" required className="input mt-1.5" placeholder="At least 8 characters" />
        </label>
        <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
          <input type="checkbox" defaultChecked className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300" />
          <span>Send me weekly career playbooks and infrastructure deep-dives. No spam.</span>
        </div>
        <button type="submit" className="btn-primary w-full">Create workspace <ArrowRight className="h-4 w-4" /></button>
        <p className="flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> SOC 2-aligned data handling
        </p>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-cyan-600 dark:text-cyan-300">Sign in</Link>
      </p>
    </AuthShell>
  );
}
