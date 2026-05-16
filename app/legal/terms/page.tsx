import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Service" description="Rules for using Boasystemz.com and our services." />
      <section className="section">
        <div className="container-px mx-auto max-w-3xl space-y-5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <p>By using Boasystemz.com or any Boasystemz service you agree to these Terms of Service. If you do not agree, please do not use the service.</p>
          <h2 className="text-xl font-semibold text-navy-950 dark:text-white">Accounts</h2>
          <p>You are responsible for safeguarding your account credentials and for activity that happens under your account.</p>
          <h2 className="text-xl font-semibold text-navy-950 dark:text-white">Services</h2>
          <p>Mentorship, coaching, and consulting services are provided on a best-efforts basis. We do not guarantee specific outcomes unless explicitly stated in a program agreement (e.g., the Premium Career Transformation offer guarantee).</p>
          <h2 className="text-xl font-semibold text-navy-950 dark:text-white">Payments and refunds</h2>
          <p>Monthly programs may be canceled before your next billing date. One-time engagements are eligible for a 7-day refund if work has not started.</p>
          <h2 className="text-xl font-semibold text-navy-950 dark:text-white">Acceptable use</h2>
          <p>You agree not to misuse the service, attempt to disrupt operations, or use Boasystemz materials to operate a competing service without written permission.</p>
          <h2 className="text-xl font-semibold text-navy-950 dark:text-white">Limitation of liability</h2>
          <p>To the maximum extent permitted by law, Boasystemz is not liable for indirect, incidental, or consequential damages arising from use of the service.</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Last updated: May 16, 2026</p>
        </div>
      </section>
    </>
  );
}
