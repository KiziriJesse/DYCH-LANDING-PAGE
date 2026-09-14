import Image from "next/image";
import Link from "next/link";
import {
  EnvelopeSimple,
  LinkedinLogo,
  MapPin,
  PhoneCall,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { BRAND, CONTACT, SITEMAP } from "@/lib/site";
import { sequenceAccent } from "@/lib/palette";

const ICON = { size: 18, weight: "light" } as const;

// Every contact line is one step along the brand gradient, in list order.
const CONTACT_COUNT = CONTACT.whatsapp.length + CONTACT.phones.length + 2;

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-sunk px-4 pb-10 pt-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1240px]">
        {/* Three columns, not a four-column link farm. */}
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" aria-label="DYCH Technologies, home" className="relative z-raise inline-block">
              <Image
                src="/logo/dych-lockup.png"
                alt="DYCH Technologies"
                width={640}
                height={591}
                className="h-auto w-[7.25rem]"
              />
            </Link>
            <p className="mt-5 max-w-[38ch] text-[0.9375rem] leading-relaxed text-muted">
              {BRAND.blurb}
            </p>
            {/* text-muted, not text-faint. Under the old dark palette --faint
                measured 4.17:1 here and missed AA; both tokens have been
                re-measured against the paper family since, but the more
                readable one is still the right call for a footer. */}
            <p className="mt-5 flex items-center gap-2 text-sm text-muted">
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
              {CONTACT.whatsapp.map((line, i) => (
                <li key={line.href}>
                  <a
                    href={line.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`WhatsApp ${line.display}`}
                    className="group inline-flex items-center gap-3 text-[0.9375rem] text-muted transition-colors duration-300 hover:text-foreground"
                  >
                    <span
                      aria-hidden
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-accent-ink transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundColor: sequenceAccent(i, CONTACT_COUNT) }}
                    >
                      <WhatsappLogo {...ICON} />
                    </span>
                    <span className="nums">
                      {line.display}
                    </span>
                  </a>
                </li>
              ))}

              {CONTACT.phones.map((line, i) => (
                <li key={line.href}>
                  <a
                    href={line.href}
                    className="group inline-flex items-center gap-3 text-[0.9375rem] text-muted transition-colors duration-300 hover:text-foreground"
                  >
                    <span
                      aria-hidden
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-accent-ink transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundColor: sequenceAccent(CONTACT.whatsapp.length + i, CONTACT_COUNT) }}
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
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-[0.9375rem] text-muted transition-colors duration-300 hover:text-foreground"
                >
                  <span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-accent-ink transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: sequenceAccent(CONTACT_COUNT - 2, CONTACT_COUNT) }}
                  >
                    <EnvelopeSimple {...ICON} />
                  </span>
                  {CONTACT.email.display}
                </a>
              </li>

              <li>
                <a
                  href={CONTACT.linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-[0.9375rem] text-muted transition-colors duration-300 hover:text-foreground"
                >
                  <span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-accent-ink transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: sequenceAccent(CONTACT_COUNT - 1, CONTACT_COUNT) }}
                  >
                    <LinkedinLogo {...ICON} />
                  </span>
                  {CONTACT.linkedin.display}
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
