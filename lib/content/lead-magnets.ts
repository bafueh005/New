// Lead magnets: gated resources offered in exchange for an email. Each maps to
// an on-site resource page that the delivery email links to. Add new offers
// here and they're available to <LeadCapture magnet="..." />.

export type LeadMagnet = {
  /** Stable id used by the capture form + /api/lead. */
  id: string;
  title: string;
  /** Short value prop shown on the capture card. */
  pitch: string;
  /** Bullet points of what's inside. */
  includes: readonly string[];
  /** On-site path the delivery email links to. */
  resourcePath: string;
};

export const LEAD_MAGNETS: readonly LeadMagnet[] = [
  {
    id: "it-career-toolkit",
    title: "The IT Career Toolkit",
    pitch:
      "The resume, interview, and job-search playbook our mentors use with paying clients — free.",
    includes: [
      "ATS-proof resume template + 30 outcome-bullet examples",
      "The 40 interview questions IT hiring managers actually ask",
      "A 90-day applying-to-offer roadmap",
      "Salary negotiation scripts for engineers",
    ],
    resourcePath: "/resources/it-career-toolkit",
  },
] as const;

export function getLeadMagnet(id: string): LeadMagnet | undefined {
  return LEAD_MAGNETS.find((m) => m.id === id);
}

export const DEFAULT_MAGNET = LEAD_MAGNETS[0];
