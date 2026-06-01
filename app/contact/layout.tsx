import type { Metadata } from "next";

// /contact is a client component (it has interactive form state), so its
// metadata lives here in the route-segment layout.
export const metadata: Metadata = {
  title: "Contact: Book a Free IT Career Consultation",
  description:
    "Book a free 30-minute consultation with a senior Boasystemz mentor. We'll diagnose what's blocking your IT interviews and map the fastest path to offers.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Book a free IT career consultation | Boasystemz",
    description:
      "30 minutes, no sales pitch. Find out exactly what's blocking your interviews and offers.",
    url: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
