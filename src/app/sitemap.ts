import type { MetadataRoute } from "next";
import { SITEMAP } from "@/lib/site";

const SITE_URL = "https://dychtechnologies.com";

/** Date of the current production content on main. */
const LAST_MODIFIED = new Date("2026-10-09T00:00:00.000Z");

const PAGE_META: Record<
  string,
  {
    changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
    priority: number;
  }
> = {
  "/": { changeFrequency: "weekly", priority: 1 },
  "/product": { changeFrequency: "weekly", priority: 0.9 },
  "/product/schools": { changeFrequency: "monthly", priority: 0.8 },
  "/how-it-works": { changeFrequency: "monthly", priority: 0.8 },
  "/schools": { changeFrequency: "monthly", priority: 0.7 },
  "/pricing": { changeFrequency: "monthly", priority: 0.7 },
  "/contact": { changeFrequency: "monthly", priority: 0.6 },
  "/security-and-trust": { changeFrequency: "yearly", priority: 0.5 },
  "/about": { changeFrequency: "yearly", priority: 0.4 },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...SITEMAP.map((entry) => entry.href)];

  return paths.map((path) => {
    const meta = PAGE_META[path] ?? {
      changeFrequency: "monthly" as const,
      priority: 0.5,
    };

    return {
      url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: meta.changeFrequency,
      priority: meta.priority,
    };
  });
}
