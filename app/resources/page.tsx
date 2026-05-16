import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Cloud,
  Server,
  ShieldCheck,
  GitBranch,
  Network,
  Mic,
  FileText,
  BrainCircuit,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Resources — Career Roadmaps, Interview Libraries, AI Resume Review",
  description:
    "Free Boasystemz resources for IT professionals: career roadmaps, technical interview libraries, certification guides, and AI resume review.",
};

const RESOURCES = [
  { icon: BrainCircuit, title: "AI Resume Review", desc: "Get an instant ATS score, keyword gaps, and rewrite suggestions in 60 seconds.", href: "/resources/ai-resume-review", tag: "Tool", featured: true },
  { icon: Mic, title: "Technical Interview Library", desc: "300+ real interview questions across cloud, infra, network, and security.", href: "/resources#interviews", tag: "Library" },
  { icon: Cloud, title: "Cloud Engineer Roadmap", desc: "From zero to Sr. Cloud Engineer — skills, certs, projects, by quarter.", href: "/resources#cloud", tag: "Roadmap" },
  { icon: Server, title: "Systems / VMware Roadmap", desc: "Sysadmin to infrastructure engineer — labs, certs, and the gaps to fill.", href: "/resources#vmware", tag: "Roadmap" },
  { icon: GitBranch, title: "DevOps Bootcamp Outline", desc: "12-week structured outline covering Terraform, K8s, Argo CD, observability.", href: "/resources#devops", tag: "Curriculum" },
  { icon: ShieldCheck, title: "Cybersecurity Career Map", desc: "SOC → Engineer → Architect. Certifications, projects, and titles by level.", href: "/resources#security", tag: "Roadmap" },
  { icon: Network, title: "Network Engineering Guide", desc: "Routing, switching, firewalls, SD-WAN — interview-ready in 6 months.", href: "/resources#networking", tag: "Roadmap" },
  { icon: FileText, title: "ATS-Friendly Resume Template", desc: "Senior-engineer template, tested against real ATS systems.", href: "/resources#resume", tag: "Template" },
];

export default function ResourcesPage() {
  const [featured, ...rest] = RESOURCES;
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title={<>Free tools and roadmaps for <span className="gradient-text">IT careers</span>.</>}
        description="Use these on your own, or bring them into a session — most of our paid programs are designed around the same frameworks."
      />

      <section className="section">
        <div className="container-px mx-auto max-w-7xl">
          <Link
            href={featured.href}
            className="group relative grid items-center gap-8 overflow-hidden rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 p-8 text-white shadow-2xl shadow-cyan-500/10 sm:p-12 lg:grid-cols-[1.2fr_1fr]"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/30 blur-3xl" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-200">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" /> {featured.tag} · Free
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{featured.title}</h2>
              <p className="mt-3 max-w-xl text-base text-slate-300">{featured.desc}</p>
              <div className="mt-6">
                <span className="inline-flex items-center gap-1 rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-navy-950 group-hover:bg-cyan-300">
                  Try it now <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs uppercase tracking-wider text-cyan-300">Live preview</p>
                <div className="mt-3 space-y-2 text-sm">
                  {[
                    { label: "ATS Score", value: "92 / 100" },
                    { label: "Keywords matched", value: "27 / 31" },
                    { label: "Action-verb density", value: "8.4 / 10" },
                    { label: "Suggested rewrites", value: "11" },
                  ].map((r) => (
                    <div key={r.label} className="flex items-center justify-between border-b border-white/10 pb-2 last:border-b-0">
                      <span className="text-slate-300">{r.label}</span>
                      <span className="font-semibold text-white">{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((r) => (
              <Link
                key={r.title}
                href={r.href}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-cyan-400/40 hover:shadow-xl hover:shadow-cyan-500/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-400/40"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-navy-900 to-cyan-600 text-white">
                    <r.icon className="h-4 w-4" />
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">{r.tag}</span>
                </div>
                <h3 className="mt-5 h-card text-navy-950 dark:text-white">{r.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{r.desc}</p>
                <div className="mt-auto pt-5 inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 dark:text-cyan-300">
                  Open resource <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
