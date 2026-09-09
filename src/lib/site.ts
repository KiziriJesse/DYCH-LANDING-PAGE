/**
 * Single source of truth for the sitemap and contact details, so the Navbar,
 * the Footer and any future CTA cannot drift apart.
 *
 * The nav label is "Product", not the software name. The software is called
 * Smart Vision, and that name appears as the heading INSIDE the Product menu
 * rather than as the top-level label - because Smart Vision is one product
 * with two deployments, and the nav item has to hold both.
 *
 * The source documents call the software Vision One and Smart School Vision.
 * Neither name is used anywhere on this site. "Smart School Systems", the
 * label this branch used previously, is also retired: the product is no
 * longer schools-only.
 */

export const NAV_LINKS = [
  { label: "Product", href: "/product" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Security", href: "/security-and-trust" },
  { label: "Schools", href: "/schools" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
] as const;

/**
 * The two verticals under Product. Shared by the desktop dropdown and the
 * mobile menu so they cannot diverge.
 *
 * /product/schools is NOT the same page as /schools. The first is the schools
 * deployment of the product; the second is the pilot-customer page. They are
 * separate on purpose and must not be merged.
 */
export const PRODUCT_VERTICALS = [
  {
    label: "For Schools",
    href: "/product/schools",
    note: "Gate, register, parents, boarding",
  },
  {
    label: "For Business",
    href: "/product/business",
    note: "Reception, hours, alerts, operations",
  },
] as const;

/** Full labels, used where horizontal space is not constrained. */
export const SITEMAP = [
  { label: "Smart Vision for Schools", href: "/product/schools" },
  { label: "Smart Vision for Business", href: "/product/business" },
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
  /** The software. One product, two deployments. */
  product: "Smart Vision",
  blurb:
    "Facial-recognition entry, automatic attendance and real-time alerts, for schools and for business across Uganda and the wider region.",
} as const;
