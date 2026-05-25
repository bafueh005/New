import {
  Briefcase,
  Brain,
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
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  tag: string;
  bullets: readonly string[];
};

export const SERVICES: readonly Service[] = [
  {
    slug: "it-consulting-services",
    icon: Briefcase,
    title: "IT Consulting Services",
    desc: "Architecture reviews, hiring strategy, and infrastructure roadmaps for engineering teams.",
    tag: "Consulting",
    bullets: [
      "Engineering org diagnostics and hiring strategy",
      "Architecture reviews and infrastructure roadmaps",
      "Tooling, observability, and reliability assessments",
      "Senior-engineer interview panels and rubric design",
    ],
  },
  {
    slug: "ai-engineering-mentorship",
    icon: Brain,
    title: "AI Engineering Mentorship",
    desc: "LLMs, RAG, vector DBs, agents, and AI platform engineering — taught with production patterns.",
    tag: "AI",
    bullets: [
      "LLM application design: prompts, evals, guardrails, cost control",
      "RAG pipelines with vector DBs (pgvector, Pinecone, Weaviate)",
      "Agent and tool-use patterns with the Anthropic and OpenAI SDKs",
      "MLOps & AI platform work: GPU infra, inference serving, observability",
    ],
  },
  {
    slug: "cloud-engineering-mentorship",
    icon: Cloud,
    title: "Cloud Engineering Mentorship",
    desc: "1:1 mentorship on AWS & Azure architecture, cost optimization, and production reliability.",
    tag: "Cloud",
    bullets: [
      "1:1 sessions with senior AWS and Azure engineers",
      "Architecture deep-dives on real production systems",
      "Cost optimization, IAM, networking, multi-account strategy",
      "Path to AWS and Azure architect-level certifications",
    ],
  },
  {
    slug: "cybersecurity-career-coaching",
    icon: ShieldCheck,
    title: "Cybersecurity Career Coaching",
    desc: "Career strategy for SOC, GRC, AppSec, and Red Team roles — with certification roadmaps.",
    tag: "Security",
    bullets: [
      "Career path mapping: SOC, GRC, AppSec, Red Team, Cloud Sec",
      "Certification roadmap (Security+, CySA+, OSCP, CISSP)",
      "Hands-on lab guidance and home-lab setup",
      "Interview prep for analyst and engineer roles",
    ],
  },
  {
    slug: "devops-coaching",
    icon: GitBranch,
    title: "DevOps Coaching",
    desc: "CI/CD pipelines, IaC, GitOps, and SRE practices taught with real production scenarios.",
    tag: "DevOps",
    bullets: [
      "CI/CD pipeline design (GitHub Actions, GitLab, Jenkins)",
      "Infrastructure as Code with Terraform and Pulumi",
      "GitOps workflows with Argo CD and Flux",
      "SRE practices: SLOs, error budgets, on-call playbooks",
    ],
  },
  {
    slug: "systems-administration-training",
    icon: Server,
    title: "Systems Administration Training",
    desc: "Master Linux, Windows Server, Active Directory, patching, and hardening in real labs.",
    tag: "SysAdmin",
    bullets: [
      "Linux administration: RHEL, Ubuntu, performance tuning",
      "Windows Server, Active Directory, and Group Policy",
      "Patching, hardening, and backup/restore drills",
      "Real-world labs simulating production incidents",
    ],
  },
  {
    slug: "vmware-engineering-mentorship",
    icon: Boxes,
    title: "VMware Engineering Mentorship",
    desc: "vSphere, vSAN, NSX-T, vRealize — from datacenter ops to enterprise migration projects.",
    tag: "Virtualization",
    bullets: [
      "vSphere, vCenter, and ESXi operations",
      "vSAN, NSX-T, and software-defined networking",
      "vRealize Suite for automation and operations",
      "Datacenter migration and capacity planning projects",
    ],
  },
  {
    slug: "network-engineering-coaching",
    icon: Network,
    title: "Network Engineering Coaching",
    desc: "Routing, switching, firewalls, SD-WAN. Cisco, Palo Alto, Fortinet — interview-ready.",
    tag: "Networking",
    bullets: [
      "Routing & switching with Cisco IOS and NX-OS",
      "Next-gen firewalls: Palo Alto, Fortinet, Check Point",
      "SD-WAN, BGP, OSPF, and MPLS architecture",
      "Lab-driven prep for CCNA, CCNP, and architect roles",
    ],
  },
  {
    slug: "linux-and-windows-server-mentorship",
    icon: Terminal,
    title: "Linux & Windows Server Mentorship",
    desc: "Shell scripting, automation, AD, GPOs, Bash, PowerShell — practical, not theoretical.",
    tag: "Platforms",
    bullets: [
      "Bash and PowerShell scripting for automation",
      "Active Directory, Group Policy, and identity management",
      "Service hardening, log analysis, and audit prep",
      "Server lifecycle: provision → harden → monitor → decommission",
    ],
  },
  {
    slug: "openshift-and-kubernetes-coaching",
    icon: Container,
    title: "OpenShift & Kubernetes Coaching",
    desc: "Cluster ops, Helm, Argo CD, operators, and platform engineering best practices.",
    tag: "Containers",
    bullets: [
      "Cluster install, upgrade, and day-2 operations",
      "Helm, Kustomize, and Argo CD application delivery",
      "Operators, CRDs, and platform engineering patterns",
      "Multi-cluster, multi-tenant, and security best practices",
    ],
  },
  {
    slug: "azure-and-aws-training",
    icon: Globe,
    title: "Azure & AWS Training",
    desc: "Hands-on labs aligned to architect / engineer certifications and real production work.",
    tag: "Cloud",
    bullets: [
      "Architect-level training mapped to AWS SA and Azure AZ-305",
      "Hands-on labs with IaC, networking, and identity",
      "Real production scenarios: migrations, cost cuts, incidents",
      "Cert exam strategy and post-cert role positioning",
    ],
  },
  {
    slug: "resume-optimization",
    icon: FileText,
    title: "Resume Optimization",
    desc: "ATS-aware, recruiter-tested resumes that highlight outcomes and engineering judgment.",
    tag: "Resume",
    bullets: [
      "ATS-aware rewrite with quantified outcomes",
      "Recruiter-tested formatting and keyword strategy",
      "Role-targeted versions: IC, lead, architect, manager",
      "Senior-engineer review with line-by-line feedback",
    ],
  },
  {
    slug: "linkedin-branding",
    icon: Linkedin,
    title: "LinkedIn Branding",
    desc: "Profile rewrites, headline strategy, content guidance — turn LinkedIn into a pipeline.",
    tag: "Brand",
    bullets: [
      "Profile rewrite: headline, about, experience, featured",
      "Skills, endorsements, and recommendation strategy",
      "Content cadence and topic guidance for visibility",
      "Inbound-pipeline tactics for recruiter inbox and posting",
    ],
  },
  {
    slug: "technical-mock-interviews",
    icon: Mic,
    title: "Technical Mock Interviews",
    desc: "Live mock interviews with senior engineers — system design, troubleshooting, behavioral.",
    tag: "Interviews",
    bullets: [
      "Live mock interviews with senior engineers",
      "System design, troubleshooting, and behavioral rounds",
      "Detailed written feedback and improvement plan",
      "Targeted re-runs until you're consistently passing",
    ],
  },
  {
    slug: "job-application-strategy",
    icon: Target,
    title: "Job Application Strategy",
    desc: "Where to apply, how to apply, who to talk to, and the order to do it in.",
    tag: "Strategy",
    bullets: [
      "Target company list and role-fit analysis",
      "Application sequencing and timing strategy",
      "Recruiter, hiring-manager, and referral outreach scripts",
      "Pipeline tracking and weekly accountability",
    ],
  },
  {
    slug: "career-transition-programs",
    icon: Compass,
    title: "Career Transition Programs",
    desc: "End-to-end programs for switching from support to engineering, or cloud to platform.",
    tag: "Transformation",
    bullets: [
      "End-to-end transitions: support → engineer, cloud → platform",
      "Skill gap audit and 90-day learning plan",
      "Resume, brand, and interview prep bundled together",
      "Senior mentor pairing through your first offer",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
