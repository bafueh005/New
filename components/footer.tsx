"use client";

import Link from "next/link";
import { ArrowRight, Github, Linkedin, Twitter, Youtube, Mail } from "lucide-react";
import { Logo } from "./logo";
import { useState } from "react";

const COLS = [
  {
    title: "Services",
    items: [
      { label: "IT Consulting", href: "/services#consulting" },
      { label: "Cloud Engineering Mentorship", href: "/services#cloud" },
      { label: "Cybersecurity Coaching", href: "/services#cybersecurity" },
      { label: "DevOps Coaching", href: "/services#devops" },
      { label: "Resume Optimization", href: "/services#resume" },
      { label: "Mock Interviews", href: "/services#interviews" },
    ],
  },
  {
    title: "Programs",
    items: [
      { label: "Career Transformation", href: "/pricing#transformation" },
      { label: "Cloud & DevOps Accelerator", href: "/pricing#accelerator" },
      { label: "Infrastructure Mentorship", href: "/pricing#infrastructure" },
      { label: "Resume Review", href: "/pricing#resume" },
      { label: "Career Consultation", href: "/pricing#consultation" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/about#careers" },
      { label: "Press", href: "/about#press" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Blog", href: "/blog" },
      { label: "Career Roadmaps", href: "/resources" },
      { label: "Interview Library", href: "/resources#interviews" },
      { label: "AI Resume Review", href: "/resources/ai-resume-review" },
      { label: "Onboarding", href: "/onboarding" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="relative mt-24 border-t border-slate-200 bg-white dark:border-white/10 dark:bg-navy-950">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Career acceleration for IT professionals. Strategy, mentorship, and execution —
              built by senior engineers who&apos;ve hired into the teams you want to join.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.includes("@")) setSubmitted(true);
              }}
              className="mt-6 flex max-w-md items-center gap-2 rounded-full border border-slate-200 bg-white p-1 pl-4 dark:border-white/10 dark:bg-white/5"
            >
              <Mail className="h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-1 bg-transparent py-2 text-sm placeholder-slate-400 outline-none"
              />
              <button type="submit" className="btn-primary !py-2 !px-4 !text-xs">
                {submitted ? "Subscribed" : "Subscribe"}
                {!submitted && <ArrowRight className="h-3.5 w-3.5" />}
              </button>
            </form>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
              Career playbooks, interview drills, and infrastructure deep-dives. No spam.
            </p>

            <div className="mt-7 flex items-center gap-3">
              {[Linkedin, Github, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 hover:text-navy-900 dark:border-white/10 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLS.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {col.items.map((it) => (
                    <li key={it.label}>
                      <Link href={it.href} className="link-muted">
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-white/10 dark:text-slate-500 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Boasystemz. All rights reserved. Boasystemz.com</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/legal/privacy" className="link-muted">Privacy Policy</Link>
            <Link href="/legal/terms" className="link-muted">Terms of Service</Link>
            <Link href="/contact" className="link-muted">Support</Link>
            <a href="mailto:hello@boasystemz.com" className="link-muted">hello@boasystemz.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
