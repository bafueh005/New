"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";

const STACK = [
  { name: "VMware vSphere", category: "Virtualization", color: "#0096d6" },
  { name: "Cisco", category: "Networking", color: "#1ba0d7" },
  { name: "Palo Alto", category: "Security", color: "#f04e23" },
  { name: "Fortinet", category: "Security", color: "#ee3124" },
  { name: "Linux", category: "OS", color: "#fcc624" },
  { name: "Windows Server", category: "OS", color: "#00a4ef" },
  { name: "Active Directory", category: "Identity", color: "#4a90e2" },
  { name: "Azure", category: "Cloud", color: "#0078d4" },
  { name: "AWS", category: "Cloud", color: "#ff9900" },
  { name: "Kubernetes", category: "Platform", color: "#326ce5" },
  { name: "Docker", category: "Containers", color: "#2496ed" },
  { name: "OpenShift", category: "Platform", color: "#ee0000" },
  { name: "Terraform", category: "IaC", color: "#7c47e6" },
  { name: "Ansible", category: "Automation", color: "#cc0000" },
  { name: "GitHub Actions", category: "CI/CD", color: "#2088ff" },
  { name: "Argo CD", category: "GitOps", color: "#ef7b4d" },
  { name: "Splunk", category: "Observability", color: "#65a637" },
  { name: "SIEM", category: "Security", color: "#22d3ee" },
  { name: "Python", category: "Scripting", color: "#3776ab" },
  { name: "PowerShell", category: "Scripting", color: "#5391fe" },
];

export function TechStack() {
  return (
    <section className="section relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      </div>

      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Infrastructure & Technology"
          title={<>The stack <span className="gradient-text">enterprises actually run</span>.</>}
          description="Our mentorship is grounded in the technologies that power Fortune 500 datacenters and cloud platforms — taught by engineers who run them at scale every day."
        />

        <div className="mt-12 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {STACK.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: (i % 10) * 0.03 }}
              className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-cyan-400/40 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-400/40"
            >
              <span
                className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-[11px] font-bold uppercase text-white shadow-md"
                style={{
                  background: `linear-gradient(135deg, ${t.color}, ${t.color}aa)`,
                }}
              >
                {t.name.slice(0, 2)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-navy-900 dark:text-white">{t.name}</p>
                <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">{t.category}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <InfraDiagram />
        </div>
      </div>
    </section>
  );
}

function InfraDiagram() {
  const layers = [
    {
      title: "Strategy & Career",
      items: ["Career Plan", "Brand", "Goals", "Compensation"],
      tint: "from-cyan-500/15 to-cyan-500/5",
    },
    {
      title: "Cloud & Platforms",
      items: ["AWS", "Azure", "Kubernetes", "OpenShift"],
      tint: "from-cyan-500/15 to-cyan-500/5",
    },
    {
      title: "Infrastructure",
      items: ["VMware", "Linux", "Windows Server", "Active Directory"],
      tint: "from-cyan-500/15 to-cyan-500/5",
    },
    {
      title: "Network & Security",
      items: ["Cisco", "Palo Alto", "Fortinet", "SIEM / Splunk"],
      tint: "from-cyan-500/15 to-cyan-500/5",
    },
    {
      title: "Automation",
      items: ["Terraform", "Ansible", "GitHub Actions", "Argo CD"],
      tint: "from-cyan-500/15 to-cyan-500/5",
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 dark:border-white/10 dark:from-navy-900/40 dark:to-navy-950">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-50 dark:opacity-30" />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Mentorship blueprint
        </p>
        <h3 className="mt-1 text-2xl font-semibold text-navy-950 dark:text-white">
          End-to-end enterprise IT coverage
        </h3>

        <div className="mt-6 grid gap-3 lg:grid-cols-5">
          {layers.map((l) => (
            <div
              key={l.title}
              className={`rounded-xl border border-slate-200 bg-gradient-to-br ${l.tint} p-4 dark:border-white/10`}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                {l.title}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                {l.items.map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
