import Image from "next/image";
import {
  ListChecks,
  PaperPlaneTilt,
  Receipt,
  Scan,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCell } from "@/components/ui/SpotlightCell";

const ICON = { size: 26, weight: "light" } as const;

export function Solutions() {
  return (
    <section
      id="solutions"
      className="bg-canvas-alt px-4 py-28 sm:px-6 lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="max-w-[18ch] font-display text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink">
            Four jobs the school office stops doing by hand.
          </h2>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink-muted">
            One installation covers the gate, the register, the parent line and the
            fees ledger. Each part works on its own and gets sharper alongside the
            others.
          </p>
        </Reveal>

        {/* Bento: 4 items, exactly 4 cells. One tall lead cell, two stacked
            companions, one wide closing cell. No empty tiles. */}
        <div className="mt-16 grid gap-5 lg:grid-cols-12">
          {/* Lead cell: photographic ground */}
          <Reveal className="lg:col-span-7 lg:row-span-2">
            <SpotlightCell className="h-full">
              <div className="bezel-core relative flex h-full min-h-[26rem] flex-col justify-end overflow-hidden p-8 sm:p-10">
                <Image
                  src="https://picsum.photos/seed/dych-gate-entry/1200/900?grayscale"
                  alt="Pupils passing through a school entrance"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                  style={{
                    opacity: "var(--media-opacity)" as never,
                    filter: "var(--media-filter)",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, var(--veil-soft) 0%, var(--veil-strong) 62%)",
                  }}
                />
                <div className="relative">
                  <span className="mb-7 flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-[var(--accent-text)] ring-1 ring-[var(--accent-line)]">
                    <Scan {...ICON} />
                  </span>
                  <h3 className="max-w-[15ch] font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-ink sm:text-4xl">
                    Student security at the entry point
                  </h3>
                  <p className="mt-4 max-w-[46ch] leading-relaxed text-ink-muted">
                    Biometric and digital identification tied to the gate. The school
                    knows who is on the grounds, and who is not, without anyone walking
                    a clipboard to the perimeter.
                  </p>
                </div>
              </div>
            </SpotlightCell>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <SpotlightCell className="h-full">
              <div className="bezel-core flex h-full flex-col p-8">
                <span className="mb-7 flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-[var(--accent-text)] ring-1 ring-[var(--accent-line)]">
                  <ListChecks {...ICON} />
                </span>
                <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-ink">
                  Attendance that records itself
                </h3>
                <p className="mt-3.5 leading-relaxed text-ink-muted">
                  Arrival and departure are captured as they happen. No manual register,
                  so no transcription errors to chase at the end of term.
                </p>
              </div>
            </SpotlightCell>
          </Reveal>

          <Reveal delay={0.14} className="lg:col-span-5">
            <SpotlightCell className="h-full">
              <div className="bezel-core flex h-full flex-col p-8">
                <span className="mb-7 flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-[var(--accent-text)] ring-1 ring-[var(--accent-line)]">
                  <PaperPlaneTilt {...ICON} />
                </span>
                <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-ink">
                  Parents told the same minute
                </h3>
                <p className="mt-3.5 leading-relaxed text-ink-muted">
                  A message goes out on arrival, on departure, and when a pupil is
                  missing from the register. Over SMS or WhatsApp, so no app is needed.
                </p>
              </div>
            </SpotlightCell>
          </Reveal>

          {/* Closing cell: accent ground, wide format */}
          <Reveal delay={0.2} className="lg:col-span-12">
            <SpotlightCell>
              <div
                className="bezel-core relative overflow-hidden p-8 sm:p-10"
                style={{
                  backgroundImage:
                    "linear-gradient(105deg, var(--accent-soft) 0%, transparent 58%)",
                }}
              >
                <div className="grid gap-6 md:grid-cols-12 md:items-center">
                  <div className="md:col-span-7">
                    <span className="mb-7 flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-[var(--accent-text)] ring-1 ring-[var(--accent-line)]">
                      <Receipt {...ICON} />
                    </span>
                    <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-ink sm:text-3xl">
                      Fees tied to the pupil, not to a paper file
                    </h3>
                  </div>
                  <p className="leading-relaxed text-ink-muted md:col-span-5">
                    Each student profile carries its own payment record. Reminders reach
                    the parent on the same channel as the attendance alerts, and the
                    bursar sees what is outstanding without opening a ledger.
                  </p>
                </div>
              </div>
            </SpotlightCell>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
