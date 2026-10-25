/**
 * Single source of truth for the sitemap and contact details, so the Navbar,
 * the Footer and any future CTA cannot drift apart.
 *
 * The nav label is "Product", not the software name. The software is called
 * Smart Vizion, and that name appears as the heading INSIDE the Product menu
 * rather than as the top-level label.
 *
 * TWO MENUS, NOT ONE. Product holds the software and the two capabilities
 * that sit under it; Industries holds the three environments DYCH sells
 * into. The distinction matters commercially: Visitor Management and Staff
 * Attendance are FEATURES OF SMART VIZION, not separate products, and
 * listing them as siblings of it would tell a buyer DYCH has three things to
 * sell when it has one with three ways in.
 *
 * The source documents call the software Vision One and Smart School Vision.
 * Neither name is used anywhere on this site. "Smart School Systems", the
 * label this branch used previously, is also retired: the product is no
 * longer schools-only.
 */

export type MenuItem = {
  label: string;
  href: string;
  note: string;
};

/**
 * Under Product. Smart Vizion first, because the other two are parts of it
 * rather than alternatives to it, and the notes say so rather than leaving a
 * reader to infer three products from three rows.
 */
export const PRODUCT_MENU: readonly MenuItem[] = [
  {
    label: "Smart Vizion",
    href: "/product",
    note: "Recognition, attendance and alerts at an entry point",
  },
  {
    label: "Visitor Management",
    href: "/product#visitor-management",
    note: "A recorded visitor log in place of the paper book",
  },
  {
    label: "Staff Attendance",
    href: "/product#staff-attendance",
    note: "Clock-in and clock-out from the same entry scan",
  },
] as const;

/**
 * Under Industries. Each is a real page, written for that environment rather
 * than as the schools product with the nouns swapped.
 */
export const INDUSTRIES: readonly MenuItem[] = [
  {
    label: "Schools",
    href: "/schools",
    note: "Arrival, attendance, parents and the gate",
  },
  {
    label: "Businesses & Workplaces",
    href: "/businesses",
    note: "Reception, workforce hours and controlled entry",
  },
  {
    label: "Churches & Worship Centres",
    href: "/churches",
    note: "Guests, teams and the spaces that need care",
  },
] as const;

/* Schools is no longer a top-level entry: it is one of three industries now,
   and leaving it at the top would have said the other two were afterthoughts.
   The count is unchanged, so the bar is no wider than it was. */
export const NAV_LINKS: readonly {
  label: string;
  href: string;
  menu?: readonly MenuItem[];
}[] = [
  { label: "Product", href: "/product", menu: PRODUCT_MENU },
  { label: "Industries", href: "/schools", menu: INDUSTRIES },
  { label: "How it works", href: "/how-it-works" },
  { label: "Security", href: "/security-and-trust" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
] as const;

/**
 * THE TWO SCHOOLS PAGES ARE NOW ONE. /product/schools and /schools used to be
 * separate on purpose: the first was the schools deployment of the product,
 * the second the pilot-customer page. Under the industries structure that
 * split stopped making sense, because a head teacher arriving from either
 * link wants the same page. The capability sections moved to /schools and
 * /product/schools redirects there.
 */

/** Full labels, used where horizontal space is not constrained. */
/**
 * The footer, grouped the way the nav is rather than as one flat list. A
 * reader who has just used the Product and Industries menus should meet the
 * same two groups at the bottom of the page.
 */
export const FOOTER_NAV = [
  {
    heading: "Product",
    links: [
      { label: "Smart Vizion", href: "/product" },
      { label: "Visitor Management", href: "/product#visitor-management" },
      { label: "Staff Attendance", href: "/product#staff-attendance" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Industries",
    links: [
      { label: "Schools", href: "/schools" },
      { label: "Businesses & Workplaces", href: "/businesses" },
      { label: "Churches & Worship Centres", href: "/churches" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About DYCH", href: "/about" },
      { label: "Security & trust", href: "/security-and-trust" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
] as const;

export const CONTACT = {
  phones: [
    { display: "+256 708 180 987", href: "tel:+256708180987" },
    { display: "+256 788 195 067", href: "tel:+256788195067" },
  ],
  whatsapp: [
    { display: "+256 767 870 035", href: "https://wa.me/256767870035" },
    // { display: "+256 788 195 067", href: "https://wa.me/256788195067" },
  ],
  email: {
    display: "dychtech256@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=dychtech256@gmail.com",
  },
  linkedin: {
    display: "LinkedIn",
    href: "https://www.linkedin.com/company/dychtechnologies/",
  },
  location: "Kampala, Uganda",
} as const;

export const BRAND = {
  name: "DYCH Technologies",
  /** The software. One product, two deployments. */
  product: "Smart Vizion",
  blurb:
    "Facial-recognition entry, automatic attendance and real-time alerts, for schools and for business across Uganda and the wider region.",
} as const;
