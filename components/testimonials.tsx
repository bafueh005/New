"use client";

import { motion } from "framer-motion";
import { Quote, TrendingUp, Building2, Briefcase } from "lucide-react";
import { SectionHeading } from "./section-heading";

const STORIES = [
  {
    name: "Adaeze N.",
    role: "Systems Engineer → Sr. Cloud Engineer",
    company: "Capital One",
    salaryFrom: 88,
    salaryTo: 162,
    quote:
      "I had 6 years of systems experience but couldn't get past resume screens. Boasystemz rebuilt my story around outcomes and ran 12 mock interviews. I landed three offers in 11 weeks.",
    initials: "AN",
    color: "from-cyan-500 to-blue-600",
  },
  {
    name: "Marcus T.",
    role: "Help Desk → VMware Administrator",
    company: "Lockheed Martin",
    salaryFrom: 56,
    salaryTo: 118,
    quote:
      "The VMware mentorship was real. We rebuilt vSphere labs from scratch, simulated outages, and prepped me on actual incidents. Hiring manager asked what my background was — I told them, and he just laughed.",
    initials: "MT",
    color: "from-emerald-500 to-cyan-600",
  },
  {
    name: "Priya R.",
    role: "Network Engineer → DevOps Engineer",
    company: "AWS",
    salaryFrom: 102,
    salaryTo: 187,
    quote:
      "I had no DevOps experience. Their accelerator walked me through Terraform, Argo CD, and Kubernetes — and the mock interviews caught every weak spot before it cost me an offer.",
    initials: "PR",
    color: "from-violet-500 to-indigo-600",
  },
  {
    name: "Oluwaseun A.",
    role: "International Pro → Cloud Engineer (US)",
    company: "Microsoft",
    salaryFrom: 0,
    salaryTo: 155,
    quote:
      "As an international engineer, I didn't understand the US market at all. My mentor positioned my work for American hiring managers and coached me through sponsorship strategy. I'm now in Seattle.",
    initials: "OA",
    color: "from-amber-500 to-rose-500",
  },
  {
    name: "Jared M.",
    role: "SOC Analyst → Cybersecurity Engineer",
    company: "Booz Allen",
    salaryFrom: 74,
    salaryTo: 138,
    quote:
      "The cybersecurity coaching covered everything from SIEM rule writing to behavioral interviews. They pushed me, scheduled the right interviews, and helped me negotiate a 60% raise.",
    initials: "JM",
    color: "from-rose-500 to-pink-600",
  },
  {
    name: "Sandra K.",
    role: "Windows Admin → Platform Engineer",
    company: "Cisco",
    salaryFrom: 92,
    salaryTo: 168,
    quote:
      "I was the 'AD person' for 9 years. Boasystemz turned my AD/GPO depth into a platform engineering story and got me into a Kubernetes-heavy team. Best decision of my career.",
    initials: "SK",
    color: "from-teal-500 to-cyan-600",
  },
];

export function Testimonials() {
  return (
    <section className="section relative overflow-hidden">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Success stories"
          title={<>Real engineers. <span className="gradient-text">Real offers</span>.</>}
          description="A few of the recent career transformations our mentors helped engineer."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {STORIES.map((s, i) => (
            <motion.article
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]"
            >
              <Quote className="h-6 w-6 text-cyan-500/40" />
              <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                &ldquo;{s.quote}&rdquo;
              </p>

              <div className="mt-6 grid grid-cols-3 gap-2 text-xs">
                <Metric icon={Briefcase} label="Role" value={s.role.split("→")[1]?.trim() ?? s.role} />
                <Metric icon={Building2} label="Company" value={s.company} />
                <Metric
                  icon={TrendingUp}
                  label="Salary"
                  value={s.salaryFrom ? `$${s.salaryFrom}k → $${s.salaryTo}k` : `$${s.salaryTo}k`}
                  highlight
                />
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5 dark:border-white/10">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${s.color} text-sm font-semibold text-white shadow`}
                >
                  {s.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-950 dark:text-white">{s.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{s.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 fade-edges">
          <div className="flex w-max animate-marquee items-center gap-10 text-sm font-medium text-slate-500 dark:text-slate-400">
            {[..."Microsoft / AWS / Google / Cisco / IBM / Capital One / Lockheed / Booz Allen / GEICO / Deloitte / Accenture / JPMorgan / NVIDIA / Oracle".split(" / "), ..."Microsoft / AWS / Google / Cisco / IBM / Capital One / Lockheed / Booz Allen / GEICO / Deloitte / Accenture / JPMorgan / NVIDIA / Oracle".split(" / ")].map((c, i) => (
              <span key={i} className="whitespace-nowrap">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-white/10 dark:bg-white/[0.03] ${
        highlight ? "border-cyan-400/40 bg-cyan-50/60 dark:border-cyan-400/30 dark:bg-cyan-400/10" : ""
      }`}
    >
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
        <Icon className="h-3 w-3" />
        {label}
      </div>
      <div className={`mt-1 truncate text-xs font-semibold ${highlight ? "text-cyan-700 dark:text-cyan-300" : "text-navy-900 dark:text-white"}`}>
        {value}
      </div>
    </div>
  );
}
