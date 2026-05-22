import {
  Cloud,
  GitBranch,
  ShieldCheck,
  Rocket,
  Boxes,
  Mic,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type ProgramModule = {
  title: string;
  lessons: number;
  summary: string;
  topics: readonly string[];
};

export type ProgramFaq = {
  q: string;
  a: string;
};

export type ProgramTestimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
};

export type Program = {
  slug: string;
  icon: LucideIcon;
  title: string;
  tag: string;
  /** One-line description used on the catalog card. */
  desc: string;
  /** Longer hero subtitle on the detail page. */
  tagline: string;
  format: "Cohort" | "Self-paced" | "1:1 Mentorship";
  level: string;
  duration: string;
  featured?: boolean;
  outcomes: readonly string[];
  includes: readonly string[];
  curriculum: readonly ProgramModule[];
  price: {
    amount: string;
    cadence: string;
    note: string;
  };
  faqs: readonly ProgramFaq[];
  testimonial?: ProgramTestimonial;
};

export const PROGRAMS: readonly Program[] = [
  {
    slug: "ai-assisted-cloud-engineer",
    icon: Sparkles,
    title: "AI-Assisted Cloud Engineer",
    tag: "Flagship",
    desc: "Our signature 12-week cohort on using AI tools to do cloud and DevOps work faster — and to land the role.",
    tagline:
      "A 12-week, mentor-led cohort that teaches you to engineer cloud infrastructure with AI as your copilot — writing IaC, debugging incidents, and running your job search with tools like Claude, Copilot, and Cursor, while knowing exactly when to trust them and when to verify.",
    format: "Cohort",
    level: "Intermediate",
    duration: "12 weeks",
    featured: true,
    outcomes: [
      "Ship cloud infrastructure faster using AI pair-programming — without shipping what you don't understand",
      "Use AI to write, review, and refactor Terraform, pipelines, and runbooks",
      "Cut incident time with AI-assisted log analysis and troubleshooting",
      "Build a small AI-powered automation or agent for real ops work",
      "Run an AI-accelerated job search and interview prep that still sounds like you",
    ],
    includes: [
      "Weekly live sessions with a senior engineer who ships with AI daily",
      "Hands-on labs using Claude, Copilot, and Cursor on real cloud accounts",
      "A capstone AI-powered automation project reviewed line-by-line",
      "Prompt libraries and review checklists you keep and reuse",
      "AI-assisted resume, LinkedIn, and mock-interview support",
      "Lifetime access to recordings, prompts, and lab guides",
    ],
    curriculum: [
      {
        title: "The AI-Assisted Engineer Mindset",
        lessons: 10,
        summary: "Learn to work with AI as a force multiplier — and where it will quietly mislead you.",
        topics: [
          "How modern coding assistants actually work (and fail)",
          "Prompting for engineering: context, constraints, iteration",
          "When to trust AI output vs. verify it line-by-line",
          "Setting up Claude, Copilot, and Cursor in your workflow",
        ],
      },
      {
        title: "AI-Accelerated Infrastructure",
        lessons: 14,
        summary: "Write and review real infrastructure as code with AI in the loop.",
        topics: [
          "Generating and refactoring Terraform with AI, safely",
          "AI-assisted code review and catching insecure defaults",
          "Pair-programming cloud architecture decisions",
          "Project: ship a reviewed, AI-assisted IaC stack",
        ],
      },
      {
        title: "AI for Operations & Troubleshooting",
        lessons: 12,
        summary: "Cut time-to-resolution with AI on logs, metrics, and incidents.",
        topics: [
          "AI-assisted log and metric analysis",
          "Incident triage and root-cause prompting",
          "Generating runbooks, postmortems, and docs",
          "Guardrails: avoiding confident-but-wrong fixes",
        ],
      },
      {
        title: "Building AI-Powered Tools",
        lessons: 14,
        summary: "Go from consumer of AI to builder of AI-powered automation.",
        topics: [
          "Calling LLM APIs from your own scripts and services",
          "Retrieval over your runbooks and docs (RAG basics)",
          "Building a focused ops agent or automation",
          "Capstone: an AI-powered tool that solves a real task",
        ],
      },
      {
        title: "Responsible & Secure AI Use",
        lessons: 8,
        summary: "Use AI in a way that won't get you (or your employer) burned.",
        topics: [
          "Data handling, secrets, and what never goes in a prompt",
          "Hallucination, bias, and verification habits",
          "Cost, rate limits, and choosing the right model",
          "Team policies and the emerging AI engineering role",
        ],
      },
      {
        title: "AI-Accelerated Job Search",
        lessons: 12,
        summary: "Use AI to land the role — without sounding like everyone else who used AI.",
        topics: [
          "AI-assisted resume and LinkedIn that still sound like you",
          "Mock interviews and feedback loops with AI",
          "Talking credibly about AI in interviews",
          "Targeting and outreach, accelerated with AI",
        ],
      },
    ],
    price: {
      amount: "$2,600",
      cadence: "or 3 monthly payments",
      note: "Includes all live sessions, AI-powered labs, the capstone review, and job-search support.",
    },
    faqs: [
      {
        q: "Do I need to be technical already?",
        a: "You should be comfortable on the command line and with the basics of cloud or systems work — for example coming from IT support, sysadmin, or junior engineering. This program teaches you to accelerate that work with AI, not to start from absolute zero.",
      },
      {
        q: "Won't AI tools make engineers obsolete?",
        a: "The opposite is happening: engineers who use AI well are pulling ahead of those who don't. This cohort is built to make you that engineer — faster output, but with the judgment to know when the AI is wrong.",
      },
      {
        q: "Which AI tools will I learn?",
        a: "Primarily Claude, GitHub Copilot, and Cursor, plus calling LLM APIs directly for the capstone. The skills transfer across tools as the landscape changes.",
      },
      {
        q: "How much time should I budget each week?",
        a: "Plan for 8–12 hours per week: one live session plus labs and your capstone. Everything is recorded, so you can keep pace alongside a full-time job.",
      },
    ],
    testimonial: {
      quote:
        "I was already a decent cloud engineer, but I was slow and nervous about AI tools. This cohort flipped that — I now ship Terraform and debug incidents with Claude and Cursor in a fraction of the time, and I actually understand what they output. My AI ops capstone became the thing every interviewer wanted to talk about. Two offers in six weeks.",
      name: "Daniel O.",
      role: "Cloud Engineer → Senior Platform Engineer",
      company: "Stripe",
      initials: "DO",
    },
  },
  {
    slug: "cloud-engineer-career-sprint",
    icon: Cloud,
    title: "Cloud Engineer Career Sprint",
    tag: "Cohort",
    desc: "Our 12-week cohort that takes you from sysadmin or support into a paid cloud engineering role.",
    tagline:
      "A 12-week, mentor-led sprint that takes you from where you are now to interview-ready cloud engineer — building real AWS and Azure systems, not watching tutorials.",
    format: "Cohort",
    level: "Intermediate",
    duration: "12 weeks",
    outcomes: [
      "Design and deploy production-grade cloud architecture on AWS and Azure",
      "Ship a portfolio of three real infrastructure projects employers recognize",
      "Pass architect- and engineer-level technical interviews with confidence",
      "Walk in with a recruiter-tested resume, LinkedIn, and outreach plan",
    ],
    includes: [
      "Weekly live sessions with a senior cloud engineer",
      "Private cohort channel with daily mentor support",
      "Hands-on labs in real cloud accounts (we cover the sandbox)",
      "Three portfolio projects reviewed line-by-line",
      "Mock interviews with written feedback",
      "Resume, LinkedIn, and job-search strategy bundled in",
      "Lifetime access to recordings and lab guides",
    ],
    curriculum: [
      {
        title: "Foundations & Cloud Mental Model",
        lessons: 12,
        summary: "Get fluent in how cloud platforms actually work before touching a console.",
        topics: [
          "How AWS and Azure are organized: accounts, regions, services",
          "Identity and access: IAM, roles, policies, least privilege",
          "Networking fundamentals: VPCs, subnets, routing, security groups",
          "Cost mental model — what you pay for and how to control it",
        ],
      },
      {
        title: "Building Real Infrastructure",
        lessons: 16,
        summary: "Stand up production-shaped systems with infrastructure as code.",
        topics: [
          "Compute: EC2, Azure VMs, autoscaling, load balancing",
          "Infrastructure as Code with Terraform from zero",
          "Managed databases, object storage, and backups",
          "Project 1: deploy a highly-available web application",
        ],
      },
      {
        title: "Automation, CI/CD & Observability",
        lessons: 14,
        summary: "Wire up the pipelines and monitoring that real teams run on.",
        topics: [
          "CI/CD with GitHub Actions and deployment strategies",
          "Containerization basics and managed Kubernetes",
          "Logging, metrics, alerting, and dashboards",
          "Project 2: automated pipeline from commit to production",
        ],
      },
      {
        title: "Security, Reliability & Scale",
        lessons: 14,
        summary: "Make systems secure, resilient, and ready for real traffic.",
        topics: [
          "Cloud security posture, secrets, and encryption",
          "Multi-account / multi-subscription strategy",
          "Reliability: SLOs, error budgets, incident response",
          "Project 3: harden and scale a multi-tier system",
        ],
      },
      {
        title: "Certification & Interview Mastery",
        lessons: 18,
        summary: "Convert your skills into passed exams and passed interviews.",
        topics: [
          "Exam strategy for AWS SA Associate and Azure AZ-305",
          "System design interviews for cloud roles",
          "Live troubleshooting and behavioral rounds",
          "Mock interviews with senior-engineer feedback",
        ],
      },
      {
        title: "Land the Role",
        lessons: 10,
        summary: "Turn an interview-ready engineer into signed offers.",
        topics: [
          "Recruiter-tested resume and LinkedIn rewrite",
          "Target-company list and application sequencing",
          "Outreach scripts for recruiters and hiring managers",
          "Offer negotiation and your first-90-days plan",
        ],
      },
    ],
    price: {
      amount: "$2,400",
      cadence: "or 3 monthly payments",
      note: "Includes all live sessions, labs, project reviews, and job-search support.",
    },
    faqs: [
      {
        q: "Do I need cloud experience to start?",
        a: "No prior cloud experience is required, but you should be comfortable with the basics of computers and a command line — for example coming from IT support, help desk, or sysadmin work. We start from a clear mental model and build up fast.",
      },
      {
        q: "How much time should I budget each week?",
        a: "Plan for 8–12 hours per week: one live session plus labs and your portfolio project. Everything is recorded, so you can keep pace even with a full-time job.",
      },
      {
        q: "What if I can't attend a live session?",
        a: "Every session is recorded and posted within 24 hours, and you keep lifetime access. Mentors also answer questions async in the cohort channel.",
      },
      {
        q: "Is there a guarantee?",
        a: "If you complete the coursework and projects and aren't interview-ready by the end, we'll keep mentoring you at no extra cost until you are.",
      },
    ],
  },
  {
    slug: "devops-accelerator",
    icon: GitBranch,
    title: "DevOps Accelerator",
    tag: "Cohort",
    desc: "Eight weeks of CI/CD, Infrastructure as Code, GitOps, and SRE practice on real pipelines.",
    tagline:
      "Eight weeks of hands-on DevOps: build the pipelines, automation, and reliability practices that modern engineering teams actually run.",
    format: "Cohort",
    level: "Intermediate",
    duration: "8 weeks",
    outcomes: [
      "Build CI/CD pipelines from commit to production",
      "Manage infrastructure with Terraform and GitOps workflows",
      "Operate containerized workloads on Kubernetes",
      "Apply SRE practices: SLOs, error budgets, and on-call playbooks",
    ],
    includes: [
      "Weekly live sessions with a senior platform engineer",
      "Real pipelines and clusters to build in",
      "Two production-style automation projects",
      "Mock interviews focused on DevOps and SRE roles",
      "Lifetime access to recordings and lab guides",
    ],
    curriculum: [
      {
        title: "Pipelines & Automation",
        lessons: 12,
        summary: "Design CI/CD that ships safely and fast.",
        topics: [
          "GitHub Actions, GitLab CI, and Jenkins fundamentals",
          "Build, test, and deployment stages",
          "Deployment strategies: blue/green, canary, rolling",
          "Project: full pipeline from commit to production",
        ],
      },
      {
        title: "Infrastructure as Code & GitOps",
        lessons: 12,
        summary: "Manage everything declaratively and review it like code.",
        topics: [
          "Terraform modules, state, and workspaces",
          "GitOps with Argo CD and Flux",
          "Secrets management and policy as code",
          "Drift detection and safe rollbacks",
        ],
      },
      {
        title: "Containers & Kubernetes",
        lessons: 10,
        summary: "Run and operate containerized workloads at scale.",
        topics: [
          "Docker fundamentals and image hygiene",
          "Kubernetes deployments, services, and ingress",
          "Helm and Kustomize for delivery",
          "Day-2 operations and troubleshooting",
        ],
      },
      {
        title: "Reliability & Interviews",
        lessons: 10,
        summary: "Operate like an SRE and interview like one.",
        topics: [
          "SLOs, error budgets, and observability",
          "Incident response and postmortems",
          "DevOps system-design interviews",
          "Mock interviews with written feedback",
        ],
      },
    ],
    price: {
      amount: "$1,600",
      cadence: "or 2 monthly payments",
      note: "Includes all live sessions, labs, project reviews, and interview prep.",
    },
    faqs: [
      {
        q: "Do I need to know Kubernetes already?",
        a: "No. We cover containers and Kubernetes from the ground up. You should be comfortable on the command line and with basic Git.",
      },
      {
        q: "How much time per week?",
        a: "Around 6–10 hours: one live session plus labs and your project work. Sessions are recorded.",
      },
    ],
  },
  {
    slug: "cybersecurity-analyst-launchpad",
    icon: ShieldCheck,
    title: "Cybersecurity Analyst Launchpad",
    tag: "Cohort",
    desc: "A 10-week path into SOC and security analyst roles, with hands-on labs and a certification roadmap.",
    tagline:
      "Ten weeks built to land your first security analyst role — real detection labs, a clear certification roadmap, and interview prep that hiring teams respect.",
    format: "Cohort",
    level: "Beginner-friendly",
    duration: "10 weeks",
    outcomes: [
      "Investigate alerts and triage incidents like a SOC analyst",
      "Build a home lab that demonstrates real detection skills",
      "Follow a clear roadmap to Security+, CySA+, and beyond",
      "Pass analyst interviews with hands-on, recruiter-tested prep",
    ],
    includes: [
      "Weekly live sessions with a working security practitioner",
      "Guided home-lab build you keep and show employers",
      "Certification roadmap and exam strategy",
      "Mock interviews for SOC and analyst roles",
      "Lifetime access to recordings and lab guides",
    ],
    curriculum: [
      {
        title: "Security Foundations",
        lessons: 12,
        summary: "Speak the language and understand the threat landscape.",
        topics: [
          "Core concepts: CIA triad, threats, vulnerabilities, risk",
          "Networking and operating systems for defenders",
          "Common attacks and how they show up in logs",
          "Mapping skills to Security+ objectives",
        ],
      },
      {
        title: "Detection & the SOC",
        lessons: 14,
        summary: "Work alerts the way a real SOC analyst does.",
        topics: [
          "SIEM fundamentals and log analysis",
          "Alert triage and investigation workflows",
          "MITRE ATT&CK and detection engineering basics",
          "Build a home lab: collect, detect, investigate",
        ],
      },
      {
        title: "Incident Response & GRC",
        lessons: 10,
        summary: "Respond to incidents and understand the governance side.",
        topics: [
          "Incident response lifecycle and playbooks",
          "Threat intelligence basics",
          "Intro to GRC, frameworks, and compliance",
          "Documenting and communicating findings",
        ],
      },
      {
        title: "Certification & Interviews",
        lessons: 8,
        summary: "Convert skills into certs and offers.",
        topics: [
          "Exam strategy for Security+ and CySA+",
          "Analyst interview prep and scenario questions",
          "Resume and LinkedIn for security roles",
          "Mock interviews with written feedback",
        ],
      },
    ],
    price: {
      amount: "$1,800",
      cadence: "or 3 monthly payments",
      note: "Includes all live sessions, the guided home lab, and interview prep.",
    },
    faqs: [
      {
        q: "Is this good for a complete beginner?",
        a: "Yes — it's beginner-friendly. We start with foundations and build toward real SOC work. Basic computer literacy is all you need to begin.",
      },
      {
        q: "Will this prepare me for Security+?",
        a: "Yes. The curriculum maps to Security+ and CySA+ objectives, and includes an exam strategy module. The certs themselves are taken separately.",
      },
    ],
  },
  {
    slug: "zero-to-hired-bootcamp",
    icon: Rocket,
    title: "Zero to Hired Bootcamp",
    tag: "Cohort",
    desc: "A 16-week, end-to-end transformation from career-changer to hired engineer, with full job-search support.",
    tagline:
      "Our most complete program: 16 weeks that take a motivated career-changer all the way to a signed offer — skills, portfolio, brand, and job search included.",
    format: "Cohort",
    level: "Beginner to job-ready",
    duration: "16 weeks",
    outcomes: [
      "Build job-ready skills across cloud, Linux, and automation",
      "Ship a portfolio that proves you can do the work",
      "Run a strategic job search instead of spraying applications",
      "Walk into interviews and offers with senior-mentor backing",
    ],
    includes: [
      "Twice-weekly live sessions and full mentor support",
      "Structured labs across cloud, Linux, and DevOps",
      "Four portfolio projects reviewed in detail",
      "Resume, LinkedIn, outreach, and negotiation coaching",
      "Unlimited mock interviews until you're passing",
      "Lifetime access to all materials",
    ],
    curriculum: [
      {
        title: "Engineering Foundations",
        lessons: 18,
        summary: "Build the bedrock skills every infrastructure role assumes.",
        topics: [
          "Linux administration and the command line",
          "Networking fundamentals end to end",
          "Scripting with Bash and a little Python",
          "Version control and collaboration with Git",
        ],
      },
      {
        title: "Cloud & Automation",
        lessons: 20,
        summary: "Get hands-on with the platforms employers hire for.",
        topics: [
          "Core AWS and Azure services",
          "Infrastructure as Code with Terraform",
          "CI/CD and basic containerization",
          "Two portfolio projects on real cloud accounts",
        ],
      },
      {
        title: "Portfolio & Specialization",
        lessons: 16,
        summary: "Go deep enough to stand out and pick a lane.",
        topics: [
          "Choose a track: cloud, DevOps, or security",
          "Two capstone projects with detailed reviews",
          "Documenting and presenting your work",
          "Building your engineering narrative",
        ],
      },
      {
        title: "The Job Search Engine",
        lessons: 14,
        summary: "Run a job search that actually produces offers.",
        topics: [
          "Resume and LinkedIn rewrite, recruiter-tested",
          "Target-company list and application sequencing",
          "Outreach and referral scripts that get replies",
          "Pipeline tracking and weekly accountability",
        ],
      },
      {
        title: "Interview & Offer",
        lessons: 14,
        summary: "Convert interviews into the offer you want.",
        topics: [
          "System design, troubleshooting, and behavioral rounds",
          "Unlimited mock interviews with feedback",
          "Salary research and negotiation",
          "Your first-90-days plan in the new role",
        ],
      },
    ],
    price: {
      amount: "$3,200",
      cadence: "or 4 monthly payments",
      note: "Our most hands-on program. Includes everything: skills, portfolio, and full job search.",
    },
    faqs: [
      {
        q: "I'm changing careers from outside tech. Is this for me?",
        a: "Yes — this is exactly who it's built for. It starts from foundations and carries you all the way to a hired engineer, with mentorship the whole way.",
      },
      {
        q: "How much time will I need each week?",
        a: "Plan for 12–18 hours per week. It's intensive by design, but everything is recorded and mentors support you async.",
      },
      {
        q: "Do you guarantee a job?",
        a: "No one can honestly guarantee a job. What we guarantee is that we'll keep mentoring you through your job search at no extra cost until you're consistently landing interviews and offers.",
      },
    ],
  },
  {
    slug: "vmware-infrastructure-intensive",
    icon: Boxes,
    title: "VMware Infrastructure Intensive",
    tag: "Self-paced",
    desc: "Master vSphere, vSAN, and NSX-T through guided labs, from datacenter ops to migration projects.",
    tagline:
      "A self-paced, lab-driven deep dive into VMware infrastructure — from vSphere operations to enterprise migration, with mentor checkpoints along the way.",
    format: "Self-paced",
    level: "Intermediate",
    duration: "Self-paced · ~8 weeks",
    outcomes: [
      "Operate vSphere, vCenter, and ESXi with confidence",
      "Design vSAN and NSX-T software-defined infrastructure",
      "Plan and execute a datacenter migration project",
      "Position your skills for virtualization engineer roles",
    ],
    includes: [
      "Guided lab environment and step-by-step walkthroughs",
      "Monthly live mentor checkpoints and Q&A",
      "A capstone migration project reviewed by a mentor",
      "Lifetime access to all labs and recordings",
    ],
    curriculum: [
      {
        title: "vSphere Operations",
        lessons: 14,
        summary: "Run the core VMware stack day to day.",
        topics: [
          "ESXi, vCenter, and cluster setup",
          "VM lifecycle, templates, and snapshots",
          "Resource management and DRS",
          "Backup, restore, and patching",
        ],
      },
      {
        title: "vSAN & Storage",
        lessons: 10,
        summary: "Design and operate software-defined storage.",
        topics: [
          "vSAN architecture and policies",
          "Capacity planning and performance",
          "Fault domains and resilience",
          "Troubleshooting common issues",
        ],
      },
      {
        title: "NSX-T & Networking",
        lessons: 10,
        summary: "Build software-defined networking and security.",
        topics: [
          "NSX-T architecture and components",
          "Segmentation and micro-segmentation",
          "Routing and edge services",
          "Security policy design",
        ],
      },
      {
        title: "Migration Capstone",
        lessons: 8,
        summary: "Plan and execute an enterprise migration.",
        topics: [
          "Discovery and capacity planning",
          "Migration strategy and tooling",
          "Cutover and validation",
          "Capstone project with mentor review",
        ],
      },
    ],
    price: {
      amount: "$1,200",
      cadence: "one-time",
      note: "Self-paced with lifetime access and monthly mentor checkpoints.",
    },
    faqs: [
      {
        q: "Do I need my own lab hardware?",
        a: "No — we provide a guided lab environment. If you want to build a home lab too, we'll point you to the most cost-effective setup.",
      },
      {
        q: "Since it's self-paced, do I get any live support?",
        a: "Yes. There are monthly live mentor checkpoints and Q&A, plus a mentor review of your capstone migration project.",
      },
    ],
  },
  {
    slug: "interview-mastery-sprint",
    icon: Mic,
    title: "Interview Mastery Sprint",
    tag: "1:1 Mentorship",
    desc: "A focused four-week 1:1 sprint to get you consistently passing technical interviews.",
    tagline:
      "A focused, four-week 1:1 sprint for engineers who have the skills but keep stalling in interviews. We diagnose what's breaking and fix it round by round.",
    format: "1:1 Mentorship",
    level: "All levels",
    duration: "4 weeks",
    outcomes: [
      "Diagnose exactly where your interviews are breaking down",
      "Sharpen system design, troubleshooting, and behavioral answers",
      "Build a repeatable framework for any technical interview",
      "Walk in calm, prepared, and consistently passing",
    ],
    includes: [
      "Weekly 1:1 sessions with a senior engineer",
      "Recorded mock interviews with written feedback",
      "A personalized improvement plan after each round",
      "On-call support before your real interviews",
    ],
    curriculum: [
      {
        title: "Diagnosis & Baseline",
        lessons: 4,
        summary: "Find the real reason interviews aren't converting.",
        topics: [
          "Baseline mock interview across formats",
          "Honest assessment of strengths and gaps",
          "Your personalized improvement plan",
          "Framework for structuring any answer",
        ],
      },
      {
        title: "System Design & Technical Rounds",
        lessons: 6,
        summary: "Make the hardest rounds your strongest.",
        topics: [
          "System design for infrastructure and cloud roles",
          "Live troubleshooting under pressure",
          "Talking through trade-offs out loud",
          "Targeted mock interviews and feedback",
        ],
      },
      {
        title: "Behavioral & Storytelling",
        lessons: 4,
        summary: "Turn your experience into compelling answers.",
        topics: [
          "STAR-style stories that land",
          "Handling tough and ambiguous questions",
          "Communicating seniority and judgment",
          "Mock behavioral rounds with feedback",
        ],
      },
      {
        title: "Game Day",
        lessons: 4,
        summary: "Be ready when it counts.",
        topics: [
          "Final full-loop mock interview",
          "Pre-interview prep checklist",
          "Managing nerves and pacing",
          "On-call support before the real thing",
        ],
      },
    ],
    price: {
      amount: "$900",
      cadence: "or 2 payments",
      note: "Four weeks of 1:1 mentorship and mock interviews tailored to your target role.",
    },
    faqs: [
      {
        q: "Is this only for senior engineers?",
        a: "No — it works for all levels. The sprint is tailored to your target role, whether that's your first engineering job or a senior position.",
      },
      {
        q: "What if I have an interview coming up fast?",
        a: "Tell us your timeline when you book. We can compress the sprint and prioritize the rounds you're facing first.",
      },
    ],
  },
];

export function getProgramBySlug(slug: string): Program | undefined {
  return PROGRAMS.find((p) => p.slug === slug);
}

export function totalLessons(program: Program): number {
  return program.curriculum.reduce((sum, m) => sum + m.lessons, 0);
}
