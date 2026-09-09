import Link from "next/link";
import {
  ArrowRight,
  DeviceMobileSpeaker,
  Export,
  ListChecks,
  ScanSmiley,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";

const ICON = { size: 22, weight: "light" } as const;

/*  Icons chosen against what each step actually does, not the first glyph the
    word suggests. A camera for "security", a fingerprint for "attendance", a
    bell for "alerts" and a rising chart for "analytics" are the four most
    predictable picks available, and together they are what makes a page read
    as assembled rather than designed.

      ScanSmiley           a face inside scan brackets - recognition, not
                           "security" in the abstract, and the same glyph
                           /product uses for the same capability.
      ListChecks           the register filling itself in. Attendance here
                           comes from the gate scan; there is no fingerprint
                           reader in this product, so that glyph was also
                           simply untrue.
      DeviceMobileSpeaker  the alert landing on the handset a parent already
                           carries. A bell is the notification in the
                           abstract; this is the notification arriving.
      Export               records leaving the system. The capability is live
                           counts and exports, not trend charts, so a rising
                           graph promised a dashboard that does not exist.  */
const FLOW = [
  {
    title: "Recognition",
    body: "A face is matched at the entry point, on hardware standing on your own site.",
    Icon: ScanSmiley,
  },
  {
    title: "Attendance",
    body: "That same scan writes the arrival straight into the register.",
    Icon: ListChecks,
  },
  {
    title: "Alerts",
    body: "A push notification reaches the parent in seconds, with SMS behind it.",
    Icon: DeviceMobileSpeaker,
  },
  {
    title: "Records",
    body: "Entry logs and attendance collect into one searchable view, and export.",
    Icon: Export,
  },
];

/**
 * A horizontal rail, so the section reads differently from the bento above it.
 * Single accent throughout: this is one flow, not four products.
 * No "Step 1 / Step 2" prefixes; position on the rail carries the order.
 */
export function HowItWorksTeaser() {
  return (
    <section className="bg-background px-4 py-28 sm:px-6 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <h2 className="max-w-[20ch] text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.08] tracking-[-0.03em] text-foreground">
            From the door to the office, in one line.
          </h2>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-muted">
            The four parts pass the same record along, so nothing is re-typed between
            the gate log and the report at the end of term.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* The rail. Horizontal on desktop, vertical on mobile. */}
          <div
            aria-hidden
            className="absolute left-6 top-0 h-full w-px bg-border md:left-0 md:top-6 md:h-px md:w-full"
          />

          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
            {FLOW.map((step, i) => (
              <Reveal
                key={step.title}
                as="li"
                delay={0.07 * i}
                className="relative flex gap-5 pl-0 md:block"
              >
                <span
                  aria-hidden
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent-line bg-wash text-accent-on-light"
                >
                  <step.Icon {...ICON} />
                </span>
                <div className="md:mt-6">
                  <h3 className="text-lg font-medium tracking-[-0.015em] text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[34ch] text-[0.9375rem] leading-relaxed text-muted">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={0.28}>
          <Link
            href="/how-it-works"
            className="group mt-14 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-accent-on-light underline decoration-[var(--accent-line)] decoration-2 underline-offset-[6px] transition-colors duration-300 hover:decoration-accent"
          >
            See How It Works
            <ArrowRight
              size={16}
              weight="bold"
              aria-hidden
              className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
