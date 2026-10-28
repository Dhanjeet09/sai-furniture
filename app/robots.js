import { getBaseUrl } from "./lib/base-url";

export default function robots() {
  const base = getBaseUrl();
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    ...(base ? { sitemap: `${base}/sitemap.xml`, host: base } : {})
  };
}
