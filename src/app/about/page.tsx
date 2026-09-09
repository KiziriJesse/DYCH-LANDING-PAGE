import type { Metadata } from "next";
import { MapPin } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who DYCH Technologies is, why the company exists, and where it operates from in Kampala, Uganda.",
};

// TODO: names, roles and photographs are all placeholders. Replace every one
// before launch. Invented people on an About page are worse than an empty
// section, so delete any card that has no real person behind it rather than
// leaving a bracketed name in production.
const TEAM = [
  {
    name: "[Full name]",
    role: "Founder and Managing Director",
    photo: "a portrait of the founder",
  },
  {
    name: "[Full name]",
    role: "Engineering lead",
    photo: "a portrait of the engineering lead",
  },
  {
    name: "[Full name]",
    role: "Deployment and support",
    photo: "a portrait of the deployment lead",
  },
  {
    name: "[Full name]",
    role: "School partnerships",
    photo: "a portrait of the partnerships lead",
  },
];

export default function AboutPage() {
  return (
    <div className="theme-light">
      <PageHeader
        title="Intelligent automation, built by DYCH Technologies."
        intro="We build automation and system management for industries and education across Africa, from Kampala. Smart School Systems is what that work looks like when it is pointed at a school gate."
      />

      {/* Text-led, no cards: the reason the company exists should not be
          delivered in a tile. */}
      <section className="bg-background px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            {/* TODO: this is a proposed articulation of why DYCH exists, not a
                statement DYCH has made. Confirm or rewrite with the founder. */}
            <p className="max-w-[24ch] text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.03em] text-foreground">
              A school already knows who should be on its grounds. It just has no
              reliable way to prove it.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-x-16 gap-y-8 lg:grid-cols-12">
            <Reveal delay={0.06} className="lg:col-span-6">
              <p className="max-w-[58ch] text-lg leading-relaxed text-muted">
                Most of the tools sold to solve that were designed somewhere with
                dependable power, cheap bandwidth and a parent body that installs
                apps. They arrive here, meet a two-hour outage in the first week, and
                the school goes back to the paper register it never really left.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-6">
              <p className="max-w-[58ch] text-lg leading-relaxed text-muted">
                We build for the conditions that actually exist: matching that runs on
                site, records that survive an outage, and messages that reach a
                guardian over SMS because that is the channel they already have. The
                same platform runs a single-stream primary and a multi-campus
                secondary, because the hardware scales down as readily as it scales
                up.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-surface px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <h2 className="max-w-[20ch] text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-foreground">
              The people who install it and answer the phone.
            </h2>
            <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-muted">
              A deployment is a small team walking your site, not a support ticket
              queue in another time zone.
            </p>
          </Reveal>

          {/* Four cards rather than three, and no hover spotlight: these are not
              links, so they should not suggest they can be clicked. */}
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((person, i) => (
              <Reveal as="li" key={person.role} delay={0.05 * i}>
                <div className="flex h-full flex-col">
                  <PlaceholderMedia description={person.photo} aspect="aspect-[4/5]" />
                  <h3 className="mt-5 font-medium tracking-[-0.015em] text-foreground">
                    {person.name}
                  </h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">
                    {person.role}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-background px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1240px] items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h2 className="max-w-[16ch] text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-foreground">
              Where we operate
            </h2>
            <p className="mt-5 flex items-center gap-2 text-lg text-foreground">
              <MapPin size={20} weight="light" aria-hidden className="text-accent" />
              {CONTACT.location}
            </p>
            <p className="mt-6 max-w-[46ch] leading-relaxed text-muted">
              Installations are within reach of a drive from Kampala, which is
              deliberate. Someone who can stand at your gate is worth more than a
              support line, and it keeps the promise of a site visit honest.
            </p>

            {/* The "100+ schools connected" stat that stood here has been
                removed, along with its copies on the homepage and /schools.
                It came from the previous site and no DYCH document supports
                it. Nothing has been substituted, because a company this early
                has no honest number to put in its place. */}
            <div className="mt-10 border-t border-border pt-8">
              <p className="max-w-[46ch] leading-relaxed text-muted">
                We are early, and the deployment list is short. That is on purpose
                for now: the people who built the system are the ones installing
                it, and there is a limit to how many gates that can cover well in
                a term.
              </p>
              <Link
                href="/schools"
                className="mt-5 inline-block border-b border-accent-line pb-0.5 font-semibold text-accent transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-accent"
              >
                Where we are so far
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
            <PlaceholderMedia
              description="a photograph of the team on site at a school gate during an installation"
              aspect="aspect-[4/3]"
            />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Come and meet the team that would install it."
        body="A site assessment is a walk around your entry points and an hour of questions, with the people who would do the work."
      />
    </div>
  );
}
