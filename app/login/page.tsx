"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Github, Mail } from "lucide-react";
import { AuthShell } from "@/components/auth-shell";

export default function LoginPage() {
  const [show, setShow] = useState(false);
  return (
    <AuthShell mode="login">
      <h2 className="text-2xl font-semibold tracking-tight text-navy-950 dark:text-white">Sign in</h2>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Welcome back. Pick up where you left off.</p>

      <div className="mt-7 grid gap-2">
        <button className="btn-secondary justify-center"><Github className="h-4 w-4" /> Continue with GitHub</button>
        <button className="btn-secondary justify-center"><Mail className="h-4 w-4" /> Continue with Google</button>
      </div>

      <div className="my-6 flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
        <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
        OR
        <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = "/dashboard";
        }}
        className="space-y-4"
      >
        <label className="block">
          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Email</span>
          <input type="email" required className="input mt-1.5" placeholder="you@company.com" />
        </label>
        <label className="block">
          <div className="flex items-center justify-between">
            <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Password</span>
            <Link href="#" className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-300">Forgot?</Link>
          </div>
          <div className="relative mt-1.5">
            <input type={show ? "text" : "password"} required className="input pr-10" placeholder="••••••••" />
            <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </label>
        <button type="submit" className="btn-primary w-full">Sign in <ArrowRight className="h-4 w-4" /></button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
        New to Boasystemz?{" "}
        <Link href="/signup" className="font-semibold text-cyan-600 dark:text-cyan-300">Create an account</Link>
      </p>
    </AuthShell>
  );
}
