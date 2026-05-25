"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, TrendingUp } from "lucide-react";
import { Logo } from "./logo";

export function AuthShell({ children, mode }: { children: React.ReactNode; mode: "login" | "signup" }) {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-64px)]">
      <div className="grid w-full lg:grid-cols-[1fr_1.05fr]">
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 lg:block">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative flex h-full flex-col justify-between p-10 text-white">
            <Logo />

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-200">
                <Sparkles className="h-3.5 w-3.5" /> Boasystemz Platform
              </span>
              <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                {mode === "login" ? <>Welcome back, <span className="text-cyan-300">engineer</span>.</> : <>Build the career <span className="text-cyan-300">you actually deserve</span>.</>}
              </h1>
              <p className="mt-4 max-w-md text-base text-slate-300">
                Track applications, run mock interviews, optimize your resume with AI, and work with senior mentors, all in one workspace.
              </p>

              <div className="mt-8 space-y-3 text-sm text-slate-200">
                <div className="flex items-center gap-3"><span className="grid h-7 w-7 place-items-center rounded-full bg-cyan-400/15 text-cyan-300"><ShieldCheck className="h-3.5 w-3.5" /></span>500+ engineers onboarded</div>
                <div className="flex items-center gap-3"><span className="grid h-7 w-7 place-items-center rounded-full bg-cyan-400/15 text-cyan-300"><TrendingUp className="h-3.5 w-3.5" /></span>90% increased interview callbacks</div>
                <div className="flex items-center gap-3"><span className="grid h-7 w-7 place-items-center rounded-full bg-cyan-400/15 text-cyan-300"><Sparkles className="h-3.5 w-3.5" /></span>AI-powered resume reviews + senior mentors</div>
              </div>
            </motion.div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm italic text-slate-200">&ldquo;Three months in. Six interviews. Two offers. The system works.&rdquo;</p>
              <p className="mt-2 text-xs text-slate-400">Adaeze N., Sr. Cloud Engineer @ Capital One</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-5 py-12 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            <div className="lg:hidden mb-8 flex items-center justify-center">
              <Logo />
            </div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              {children}
            </motion.div>
            <p className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400">
              By continuing you agree to our <Link href="/legal/terms" className="underline">Terms</Link> and{" "}
              <Link href="/legal/privacy" className="underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
