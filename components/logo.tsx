import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 font-semibold tracking-tight",
        className,
      )}
      aria-label="Boasystemz home"
    >
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-navy-900 to-cyan-500 shadow-md shadow-cyan-500/30 ring-1 ring-white/10">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 7l8-4 8 4-8 4-8-4z" />
          <path d="M4 12l8 4 8-4" />
          <path d="M4 17l8 4 8-4" />
        </svg>
        <span className="absolute inset-0 rounded-lg bg-cyan-400/0 blur-xl transition-all group-hover:bg-cyan-400/30" />
      </span>
      {showWordmark && (
        <span className="text-lg text-navy-950 dark:text-white">
          Boa<span className="text-cyan-500 dark:text-cyan-400">systemz</span>
        </span>
      )}
    </Link>
  );
}
