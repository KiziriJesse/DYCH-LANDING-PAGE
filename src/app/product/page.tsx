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

    It deliberately does not list features. The seven capabilities on the
    schools page are the detail; repeating a summary of them here would make
    this a second product page rather than a way in.

    The schools half is document-backed. The business half is parked until
    DYCH supplies business documents - see
    src/app/product/business/page.disabled.tsx.  */

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
const SCHOOLS = {
  href: "/product/schools",
  Icon: GraduationCap,
  title: "The gate, the register and the parent line",
  body: "Seven capabilities on one pupil record: recognition at the gate, attendance that fills itself, alerts to parents, boarding management, the guard's screen, the admin dashboard and report cards.",
  cta: "See the schools product",
};

export default function ProductPage() {
  return (
    <>
      <PageHeader
        title="One technology, wherever the entrance is."
        intro="Smart Vision recognises a face at an entry point, writes the record that scan produces, and tells the person who needs to know. A school uses it at a gate and a business uses it at a reception desk, but underneath it is the same three things doing the same job."
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

      {/* One published page and one conversation, side by side. Two matching
          cards would imply two products to compare; there is one, plus an
          invitation. */}
      <section className="bg-surface px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <h2 className="max-w-[20ch] text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-foreground">
              Where is your entrance?
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <SpotlightCard href={SCHOOLS.href} className="h-full">
                <div className="flex h-full flex-col">
                  <span
                    aria-hidden
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent-line bg-wash text-accent-on-light"
                  >
                    <SCHOOLS.Icon size={26} weight="light" />
                  </span>
                  <h3 className="mt-7 max-w-[18ch] text-2xl leading-tight tracking-[-0.02em] text-foreground sm:text-[1.75rem]">
                    {SCHOOLS.title}
                  </h3>
                  <p className="mt-4 max-w-[46ch] leading-relaxed text-muted">
                    {SCHOOLS.body}
                  </p>
                  {/* A span, not a nested link: the whole card is already the
                      anchor, and a link inside a link is invalid. */}
                  <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[0.9375rem] font-semibold text-accent-on-light">
                    <span className="border-b border-accent-line pb-0.5 transition-colors duration-150 group-hover:border-accent">
                      {SCHOOLS.cta}
                    </span>
                  </span>
                </div>
              </SpotlightCard>
            </Reveal>

            {/* Not a card. An office, a clinic, a campus with both staff and
                visitors - the technology is the same, but there is no page
                yet that describes it honestly, so this asks instead of
                claiming. */}
            <Reveal delay={0.08} className="lg:col-span-5">
              <div className="flex h-full flex-col border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-2">
                <span
                  aria-hidden
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent-line bg-wash text-accent-on-light"
                >
                  <Buildings size={26} weight="light" />
                </span>
                <h3 className="mt-7 max-w-[18ch] text-2xl leading-tight tracking-[-0.02em] text-foreground">
                  Anywhere else with a door
                </h3>
                <p className="mt-4 max-w-[42ch] leading-relaxed text-muted">
                  An office reception, a clinic, a site with staff, contractors
                  and visitors coming through the same gate. The recognition,
                  the record and the alert do not change; the nouns do. We would
                  rather scope that with you than publish a page guessing at it.
                </p>
                <div className="mt-auto pt-8">
                  <Button href="/contact">Tell us about your site</Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        title="Start with one entrance."
        body="Most deployments begin with a single entry point and add the rest a term or a quarter later. Tell us where the pressure is and we will scope that first."
      />
    </>
  );
}
