import type { Metadata } from "next";
import { BRAND, CONTACT } from "@/lib/site";

export const SITE_URL = "https://dychtechnologies.com";
export const SITE_NAME = BRAND.name;
/** Alternates Google may use when choosing a site name in search results. */
export const SITE_ALTERNATE_NAMES = ["DYCH", "Dych Technologies"] as const;

/** Standalone WebSite schema for Google site name display (Search Central). */
export const googleSiteNameJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DYCH Technologies",
  alternateName: [...SITE_ALTERNATE_NAMES],
  url: `${SITE_URL}/`,
} as const;
export const OG_IMAGE_PATH = "/og-image.png";

const OG_IMAGE = {
  url: OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: `${SITE_NAME}. Automating tomorrow.`,
} as const;

/**
 * Page-level metadata. A child `openGraph` or `twitter` object replaces the
 * layout's, so every page sets the full social card here, including the
 * shared image.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  /** Segment title. The layout template prefixes the brand. Omit on the home page. */
  title?: string;
  description: string;
  path: `/${string}` | "/";
}): Metadata {
  const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  const socialTitle = SITE_NAME;

  return {
    ...(title ? { title } : {}),
    description,
    /* Next resolves a root canonical to the bare origin, dropping the
       trailing slash, so the home page renders its own <link rel="canonical">
       (see app/page.tsx). Skipping it here also keeps the layout from handing
       the home canonical down to a route that forgets to set one. */
    ...(path === "/" ? {} : { alternates: { canonical: url } }),
    openGraph: {
      type: "website",
      locale: "en_UG",
      url,
      siteName: "DYCH Technologies",
      title: socialTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}

export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: SITE_ALTERNATE_NAMES,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo/dych-lockup-on-white.png`,
      image: `${SITE_URL}${OG_IMAGE_PATH}`,
      email: CONTACT.email.display,
      telephone: CONTACT.phones[0]?.href.replace("tel:", ""),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kampala",
        addressCountry: "UG",
      },
      sameAs: [CONTACT.linkedin.href],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      alternateName: SITE_ALTERNATE_NAMES,
      url: `${SITE_URL}/`,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};
