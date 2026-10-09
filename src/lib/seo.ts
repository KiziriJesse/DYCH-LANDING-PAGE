import type { Metadata } from "next";
import { BRAND, CONTACT } from "@/lib/site";

export const SITE_URL = "https://dychtechnologies.com";
export const SITE_NAME = BRAND.name;
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
  /** Segment title. The layout template appends the brand. Omit on the home page. */
  title?: string;
  description: string;
  path: `/${string}` | "/";
}): Metadata {
  const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  const socialTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_UG",
      url,
      siteName: SITE_NAME,
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
      name: "Dych Technologies",
      alternateName: SITE_NAME,
      url: SITE_URL,
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
      name: "Dych Technologies",
      alternateName: SITE_NAME,
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};
