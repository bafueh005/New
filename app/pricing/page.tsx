import type { Metadata } from "next";
import Link from "next/link";
import { Pricing } from "@/components/pricing";
import { PageHeader } from "@/components/page-header";
import { CtaSection } from "@/components/cta-section";
import { ArrowRight, Check, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Programs — Free, mentor-led for every stage of your IT career",
  description:
    "Free engineering career programs from Boasystemz: resume review, career consultation, interview coaching, infrastructure mentorship, cloud & DevOps accelerator, and premium career transformation.",
};

const FAQ = [
  {
    q: "Is every program really free?",
    a: "Yes. From a single Career Consultation to the full Premium Career Transformation, there's no cost and no card required. We're focused on outcomes — pricing was the biggest barrier we saw engineers hit, so we removed it.",
  },
  {
    q: "How do I get started?",
    a: "Book a free 30-minute consultation. We'll diagnose what's blocking your interviews and recommend the right program — even if it isn't with us. From there, you can start the program you choose with no payment step.",
  },
  {
    q: "Do you help international engineers?",
    a: "Yes — international professionals are a major part of who we work with. We cover US, EU, and Middle East markets, plus sponsorship and relocation strategy where relevant.",
  },
  {
    q: "What if I'm a career changer with no IT background?",
    a: "We have an explicit Career Transition program. Realistic expectations and a hands-on approach: foundations first, branding second, applications third.",
  },
  {
    q: "How fast can I expect results?",
    a: "Most engineers in our accelerator and transformation programs land interviews within 30–45 days and offers within 60–120 days. Outcomes depend on starting point, market, and execution.",
  },
  {
    q: "Are sessions live or recorded?",
    a: "All mentorship and mock interviews are live, 1:1. Sessions are recorded so you can review and we can give async feedback.",
  },
];

const COMPARE = [
  { feature: "1:1 Sessions", a: "—", b: "1", c: "4", d: "4 / mo", e: "4 / mo", f: "Unlimited" },
  { feature: "Resume Rewrite", a: "✓", b: "—", c: "—", d: "✓", e: "✓", f: "✓" },
  { feature: "LinkedIn Branding", a: "—", b: "—", c: "—", d: "✓", e: "✓", f: "✓" },
  { feature: "Mock Interviews", a: "—", b: "—", c: "4", d: "—", e: "8", f: "Unlimited" },
  { feature: "Hands-on Labs", a: "—", b: "—", c: "—", d: "✓", e: "✓", f: "✓" },
  { feature: "Application Strategy", a: "—", b: "✓", c: "—", d: "—", e: "✓", f: "✓" },
  { feature: "Offer Negotiation", a: "—", b: "—", c: "✓", d: "—", e: "✓", f: "✓" },
  { feature: "Dedicated Mentor", a: "—", b: "—", c: "—", d: "✓", e: "✓", f: "✓" },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Programs"
        title={<>Programs for every <span className="gradient-text">stage of your IT career</span>.</>}
        description="Every program is free, mentor-led, and outcome-focused. From a single resume review to a full career transformation — no card, no contracts, no hidden fees."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn-primary">Book a free consultation <ArrowRight className="h-4 w-4" /></Link>
          <Link href="#faq" className="btn-secondary">See FAQ</Link>
        </div>
      </PageHeader>

      <Pricing />

      <section className="section">
        <div className="container-px mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead className="bg-slate-50 text-navy-900 dark:bg-white/5 dark:text-white">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider">Feature</th>
                    {["Resume", "Consult", "Interview", "Infra", "Accelerator", "Transformation"].map((h, i) => (
                      <th key={h} className={`px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider ${i === 4 ? "text-cyan-600 dark:text-cyan-300" : ""}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-slate-700 dark:text-slate-300">
                  {COMPARE.map((r) => (
                    <tr key={r.feature} className="border-t border-slate-200 dark:border-white/10">
                      <td className="px-5 py-3.5 font-medium text-navy-900 dark:text-white">{r.feature}</td>
                      <td className="px-5 py-3.5">{r.a}</td>
                      <td className="px-5 py-3.5">{r.b}</td>
                      <td className="px-5 py-3.5">{r.c}</td>
                      <td className="px-5 py-3.5">{r.d}</td>
                      <td className="px-5 py-3.5">{r.e}</td>
                      <td className="px-5 py-3.5 font-semibold text-cyan-600 dark:text-cyan-300">{r.f}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, t: "No card required", d: "Apply and start without payment." },
              { icon: Sparkles, t: "No long contracts", d: "Leave anytime. Keep all your materials." },
              { icon: Check, t: "Real mentors", d: "Every engagement is human-led. No bots." },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-500/15 text-cyan-600 dark:text-cyan-300"><x.icon className="h-4 w-4" /></span>
                <p className="mt-3 text-sm font-semibold text-navy-900 dark:text-white">{x.t}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="section">
        <div className="container-px mx-auto max-w-3xl">
          <span className="eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />FAQ</span>
          <h2 className="h-section mt-4 text-navy-950 dark:text-white">Common questions, answered.</h2>
          <div className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-white/[0.03]">
            {FAQ.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                  <span className="text-sm font-semibold text-navy-900 dark:text-white">{f.q}</span>
                  <span className="grid h-7 w-7 place-items-center rounded-full border border-slate-200 text-slate-500 transition-transform group-open:rotate-45 dark:border-white/10 dark:text-slate-400">+</span>
                </summary>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
