export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: { name: string; initials: string; color: string };
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-become-a-systems-engineer",
    title: "How to Become a Systems Engineer: A 12-Month Roadmap",
    excerpt:
      "From help desk to systems engineer in one year. The skills, certs, and projects that actually move hiring managers.",
    category: "Career Roadmaps",
    readTime: "11 min",
    date: "May 2, 2026",
    author: { name: "Linh P.", initials: "LP", color: "from-emerald-500 to-cyan-600" },
  },
  {
    slug: "vmware-interview-questions",
    title: "VMware Interview Questions: vSphere, vSAN, and NSX-T",
    excerpt:
      "The 30 VMware questions you'll actually be asked — with the answers senior engineers want to hear.",
    category: "Interview Prep",
    readTime: "14 min",
    date: "Apr 18, 2026",
    author: { name: "Tomi K.", initials: "TK", color: "from-violet-500 to-indigo-600" },
  },
  {
    slug: "network-engineering-career-roadmap",
    title: "Network Engineering Career Roadmap (2026 Edition)",
    excerpt:
      "Routing, switching, firewalls, SD-WAN, automation. The path from CCNA to senior network engineer.",
    category: "Career Roadmaps",
    readTime: "9 min",
    date: "Apr 6, 2026",
    author: { name: "Daniel O.", initials: "DO", color: "from-rose-500 to-pink-600" },
  },
  {
    slug: "azure-aws-career-tips",
    title: "Azure & AWS Career Tips for Cloud Engineers",
    excerpt:
      "What hiring managers actually look for on cloud resumes — and the projects that get past ATS screens.",
    category: "Cloud",
    readTime: "8 min",
    date: "Mar 22, 2026",
    author: { name: "Bon O.", initials: "BO", color: "from-cyan-500 to-blue-600" },
  },
  {
    slug: "devops-interview-preparation",
    title: "DevOps Interview Preparation: Systems Design and Live Debugging",
    excerpt:
      "How DevOps interviews actually run, the rubrics, and how to think out loud in the live debug round.",
    category: "Interview Prep",
    readTime: "12 min",
    date: "Mar 11, 2026",
    author: { name: "Linh P.", initials: "LP", color: "from-emerald-500 to-cyan-600" },
  },
  {
    slug: "openshift-kubernetes-guide",
    title: "OpenShift & Kubernetes: A Practical Guide for Platform Engineers",
    excerpt:
      "Operators, Helm, Argo CD, networking, security. A working tour from cluster install to GitOps deploys.",
    category: "Platform",
    readTime: "16 min",
    date: "Feb 28, 2026",
    author: { name: "Tomi K.", initials: "TK", color: "from-violet-500 to-indigo-600" },
  },
  {
    slug: "linux-administration-tutorials",
    title: "Linux Administration Tutorials: The 20 Skills You Need First",
    excerpt:
      "Permissions, systemd, networking, SELinux, log analysis. A focused list for new and mid-level Linux admins.",
    category: "Tutorials",
    readTime: "10 min",
    date: "Feb 14, 2026",
    author: { name: "Bon O.", initials: "BO", color: "from-cyan-500 to-blue-600" },
  },
  {
    slug: "cybersecurity-career-advice",
    title: "Cybersecurity Career Advice (From Someone Who Hires)",
    excerpt:
      "The myths, the cert traps, and the actual skills that move you from SOC to senior security engineer.",
    category: "Cybersecurity",
    readTime: "13 min",
    date: "Jan 30, 2026",
    author: { name: "Daniel O.", initials: "DO", color: "from-rose-500 to-pink-600" },
  },
];
