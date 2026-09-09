import { Reveal } from "@/components/ui/Reveal";

// TODO: confirm these three pain points with a head teacher and with an
// operations manager before launch. They are written from the school case,
// which is the one DYCH has documented; the business echo in each is an
// inference, not something a business customer has said.
const PROBLEMS = [
  {
    lead: "The entry log is a book.",
    body: "Someone writes a name in a ledger on the way in. Nobody checks it against anything, and by the afternoon the page is full and the morning is unreadable. A school gate and an office reception have exactly the same book.",
  },
  {
    lead: "The register is filled in from memory.",
    body: "A teacher marks it at break, or a manager reconstructs a timesheet on Friday. Either way the errors surface at the end of the term or the month, by which point nobody can say who was actually in the room.",
  },
  {
    lead: "The person who needed to know hears last.",
    body: "A pupil who never arrived is noticed when the day ends; a contractor who never left is noticed when the alarm is set. The call lands hours after the moment it would have mattered.",
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
          <h2 className="max-w-[20ch] text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.08] tracking-[-0.03em] text-foreground">
            Right now, security and attendance run on trust and paper.
          </h2>
          <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-muted">
            In a school it looks like this. In an office it looks almost
            identical, with different nouns.
          </p>
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
