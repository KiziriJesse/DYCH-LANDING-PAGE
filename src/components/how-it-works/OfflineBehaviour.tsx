import { Reveal } from "@/components/ui/Reveal";

/**
 * What actually happens when something is down.
 *
 * WHY THIS SECTION EXISTS. The site already claimed the gate keeps reading
 * through an outage, which is true of the case everyone imagines: the
 * internet drops and the school's own network and unit carry on. It is not
 * true of the other case, where the tablet at the gate loses the unit, and
 * conflating the two is the kind of claim a technical buyer tests in the
 * first five minutes of a demo and never trusts you again after.
 *
 * So the two failures are separated, and the limit of the second is stated
 * plainly rather than left for somebody to discover. Offline gate mode does
 * roster lookup and records a release; it does not match faces. A page that
 * says that is worth more than a page that promises everything keeps working.
 *
 * The three rows are deliberately in failure order, not capability order:
 * most likely first, most constrained last.
 */
const STATES = [
  {
    label: "The internet goes down",
    body: "Recognition and the school's own workflows carry on, because matching happens on the unit standing on your premises and never depended on a round trip. What stops is anything that has to leave the building, so messages queue instead of sending.",
  },
  {
    label: "A gate device loses the unit",
    body: "The tablet falls back to the roster it already holds. Somebody can still be looked up and a release can still be recorded by the person on duty, so the entrance keeps working with a human making the call.",
  },
  {
    label: "The limit, stated plainly",
    body: "Offline gate mode does not match faces. It is lookup and recorded release, not recognition, and anything captured while the tablet is on its own reconciles with the record once the connection returns.",
  },
];

export function OfflineBehaviour() {
  return (
    <section className="bg-background px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <h2 className="max-w-[18ch] text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-foreground">
            Offline is not one thing.
          </h2>
          <p className="mt-5 max-w-[46ch] leading-relaxed text-muted">
            A system that stops when the connection does is worse than paper,
            because staff stop trusting it. Two different things can fail
            here and they do not fail the same way.
          </p>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <dl className="border-t border-border">
            {STATES.map((state, i) => (
              <Reveal
                as="div"
                key={state.label}
                delay={0.06 * i}
                className="border-b border-border py-6"
              >
                <dt className="font-semibold text-foreground">{state.label}</dt>
                <dd className="mt-1.5 max-w-[58ch] leading-relaxed text-muted">
                  {state.body}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
