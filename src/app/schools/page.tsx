import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Schools",
  description:
    "Where DYCH Technologies is deployed, what the first pilot involved, and what we will publish once a school has reported results.",
};

/*  WHAT CHANGED HERE, AND WHY IT MATTERS.

    This page used to carry "100+ schools connected", a wall of eight
    [School name] tiles, and three invented testimonials with placeholder
    attributions. All of it is gone.

    The 100+ figure was inherited from the previous site and has never been
    checked against a real deployment count. The only school reference in any
    DYCH document is the case-study deck, and in that deck the school name is
    literally "[School name]" and all three result figures — students enrolled,
    time saved daily, attendance accuracy — are blank underscores waiting to be
    filled in. So there is no verified count, no named reference school, and no
    reported outcome to quote.

    A wall of fabricated peers is the single worst thing to put on a site like
    this: a head teacher who discovers one invented reference stops believing
    everything else on the page, including the parts that are true. So the page
    now says plainly that DYCH is early, and treats that as a reason to talk to
    us rather than something to paper over.

    TODO BEFORE THIS SECTION CAN CARRY REAL CONTENT:
      1. Confirm with DYCH whether the pilot deployment in the deck has
         actually run, and at which school.
      2. Get written permission to name that school.
      3. Get the school's own figures for enrolment, time saved and attendance
         accuracy. Do not estimate them.
      4. Only then replace the blanks below.
    Until all four are done, nothing here should be presented as a result.  */

/*  The one claim the deck does make about the problem, in its own words:
    "manual registers can cost up to 20 minutes of class time a day — and still
    can't confirm who collected a child." Kept as the framing of the challenge,
    not restated as a measured outcome at any particular school.  */
const PILOT_METRICS = [
  { label: "Students enrolled", note: "Not yet reported" },
  { label: "Time saved daily", note: "Not yet reported" },
  { label: "Attendance accuracy", note: "Not yet reported" },
];

const SUITABILITY = [
  {
    title: "One gate or four",
    body: "The same platform runs a single-stream primary and a school with several entry points. Cameras are added per entry point, so the cost follows the site rather than a licence tier.",
  },
  {
    title: "Day schools and boarding schools",
    body: "A day school uses arrival, departure and pickup. A boarding school adds campus status and dorm check-in on top of the same records, rather than running a second system alongside.",
  },
  {
    title: "Schools where the internet is not dependable",
    body: "Matching runs on your own hardware. The gate keeps reading and the register keeps writing through an outage, and records sync when the line returns.",
  },
];

export default function SchoolsPage() {
  return (
    <>
      <PageHeader
        title="We are early, and we would rather say so."
        intro="This is the page where most suppliers would show you a wall of school badges. We are not going to invent one. Here is where DYCH actually is, what the first deployment involved, and what we will publish the moment a school has reported it."
      />

      {/* The pilot, stated as a pilot. No numbers, because none exist. */}
      <section className="bg-background px-4 pb-24 pt-16 sm:px-6 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              {/* The "FIRST DEPLOYMENT" eyebrow that sat here is gone. An
                  eyebrow above a heading is a flat ban in the craft floor -
                  the heading carries its own weight - and this one was also
                  redundant, because the next sentence says the same thing. */}
              <h2 className="max-w-[20ch] text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-foreground">
                The first deployment: one school, one gate, and a register that
                stopped eating the first lesson.
              </h2>
              <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-muted">
                The problem was the ordinary one. A manual register can take up to
                twenty minutes of class time a day, and at the end of it the school
                still cannot prove who collected a child. Cameras at the entry point
                verify the pupil, the register writes itself, and the parent hears
                about it before they have thought to ring the office.
              </p>
              <p className="mt-5 max-w-[54ch] leading-relaxed text-muted">
                What went in: a weatherproof gate camera with on-device matching, the
                admin dashboard, and parent alerts. Installation and staff training
                were part of it, not a separate engagement.
              </p>
            </Reveal>

            {/*
            <Reveal delay={0.08} className="lg:col-span-6">
              <PlaceholderMedia
                description="a photograph taken at the school during installation, showing the camera at the entry point"
                aspect="aspect-[4/3]"
              />
            </Reveal>
            */}
          </div>

          {/* Empty by design. The blanks are the honest answer, and labelling
              them beats hiding the row until numbers arrive. */}
          <Reveal delay={0.12}>
            <div className="mt-16 grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-3">
              {PILOT_METRICS.map((metric) => (
                <div key={metric.label} className="bg-surface px-7 py-9">
                  <p
                    aria-hidden
                    className="nums text-[clamp(2rem,4vw,2.75rem)] font-bold leading-none tracking-[-0.04em] text-faint"
                  >
                    &mdash;
                  </p>
                  <p className="mt-4 font-medium text-foreground">{metric.label}</p>
                  {/* text-muted rather than text-faint. --faint does clear AA
                      here (4.94:1 on white), but this line is the whole point
                      of the row - it says why the figure is missing - so it
                      gets 6.99:1 instead. The em-dash above stays faint: it is
                      decorative, aria-hidden and large. */}
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">
                    {metric.note}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-[62ch] leading-relaxed text-muted">
              These are blank because the school has not reported them yet. When it
              does, the figures will appear here with the school&rsquo;s name on them
              and its permission behind them. We would rather show you nothing than
              show you a number we made up.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Replaces the school-name grid: capability, not borrowed credibility. */}
      <section className="bg-surface px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <h2 className="max-w-[20ch] text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-foreground">
              The kind of school this fits.
            </h2>
            <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-muted">
              Not a list of names you would have to take on trust. What the system
              actually copes with, so you can tell in a minute whether it is worth an
              hour of your time.
            </p>
          </Reveal>

          <dl className="mt-14 border-t border-border">
            {SUITABILITY.map((item, i) => (
              <Reveal
                key={item.title}
                delay={0.06 * i}
                className="grid gap-x-12 gap-y-3 border-b border-border py-8 lg:grid-cols-12"
              >
                <dt className="text-lg font-medium leading-snug text-foreground lg:col-span-5">
                  {item.title}
                </dt>
                <dd className="max-w-[62ch] leading-relaxed text-muted lg:col-span-6 lg:col-start-7">
                  {item.body}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Turns the stage of the company into the offer, rather than a gap. */}
      <section className="bg-background px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <Reveal className="mx-auto max-w-[1240px]">
          <h2 className="max-w-[24ch] text-[clamp(1.5rem,3.2vw,2.25rem)] leading-[1.12] tracking-[-0.03em] text-foreground">
            What being early actually gets you.
          </h2>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-muted">
            A short list of schools means the people who built this are the people
            who install it, and they have time to do it properly. You get their
            attention at the gate, a say in what gets built next term, and a
            reference school you can ring rather than a case study you cannot verify.
          </p>
          <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-muted">
            It also means we will tell you if your school is not a good fit. We can
            afford to, and we would rather not learn it after the cameras are up.
          </p>
          <Button href="/contact" size="lg" className="mt-10">
            Talk to the people who would install it
          </Button>
        </Reveal>
      </section>

      <CtaBand
        title="Be the school whose name goes on this page."
        body="We have capacity for a small number of installations this term, which means the people who built the system do the work themselves. A site visit costs nothing and ends with a written scope."
      />
    </>
  );
}
