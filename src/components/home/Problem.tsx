import { Reveal } from "@/components/ui/Reveal";

// TODO: confirm these three pain points with a head teacher before launch.
const PROBLEMS = [
  {
    lead: "The gate log is a book.",
    body: "A visitor writes a name in a ledger. Nobody checks it against anything, and by the afternoon the page is full and the morning is unreadable.",
  },
  {
    lead: "The register is marked late, or not at all.",
    body: "A teacher fills it in from memory at break. The errors surface at the end of term, by which point nobody can say who was actually in the room.",
  },
  {
    lead: "Parents hear last.",
    body: "A pupil who never arrived is noticed when the day ends. The call home lands hours after the moment it would have mattered.",
  },
];

/**
 * Text-led and card-free on purpose: it sits between the video hero and the
 * card grid below, so the page gets a flat, quiet beat instead of three
 * section types that all look alike.
 */
export function Problem() {
  return (
    <section className="bg-background px-4 py-28 sm:px-6 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <h2 className="max-w-[20ch] text-[clamp(2rem,4.6vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.03em] text-foreground">
            Right now, security and attendance run on trust and paper.
          </h2>
        </Reveal>

        <dl className="mt-16 border-t border-border">
          {PROBLEMS.map((item, i) => (
            <Reveal
              key={item.lead}
              delay={0.06 * i}
              className="grid gap-x-8 gap-y-3 border-b border-border py-9 md:grid-cols-12"
            >
              <dt className="text-xl font-semibold leading-snug tracking-[-0.015em] text-foreground md:col-span-5">
                {item.lead}
              </dt>
              <dd className="max-w-[58ch] leading-relaxed text-muted md:col-span-6 md:col-start-7">
                {item.body}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
