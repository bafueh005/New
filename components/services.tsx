"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Briefcase,
  Cloud,
  ShieldCheck,
  GitBranch,
  Server,
  Boxes,
  Network,
  Terminal,
  Container,
  Globe,
  FileText,
  Linkedin,
  Mic,
  Target,
  Compass,
  ArrowRight,
} from "lucide-react";
import { SectionHeading } from "./section-heading";

export const SERVICES = [
  { icon: Briefcase, title: "IT Consulting Services", desc: "Architecture reviews, hiring strategy, and infrastructure roadmaps for engineering teams.", tag: "Consulting" },
  { icon: Cloud, title: "Cloud Engineering Mentorship", desc: "1:1 mentorship on AWS & Azure architecture, cost optimization, and production reliability.", tag: "Cloud" },
  { icon: ShieldCheck, title: "Cybersecurity Career Coaching", desc: "Career strategy for SOC, GRC, AppSec, and Red Team roles — with certification roadmaps.", tag: "Security" },
  { icon: GitBranch, title: "DevOps Coaching", desc: "CI/CD pipelines, IaC, GitOps, and SRE practices taught with real production scenarios.", tag: "DevOps" },
  { icon: Server, title: "Systems Administration Training", desc: "Master Linux, Windows Server, Active Directory, patching, and hardening in real labs.", tag: "SysAdmin" },
  { icon: Boxes, title: "VMware Engineering Mentorship", desc: "vSphere, vSAN, NSX-T, vRealize — from datacenter ops to enterprise migration projects.", tag: "Virtualization" },
  { icon: Network, title: "Network Engineering Coaching", desc: "Routing, switching, firewalls, SD-WAN. Cisco, Palo Alto, Fortinet — interview-ready.", tag: "Networking" },
  { icon: Terminal, title: "Linux & Windows Server Mentorship", desc: "Shell scripting, automation, AD, GPOs, Bash, PowerShell — practical, not theoretical.", tag: "Platforms" },
  { icon: Container, title: "OpenShift & Kubernetes Coaching", desc: "Cluster ops, Helm, Argo CD, operators, and platform engineering best practices.", tag: "Containers" },
  { icon: Globe, title: "Azure & AWS Training", desc: "Hands-on labs aligned to architect / engineer certifications and real production work.", tag: "Cloud" },
  { icon: FileText, title: "Resume Optimization", desc: "ATS-aware, recruiter-tested resumes that highlight outcomes and engineering judgment.", tag: "Resume" },
  { icon: Linkedin, title: "LinkedIn Branding", desc: "Profile rewrites, headline strategy, content guidance — turn LinkedIn into a pipeline.", tag: "Brand" },
  { icon: Mic, title: "Technical Mock Interviews", desc: "Live mock interviews with senior engineers — system design, troubleshooting, behavioral.", tag: "Interviews" },
  { icon: Target, title: "Job Application Strategy", desc: "Where to apply, how to apply, who to talk to, and the order to do it in.", tag: "Strategy" },
  { icon: Compass, title: "Career Transition Programs", desc: "End-to-end programs for switching from support to engineering, or cloud to platform.", tag: "Transformation" },
] as const;

export function Services() {
  return (
    <section id="services" className="section">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="What we do"
          title={<>One platform. Every part of the <span className="gradient-text">career stack</span>.</>}
          description="Strategy, mentorship, technical skill-building, and execution — designed by senior engineers who've hired into the teams you want to join."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: (i % 6) * 0.04 }}
            >
              <ServiceCard {...s} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-white/[0.03]">
          <div>
            <p className="text-sm font-semibold text-navy-900 dark:text-white">
              Not sure where to start?
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Tell us about your career goals. We&apos;ll recommend the right path in a 30-minute consultation.
            </p>
          </div>
          <Link href="/contact" className="btn-primary">
            Get my plan <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  desc,
  tag,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  tag: string;
}) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-cyan-400/40 hover:shadow-xl hover:shadow-cyan-500/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-400/40">
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/0 blur-2xl transition-all group-hover:bg-cyan-400/20" />
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-navy-900 to-cyan-600 text-white shadow-md shadow-cyan-500/20">
          <Icon className="h-5 w-5" />
        </span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {tag}
        </span>
      </div>
      <h3 className="mt-5 h-card text-navy-950 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{desc}</p>
      <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-cyan-600 dark:text-cyan-300 opacity-0 transition-opacity group-hover:opacity-100">
        Learn more <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </div>
  );
}
