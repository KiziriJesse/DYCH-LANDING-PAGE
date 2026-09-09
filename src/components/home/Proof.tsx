import { CloudSlash, DeviceMobile, HardDrives } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const ICON = { size: 20, weight: "light" } as const;

const POINTS = [
  {
    Icon: CloudSlash,
    title: "Offline first",
    body: "The gate keeps reading and the register keeps writing when the line drops. Everything syncs once connectivity returns.",
  },
  {
    Icon: DeviceMobile,
    title: "On the phone parents already own",
    body: "A push notification reaches a parent in seconds. Where there is no smartphone, the same alert falls back to SMS, so no family is left out.",
  },
];

/*  This section used to open on "100+ schools connected" and close on a
    testimonial with a bracketed name and a bracketed school. Both were
    inherited from the previous site and neither could be verified: there is no
    confirmed deployment count, and no school has given a quotation.

    Rather than leave a proof section with nothing in it, the proof is now the
    thing DYCH can actually stand behind today — the engineering commitment
    stated verbatim in its own case-study deck, "all face data is matched and
    encrypted on-device, no photos ever leave the school." That is a claim the
    company makes about itself, not a claim borrowed from a customer who has
    not spoken.

    When a school does report results and agrees to be named, its figures and
    its words belong here and on /schools.  */

/**
 * Split composition: bare display type on one side, a quiet claim panel on the
 * other. Deliberately not another card grid, and the panel is styled
 * differently from the list so the two do not read as a matched pair.
 */
export function Proof() {
  return (
    <section className="bg-surface px-4 py-28 sm:px-6 lg:px-10 lg:py-40">
      <div className="mx-auto grid max-w-[1240px] gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <Reveal>
            <h2 className="max-w-[15ch] text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.06] tracking-[-0.035em] text-foreground">
              Built for the conditions it actually runs in.
            </h2>
            <p className="mt-6 max-w-[46ch] leading-relaxed text-muted">
              Patchy power, thin bandwidth, and a parent body reachable on a basic
              handset long before it is reachable on an app. Those are constraints
              here, not edge cases, so they shaped the design rather than the
              troubleshooting page.
            </p>
          </Reveal>

          <dl className="mt-12 border-t border-border">
            {POINTS.map((point, i) => (
              <Reveal
                key={point.title}
                delay={0.08 * (i + 1)}
                className="flex gap-5 border-b border-border py-7"
              >
                <span
                  aria-hidden
                  className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent-line bg-wash text-accent-on-light"
                >
                  <point.Icon {...ICON} />
                </span>
                <div>
                  <dt className="font-semibold text-foreground">{point.title}</dt>
                  <dd className="mt-1.5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-muted">
                    {point.body}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8 lg:self-center">
          <div className="rounded-card border-l-2 border-accent bg-surface-raised/60 py-8 pl-8 pr-7">
            <span
              aria-hidden
              className="flex h-11 w-11 items-center justify-center rounded-full border border-accent-line bg-wash text-accent-on-light"
            >
              {/* HardDrives, not a padlock. The claim is that matching runs
                  on the school own machine; a padlock is the generic security
                  glyph and says nothing about where. */}
              <HardDrives size={22} weight="light" />
            </span>
            <p className="mt-7 text-xl leading-relaxed text-foreground sm:text-2xl">
              All face data is matched and encrypted on-device. No photos ever leave
              the school.
            </p>
            <p className="mt-6 max-w-[42ch] leading-relaxed text-muted">
              Recognition runs on a unit at your site, not on a server elsewhere.
              That is why the gate survives an outage, and why there is nothing to
              upload in the first place.
            </p>
            <Link
              href="/security-and-trust"
              className="mt-7 inline-block border-b border-accent-line pb-0.5 font-semibold text-accent-on-light transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-accent"
            >
              How we handle children&rsquo;s data
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
