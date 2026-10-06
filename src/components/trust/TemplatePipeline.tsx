import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

/**
 * What enrolment actually produces, drawn in three stages.
 *
 * This page asks a parent to believe its hardest claim on the strength of a
 * sentence: that enrolment keeps no photograph, only a mathematical template.
 * That claim is the one most likely to be read as reassurance rather than as
 * a statement of fact, and a paragraph cannot do much about it. The pictures
 * can - a face is found, it is reduced to the geometry between a handful of
 * landmarks, and what is written down is a row of numbers. Nothing in the
 * sequence is a photograph, which is the whole point.
 *
 * WHY THESE ARROWS ARE DRAWN HERE. The source illustrations arrived with the
 * connector that joined them baked into each file, running off the edge. It
 * was cropped out (see scripts/tint-figure.js) and rebuilt in markup for two
 * reasons: artwork connectors cannot reflow, and these stages stack into a
 * column on a phone, where a left-to-right arrow is simply wrong. Here the
 * arrow rotates with the layout, and it is aria-hidden because the ordered
 * list already carries the sequence for anyone not seeing it.
 */
const STAGES = [
  {
    src: "/figures/detect.png",
    title: "A face is found",
    body: "The camera takes a frame and locates the face in it. At this point nothing has been identified - the system knows only that a face is there.",
    /* Each file crops to its own subject, so the three differ in proportion.
       Carried through to the Image so Next renders them without distortion;
       the shared box below is what lines them up on the page. */
    width: 938,
    height: 933,
  },
  {
    src: "/figures/extract.png",
    title: "Its geometry is measured",
    body: "The distances and angles between landmarks - the corners of the eyes, the nose, the mouth - are measured. The measurements are what matter; the picture they came from is not kept.",
    width: 673,
    height: 845,
  },
  {
    src: "/figures/template.png",
    title: "Numbers are what is stored",
    body: "Those measurements become the template: a string of numbers held on the unit at your gate. It can be compared against a face at the gate. It cannot be turned back into one.",
    width: 625,
    height: 796,
  },
];

/* Front to back, one class per stage. Written out rather than computed
   because Tailwind reads these class names statically and would ship no
   z-index at all for a string it had to evaluate. All of them sit below
   --z-float (30), so nothing here can rise over the floating widget. */
const LAYER = ["z-20", "z-10", "z-0"];

export function TemplatePipeline() {
  /* The same ground as the commitments either side of it, not a band of its
     own: the cards are what should lift here, and they take --surface, which
     only reads as raised against the darker --background. Keeping the section
     on the commitments' ground also keeps the figure attached to the claim
     above it rather than floating between two of them. */
  return (
    <section className="bg-background px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <h2 className="max-w-[26ch] text-[clamp(1.5rem,3vw,2rem)] leading-[1.15] tracking-[-0.025em] text-foreground">
            What enrolment produces, and what it does not.
          </h2>
          <p className="mt-4 max-w-[62ch] leading-relaxed text-muted">
            The commitment above rests on a distinction worth seeing rather
            than taking on trust.
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {STAGES.map((stage, i) => (
            <Reveal
              as="li"
              key={stage.src}
              delay={0.08 * i}
              /* Named group, because SpotlightCard claims the plain `group`
                 for its own internals. The arrow sits outside the card, so it
                 has to listen to the stage rather than to the card.

                 LAYER is what keeps the arrow on top. Each stage animates in,
                 which gives it a stacking context of its own, so the z-index
                 on the arrow inside cannot lift it past a sibling - between
                 equals the later element in the document wins, and the arrow
                 straddling the gap was being cut in half by the card after
                 it. Ordering the stages back to front settles it: every stage
                 paints above the one it points at.

                 The hover step on top of that is not belt-and-braces. The
                 arrow advances toward the next card when its own card is
                 hovered, which carries it over that card's edge - exactly the
                 moment it must not be the one underneath. */
              className={`group/stage relative hover:z-30 ${LAYER[i] ?? "z-0"}`}
            >
              {/* The arrow sits between cards: to the right of each stage on a
                  row, below it in a column. The last stage has none, so it is
                  not pointing at the end of the list.

                  It belongs to the stage it follows and answers to that
                  stage's hover - filling with accent and advancing a step, so
                  the sequence reads as a direction of travel rather than as
                  three cards that happen to sit in a row. */}
              {i < STAGES.length - 1 && (
                <span
                  aria-hidden
                  /* Wider than the gap it straddles, so it overlaps the card
                     on either side and reads as sitting on top of the row
                     rather than slotted between two tiles. The ring is the
                     section's own ground, which is what separates it from the
                     card beneath without drawing a second border. */
                  /* z-20, not z-raise. SpotlightCard also takes z-raise, and
                     it is rendered after this span, so at equal height the
                     card won and ate the half of the arrow that overlaps it.
                     This has to clear the card inside its own stage as well
                     as the card in the stage next door. */
                  className="absolute left-1/2 top-full z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 rotate-90 items-center justify-center rounded-full border border-border bg-surface text-accent shadow-[var(--shade-lift)] ring-4 ring-background transition-[background-color,border-color,color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/stage:border-transparent group-hover/stage:bg-accent group-hover/stage:text-accent-ink motion-safe:group-hover/stage:translate-x-[calc(-50%+0.1875rem)] md:left-full md:top-1/2 md:rotate-0"
                >
                  <ArrowRight size={15} weight="bold" />
                </span>
              )}

              <SpotlightCard>
                {/* One fixed box for all three, with the art contained inside
                    it. The crops differ in proportion and letting each find
                    its own height would step the three headings out of line.

                    The lift on hover is small on purpose: at this size the
                    drawings are detailed, and anything more than a few
                    percent reads as the picture jumping rather than
                    responding. */}
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={stage.src}
                    alt=""
                    aria-hidden
                    width={stage.width}
                    height={stage.height}
                    className="h-full w-full object-contain object-center transition-transform duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-safe:group-hover/stage:scale-[1.04]"
                  />
                </div>

                <h3 className="mt-6 font-medium tracking-[-0.015em] text-foreground">
                  <span className="nums mr-2 text-faint">{i + 1}</span>
                  {stage.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                  {stage.body}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
