/** @type {import('next').NextConfig} */

// Baseline security headers applied to every route. These guard against
// clickjacking, MIME sniffing, referrer leakage, and force HTTPS. CSP is
// intentionally omitted here — it needs per-app tuning (analytics, Meta Pixel,
// embeds) and a too-strict policy silently breaks third-party scripts.
const securityHeaders = [
  {
    // Force HTTPS for 2 years, including subdomains. Safe once the domain is
    // HTTPS-only (Vercel serves all deployments over HTTPS).
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    // Disallow framing to prevent clickjacking.
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    // Stop browsers from MIME-sniffing responses away from the declared type.
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Send only the origin on cross-origin requests; full URL same-origin.
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    // Drop access to powerful browser features we don't use.
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
