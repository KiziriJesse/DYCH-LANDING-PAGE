/* BAND 8 — DARK, 0.79vh. */

const COLS = [
  {
    label: "10 — Products",
    links: [
      { href: "/#recognition", text: "Facial Recognition" },
      { href: "/#vision-one", text: "Vision One" },
    ],
  },
  {
    label: "20 — Company",
    links: [
      { href: "/about", text: "About" },
      { href: "/#contact", text: "Contact" },
      { href: "/sign-in", text: "Sign in" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[var(--ink)] px-[var(--shell)] pb-12 pt-24 text-[var(--paper)]">
      <div className="grid gap-16 md:grid-cols-12">
        <p className="font-[family-name:var(--font-display)] text-2xl font-light tracking-tight md:col-span-4">
          dych
        </p>

        {COLS.map((c) => (
          <nav key={c.label} className="md:col-span-3" aria-label={c.label}>
            <p className="eyebrow text-[var(--paper)]/40">{c.label}</p>
            <ul className="mt-6 space-y-1">
              {c.links.map((l) => (
                <li key={l.text}>
                  <a
                    href={l.href}
                    className="flex h-11 items-center text-[var(--paper)]/80 transition-colors hover:text-[var(--accent-on-dark)] md:h-8"
                  >
                    {l.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mt-24 flex flex-col gap-4 border-t border-[var(--paper)]/12 pt-8 text-sm text-[var(--paper)]/40 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Dych Technologies</p>
        {/* [PLACEHOLDER] legal links — no policies exist yet */}
        <p>Privacy Policy · Terms of Use</p>
      </div>
    </footer>
  );
}
