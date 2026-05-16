import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" description="How Boasystemz collects, uses, and protects your information." />
      <section className="section">
        <div className="container-px mx-auto max-w-3xl space-y-5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <p>Boasystemz (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;) respects your privacy. This Privacy Policy explains what information we collect when you use Boasystemz.com or our services, how we use it, and the choices you have.</p>
          <h2 className="text-xl font-semibold text-navy-950 dark:text-white">Information we collect</h2>
          <p>We collect information you provide directly (such as your name, email address, role, target role, resume, and free-text messages) and information collected automatically (such as device, browser, and basic usage analytics).</p>
          <h2 className="text-xl font-semibold text-navy-950 dark:text-white">How we use information</h2>
          <p>We use your information to deliver and improve our services, to schedule consultations, to send career resources you&apos;ve requested, and to comply with legal obligations. We do not sell your personal information.</p>
          <h2 className="text-xl font-semibold text-navy-950 dark:text-white">Resume uploads</h2>
          <p>Resumes you upload are used only to evaluate your candidacy, mentor you, and produce career artifacts (rewrites, ATS scores, mock interview prep). We do not share resumes with third parties without your explicit consent.</p>
          <h2 className="text-xl font-semibold text-navy-950 dark:text-white">Data retention</h2>
          <p>We retain account information while your account is active and for a reasonable period afterward. You can request deletion at any time at privacy@boasystemz.com.</p>
          <h2 className="text-xl font-semibold text-navy-950 dark:text-white">Contact</h2>
          <p>Questions? Email privacy@boasystemz.com.</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Last updated: May 16, 2026</p>
        </div>
      </section>
    </>
  );
}
