import type { Metadata } from "next";
import {
  DeviceMobileSpeaker,
  GraduationCap,
  ListChecks,
  ScanSmiley,
  Buildings,
} from "@phosphor-icons/react/dist/ssr";

import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { RecognitionFigure } from "@/components/product/RecognitionFigure";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Smart Vision",
  description:
    "Smart Vision: facial-recognition access, automatic attendance and real-time alerts on one shared technology, for schools and for business.",
};

/*  The neutral landing above both verticals.

    DYCH is a software solutions company, and Smart Vision is one product with
    two deployments rather than a schools product with a business edition
    bolted on. So this page carries only what is true of BOTH - the three
    things the shared technology does - and then routes.

    It deliberately does not list features. Seven capabilities on the schools
    page and five on the business page is the detail; repeating a merged
    version of them here would make this a third product page rather than a
    fork in the road.

    The schools half is document-backed. The business half is derived - see
    the note at the top of /product/business.  */

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
    title: "And somebody is told, in seconds",
    body: "A push notification reaches whoever needs to know, carrying the photo so they can see the match was right. SMS follows as a metered fallback for anyone without the app.",
  },
];

const VERTICALS = [
  {
    href: "/product/schools",
    Icon: GraduationCap,
    eyebrow: "For schools",
    title: "The gate, the register and the parent line",
    body: "Seven capabilities on one pupil record: recognition at the gate, attendance that fills itself, alerts to parents, boarding management, the guard's screen, the admin dashboard and report cards.",
    cta: "See the schools product",
  },
  {
    href: "/product/business",
    Icon: Buildings,
    eyebrow: "For business",
    title: "Reception, hours and who is on site",
    body: "The same technology at a business entrance: access at reception, staff and contractor hours from the same scan, alerts to a manager or a security desk, and one operations dashboard over the top.",
    cta: "See the business product",
  },
];

export default function ProductPage() {
  return (
    <>
      <PageHeader
        title="One technology. Two ways in."
        intro="Smart Vision recognises a face at an entry point, writes the record that scan produces, and tells the person who needs to know. Schools use it at a gate and businesses use it at a reception desk, but underneath it is the same three things doing the same job."
      />

      {/* What is true of both. The figure is here rather than on either
          vertical because recognition is the part they actually share. */}
      <section className="bg-background px-4 pb-24 pt-16 sm:px-6 lg:px-10 lg:pb-32">
        <div className="mx-auto grid max-w-[1240px] items-center gap-14 lg:grid-cols-12 lg:gap-16">
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
                    className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent-line bg-wash text-accent-on-light"
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

      {/* The fork. Two cards, not a feature comparison table: at this point
          the reader knows which one they are, and the job is to get them
          there rather than to sell them the difference. */}
      <section className="bg-surface px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <h2 className="max-w-[20ch] text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-foreground">
              Which building are you standing in?
            </h2>
          </Reveal>

          <ul className="mt-14 grid gap-6 lg:grid-cols-2">
            {VERTICALS.map((v, i) => (
              <Reveal as="li" key={v.href} delay={0.08 * i}>
                <SpotlightCard href={v.href} className="h-full">
                  <div className="flex h-full flex-col">
                    <span
                      aria-hidden
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent-line bg-wash text-accent-on-light"
                    >
                      <v.Icon size={26} weight="light" />
                    </span>
                    <p className="mt-7 text-sm font-semibold uppercase tracking-[0.14em] text-accent-on-light">
                      {v.eyebrow}
                    </p>
                    <h3 className="mt-3 max-w-[18ch] text-2xl leading-tight tracking-[-0.02em] text-foreground sm:text-[1.75rem]">
                      {v.title}
                    </h3>
                    <p className="mt-4 max-w-[46ch] leading-relaxed text-muted">
                      {v.body}
                    </p>
                    {/* A span, not a nested link: the whole card is already
                        the anchor, and a link inside a link is invalid. */}
                    <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[0.9375rem] font-semibold text-accent-on-light">
                      <span className="border-b border-accent-line pb-0.5 transition-colors duration-150 group-hover:border-accent">
                        {v.cta}
                      </span>
                    </span>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.16}>
            <p className="mt-12 max-w-[62ch] leading-relaxed text-muted">
              Not sure which fits, or running something that is neither &mdash; a
              clinic, a campus, a site with both staff and visitors? Say what the
              entrance looks like now and we will tell you whether this helps.
            </p>
            <Button href="/contact" size="lg" className="mt-7">
              Ask us about your site
            </Button>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Start with one entrance."
        body="Most deployments begin with a single entry point and add the rest a term or a quarter later. Tell us where the pressure is and we will scope that first."
      />
    </>
  );
}
