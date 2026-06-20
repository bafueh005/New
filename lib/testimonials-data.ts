export type Story = {
  name: string;
  role: string;
  company: string;
  salaryFrom: number;
  salaryTo: number;
  quote: string;
  initials: string;
  color: string;
};

export const STORIES: Story[] = [
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
      "The VMware mentorship was real. We rebuilt vSphere labs from scratch, simulated outages, and prepped me on actual incidents. Hiring manager asked what my background was. I told him, and he just laughed.",
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
      "I had no DevOps experience. Their accelerator walked me through Terraform, Argo CD, and Kubernetes. The mock interviews caught every weak spot before it cost me an offer.",
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
  {
    name: "Tomiwa B.",
    role: "QA Engineer → SRE",
    company: "JPMorgan",
    salaryFrom: 81,
    salaryTo: 174,
    quote:
      "I was stuck running manual tests for 4 years. My mentor mapped out an SRE roadmap covering Prometheus, on-call runbooks, and SLOs, then ran chaos engineering scenarios with me until I could lead the conversation.",
    initials: "TB",
    color: "from-indigo-500 to-violet-600",
  },
  {
    name: "Lauren D.",
    role: "Sysadmin → Cloud Security Engineer",
    company: "Deloitte",
    salaryFrom: 79,
    salaryTo: 152,
    quote:
      "Pivoting into security at 38 felt impossible. The team gave me a real lab covering IAM hardening, GuardDuty triage, and incident response, then rehearsed every panel question with me. Two offers in seven weeks.",
    initials: "LD",
    color: "from-fuchsia-500 to-pink-600",
  },
  {
    name: "Kenji O.",
    role: "Junior Dev → AI Platform Engineer",
    company: "NVIDIA",
    salaryFrom: 68,
    salaryTo: 196,
    quote:
      "I didn't think AI infra roles were realistic for me. Boasystemz paired me with someone who actually ships these systems. We built a vLLM deployment together, and I walked into the loop ready.",
    initials: "KO",
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Chioma E.",
    role: "Data Analyst → Data Engineer",
    company: "Accenture",
    salaryFrom: 71,
    salaryTo: 142,
    quote:
      "I knew SQL but not pipelines. They walked me through Airflow, dbt, and Snowflake on a real project, then drilled me on system design. By the third interview, I felt like I'd done the job for years.",
    initials: "CE",
    color: "from-sky-500 to-blue-600",
  },
  {
    name: "Ravi S.",
    role: "L1 Support → Cloud Engineer",
    company: "GEICO",
    salaryFrom: 52,
    salaryTo: 129,
    quote:
      "I'd been told I needed a CS degree to break out of support. Boasystemz proved otherwise. They rebuilt my resume, taught me AWS networking deeply, and got me into a team that values how I think.",
    initials: "RS",
    color: "from-orange-500 to-amber-600",
  },
  {
    name: "Mireille J.",
    role: "Career Changer (Teacher) → Cloud Engineer",
    company: "IBM",
    salaryFrom: 48,
    salaryTo: 135,
    quote:
      "I taught math for a decade. The career-change track was relentless, labs, study cohorts, weekly mock interviews. I never felt alone. When the offer came, it was almost triple my old salary.",
    initials: "MJ",
    color: "from-pink-500 to-rose-600",
  },
];
