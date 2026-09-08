import { Button } from "./Button";

/* BAND 6 — BLUE #0071e3, 0.59vh. The page's single chromatic event.
   The reference used this band for "Scientific Evidence"; no verified
   figures exist for Dych, and §1 bans invented stats, so this stays
   qualitative until real content is supplied. */
export function Statement() {
  return (
    <section className="flex min-h-[var(--band-sm)] items-center bg-[var(--accent)] px-[var(--shell)] py-24 text-[var(--accent-inverse)]">
      <div className="grid w-full gap-12 md:grid-cols-12">
        <p className="eyebrow text-[var(--accent-inverse)]/70 md:col-span-2">
          10
          <br />
          Deployment
        </p>
        <div className="md:col-span-8">
          {/* [PLACEHOLDER] — band 6 needs real content from the client */}
          <h2 className="text-[var(--accent-inverse)]">Built to be run daily.</h2>
          <p className="mt-6 max-w-lg text-[var(--accent-inverse)]/80">
            Both products are designed around the people who actually operate
            them — the guard at the gate, the administrator at the desk.
          </p>
          <div className="mt-10">
            <Button href="#contact" ground="blue" icon={<Arrow />}>
              Talk to us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden="true">
      <path d="M2 10 L10 2 M10 2 H4.5 M10 2 V7.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
