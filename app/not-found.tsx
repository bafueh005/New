import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-glow opacity-40" />
      <div className="container-px mx-auto grid max-w-4xl place-items-center py-32 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300">404</p>
        <h1 className="h-display mt-3 text-navy-950 dark:text-white">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-4 max-w-lg text-base text-slate-600 dark:text-slate-300">
          The link may be outdated or the page may have moved. Try the home page or jump to one of our
          most-visited resources.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-primary"><ArrowLeft className="h-4 w-4" /> Back to home</Link>
          <Link href="/services" className="btn-secondary">View services</Link>
          <Link href="/contact" className="btn-ghost">Talk to a mentor <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}
