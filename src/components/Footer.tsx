import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";

const SECTIONS = [
  { label: "About", href: "/#about" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Integration", href: "/#integration" },
  { label: "Contact Team", href: "/#contact-team" },
];

const LEGAL = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="bg-canvas px-4 pb-10 pt-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-10 border-t border-line pt-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[34ch]">
            <Wordmark />
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-muted">
              Automation and system management for schools and industry across Uganda
              and the wider region.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            {SECTIONS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.9375rem] font-medium text-ink-muted transition-colors duration-300 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="nums">{new Date().getFullYear()}</span> DYCH Technologies.
            Kampala, Uganda.
          </p>
          <ul className="flex gap-6">
            {LEGAL.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors duration-300 hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
