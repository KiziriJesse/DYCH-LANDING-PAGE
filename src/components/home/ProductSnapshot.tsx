import {
  ArrowRight,
  ListChecks,
  PaperPlaneTilt,
  Receipt,
  ScanSmiley,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const ICON = { size: 26, weight: "light" } as const;

const FEATURES = [
  {
    title: "Facial Recognition Security",
    body: "Biometric and digital identification tied to the entry point, so the school knows who is on the grounds and who is not, without anyone walking a clipboard to the perimeter.",
    href: "/product#security",
    accent: "var(--accent-security)",
    Icon: ScanSmiley,
    span: "md:col-span-7 lg:row-span-2",
    shape: "lead" as const,
  },
  {
    title: "Automatic Attendance",
    body: "Arrival and departure are recorded as they happen. No manual register, so no transcription errors to chase at the end of term.",
    href: "/product#attendance",
    accent: "var(--accent-attendance)",
    Icon: ListChecks,
    span: "md:col-span-5",
    shape: "standard" as const,
  },
  {
    title: "Real-Time Parent Alerts",
    body: "A message on arrival, on departure, and when a pupil is missing from the register. Over SMS or WhatsApp, so no app is needed.",
    href: "/product#communication",
    accent: "var(--accent-communication)",
    Icon: PaperPlaneTilt,
    span: "md:col-span-5",
    shape: "standard" as const,
  },
  {
    title: "Fees & Finance",
    body: "Each student profile carries its own payment record, with reminders reaching parents on the same channel as the attendance alerts.",
    href: "/product#finance",
    accent: "var(--accent-finance)",
    Icon: Receipt,
    span: "md:col-span-12",
    shape: "wide" as const,
  },
];

function ReadMore() {
  return (
    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
      Read more
      <ArrowRight
        size={15}
        weight="bold"
        aria-hidden
        className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1"
      />
    </span>
  );
}

function IconWell({
  Icon,
  accent,
}: {
  Icon: (typeof FEATURES)[number]["Icon"];
  accent: string;
}) {
  return (
    <span
      aria-hidden
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-surface-raised"
      style={{ color: accent }}
    >
      <Icon {...ICON} />
    </span>
  );
}

/**
 * Asymmetric bento rather than a 2x2 of identical tiles: one tall lead cell,
 * two stacked companions and a wide closer. Four items, exactly four cells.
 *
 * Each shape uses its width and height deliberately. The lead cell anchors its
 * text to the bottom so its extra height reads as composition rather than as a
 * gap, and the wide cell splits into two columns so its text does not hug the
 * left edge of a 1240px card.
 *
 * Accent discipline (build plan 0.4a): at rest every card is neutral and its
 * accent appears only on the icon glyph. The accent-tinted spotlight is what
 * activates, and only one card can be addressed at a time, so no more than one
 * accent is ever lit in the viewport.
 */
export function ProductSnapshot() {
  return (
    <section
      id="product-snapshot"
      className="bg-surface px-4 py-28 sm:px-6 lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <h2 className="max-w-[18ch] text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.08] tracking-[-0.03em] text-foreground">
            Four jobs the school office stops doing by hand.
          </h2>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-muted">
            One installation covers the gate, the register, the parent line and the
            fees ledger. Each part works on its own and gets sharper alongside the
            others.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-12">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={0.06 * i} className={feature.span}>
              <SpotlightCard
                href={feature.href}
                accent={feature.accent}
                className="h-full"
              >
                {feature.shape === "wide" ? (
                  <div className="grid h-full gap-6 md:grid-cols-12 md:items-center">
                    {/* Icon and title sit inline here so the two columns of the
                        wide cell balance instead of one hanging low. */}
                    <div className="flex items-center gap-4 md:col-span-6">
                      <IconWell Icon={feature.Icon} accent={feature.accent} />
                      <h3 className="text-xl leading-tight tracking-[-0.02em] text-foreground sm:text-2xl">
                        {feature.title}
                      </h3>
                    </div>
                    <div className="md:col-span-5 md:col-start-8">
                      <p className="max-w-[52ch] leading-relaxed text-muted">
                        {feature.body}
                      </p>
                      <ReadMore />
                    </div>
                  </div>
                ) : (
                  <>
                    <IconWell Icon={feature.Icon} accent={feature.accent} />

                    {/* The lead cell is two rows tall, so it gets the homepage's
                        image slot rather than an empty stretch of surface.
                        TODO: replace with a real photo or screen-recording still. */}
                    {feature.shape === "lead" && (
                      <div
                        role="img"
                        aria-label="Placeholder for a photograph of facial recognition at a school entry point"
                        className="mt-7 flex flex-1 items-center justify-center rounded-[calc(var(--radius-card)-0.75rem)] border border-dashed border-border-strong bg-surface-raised/40 p-6 text-center"
                      >
                        <span className="max-w-[32ch] text-[0.8125rem] leading-relaxed text-faint">
                          [Placeholder image: recognition view at the school gate,
                          camera hardware or the entry dashboard]
                        </span>
                      </div>
                    )}

                    {/* mt-auto anchors the text to the bottom, which only has an
                        effect on the tall lead cell. */}
                    <div className="mt-auto pt-7">
                      <h3
                        className={
                          "leading-tight tracking-[-0.02em] text-foreground " +
                          (feature.shape === "lead"
                            ? "text-2xl sm:text-3xl"
                            : "text-xl sm:text-2xl")
                        }
                      >
                        {feature.title}
                      </h3>
                      <p className="mt-3.5 max-w-[52ch] leading-relaxed text-muted">
                        {feature.body}
                      </p>
                      <ReadMore />
                    </div>
                  </>
                )}
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
