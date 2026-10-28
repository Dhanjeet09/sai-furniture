import { getBaseUrl } from "./lib/base-url";

export default function robots() {
  const base = getBaseUrl();
  if (!base) {
    return { rules: [{ userAgent: "*", allow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    // `host` takes a bare hostname (no scheme); `sitemap` takes the full URL.
    host: new URL(base).host,
    sitemap: `${base}/sitemap.xml`
  };
}
