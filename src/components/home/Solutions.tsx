import {
  Buildings,
  Church,
  Factory,
  FirstAid,
  GraduationCap,
  HardHat,
  House,
  Storefront,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

/*  The sectors, in DYCH's own words and DYCH's own order.

    EDUCATION IS THE LAST CARD, DELIBERATELY. It used to be the entire site.
    The brief is explicit that it belongs here as one sector among several,
    not as the homepage, and putting it first would quietly undo that while
    appearing to comply. It keeps the only link in the grid because it is the
    only sector with a page of its own so far.

    Not cards with borders and shadows. Eight bordered tiles of icon plus
    heading plus text is the most predictable section on the internet, and the
    page already spends a bento above this. Hairline rules and a tight grid
    say the same thing with less furniture.  */
const SECTORS = [
  {
    Icon: Buildings,
    title: "Corporate offices",
    body: "Staff timekeeping without clock cards. Reception sees who entered. Unknown faces become logged visitors rather than silent walk-ins, and HR gets a daily attendance export.",
  },
  {
    Icon: Factory,
    title: "Factories and warehouses",
    body: "Shift presence at the gate rather than at a desk. Late and absence records that stand up in payroll and in a safety briefing. Contractors logged at the entrance like everyone else.",
  },
  {
    Icon: HardHat,
    title: "Construction and project sites",
    body: "Who is on site right now, which is the question that matters when something happens. Check-in for workers and subcontractors, a record of deliveries and inspectors, and tablets at the perimeter even when the office PC is elsewhere.",
  },
  {
    Icon: FirstAid,
    title: "Healthcare and clinics",
    body: "Staff attendance for rotas, controlled entry to restricted areas, and a visitor log for family and vendors. An audit trail for every time somebody was let through without a match.",
  },
  {
    Icon: Storefront,
    title: "Hospitality and facilities",
    body: "Staff check-in for hotels, gyms and event venues. Members recognised at the door. Guests logged at reception instead of on a clipboard that walks off.",
  },
  {
    Icon: House,
    title: "Estates and gated communities",
    body: "Residents recognised at the boom or the pedestrian gate. Guests logged against the host expecting them. Release on the tablet when the network drops, syncing when it returns.",
  },
  {
    Icon: Church,
    title: "Places of worship and NGOs",
    body: "Volunteer and staff presence without a sign-in sheet. Visitor records for events. A message to the coordinator when the person they are waiting for arrives.",
  },
  {
    Icon: GraduationCap,
    title: "Education",
    body: "Pupil and staff attendance, alerts to guardians, and authorised pickup at the gate. The same engine as every card above, with the vocabulary a school uses.",
    href: "/product/schools",
  },
];

export function Solutions() {
  return (
    <section
      id="solutions"
      className="bg-background px-4 py-28 sm:px-6 lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <h2 className="max-w-[20ch] text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.08] tracking-[-0.03em] text-foreground">
            One system. Eight vocabularies.
          </h2>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-muted">
            A pupil, an employee, a contractor, a resident and a member of a
            congregation are the same problem wearing different nouns: somebody
            arrived, and the building should know. What changes between these is
            the language on the screen, not the system behind it.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-4">
          {SECTORS.map((sector, i) => (
            <Reveal
              as="li"
              key={sector.title}
              delay={0.04 * i}
              className="border-t border-border py-8"
            >
              <span
                aria-hidden
                className="flex h-11 w-11 items-center justify-center rounded-full border border-accent-line bg-wash text-accent-on-light"
              >
                <sector.Icon size={22} weight="light" />
              </span>
              <h3 className="mt-5 text-lg font-medium leading-snug tracking-[-0.015em] text-foreground">
                {sector.title}
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                {sector.body}
              </p>
              {sector.href && (
                <Link
                  href={sector.href}
                  className="mt-4 inline-block border-b border-accent-line pb-0.5 text-[0.9375rem] font-semibold text-accent-on-light transition-colors duration-150 hover:border-accent"
                >
                  See the education product
                </Link>
              )}
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.2}>
          <p className="mt-12 max-w-[62ch] leading-relaxed text-muted">
            Running something that is not on this list? The questions are the
            same &mdash; who is this person, are they allowed here now, when did
            they arrive and leave, and who else came through. Tell us what your
            entrance looks like and we will say whether this helps.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
