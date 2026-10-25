import type { Metadata } from "next";
import { UsersThree, IdentificationCard, Clock } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { sequenceAccent } from "@/lib/palette";

export const metadata: Metadata = {
  title: "Churches & Worship Centres",
  description:
    "Guest reception, team attendance and care around the few spaces that need it, for churches and worship centres, from DYCH Technologies.",
};

/*  ============================================================
    CHURCHES & WORSHIP CENTRES. READ BEFORE EDITING.

    THE TONE IS THE PRODUCT HERE. A church is an open house by definition,
    and a page that arrives talking about controlled entry and identity
    verification will lose the reader in the first paragraph however good the
    technology is. The order below is deliberate: say what we are not for,
    then guests, then teams, then the narrow case where recognition belongs.

    DO NOT LET RECOGNITION LEAD. On every other industry page the entrance is
    the headline. Here it is the third item and it is qualified, because
    recognising a congregation at the door is not something DYCH is selling
    and should not be implied.

    This is also not church-management software. Giving, membership, pastoral
    care and rotas belong to the platforms churches already run, and saying
    so plainly is what makes the narrow offer credible.
    ============================================================  */

const WHERE = [
  {
    Icon: IdentificationCard,
    title: "Guests, on a day that matters",
    body: "A visitor record for conferences, weddings, funerals and the days a building fills with people nobody at the door recognises. It is a reception process, not a checkpoint, and it exists so the team can follow up warmly afterwards rather than so anybody is screened on the way in.",
    anchor: "/product#visitor-management",
    cta: "Visitor Management",
  },
  {
    Icon: Clock,
    title: "Paid staff and operational teams",
    body: "Where a church employs people, hours still have to be recorded. The same arrival scan writes the attendance record, which spares an administrator reconciling a notebook at the end of the month. Volunteers are a different question and we would not push it there.",
    anchor: "/product#staff-attendance",
    cta: "Staff Attendance",
  },
  {
    Icon: UsersThree,
    title: "The few spaces that need care",
    body: "An office with the safe in it, a store, a children's area that should only admit cleared adults. Recognition belongs at those doors and almost nowhere else on the site, and we would rather fit one entry point properly than sell you a building's worth.",
    anchor: "/product",
    cta: "How recognition works",
  },
];

export default function ChurchesPage() {
  return (
    <>
      <PageHeader
        title="Keep the welcome. Keep the record."
        intro="A church is meant to be open, and nothing here should change how it feels to walk in on a Sunday. What DYCH covers is narrower: the guest book that nobody can read afterwards, the staff hours that live in somebody's notebook, and the two or three doors that genuinely should not open for everyone."
      />

      {/* The disclaimer first, before any capability. A church administrator
          evaluating this is worried about two things, in this order: that it
          will make the building feel like an airport, and that it overlaps
          the platform they already pay for. Both are answered here rather
          than in a FAQ at the bottom nobody reaches. */}
      <section className="bg-background px-4 pb-20 pt-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="max-w-[62ch]">
            <p className="text-lg leading-relaxed text-muted">
              DYCH is not church-management software and does not want to be.
              Giving, membership, pastoral care, rotas and ministry planning
              belong to the platform you already run, and we have no intention
              of asking you to move any of it. What we do is the physical
              layer around the building: who came to the office, which staff
              worked, and the handful of rooms that need a door with a memory.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <h2 className="max-w-[26ch] text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-foreground">
              Three places it helps, in the order most churches meet them.
            </h2>
          </Reveal>

          <ul className="mt-14 grid gap-4 md:grid-cols-3">
            {WHERE.map((item, i) => (
              <Reveal as="li" key={item.title} delay={0.07 * i}>
                <SpotlightCard href={item.anchor} className="h-full">
                  <div className="flex h-full flex-col">
                    <span
                      aria-hidden
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-accent-ink"
                      style={{ backgroundColor: sequenceAccent(i, WHERE.length) }}
                    >
                      <item.Icon size={24} weight="light" />
                    </span>
                    <h3 className="mt-7 text-xl leading-tight tracking-[-0.02em] text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[0.9375rem] font-semibold text-link transition-colors duration-150 group-hover:text-link-hover">
                      <span className="border-b border-link-rule pb-0.5 transition-colors duration-150 group-hover:border-link-hover">
                        {item.cta}
                      </span>
                    </span>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-background px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="max-w-[48ch]">
            <p className="border-l-2 border-accent-line pl-6 text-[clamp(1.25rem,2.4vw,1.625rem)] leading-[1.35] tracking-[-0.02em] text-foreground">
              If the honest answer after a visit is that your welcome desk is
              working and nothing needs a camera, we will tell you that and
              leave you the checklist anyway.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Tell us how the building runs today."
        body="A visit is an hour of questions about guests, staff and the doors you worry about. It costs nothing and it ends with a written scope, or with us saying you do not need one."
      />
    </>
  );
}
