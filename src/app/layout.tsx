import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
  "DYCH Technologies builds Smart School Systems: facial-recognition entry, automatic attendance and instant parent alerts for schools across Uganda.";

export const metadata: Metadata = {
  metadataBase: new URL("https://dychtechnologies.com"),
  title: {
    default: "DYCH Technologies | Smart School Systems",
    template: "%s | DYCH Technologies",
  },
  description,
  applicationName: "DYCH Technologies",
  keywords: [
    "school security Uganda",
    "facial recognition attendance",
    "school management system Africa",
    "parent notification SMS",
    "school fees tracking",
    "DYCH Technologies",
  ],
  authors: [{ name: "DYCH Technologies" }],
  openGraph: {
    type: "website",
    locale: "en_UG",
    url: "https://dychtechnologies.com",
    siteName: "DYCH Technologies",
    title: "DYCH Technologies | Smart School Systems",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "DYCH Technologies | Smart School Systems",
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0e14",
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
      </body>
    </html>
  );
}
