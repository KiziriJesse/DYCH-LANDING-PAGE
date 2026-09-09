import type { Metadata } from "next";
import { ArrowUpRight, Check } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "DYCH Technologies pricing: a trial on one entry point, or a full school deployment, with hardware and support included.",
};

/*  TODO: no real prices exist on this page.

    Every figure is the literal string "[Placeholder price]". Nothing here has
    been costed, and the feature splits below are a proposal about what each
    tier should contain, not a commercial decision DYCH has made. Confirm the
    tiers, what is in each, and the numbers before this page is reachable by
    anyone outside the team.  */
const PLANS = [
  {
    name: "One gate",
    tagline: "A trial on a single entry point, so the school can judge it on its own site.",
    price: "[Placeholder price]",
    unit: "per term",
    features: [
      "One entry point: camera, reader and local matching unit",
      "Enrolment for the classes that use that gate",
      "Automatic attendance for enrolled pupils",
      "Arrival, departure and missing-pupil alerts",
      "Installation and staff training included",
      "Support by phone and WhatsApp during term",
    ],
    recommended: false,
  },
  {
    name: "Whole school",
    tagline: "Every entry point, the full register, fees and reporting across the site.",
    price: "[Placeholder price]",
    unit: "per term",
    features: [
      "Every entry point on the site, including secondary gates",
      "Enrolment for the full roll, run class by class",
      "Attendance, alerts, fees and finance",
      "Analytics and exports for board papers and ministry returns",
      "Installation, staff training and parent enrolment support",
      "Priority support, with a named contact who has seen your site",
    ],
    recommended: true,
  },
];

// TODO: confirm each answer with DYCH. Contract length and support hours in
// particular are commercial commitments, not copy.
const FAQS = [
  {
    question: "What hardware do we need to provide?",
    answer:
      "Mains power at each entry point and somewhere weatherproof to mount a camera. We supply the cameras, readers and the local matching unit as part of the installation. A school does not buy hardware separately.",
  },
  {
    question: "Do we need reliable internet?",
    answer:
      "No. Matching runs on site and records are written locally, so the gate and the register keep working through an outage. Connectivity is what lets messages reach parents and records synchronise afterwards.",
  },
  {
    question: "How long is the commitment?",
    answer:
      "[Placeholder: confirm contract length and notice period.] The intent is that a school can start on one gate for a term and decide afterwards, rather than signing for a year before seeing it work.",
  },
  {
    question: "What happens if something breaks mid-term?",
    answer:
      "[Placeholder: confirm response times and whether cover is on site or remote.] Support reaches us on the same phone and WhatsApp numbers as everything else, and the person who answers has usually walked your site.",
  },
];

export default function PricingPage() {
  return (
    <div className="theme-light">
      <PageHeader
        title="Start with one gate. Decide after that."
        intro="Two ways in: a trial on a single entry point, or a full deployment across the school. Hardware, installation and training are part of the plan rather than a separate invoice."
      />

      <section className="bg-background px-4 pb-24 pt-16 sm:px-6 lg:px-10 lg:pb-32">
        <div className="mx-auto grid max-w-[1100px] gap-6 lg:grid-cols-2">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={0.07 * i}>
              <SpotlightCard
                className={
                  "h-full " + (plan.recommended ? "border-accent-line" : "")
                }
              >
                <div className="flex h-full flex-col">
                  {/* Fixed-height head, so the feature lists in both cards
                      start at the same Y position. */}
                  <div className="min-h-[9.5rem]">
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="text-2xl tracking-[-0.02em] text-foreground">
                        {plan.name}
                      </h2>
                      {plan.recommended && (
                        <span className="shrink-0 text-[0.8125rem] font-semibold text-accent">
                          Most schools end up here
                        </span>
                      )}
                    </div>
                    <p className="mt-3 max-w-[42ch] leading-relaxed text-muted">
                      {plan.tagline}
                    </p>
                  </div>

                  <div className="border-y border-border py-6">
                    <p className="text-2xl font-bold tracking-[-0.02em] text-foreground">
                      {plan.price}
                    </p>
                    <p className="mt-1 text-[0.9375rem] text-muted">{plan.unit}</p>
                  </div>

                  <ul className="mt-7 flex flex-col gap-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <Check
                          size={18}
                          weight="bold"
                          aria-hidden
                          className="mt-[3px] shrink-0 text-accent"
                        />
                        <span className="leading-relaxed text-muted">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Pinned to the bottom, so both buttons line up however
                      long the lists above them are. */}
                  <div className="mt-auto pt-9">
                    <Link
                      href="/contact"
                      className={
                        "group inline-flex w-full items-center justify-center gap-3 rounded-full py-3.5 pl-6 pr-4 text-[0.9375rem] font-semibold transition-[transform,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] " +
                        (plan.recommended
                          ? "bg-accent text-accent-ink shadow-[var(--glow-cta)] hover:shadow-[var(--glow-cta-hover)]"
                          : "border border-border-strong text-foreground hover:border-accent-line")
                      }
                    >
                      Book a Demo
                      <ArrowUpRight
                        size={17}
                        weight="bold"
                        aria-hidden
                        className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[2px]"
                      />
                    </Link>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* A two-column list rather than an accordion: four answers are worth
          reading, and hiding them behind a click helps nobody. */}
      <section className="bg-surface px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <h2 className="max-w-[20ch] text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-foreground">
              What schools ask before they sign.
            </h2>
          </Reveal>

          <dl className="mt-14 border-t border-border">
            {FAQS.map((faq, i) => (
              <Reveal
                key={faq.question}
                delay={0.05 * i}
                className="grid gap-x-12 gap-y-3 border-b border-border py-8 lg:grid-cols-12"
              >
                <dt className="text-lg font-semibold leading-snug text-foreground lg:col-span-5">
                  {faq.question}
                </dt>
                <dd className="max-w-[62ch] leading-relaxed text-muted lg:col-span-6 lg:col-start-7">
                  {faq.answer}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand
        title="We will quote after we have seen the site, not before."
        body="Entry points, power and the size of your roll all change the number. A site assessment costs nothing and ends with a written scope."
      />
    </div>
  );
}
