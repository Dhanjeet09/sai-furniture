/**
 * Resolves the canonical origin for metadata.
 *
 * Order of preference:
 *   1. NEXT_PUBLIC_SITE_URL  — set this to the real customer domain
 *   2. VERCEL_PROJECT_PRODUCTION_URL / VERCEL_URL — stable Vercel hosts
 *
 * Returns null when nothing is configured, so we never publish a canonical
 * URL pointing at a domain that does not resolve.
 */
export function getBaseUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  const candidate =
    explicit || (vercel ? `https://${vercel.replace(/^https?:\/\//, "")}` : "");
  if (!candidate) return null;
  try {
    const url = new URL(candidate);
    return url.origin;
  } catch {
    return null;
  }
}
