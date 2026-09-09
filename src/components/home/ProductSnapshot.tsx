import {
  ArrowRight,
  ListChecks,
  PaperPlaneTilt,
  Devices,
  ScanSmiley,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const ICON = { size: 26, weight: "light" } as const;

const FEATURES = [
  {
    title: "Facial Recognition Security",
    body: "Biometric and digital identification tied to the entry point, so the school knows who is on the grounds and who is not, without anyone walking a clipboard to the perimeter.",
    href: "/product/schools#security",
    Icon: ScanSmiley,
    span: "md:col-span-7 lg:row-span-2",
    shape: "lead" as const,
  },
  {
    title: "Automatic Attendance",
    body: "Arrival and departure are recorded as they happen. No manual register, so no transcription errors to chase at the end of term.",
    href: "/product/schools#attendance",
    Icon: ListChecks,
    span: "md:col-span-5",
    shape: "standard" as const,
  },
  {
    title: "Real-Time Parent Alerts",
    body: "A push notification within seconds of the scan, carrying the pupil’s photo so a parent can see it is their child. SMS follows as a fallback if the push goes unopened.",
    href: "/product/schools#communication",
    Icon: PaperPlaneTilt,
    span: "md:col-span-5",
    shape: "standard" as const,
  },
  {
    // Fees & Finance was removed: no source document describes a billing
    // feature. The Guard App takes the slot, matching the deck's own list of
    // what a school is buying: camera, software, parent app, guard app.
    title: "The Guard App",
    body: "One screen at the gate instead of a register, a visitor book and a pass list. It tells the person on duty what to do for each arrival, and keeps working when the connection drops.",
    href: "/product/schools#guard-app",
    Icon: Devices,
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

/*  One well treatment for every feature, everywhere on the site. The four
    per-feature hues this used to carry are gone; what distinguishes a card
    now is its glyph and its position, not its colour. */
function IconWell({ Icon }: { Icon: (typeof FEATURES)[number]["Icon"] }) {
  return (
    <span
      aria-hidden
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent-line bg-wash text-accent-on-light"
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
          {/* This line used to end "...the parent line and the fees ledger."
              There is no fees ledger. The finance capability was removed from
              the product for want of any source document describing it, and
              this sentence was the last place the claim survived. */}
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-muted">
            One installation covers the gate, the register, the parent line and the
            guard&rsquo;s screen. Each part works on its own and gets sharper
            alongside the others.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-12">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={0.06 * i} className={feature.span}>
              <SpotlightCard
                href={feature.href}
                className="h-full"
              >
                {feature.shape === "wide" ? (
                  <div className="grid h-full gap-6 md:grid-cols-12 md:items-center">
                    {/* Icon and title sit inline here so the two columns of the
                        wide cell balance instead of one hanging low. */}
                    <div className="flex items-center gap-4 md:col-span-6">
                      <IconWell Icon={feature.Icon} />
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
                    <IconWell Icon={feature.Icon} />

                    {/* The lead cell is two rows tall, so it gets the homepage's
                        image slot rather than an empty stretch of surface.
                        TODO: replace with a real photo or screen-recording still. */}
                    {feature.shape === "lead" && (
                      <div
                        role="img"
                        aria-label="Placeholder for a photograph of facial recognition at a school entry point"
                        className="mt-7 flex flex-1 items-center justify-center rounded-[calc(var(--radius-card)-0.75rem)] border border-dashed border-border-strong bg-surface-raised/40 p-6 text-center"
                      >
                        <span className="max-w-[32ch] text-[0.8125rem] leading-relaxed text-muted">
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

        {/* The grid is the schools deployment, which is the one with seven
            documented capabilities behind it.

            PARKED: this used to end with a link to /product/business. That
            page is parked pending DYCH's business documents, so the pointer
            now goes to a conversation rather than to a page that would be
            making claims nobody has confirmed. Restore the link here when the
            page comes back. */}
        <Reveal delay={0.28}>
          <p className="mt-12 max-w-[62ch] leading-relaxed text-muted">
            Not a school? The same recognition, attendance and alerting runs at a
            business entrance, with staff and contractors in place of pupils and
            a duty manager in place of a parent.{" "}
            <Link
              href="/contact"
              className="border-b border-accent-line pb-0.5 font-semibold text-accent-on-light transition-colors duration-150 hover:border-accent"
            >
              Tell us what your entrance looks like
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
