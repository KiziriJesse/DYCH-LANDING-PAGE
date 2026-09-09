/**
 * Single source of truth for the sitemap and contact details, so the Navbar,
 * the Footer and any future CTA cannot drift apart.
 */

export const NAV_LINKS = [
  { label: "Smart School Systems", href: "/product" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Security", href: "/security-and-trust" },
  { label: "Schools", href: "/schools" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
] as const;

/** Full labels, used where horizontal space is not constrained. */
export const SITEMAP = [
  { label: "Smart School Systems", href: "/product" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Security & trust", href: "/security-and-trust" },
  { label: "Schools", href: "/schools" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const CONTACT = {
  phones: [
    { display: "+256 767 870 035", href: "tel:+256767870035" },
    { display: "+256 788 195 067", href: "tel:+256788195067" },
  ],
  whatsapp: [
    { display: "+256 767 870 035", href: "https://wa.me/256767870035" },
    { display: "+256 788 195 067", href: "https://wa.me/256788195067" },
  ],
  email: { display: "dychtech256@gmail.com", href: "mailto:dychtech256@gmail.com" },
  location: "Kampala, Uganda",
} as const;

export const BRAND = {
  name: "DYCH Technologies",
  product: "Smart School Systems",
  blurb:
    "Facial-recognition entry, automatic attendance and instant parent alerts for schools across Uganda and the wider region.",
} as const;
