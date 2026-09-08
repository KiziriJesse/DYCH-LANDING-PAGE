import { Reveal } from "@/components/ui/Reveal";

// TODO: add real durations to each stage once DYCH confirms typical lead times.
// They are deliberately absent rather than invented, since a school will plan
// a term around whatever number appears here.
const STAGES = [
  {
    title: "Site assessment",
    body: "We walk the entry points with you, check power and connectivity, and agree how many gates are in scope.",
  },
  {
    title: "Hardware install",
    body: "Cameras, readers and the local unit go in, out of teaching hours where the school prefers it.",
  },
  {
    title: "Staff training",
    body: "The office and gate staff learn enrolment, the unmatched-face prompt, and how to correct a record.",
  },
  {
    title: "Go live",
    body: "Enrolment runs class by class, alerts are switched on once guardian numbers are confirmed.",
  },
];

/**
 * Horizontal timeline on a raised substrate, so it reads as a different kind
 * of thing from the sticky spine above it: that section is how the product
 * works, this one is how a school gets to the point of using it.
 */
export function DeploymentTimeline() {
  return (
    <section className="bg-surface px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <h2 className="max-w-[20ch] text-[clamp(1.75rem,3.6vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.03em] text-foreground">
            Deployment and support
          </h2>
          <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-muted">
            Four stages between the first conversation and the first automatic
            message home. A school stays on paper until the last one, so there is no
            week where neither system is trusted.
          </p>
        </Reveal>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          {/* The track. Vertical on mobile, horizontal from md up. */}
          <div
            aria-hidden
            className="absolute left-[7px] top-2 h-full w-px bg-border md:left-0 md:top-[7px] md:h-px md:w-full"
          />

          {STAGES.map((stage, i) => (
            <Reveal
              key={stage.title}
              as="li"
              delay={0.07 * i}
              className="relative flex gap-5 md:block"
            >
              <span
                aria-hidden
                className="mt-1.5 block h-[15px] w-[15px] shrink-0 rounded-full border-2 border-accent bg-background md:mt-0"
              />
              <div className="md:mt-6">
                <h3 className="font-bold tracking-[-0.015em] text-foreground">
                  {stage.title}
                </h3>
                <p className="mt-2 max-w-[34ch] text-[0.9375rem] leading-relaxed text-muted">
                  {stage.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
