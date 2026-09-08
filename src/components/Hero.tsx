import { Button } from "./Button";
import { DetectionFigure } from "./DetectionFigure";

/* BAND 1 — WHITE, 0.77vh in the reference.
   Asymmetric editorial composition, not centered (§5, §1). */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(var(--band-lg)-5rem)] flex-col justify-end overflow-hidden bg-[var(--paper-pure)] px-[var(--shell)] pb-16 pt-12"
    >
      <div className="absolute right-[var(--shell)] top-1/2 hidden w-[38vw] max-w-[30rem] -translate-y-1/2 md:block">
        <DetectionFigure className="w-full" />
      </div>

      <div className="relative max-w-[46rem]">
        {/* [PLACEHOLDER] headline — replace with approved positioning */}
        <h1 className="text-[var(--ink)]">
          Systems that know
          <br />
          who is there.
        </h1>

        {/* [PLACEHOLDER] subhead */}
        <p className="mt-8 max-w-[34rem] text-base leading-relaxed text-[var(--ink)]/70 md:text-lg">
          Dych Technologies builds facial recognition and school access
          infrastructure — from the matching pipeline to the guard&apos;s phone.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-[var(--btn-gap)]">
          <Button href="#recognition" ground="light" icon={<Arrow />}>
            Facial Recognition
          </Button>
          <Button href="#vision-one" ground="light" icon={<Arrow />}>
            Vision One
          </Button>
        </div>
      </div>

      <div className="relative mt-16 md:hidden">
        <DetectionFigure className="w-2/3 max-w-[16rem]" />
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden="true">
      <path
        d="M2 10 L10 2 M10 2 H4.5 M10 2 V7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
