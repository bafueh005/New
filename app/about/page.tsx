import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, Target, Users, Heart } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Stats } from "@/components/stats";
import { CtaSection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "About Boasystemz",
  description:
    "Boasystemz is a mentorship-first career acceleration company built by senior IT engineers. Our mission: help technology professionals land interviews and offers faster.",
};

const VALUES = [
  { icon: Target, title: "Outcomes, not theory", desc: "We measure offers, salary bumps, and time-to-hire. If a tactic doesn't move those numbers, we cut it." },
  { icon: Users, title: "Mentorship over content", desc: "Real engineers, real reviews, real labs. We don't sell pre-recorded courses." },
  { icon: Award, title: "Enterprise rigor", desc: "Our mentors run production at AWS-scale companies. The bar is the bar." },
  { icon: Heart, title: "Honest and direct", desc: "We tell you what's wrong with your resume, brand, and interview answers. Politely. Always." },
];

const TEAM = [
  { name: "Bon O.", role: "Founder · AI Security Engineer", initials: "BO", color: "from-cyan-500 to-blue-600" },
  { name: "Linh P.", role: "Cloud Mentor · Sr. SRE", initials: "LP", color: "from-emerald-500 to-cyan-600" },
  { name: "Daniel O.", role: "Cybersecurity Mentor · Sr. Security Engineer", initials: "DO", color: "from-rose-500 to-pink-600" },
  { name: "Aisha R.", role: "Career Coach · ex-Big Tech Recruiter", initials: "AR", color: "from-amber-500 to-rose-500" },
  { name: "Tomi K.", role: "VMware & Infra Mentor", initials: "TK", color: "from-violet-500 to-indigo-600" },
  { name: "Sade O.", role: "Resume & Brand Strategist", initials: "SO", color: "from-teal-500 to-cyan-600" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={<>We help engineers <span className="gradient-text">win the careers they earned</span>.</>}
        description={
          <>
            Boasystemz is a mentorship-first career acceleration company. We work
            primarily with infrastructure, cloud, security, and platform engineers who
            are great at their jobs — but stuck in the application loop.
          </>
        }
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn-primary">Work with us <ArrowRight className="h-4 w-4" /></Link>
          <Link href="/services" className="btn-secondary">Explore services</Link>
        </div>
      </PageHeader>

      <section className="section">
        <div className="container-px mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />Our mission</span>
            <h2 className="h-section mt-4 text-navy-950 dark:text-white">
              Stop the endless application loop. Start the offer loop.
            </h2>
            <p className="mt-5 text-base text-slate-600 dark:text-slate-300">
              Boasystemz exists because the gap between &quot;great engineer&quot; and
              &quot;hired great engineer&quot; is almost entirely unrelated to engineering
              ability. It&apos;s branding, positioning, interview craft, and strategy.
            </p>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
              We built the system we wished existed when we were grinding through cold
              applications: senior mentorship, real enterprise context, ATS-aware
              storytelling, hands-on labs, and a job application strategy that converts.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-navy-900 to-cyan-600 text-white">
                  <v.icon className="h-4 w-4" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-navy-950 dark:text-white">{v.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Stats />

      <section className="section">
        <div className="container-px mx-auto max-w-7xl">
          <span className="eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />The team</span>
          <h2 className="h-section mt-4 text-navy-950 dark:text-white">
            Mentors who&apos;ve <span className="gradient-text">sat in your seat</span>.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">
            Every mentor at Boasystemz has spent years building enterprise infrastructure, hiring engineers,
            or both. No bootcamps. No career-coaches-who-have-never-coded. Real engineers, full stop.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((m) => (
              <div key={m.name} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-center gap-3">
                  <span className={`grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br ${m.color} text-base font-semibold text-white shadow`}>
                    {m.initials}
                  </span>
                  <div>
                    <p className="text-base font-semibold text-navy-950 dark:text-white">{m.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{m.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
