import { Button } from "./Button";

/* BAND 2 — LIGHT, 0.82vh. Mirrors the reference's statement band:
   small eyebrow on the left rail, one paragraph set large. */
export function Thesis() {
  return (
    <section className="flex min-h-[var(--band-sm)] items-center bg-[var(--paper-alt)] px-[var(--shell)] py-24">
      <div className="grid w-full gap-12 md:grid-cols-12">
        <p className="eyebrow text-[var(--ink)]/50 md:col-span-3">
          Overview
          <br />
          Company
        </p>

        <div className="md:col-span-8">
          {/* [PLACEHOLDER] company positioning statement */}
          <p className="font-[family-name:var(--font-display)] text-2xl font-light leading-snug tracking-tight text-[var(--ink)] md:text-[2rem]">
            Dych Technologies engineers recognition and access systems for
            places where knowing who walked in is the whole job.{" "}
            <span className="text-[var(--accent-on-light)]">
              Two products, one pipeline.
            </span>
          </p>

          <div className="mt-10">
            <Button href="#recognition" ground="light" icon={<Plus />}>
              How it works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Plus() {
  return (
    <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden="true">
      <path d="M6 2v8M2 6h8" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
