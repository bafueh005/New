import { Hero } from "@/components/hero";
import { AudienceStrip } from "@/components/audience-strip";
import { Services } from "@/components/services";
import { TechStack } from "@/components/tech-stack";
import { HowItWorks } from "@/components/how-it-works";
import { Testimonials } from "@/components/testimonials";
import { Stats } from "@/components/stats";
import { AboutSection } from "@/components/about-section";
import { Pricing } from "@/components/pricing";
import { CtaSection } from "@/components/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AudienceStrip />
      <Services />
      <TechStack />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <AboutSection />
      <Pricing />
      <CtaSection />
    </>
  );
}
