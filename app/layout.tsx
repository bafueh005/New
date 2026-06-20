import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LiveChat } from "@/components/live-chat";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Analytics } from "@/components/analytics";
import { JsonLd, organizationSchema, websiteSchema } from "@/components/json-ld";

export const metadata: Metadata = {
  metadataBase: new URL("https://boasystemz.com"),
  title: {
    default: "Boasystemz: Land IT Interviews & Offers Faster",
    template: "%s | Boasystemz",
  },
  description:
    "Boasystemz helps IT professionals stop endlessly applying without responses. Personalized career acceleration, cloud & infrastructure mentorship, resume optimization, and real-world interview prep that lead to interviews and offers.",
  keywords: [
    "IT consulting",
    "cloud engineering mentorship",
    "DevOps coaching",
    "cybersecurity career coaching",
    "resume optimization for engineers",
    "VMware mentorship",
    "infrastructure engineering training",
    "career transformation for IT professionals",
    "Boasystemz",
  ],
  authors: [{ name: "Boasystemz" }],
  creator: "Boasystemz",
  openGraph: {
    title: "Boasystemz: Career Acceleration for IT Professionals",
    description:
      "Personalized mentorship, resume branding, and interview prep designed to convert applications into offers.",
    url: "https://boasystemz.com",
    siteName: "Boasystemz",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Boasystemz — Land IT Interviews & Offers Faster",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boasystemz: Career Acceleration for IT Professionals",
    description:
      "Stop applying to hundreds of jobs without hearing back. Land interviews and offers faster with Boasystemz.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#060c1c" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
      </head>
      <body className="min-h-screen antialiased selection:bg-cyan-400/30 selection:text-navy-950 dark:selection:text-white">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <LiveChat />
          <WhatsAppButton />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
