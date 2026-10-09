import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";
import { SITE_NAME, SITE_URL, pageMetadata, siteJsonLd } from "@/lib/seo";

/* Two intentional faces, ported from the prototype on `main`: a characterful
   display grotesk over a legible humanist body face. Replaces Geist Sans and
   Geist Mono. Geist Mono is not replaced with a third family: the only thing
   it was doing here was aligning digits, and IBM Plex Sans has tabular
   figures, so `.nums` now uses those instead of loading another font. */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  // 700 is for the Face Scan hero headline only; the comp sets it bold.
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const description =
  "DYCH Technologies builds Smart Vizion: facial-recognition entry, automatic attendance and real-time alerts, for schools and for business across Uganda.";

/* The tab reads "DYCH Technologies" alone, and interior pages read
   "Pricing | DYCH Technologies" through the template below. The product name
   was in here twice over - the company name already identifies the tab, and
   the page segment already says what the page is. */
const title = SITE_NAME;

/* Public measurement ID. NEXT_PUBLIC_GA_MEASUREMENT_ID overrides it at build
   time. Loaded only in production so local dev neither sends hits nor errors
   when the tag is absent. */
const gaMeasurementId = (() => {
  const id =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-L2CHZP0M3B";
  return /^G-[A-Z0-9]+$/.test(id) ? id : null;
})();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...pageMetadata({ description, path: "/" }),
  title: {
    default: title,
    template: `%s | ${SITE_NAME}`,
  },
  applicationName: SITE_NAME,
  // "school fees tracking" was here. There is no fees capability in the
  // product and no source document describing one, so it is not a term this
  // site should be found for.
  keywords: [
    "school security Uganda",
    "facial recognition attendance",
    "access control Uganda",
    "staff time tracking Africa",
    "parent notification SMS",
    "DYCH Technologies",
  ],
  authors: [{ name: SITE_NAME }],
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // The gradient's left stop. Every route opens on the violet gradient - the
  // hero, or a page header - so the browser chrome continues its dark edge.
  themeColor: "#10014a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${plexSans.variable} bg-transparent text-foreground antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        {/* Mounted once here rather than per page, so it persists across
            navigation and cannot be double-rendered. */}
        <WhatsAppWidget />
        {process.env.NODE_ENV === "production" && gaMeasurementId ? (
          <GoogleAnalytics gaId={gaMeasurementId} />
        ) : null}
      </body>
    </html>
  );
}
