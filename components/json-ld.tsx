// Renders a JSON-LD <script> for structured data. Server-safe; drop into any
// page. Builders below produce the common schema.org shapes we use.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://boasystemz.com";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // schema.org JSON; safe because it's our own structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Boasystemz",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description:
      "Boasystemz helps IT professionals land interviews and offers through resume optimization, interview coaching, and senior-engineer mentorship.",
    email: "info@boasystemz.com",
    // TODO: replace with your real channel URLs once handles are finalized.
    sameAs: [
      "https://www.youtube.com/@boasystemz",
      "https://www.instagram.com/boasystemz",
      "https://www.facebook.com/boasystemz",
      "https://www.linkedin.com/company/boasystemz",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Boasystemz",
    url: SITE_URL,
  };
}

export function articleSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  author: { name: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author.name },
    publisher: { "@type": "Organization", name: "Boasystemz" },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };
}

export function serviceSchema(service: {
  title: string;
  description: string;
  /** Absolute path on the site, e.g. "/services/foo" or "/programs/bar". */
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@type": "Organization", name: "Boasystemz" },
    url: `${SITE_URL}${service.path}`,
    areaServed: "Worldwide",
  };
}

export function faqSchema(faqs: ReadonlyArray<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
