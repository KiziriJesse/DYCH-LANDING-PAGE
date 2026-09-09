import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export const metadata: Metadata = {
  title: "Schools",
  description:
    "Schools using DYCH Technologies for security, attendance and parent communication across Uganda.",
};

/*  TODO: nothing on this page is real yet.

    Every school name and every quotation below is a bracketed placeholder.
    Social proof is the one part of a site where invented content does actual
    damage: a school that discovers a fabricated peer will not come back. So
    each tile and card must be either replaced with a real, permissioned
    reference or deleted outright. Do not ship a partially filled wall.

    For each testimonial you will need written permission to use the person's
    name, role, school and photograph.  */
const SCHOOL_SLOTS = 8;

const TESTIMONIALS = [
  {
    quote:
      "The gate log used to be a book nobody read. Now I can tell a parent exactly when their child arrived, while they are still on the phone.",
    name: "[Full name]",
    role: "Head Teacher",
    school: "[School name]",
    photo: "a portrait of the head teacher at their school",
  },
  {
    quote:
      "We stopped reconstructing the register from memory at break. It is simply correct when the teacher opens it.",
    name: "[Full name]",
    role: "Deputy Head",
    school: "[School name]",
    photo: "a portrait of the deputy head",
  },
  {
    quote:
      "Parents stopped calling the office to ask whether their child made it in. The message reaches them before they think to ask.",
    name: "[Full name]",
    role: "School Administrator",
    school: "[School name]",
    photo: "a portrait of the school administrator",
  },
];

export default function SchoolsPage() {
  return (
    <div className="theme-light">
      <PageHeader
        title="The schools already running on DYCH."
        intro="Who is using the system, what changed for them, and what they say about it in their own words."
      />

      {/* TODO: same unverified figure as the homepage and /about. Replace with
          a real deployment count or remove the stat from all three places. */}
      <section className="bg-background px-4 pb-20 pt-12 sm:px-6 lg:px-10">
        <Reveal className="mx-auto max-w-[1240px] border-y border-border py-12">
          <p className="nums text-[clamp(3.5rem,10vw,7rem)] font-bold leading-none tracking-[-0.04em] text-foreground">
            100+
          </p>
          <p className="mt-4 text-lg font-medium text-accent">Schools connected</p>
        </Reveal>
      </section>

      <section className="bg-surface px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <h2 className="max-w-[20ch] text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-foreground">
              Primary and secondary, single site and multi-campus.
            </h2>
            <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-muted">
              The same platform runs a single-stream primary and a school with four
              entry points, because the hardware scales down as readily as it scales
              up.
            </p>
          </Reveal>

          {/* Names only, no category labels underneath: the reference is the
              credibility, a label adds nothing. */}
          <ul className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: SCHOOL_SLOTS }, (_, i) => (
              <li
                key={i}
                className="flex min-h-[7.5rem] items-center justify-center bg-surface px-5 py-8 text-center"
              >
                <span className="text-[0.9375rem] leading-relaxed text-faint">
                  [School name]
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-background px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <h2 className="max-w-[20ch] text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-foreground">
              In their own words.
            </h2>
          </Reveal>

          {/* SpotlightCard is used for sets of comparable objects the reader
              scans across: features, plans, references. The team grid on
              /about deliberately does not use it, because colleagues are a
              directory rather than a set being compared. */}
          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((item, i) => (
              <Reveal as="li" key={item.role} delay={0.07 * i}>
                <SpotlightCard className="h-full">
                  <figure className="flex h-full flex-col">
                    <blockquote className="text-lg leading-relaxed text-foreground">
                      <p>“{item.quote}”</p>
                    </blockquote>

                    <figcaption className="mt-auto flex items-center gap-4 pt-8">
                      {/* A fixed round slot rather than PlaceholderMedia, which
                          is a full-width block element and blows the caption
                          out of the card at this size. */}
                      <span
                        role="img"
                        aria-label={`Placeholder for ${item.photo}`}
                        className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-dashed border-border-strong bg-surface-raised/40 text-center text-[0.5rem] leading-tight text-faint"
                      >
                        Photo
                      </span>
                      <span className="min-w-0">
                        <span className="block font-semibold text-foreground">
                          {item.name}
                        </span>
                        <span className="block text-[0.9375rem] leading-relaxed text-muted">
                          {item.role}, {item.school}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </SpotlightCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Ask one of them what the first term was like."
        body="We will put you in touch with a school of a similar size, and you can hear it without us in the room."
      />
    </div>
  );
}
