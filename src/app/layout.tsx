import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";

/* Two intentional faces, ported from the prototype on `main`: a characterful
   display grotesk over a legible humanist body face. Replaces Geist Sans and
   Geist Mono. Geist Mono is not replaced with a third family: the only thing
   it was doing here was aligning digits, and IBM Plex Sans has tabular
   figures, so `.nums` now uses those instead of loading another font. */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const description =
  "DYCH Technologies builds Smart Vision: facial-recognition entry, automatic attendance and real-time alerts, for schools and for business across Uganda.";

/* The tab reads "DYCH Technologies" alone, and interior pages read
   "Pricing | DYCH Technologies" through the template below. The product name
   was in here twice over - the company name already identifies the tab, and
   the page segment already says what the page is. */
const title = "DYCH Technologies";

export const metadata: Metadata = {
  metadataBase: new URL("https://dychtechnologies.com"),
  title: {
    default: title,
    template: "%s | DYCH Technologies",
  },
  description,
  applicationName: "DYCH Technologies",
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
  authors: [{ name: "DYCH Technologies" }],
  openGraph: {
    type: "website",
    locale: "en_UG",
    url: "https://dychtechnologies.com",
    siteName: "DYCH Technologies",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // --paper. Was the old dark substrate, which tinted the mobile browser
  // chrome near-black above a white page.
  themeColor: "#faf9fd",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${plexSans.variable} bg-background text-foreground antialiased`}
      >
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        {/* Mounted once here rather than per page, so it persists across
            navigation and cannot be double-rendered. */}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
