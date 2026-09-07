import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "DYCH Technologies builds Smart School Systems: biometric attendance, entry-point security and same-minute parent alerts for schools across Uganda and East Africa.";

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
    "biometric attendance",
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
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#edf0ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1611" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} ${geistSans.variable} ${geistMono.variable} bg-canvas text-ink`}
      >
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <div aria-hidden className="grain-layer z-grain" />
      </body>
    </html>
  );
}
