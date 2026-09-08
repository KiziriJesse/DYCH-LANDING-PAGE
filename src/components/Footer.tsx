import Link from "next/link";
import {
  EnvelopeSimple,
  MapPin,
  PhoneCall,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { BRAND, CONTACT, SITEMAP } from "@/lib/site";
import { Wordmark } from "@/components/ui/Wordmark";

const ICON = { size: 18, weight: "light" } as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-sunk px-4 pb-10 pt-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1240px]">
        {/* Three columns, not a four-column link farm. */}
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" aria-label="DYCH Technologies, home" className="inline-block">
              {/* The corporate tagline belongs here; the nav carries the product name. */}
              <Wordmark subline="AUTOMATING TOMORROW" markHeight={38} />
            </Link>
            <p className="mt-5 max-w-[38ch] text-[0.9375rem] leading-relaxed text-muted">
              {BRAND.blurb}
            </p>
            <p className="mt-5 flex items-center gap-2 text-sm text-faint">
              <MapPin {...ICON} aria-hidden />
              {CONTACT.location}
            </p>
          </div>

          <nav aria-labelledby="footer-sitemap" className="md:col-span-3">
            <h2
              id="footer-sitemap"
              className="text-sm font-medium tracking-[0.1em] text-foreground"
            >
              Site
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {SITEMAP.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-muted transition-colors duration-300 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="text-sm font-medium tracking-[0.1em] text-foreground">
              Talk to us
            </h2>

            <ul className="mt-5 flex flex-col gap-4">
              {CONTACT.whatsapp.map((line) => (
                <li key={line.href}>
                  <a
                    href={line.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 text-[0.9375rem] text-muted transition-colors duration-300 hover:text-foreground"
                  >
                    <span
                      aria-hidden
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent ring-1 ring-[var(--accent-line)] transition-transform duration-300 group-hover:scale-105"
                    >
                      <WhatsappLogo {...ICON} />
                    </span>
                    <span className="nums">
                      WhatsApp {line.display}
                    </span>
                  </a>
                </li>
              ))}

              {CONTACT.phones.map((line) => (
                <li key={line.href}>
                  <a
                    href={line.href}
                    className="group inline-flex items-center gap-3 text-[0.9375rem] text-muted transition-colors duration-300 hover:text-foreground"
                  >
                    <span
                      aria-hidden
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent ring-1 ring-[var(--accent-line)] transition-transform duration-300 group-hover:scale-105"
                    >
                      <PhoneCall {...ICON} />
                    </span>
                    <span className="nums">{line.display}</span>
                  </a>
                </li>
              ))}

              <li>
                <a
                  href={CONTACT.email.href}
                  className="group inline-flex items-center gap-3 text-[0.9375rem] text-muted transition-colors duration-300 hover:text-foreground"
                >
                  <span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent ring-1 ring-[var(--accent-line)] transition-transform duration-300 group-hover:scale-105"
                  >
                    <EnvelopeSimple {...ICON} />
                  </span>
                  {CONTACT.email.display}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-6 text-sm text-faint">
          <p>
            <span className="nums">{new Date().getFullYear()}</span> {BRAND.name}. All
            rights reserved.
          </p>
          {/* TODO: add Privacy and Terms links here once those routes exist.
              Omitted rather than linked to a 404. */}
        </div>
      </div>
    </footer>
  );
}
