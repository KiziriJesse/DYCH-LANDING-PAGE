import Link from "next/link";
import {
  ArrowRight,
  BellRinging,
  ChartLineUp,
  Fingerprint,
  SecurityCamera,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";

const ICON = { size: 22, weight: "light" } as const;

const FLOW = [
  {
    title: "Security",
    body: "Cameras and facial recognition wired to the entry points.",
    Icon: SecurityCamera,
  },
  {
    title: "Attendance",
    body: "RFID or biometric marking writes the arrival to the register.",
    Icon: Fingerprint,
  },
  {
    title: "Alerts",
    body: "SMS and WhatsApp notifications reach the parent immediately.",
    Icon: BellRinging,
  },
  {
    title: "Analytics",
    body: "Security logs and attendance trends collect into one view.",
    Icon: ChartLineUp,
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
            From the gate to the head teacher, in one line.
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
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent-line bg-surface text-accent"
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
            className="group mt-14 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-accent underline decoration-[var(--accent-line)] decoration-2 underline-offset-[6px] transition-colors duration-300 hover:decoration-accent"
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
