"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Quote, TrendingUp, Building2, Briefcase, Play, X, Video, ArrowRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { STORIES } from "@/lib/testimonials-data";

type VideoStory = {
  name: string;
  role: string;
  company: string;
  blurb: string;
  initials: string;
  color: string;
  videoUrl: string;
  poster?: string;
  duration?: string;
};

const VIDEO_STORIES: VideoStory[] = [
  {
    name: "Adaeze N.",
    role: "Sr. Cloud Engineer",
    company: "Capital One",
    blurb: "Three offers in 11 weeks after years of resume screens.",
    initials: "AN",
    color: "from-cyan-500 to-blue-600",
    videoUrl: "",
    duration: "1:42",
  },
  {
    name: "Marcus T.",
    role: "VMware Administrator",
    company: "Lockheed Martin",
    blurb: "From help desk to VMware admin with real lab work.",
    initials: "MT",
    color: "from-emerald-500 to-cyan-600",
    videoUrl: "",
    duration: "2:08",
  },
  {
    name: "Priya R.",
    role: "DevOps Engineer",
    company: "AWS",
    blurb: "Zero DevOps experience to Terraform, K8s, and Argo CD.",
    initials: "PR",
    color: "from-violet-500 to-indigo-600",
    videoUrl: "",
    duration: "1:55",
  },
];

export function Testimonials() {
  const [openVideo, setOpenVideo] = useState<VideoStory | null>(null);

  useEffect(() => {
    if (!openVideo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenVideo(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openVideo]);

  return (
    <section className="section relative overflow-hidden">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Success stories"
          title={<>Real engineers. <span className="gradient-text">Real offers</span>.</>}
          description="A few of the recent career transformations our mentors helped engineer."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {STORIES.map((s, i) => (
            <motion.article
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]"
            >
              <Quote className="h-6 w-6 text-cyan-500/40" />
              <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                &ldquo;{s.quote}&rdquo;
              </p>

              <div className="mt-6 grid grid-cols-3 gap-2 text-xs">
                <Metric icon={Briefcase} label="Role" value={s.role.split("→")[1]?.trim() ?? s.role} />
                <Metric icon={Building2} label="Company" value={s.company} />
                <Metric
                  icon={TrendingUp}
                  label="Salary"
                  value={s.salaryFrom ? `$${s.salaryFrom}k → $${s.salaryTo}k` : `$${s.salaryTo}k`}
                  highlight
                />
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5 dark:border-white/10">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${s.color} text-sm font-semibold text-white shadow`}
                >
                  {s.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-950 dark:text-white">{s.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{s.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-20">
          <SectionHeading
            eyebrow="Watch their stories"
            title={<>In their <span className="gradient-text">own words</span>.</>}
            description="Short video testimonials from engineers we've helped, sit down with them for 90 seconds."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {VIDEO_STORIES.map((v, i) => (
              <motion.button
                key={v.name + i}
                type="button"
                onClick={() => v.videoUrl && setOpenVideo(v)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-slate-200 text-left dark:border-white/10"
                aria-label={v.videoUrl ? `Play ${v.name}'s testimonial` : `${v.name}'s testimonial, coming soon`}
              >
                <div
                  aria-hidden
                  className={`absolute inset-0 bg-gradient-to-br ${v.color} opacity-90 transition-opacity group-hover:opacity-100`}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                />

                <div className="absolute inset-0 grid place-items-center">
                  {v.videoUrl ? (
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-white/95 text-navy-950 shadow-lg backdrop-blur transition-transform group-hover:scale-110">
                      <Play className="h-7 w-7 translate-x-0.5 fill-current" />
                    </span>
                  ) : (
                    <span className="rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
                      Coming soon
                    </span>
                  )}
                </div>

                {v.duration && v.videoUrl && (
                  <span className="absolute right-3 top-3 rounded-md bg-black/55 px-2 py-0.5 text-xs font-medium text-white backdrop-blur">
                    {v.duration}
                  </span>
                )}

                <div className="relative z-10 p-5 text-white">
                  <p className="text-sm font-semibold drop-shadow">{v.name}</p>
                  <p className="text-xs text-white/85">{v.role} · {v.company}</p>
                  <p className="mt-2 text-xs leading-snug text-white/90 line-clamp-2">{v.blurb}</p>
                </div>
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="relative mt-10 overflow-hidden rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-violet-500/10 p-6 sm:p-8 dark:border-cyan-400/20"
          >
            <div
              aria-hidden
              className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl"
            />
            <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
                  <Video className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-navy-950 dark:text-white sm:text-xl">
                    Landed your offer with us? Record your story.
                  </h3>
                  <p className="mt-1 max-w-xl text-sm text-slate-600 dark:text-slate-300">
                    A 60–90 second video helps the next engineer take the leap. We&apos;ll send you a simple recording guide, edit it for you, and ship it here.
                  </p>
                </div>
              </div>
              <Link
                href="/contact?topic=testimonial"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-navy-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy-900 dark:bg-white dark:text-navy-950 dark:hover:bg-slate-100"
              >
                Share your story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 fade-edges">
          <div className="flex w-max animate-marquee items-center gap-10 text-sm font-medium text-slate-500 dark:text-slate-400">
            {[..."Microsoft / AWS / Google / Cisco / IBM / Capital One / Lockheed / Booz Allen / GEICO / Deloitte / Accenture / JPMorgan / NVIDIA / Oracle".split(" / "), ..."Microsoft / AWS / Google / Cisco / IBM / Capital One / Lockheed / Booz Allen / GEICO / Deloitte / Accenture / JPMorgan / NVIDIA / Oracle".split(" / ")].map((c, i) => (
              <span key={i} className="whitespace-nowrap">{c}</span>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {openVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setOpenVideo(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${openVideo.name}'s video testimonial`}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpenVideo(null)}
                className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
                aria-label="Close video"
              >
                <X className="h-5 w-5" />
              </button>
              <video
                key={openVideo.videoUrl}
                src={openVideo.videoUrl}
                controls
                autoPlay
                playsInline
                className="aspect-video w-full bg-black"
              />
              <div className="bg-navy-950 p-5 text-white">
                <p className="text-sm font-semibold">{openVideo.name}</p>
                <p className="text-xs text-white/70">{openVideo.role} · {openVideo.company}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-white/10 dark:bg-white/[0.03] ${
        highlight ? "border-cyan-400/40 bg-cyan-50/60 dark:border-cyan-400/30 dark:bg-cyan-400/10" : ""
      }`}
    >
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
        <Icon className="h-3 w-3" />
        {label}
      </div>
      <div className={`mt-1 truncate text-xs font-semibold ${highlight ? "text-cyan-700 dark:text-cyan-300" : "text-navy-900 dark:text-white"}`}>
        {value}
      </div>
    </div>
  );
}
