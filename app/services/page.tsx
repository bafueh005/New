import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Services } from "@/components/services";
import { TechStack } from "@/components/tech-stack";
import { HowItWorks } from "@/components/how-it-works";
import { CtaSection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "Services — Mentorship, Coaching, and Career Acceleration",
  description:
    "Explore Boasystemz services: cloud engineering mentorship, DevOps coaching, cybersecurity career strategy, VMware and infrastructure training, resume optimization, and mock interviews.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={<>Programs built around <span className="gradient-text">real engineering work</span>.</>}
        description="Every service we offer is designed by senior engineers who have built, run, and hired into enterprise IT teams. Pick a single engagement or stack them into a full transformation."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn-primary">
            Talk to a mentor <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/pricing" className="btn-secondary">See pricing</Link>
        </div>
      </PageHeader>
      <Services />
      <TechStack />
      <HowItWorks />
      <CtaSection />
    </>
  );
}
