import {
  ArrowRight,
  ListChecks,
  PaperPlaneTilt,
  Devices,
  ScanSmiley,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const ICON = { size: 26, weight: "light" } as const;

type Feature = {
  title: string;
  body: string;
  href: string;
  Icon: PhosphorIcon;
  span: string;
  shape: "lead" | "standard" | "wide";
  image?: string;
  imageAlt?: string;
  imageClassName?: string;
};

const FEATURES: Feature[] = [
  {
    title: "Recognition at the entrance",
    body: "A face matched against your own enrolled people as they walk in, so you know who is on the premises and who is not, without anyone walking a clipboard to the perimeter.",
    href: "/product/schools#security",
    Icon: ScanSmiley,
    span: "md:col-span-8 md:row-span-2",
    shape: "lead" as const,
    image: "/school-gate.png",
    imageAlt:
      "Students walking through a school gate as a camera on the post identifies them",
    imageClassName: "object-cover object-[42%_center]",
  },
  {
    title: "Attendance and timekeeping",
    body: "Arrival and departure recorded as they happen, against your own hours and late rules. No manual register, so no transcription errors to chase at the end of the month.",
    href: "/product/schools#attendance",
    Icon: ListChecks,
    span: "md:col-span-4",
    shape: "standard" as const,
  },
  {
    title: "Alerts to the right people",
    body: "A notification carrying the photo, so whoever gets it can see the match was right. You set how soon after the scan it goes; SMS and WhatsApp follow where it goes unopened.",
    href: "/product/schools#communication",
    Icon: PaperPlaneTilt,
    span: "md:col-span-4",
    shape: "standard" as const,
  },
  {
    // Fees & Finance was removed: no source document describes a billing
    // feature. The Guard App takes the slot, matching the deck's own list of
    // what a school is buying: camera, software, parent app, guard app.
    title: "The screen on the door",
    body: "One tablet instead of a register, a visitor book and a pass list. It tells the person on duty what to do for each arrival — allow, late, stop, unknown — and keeps working when the connection drops.",
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
function IconWell({ Icon }: { Icon: PhosphorIcon }) {
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
 * Lead cell spans two rows for the gate photograph, with attendance and
 * alerts stacked beside it, then a wide closer.
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
            Four jobs the front desk stops doing by hand.
          </h2>
          {/* This line used to end "...the parent line and the fees ledger."
              There is no fees ledger. The finance capability was removed from
              the product for want of any source document describing it, and
              this sentence was the last place the claim survived. */}
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-muted">
            One installation covers the entrance, the attendance record, the people
            who need telling, and the screen the officer on the door actually
            holds. Each part works on its own and gets sharper alongside the
            others.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-12">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={0.06 * i} className={feature.span}>
              <SpotlightCard
                href={feature.href}
                className="h-full"
                media={
                  feature.image ? (
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={feature.image}
                        alt={feature.imageAlt ?? feature.title}
                        fill
                        sizes="(min-width: 768px) 60vw, 100vw"
                        className={feature.imageClassName}
                      />
                    </div>
                  ) : undefined
                }
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

                    <div className="pt-7">
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
            The same four run at a school gate, a factory turnstile, a clinic
            reception and an estate boom. What changes is the vocabulary, not the
            system.{" "}
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
