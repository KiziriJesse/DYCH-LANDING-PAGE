import { Reveal } from "@/components/ui/Reveal";

/*  DYCH's own "old way / what changes" list, which is a sharper frame than
    the three pain points that were here: it names the thing being replaced
    rather than describing a bad morning. Six rows, in their order. */
const PROBLEMS = [
  {
    lead: "Shared access cards",
    body: "The credential is the person, not a badge that can be lent, copied or left at home.",
  },
  {
    lead: "Manual registers",
    body: "Cameras mark presence as people pass. Nobody fills anything in, so there is nothing to fill in late.",
  },
  {
    lead: "No idea who is on site",
    body: "A live on-site list and a live visitor list, both of which answer the question in the moment somebody asks it.",
  },
  {
    lead: "Disputes over time",
    body: "Check-in and check-out timestamps, and an export you can put in front of whoever is disputing them.",
  },
  {
    lead: "Unknown walk-ins",
    body: "An unrecognised face raises a stop event. Somebody has to log a visitor or record an override; nobody simply walks through.",
  },
  {
    lead: "A weak door process",
    body: "Paired devices, named guard accounts, PIN overrides with a written reason, and an audit log none of them can edit.",
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
            Right now, access and attendance run on trust and paper.
          </h2>
          <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-muted">
            Six things most premises still do the hard way, and what each one
            becomes.
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
