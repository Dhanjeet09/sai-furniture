import { getBaseUrl } from "./lib/base-url";

export default function sitemap() {
  const base = getBaseUrl();
  if (!base) return [];

  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    }
  ];
}
