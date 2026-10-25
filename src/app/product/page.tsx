import {
  DeviceMobileSpeaker,
  GraduationCap,
  UsersThree,
  ListChecks,
  ScanSmiley,
  Buildings,
} from "@phosphor-icons/react/dist/ssr";

import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { RecognitionFigure } from "@/components/product/RecognitionFigure";
import { HelpTip } from "@/components/ui/HelpTip";
import { sequenceAccent } from "@/lib/palette";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Smart Vizion",
  description:
    "DYCH Technologies builds Smart Vizion: facial-recognition access, automatic attendance and real-time alerts for schools and business.",
  path: "/product",
});

/*  The neutral landing above both verticals.

    DYCH is a software solutions company, and Smart Vizion is one product with
    two deployments rather than a schools product with a business edition
    bolted on. So this page carries only what is true of BOTH - the three
    things the shared technology does - and then routes.

    It deliberately does not list features. The seven capabilities on the
    schools page are the detail; repeating a summary of them here would make
    this a second product page rather than a way in.

    The schools half is document-backed. The business half is parked until
    DYCH supplies business documents - see
    src/app/product/business/page.disabled.tsx.  */

/* Vision, Safety, Accountability. The order is the order the product
   works in: it sees, it protects, and it leaves a record that can be
   checked afterwards. */
const IDENTITY = ["Vision", "Safety", "Accountability"] as const;

const SHARED = [
  {
    Icon: ScanSmiley,
    title: "It recognises a face at the entry point",
    body: "A camera matches an arriving face against your own enrolled records, on a unit standing on your own premises. No images leave the site, and the entrance keeps working through an internet outage because nothing has to travel for a match to happen.",
  },
  {
    Icon: ListChecks,
    title: "That same scan writes the record",
    body: "There is no second step for anyone to remember. Arrival and departure are timestamped as they occur, so the register - or the time record - is already correct when someone opens it.",
  },
  {
    Icon: DeviceMobileSpeaker,
    title: "And somebody is told, without anyone deciding to",
    body: "A push notification reaches whoever needs to know, carrying the photo so they can see the match was right. How soon after the scan it goes is a setting the site controls. SMS follows as a metered fallback for anyone without the app.",
  },
];

/*  One vertical is published. The business page is parked pending DYCH's
    business documents - see src/app/product/business/page.disabled.tsx.

    So this is not a two-card fork any more. The second cell is a
    conversation rather than a second card, which is the honest shape while
    there is only one page to send anyone to. When the business page returns,
    restore its card here alongside the schools one.  */
const INDUSTRIES = [
  {
    href: "/schools",
    Icon: GraduationCap,
    label: "Schools",
    body: "Seven capabilities on one pupil record: the gate, attendance that fills itself, alerts to parents, boarding, the guard's screen, the dashboard and report cards.",
    cta: "See Smart Vizion for schools",
  },
  {
    href: "/businesses",
    Icon: Buildings,
    label: "Businesses & Workplaces",
    body: "A reception desk with a record behind it, workforce hours taken from the entrance, and recognition on the few doors that justify it.",
    cta: "See it for a workplace",
  },
  {
    href: "/churches",
    Icon: UsersThree,
    label: "Churches & Worship Centres",
    body: "Guests on the days a building fills with people nobody recognises, hours for paid staff, and care around the two or three rooms that need it.",
    cta: "See it for a worship centre",
  },
];

export default function ProductPage() {
  return (
    <>
      <PageHeader
        title="One technology, wherever the entrance is."
        intro="Secure facial-recognition monitoring and attendance. Smart Vizion recognises a face at an entry point, writes the record that scan produces, and tells the person who needs to know. A school uses it at a gate and a workplace uses it at a reception desk, but underneath it is the same three things doing the same job."
      />

      {/* Three words, because the product is three promises and a reader
          should be able to carry them away without the paragraph. They are
          set as plain chips rather than headings: this is an identity line,
          not a section, and giving it a heading would put it in the page
          outline above the capabilities it summarises. */}
      <section className="bg-background px-4 pt-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <ul className="flex flex-wrap gap-2.5">
              {IDENTITY.map((word) => (
                <li
                  key={word}
                  className="rounded-full border border-accent-line bg-accent-soft px-4 py-2 text-sm font-medium tracking-[0.02em] text-accent-on-light"
                >
                  {word}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* What is true of both. The figure is here rather than on either
          vertical because recognition is the part they actually share. */}
      <section className="bg-background px-4 pb-24 pt-16 sm:px-6 lg:px-10 lg:pb-32">
        <div className="mx-auto grid max-w-[1240px] items-center gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <dl>
              {SHARED.map((item, i) => (
                <Reveal
                  key={item.title}
                  delay={0.07 * i}
                  className="flex gap-5 border-b border-border py-7 first:border-t"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-accent-ink"
                    style={{ backgroundColor: sequenceAccent(i, SHARED.length) }}
                  >
                    <item.Icon size={22} weight="light" />
                  </span>
                  <div>
                    <dt className="text-lg font-medium leading-snug text-foreground">
                      {item.title}
                    </dt>
                    <dd className="mt-2 max-w-[48ch] leading-relaxed text-muted">
                      {item.body}
                    </dd>
                    {/* Only the first item gets one. "On a unit on your own
                        premises" is the claim a non-technical reader is most
                        likely to half-understand, and the one that matters
                        most if they have children at the school. */}
                    {i === 0 && (
                      <div className="mt-4">
                        <HelpTip label="What does on-device mean?" title="The matching happens at your gate">
                          The camera compares an arriving face against records
                          held on a box standing on your own premises. Nothing
                          is sent to us or to anyone else, no photo is uploaded
                          anywhere, and the entrance keeps working when the
                          internet does not, because nothing has to travel for
                          a match to happen.
                        </HelpTip>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>

          <Reveal delay={0.1} className="lg:col-span-6">
            <RecognitionFigure />
          </Reveal>
        </div>
      </section>

      {/* FEATURES, NOT PRODUCTS. These two are sold alongside Smart Vizion
          and a buyer may well arrive asking for one by name, so each has its
          own heading and its own anchor for the nav to point at. What they
          do not get is a page each: a page implies a thing you can buy on
          its own, and both of these run on the same recognition, the same
          record and the same unit on your premises. Saying that once, here,
          is more honest than three product pages that quietly describe one
          product. */}
      <section
        id="visitor-management"
        className="scroll-mt-28 bg-background px-4 py-24 sm:px-6 lg:px-10 lg:py-32"
      >
        <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <h2 className="max-w-[18ch] text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-foreground">
              Visitor Management
            </h2>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="max-w-[58ch] text-lg leading-relaxed text-muted">
                The paper visitor book replaced, rather than digitised
                alongside. A visitor is recorded on the way in and on the way
                out, against the person or the department they came to see, so
                the question of who was on site last Tuesday has one answer
                instead of a search through a drawer.
              </p>
              <p className="mt-5 max-w-[58ch] leading-relaxed text-muted">
                It runs on the same unit as recognition and writes to the same
                record, which is why it is part of Smart Vizion rather than
                something else to buy and connect.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        id="staff-attendance"
        className="scroll-mt-28 bg-surface px-4 py-24 sm:px-6 lg:px-10 lg:py-32"
      >
        <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <h2 className="max-w-[18ch] text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-foreground">
              Staff Attendance
            </h2>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="max-w-[58ch] text-lg leading-relaxed text-muted">
                The arrival that opens somebody&rsquo;s day is the clock-in, and the
                departure is the clock-out. Hours come from the entrance
                rather than from a notebook reconciled at the end of the
                month, and a manager reviewing them is reading the same events
                the gate recorded.
              </p>
              <p className="mt-5 max-w-[58ch] leading-relaxed text-muted">
                Deliberately narrow: this is attendance visibility and
                attendance history. It is not payroll, not leave management
                and not a human-resources platform, and if that is what you
                need then this is not the thing that solves it.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Three ways in, one each. This used to be a schools card beside an
          invitation to talk, which was the honest shape while schools was
          the only published page. There are three now, so the section routes
          rather than apologises. The schools card keeps the most detail
          because it is the only one with a documented deployment behind it,
          and the cards are deliberately not identical in weight for that
          reason. */}
      <section className="bg-background px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <h2 className="max-w-[20ch] text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-foreground">
              Where is your entrance?
            </h2>
          </Reveal>

          <ul className="mt-14 grid gap-4 md:grid-cols-3">
            {INDUSTRIES.map((item, i) => (
              <Reveal as="li" key={item.href} delay={0.07 * i}>
                <SpotlightCard href={item.href} className="h-full">
                  <div className="flex h-full flex-col">
                    <span
                      aria-hidden
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-accent-ink"
                      style={{ backgroundColor: sequenceAccent(i, INDUSTRIES.length) }}
                    >
                      <item.Icon size={24} weight="light" />
                    </span>
                    <h3 className="mt-7 max-w-[18ch] text-xl leading-tight tracking-[-0.02em] text-foreground">
                      {item.label}
                    </h3>
                    <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
                    {/* A span, not a nested link: the whole card is already
                        the anchor, and a link inside a link is invalid. */}
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

      <CtaBand
        title="Start with one entrance."
        body="Most deployments begin with a single entry point and add the rest a term or a quarter later. Tell us where the pressure is and we will scope that first."
      />
    </>
  );
}
