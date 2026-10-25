import type { MetadataRoute } from "next";
import { FOOTER_NAV } from "@/lib/site";

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
  "/how-it-works": { changeFrequency: "monthly", priority: 0.8 },
  /* Schools carries the seven capabilities now that /product/schools has
     been merged into it, so it ranks above the other two industries. */
  "/schools": { changeFrequency: "monthly", priority: 0.8 },
  "/businesses": { changeFrequency: "monthly", priority: 0.7 },
  "/churches": { changeFrequency: "monthly", priority: 0.7 },
  "/pricing": { changeFrequency: "monthly", priority: 0.7 },
  "/contact": { changeFrequency: "monthly", priority: 0.6 },
  "/security-and-trust": { changeFrequency: "yearly", priority: 0.5 },
  "/about": { changeFrequency: "yearly", priority: 0.4 },
};

export default function sitemap(): MetadataRoute.Sitemap {
  /* Built from the footer groups, which are the single list of real routes
     now that the flat SITEMAP is gone. Anchors are stripped and duplicates
     dropped: /product#visitor-management is a section of /product, not a
     page of its own, and submitting it as one would ask Google to index
     the same document three times. */
  const paths = Array.from(
    new Set([
      "/",
      ...FOOTER_NAV.flatMap((group) =>
        group.links.map((link) => link.href.split("#")[0]),
      ),
    ]),
  );

  return paths.map((path) => {
    const meta = PAGE_META[path] ?? {
      changeFrequency: "monthly" as const,
      priority: 0.5,
    };

    return {
      url: path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: meta.changeFrequency,
      priority: meta.priority,
    };
  });
}
