import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
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
