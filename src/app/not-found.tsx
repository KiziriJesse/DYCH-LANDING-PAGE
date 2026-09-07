import Link from "next/link";
import type { Metadata } from "next";
import { Wordmark } from "@/components/ui/Wordmark";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const ROUTES = [
  { label: "About DYCH", href: "/#about", note: "What we build and who it is for." },
  { label: "Key solutions", href: "/#solutions", note: "Security, attendance, parents, fees." },
  { label: "System integration", href: "/#integration", note: "How the four parts pass records along." },
  { label: "Contact team", href: "/#contact-team", note: "Kampala office, phone and WhatsApp." },
];

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex min-h-[100dvh] flex-col justify-center px-4 py-24 sm:px-6 lg:px-10"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <Link href="/" className="inline-block" aria-label="DYCH Technologies home">
          <Wordmark />
        </Link>

        <p className="nums mt-16 text-sm font-semibold tracking-[0.18em] text-[var(--accent-text)]">
          404
        </p>
        <h1 className="mt-4 max-w-[16ch] font-display text-[clamp(2.25rem,6vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-ink">
          That page is not here.
        </h1>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-muted">
          The address may have changed, or the link that brought you here may be out of
          date. Everything on the site is one step away.
        </p>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-shell border border-line bg-line sm:grid-cols-2">
          {ROUTES.map((route) => (
            <li key={route.href} className="bg-surface">
              <Link
                href={route.href}
                className="block h-full p-7 transition-colors duration-300 hover:bg-accent-soft"
              >
                <span className="font-display text-lg font-bold tracking-[-0.01em] text-ink">
                  {route.label}
                </span>
                <span className="mt-1.5 block text-[0.9375rem] text-ink-muted">
                  {route.note}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="mt-12 inline-flex rounded-full bg-accent px-6 py-3.5 text-[0.9375rem] font-semibold text-[var(--accent-ink)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
        >
          Back to the home page
        </Link>
      </div>
    </main>
  );
}
