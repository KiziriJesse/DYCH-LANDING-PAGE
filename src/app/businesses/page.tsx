import type { Metadata } from "next";
import { Buildings, IdentificationCard, Clock } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { sequenceAccent } from "@/lib/palette";

export const metadata: Metadata = {
  title: "Businesses & Workplaces",
  description:
    "Visitor records, workforce hours and controlled entry for offices, sites and premises, from DYCH Technologies.",
};

/*  ============================================================
    BUSINESSES & WORKPLACES. READ BEFORE EDITING.

    This page is written for a workplace reader, not as the schools page with
    the nouns swapped. That rule is deliberate and it is easy to break: the
    school material is the oldest and best-documented copy on the site, and
    the temptation is to lift a paragraph and change "pupil" to "employee".
    A facilities manager does not have a parent line, a boarding house or a
    register; they have a reception desk, contractors and a payroll cut-off.

    NOTHING HERE CLAIMS A WORKPLACE DEPLOYMENT. DYCH's documented install is a
    school. The entry mechanism is the same at a reception desk and the page
    says so plainly, but it does not imply an office customer exists. Where a
    sentence could be read as a reference, it has been written to describe
    the product rather than a client.

    The business product page at src/app/product/business/page.disabled.tsx is
    still parked. This page is the workplace entry point in the meantime, and
    it routes to the shared product page rather than to that one.
    ============================================================  */

const ENTRY_POINTS = [
  {
    Icon: IdentificationCard,
    title: "The front desk",
    body: "A visitor is recorded on the way in and on the way out, against the person or the department they came to see. The paper book is replaced rather than digitised alongside, so there is one place to look when somebody asks who was on site last Thursday.",
    anchor: "/product#visitor-management",
    cta: "Visitor Management",
  },
  {
    Icon: Clock,
    title: "The workforce",
    body: "The same arrival scan that opens the day writes the attendance record, so hours come from the entrance rather than from a notebook reconciled at month end. It is attendance visibility, not payroll and not an HR platform.",
    anchor: "/product#staff-attendance",
    cta: "Staff Attendance",
  },
  {
    Icon: Buildings,
    title: "Entry that needs more care",
    body: "A server room, a cash office, a store, a site where only some people should pass. Recognition at those points is worth it where the risk justifies it, and worth questioning where it does not. We will say which we think you have.",
    anchor: "/product",
    cta: "How recognition works",
  },
];

const HONEST = [
  {
    label: "What we would look at first",
    body: "How many people come through, at what times, and what currently gets written down. If the answer is that nothing gets written down and nobody has missed it, the honest recommendation may be that you do not need us yet.",
  },
  {
    label: "What this is not",
    body: "It is not payroll, leave management or a human-resources platform, and it does not replace the systems you run the business on. It covers the physical moments at an entrance and hands the record to whatever you already use.",
  },
  {
    label: "Where it is proven",
    body: "DYCH's documented deployment is a school gate. The mechanism at a reception desk is the same and the product is the same, but we are not going to show you a workplace reference we do not have. Ask us at the site visit and we will tell you exactly what is running where.",
  },
];

export default function BusinessesPage() {
  return (
    <>
      <PageHeader
        title="Who came in, who is here, and what the record says."
        intro="Most workplaces already manage employees, contractors and visitors through separate books and habits that each work until the week somebody needs to check one. DYCH covers the physical moments at an entrance: a visitor arriving, a shift starting, a door that should only open for some people. Nothing more, and nothing you have to run a project to adopt."
      />

      {/* The page had no imagery at all, which made a workplace reader work
          harder than a school one to picture the thing. A reception desk is
          the moment this page is about, so it opens on one. */}
      <section className="bg-background px-4 pt-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <PlaceholderMedia
              description="A visitor being logged at a reception desk on a handheld tablet"
              src="/photos/visitor-log.jpg"
              aspect="aspect-[16/9]"
              imageClassName="object-cover object-center"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-background px-4 pb-24 pt-20 sm:px-6 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <h2 className="max-w-[24ch] text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-foreground">
              Three places it earns its keep.
            </h2>
          </Reveal>

          <ul className="mt-14 grid gap-4 md:grid-cols-3">
            {ENTRY_POINTS.map((item, i) => (
              <Reveal as="li" key={item.title} delay={0.07 * i}>
                <SpotlightCard href={item.anchor} className="h-full">
                  <div className="flex h-full flex-col">
                    <span
                      aria-hidden
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-accent-ink"
                      style={{ backgroundColor: sequenceAccent(i, ENTRY_POINTS.length) }}
                    >
                      <item.Icon size={24} weight="light" />
                    </span>
                    <h3 className="mt-7 text-xl leading-tight tracking-[-0.02em] text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
                    {/* A span, not a nested link: the card is the anchor. */}
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

      {/* The scope statement. A workplace buyer's first worry is that this is
          the opening move of a much larger system, so the limits are set out
          before anybody has to ask for them. */}
      <section className="bg-surface px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <h2 className="max-w-[20ch] text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-foreground">
              Before you ask us anything, here is what we would say.
            </h2>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <dl className="border-t border-border">
              {HONEST.map((row, i) => (
                <Reveal as="div" key={row.label} delay={0.06 * i} className="border-b border-border py-6">
                  <dt className="font-semibold text-foreground">{row.label}</dt>
                  <dd className="mt-1.5 max-w-[58ch] leading-relaxed text-muted">
                    {row.body}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <CtaBand
        title="Show us the entrance you want to improve."
        body="A site assessment is a walk around your entry points and an hour of questions. It costs nothing and it ends with a written scope."
      />
    </>
  );
}
