import type { Metadata } from "next";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "DYCH Technologies plans: Basic, Standard and Enterprise. The figure is confirmed after a free, no-obligation site visit.",
};

/*  NO FIGURES ON THIS PAGE, DELIBERATELY.

    The tier names and their contents come from the DYCH case-study deck, which
    also states the company's own pricing approach verbatim: "We confirm the
    exact figure after a free, no-obligation site visit." So the absence of a
    number here is not a gap to fill later; it is the stated approach, and the
    page says why rather than staying quiet about it.

    The internal spec does contain a per-SMS cost. That is an internal costing
    input, not customer-facing pricing, and it is not reproduced here. What IS
    said is that SMS carries a real per-message cost and is an add-on, because
    the spec is explicit that it must never be absorbed into a flat fee.  */
const PLANS = [
  {
    name: "Basic",
    tagline: "The gate, the register and the parent line. Where most schools start.",
    features: [
      "Weatherproof gate camera with on-device face matching",
      "Automatic attendance from the gate scan",
      "Arrival, absence and late-arrival alerts to parents",
      "Admin dashboard for records, cameras and reporting",
      "Installation and staff training included",
    ],
    recommended: false,
  },
  {
    name: "Standard",
    tagline: "Adds the Guard App, so the gate stops running on paper entirely.",
    features: [
      "Everything in Basic",
      "Guard App on a tablet at the gate",
      "Authorised pickup handling",
      "Digital visitor log, replacing the paper book",
      "Guard overrides, logged against an individual PIN",
      "SMS fallback available as a metered add-on",
    ],
    recommended: true,
  },
  {
    name: "Enterprise",
    tagline: "More than one site, or a school that needs us closer than a phone line.",
    features: [
      "Everything in Standard",
      "Multi-site coverage across campuses",
      "Dedicated support contact who has walked your sites",
      "Custom integrations with systems you already run",
      "Boarding management where a school has boarders",
    ],
    recommended: false,
  },
];

// TODO: confirm contract length, notice period and support response times with
// DYCH. These are commercial commitments, not copy, and the two bracketed
// answers below must not ship as they stand.
const FAQS = [
  {
    question: "What hardware do we need to provide?",
    answer:
      "Mains power at each entry point and somewhere weatherproof to mount a camera. We supply the cameras, the local matching unit and the gate tablet as part of the installation. A school does not buy hardware separately.",
  },
  {
    question: "Do we need reliable internet?",
    answer:
      "No. Matching runs on your own hardware and records are written locally, so the gate and the register keep working through an outage. Connectivity is what carries messages to parents and syncs records afterwards.",
  },
  {
    question: "Why is SMS priced separately?",
    answer:
      "Push notifications reach a parent within seconds and cost nothing per message, so they are the primary channel. SMS exists so parents without a smartphone are still reached, and it carries a real per-message cost. Charging for it honestly is better than folding it into a flat fee and quietly rationing it.",
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
    <>
      <PageHeader
        title="Three plans. The figure comes after we have seen your site."
        intro="Hardware, installation and training are part of a plan rather than a separate invoice. What changes the number is your site: how many entry points, how many pupils, and what is already there."
      />

      <section className="bg-background px-4 pb-24 pt-16 sm:px-6 lg:px-10 lg:pb-32">
        <div className="mx-auto grid max-w-[1240px] gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={0.07 * i}>
              <SpotlightCard
                className={"h-full " + (plan.recommended ? "border-accent-line" : "")}
              >
                <div className="flex h-full flex-col">
                  {/* Fixed-height head, so the feature lists in all three cards
                      start at the same Y position. */}
                  <div className="min-h-[8.5rem] border-b border-border pb-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <h2 className="text-2xl tracking-[-0.02em] text-foreground">
                        {plan.name}
                      </h2>
                      {plan.recommended && (
                        <span className="shrink-0 text-[0.8125rem] font-semibold text-accent-on-light">
                          Most schools
                        </span>
                      )}
                    </div>
                    <p className="mt-3 leading-relaxed text-muted">{plan.tagline}</p>
                  </div>

                  <ul className="mt-7 flex flex-col gap-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <Check
                          size={18}
                          weight="bold"
                          aria-hidden
                          className="mt-[3px] shrink-0 text-accent-on-light"
                        />
                        <span className="leading-relaxed text-muted">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Pinned to the bottom, so all three buttons line up however
                      long the lists above them are.

                      All three are now identical. The recommended tier used to
                      get a filled, glowing button and the other two an outline,
                      which is exactly the fill the interactive spec bans - and
                      it also made the three CTAs different heights. The tier is
                      still marked, by the "Most schools" label above. */}
                  <div className="mt-auto pt-9">
                    <Button href="/contact" size="lg" className="w-full justify-center">
                      Book a site visit
                    </Button>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Says why there is no number, rather than leaving a conspicuous gap. */}
      <section className="bg-surface-raised px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
        <Reveal className="mx-auto max-w-[1240px]">
          <h2 className="max-w-[24ch] text-[clamp(1.5rem,3.2vw,2.25rem)] leading-[1.12] tracking-[-0.03em] text-foreground">
            Why there is no price on this page.
          </h2>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-muted">
            Because we would be guessing. The number depends on how many entry points
            you have, how many pupils are on the roll, whether there are boarders,
            what power and network already reach the gate, and how much of it we can
            reuse. A figure quoted before any of that is known is either padded to be
            safe or revised upwards later, and neither is a good way to begin.
          </p>
          <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-muted">
            So we confirm the exact figure after a free, no-obligation site visit. The
            visit costs nothing whether or not you go ahead, and it ends with a
            written scope you can take to your board.
          </p>
        </Reveal>
      </section>

      {/* A two-column list rather than an accordion: these answers are worth
          reading, and hiding them behind a click helps nobody. */}
      <section className="bg-background px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
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
                <dt className="text-lg font-medium leading-snug text-foreground lg:col-span-5">
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
        title="Book the site visit. It costs nothing either way."
        body="An hour walking your entry points, and a written scope at the end of it. If it is not right for your school, we will say so."
      />
    </>
  );
}
