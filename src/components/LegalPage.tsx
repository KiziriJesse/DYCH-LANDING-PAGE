import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Wordmark } from "@/components/ui/Wordmark";
import { Footer } from "@/components/Footer";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

/**
 * Shared shell for the two legal routes. Deliberately quiet: no motion, no
 * imagery, single column at reading width.
 */
export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <main id="main" className="px-4 pb-24 pt-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[720px]">
          <Link href="/" className="inline-block" aria-label="DYCH Technologies home">
            <Wordmark />
          </Link>

          <Link
            href="/"
            className="mt-14 inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors duration-300 hover:text-ink"
          >
            <ArrowLeft size={16} weight="bold" aria-hidden />
            Back to the home page
          </Link>

          <h1 className="mt-6 font-display text-[clamp(2rem,5vw,3rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink">
            {title}
          </h1>
          <p className="nums mt-4 text-sm text-ink-faint">Last updated {updated}</p>

          <div className="mt-8 rounded-shell border border-accent-line bg-accent-soft p-6">
            <p className="text-[0.9375rem] leading-relaxed text-ink">
              <strong className="font-semibold">Draft for review.</strong> This text is a
              working draft prepared alongside the site build. DYCH Technologies should
              have it checked against the Uganda Data Protection and Privacy Act and the
              terms of each school contract before it is treated as binding.
            </p>
          </div>

          <p className="mt-10 text-lg leading-relaxed text-ink-muted">{intro}</p>

          <div className="mt-4">
            {sections.map((section) => (
              <section key={section.heading} className="mt-12">
                <h2 className="font-display text-xl font-bold tracking-[-0.015em] text-ink">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mt-4 leading-relaxed text-ink-muted"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-5 divide-y divide-[var(--line)] border-y border-line">
                    {section.list.map((item) => (
                      <li key={item} className="py-3.5 leading-relaxed text-ink-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-16 border-t border-line pt-8">
            <p className="leading-relaxed text-ink-muted">
              Questions about this page go to{" "}
              <a
                href="mailto:xristeck@gmail.com"
                className="text-ink underline decoration-[var(--accent-line)] decoration-2 underline-offset-4 transition-colors duration-300 hover:text-[var(--accent-text)]"
              >
                xristeck@gmail.com
              </a>{" "}
              or{" "}
              <a
                href="tel:+256767870035"
                className="nums text-ink underline decoration-[var(--accent-line)] decoration-2 underline-offset-4 transition-colors duration-300 hover:text-[var(--accent-text)]"
              >
                +256 767 870 035
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
