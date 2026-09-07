import { CloudSlash, DeviceMobile } from "@phosphor-icons/react/dist/ssr";
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
    body: "Alerts travel over SMS and WhatsApp. No download, no data bundle, no assumption about the handset in a parent’s pocket.",
  },
];

/**
 * Split composition: bare display type on one side, a quote panel on the
 * other. Deliberately not another card grid, and the quote is styled
 * differently from the stat so the two do not read as a matched pair.
 */
export function Proof() {
  return (
    <section className="bg-surface px-4 py-28 sm:px-6 lg:px-10 lg:py-40">
      <div className="mx-auto grid max-w-[1240px] gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          {/* TODO: replace with a verified figure before launch. "100+" is the
              claim carried over from the previous site and has not been
              checked against a real deployment count. */}
          <Reveal>
            <p className="nums text-[clamp(3.5rem,9vw,6rem)] font-bold leading-none tracking-[-0.04em] text-foreground">
              100+
            </p>
            <p className="mt-3 text-lg font-medium text-accent">Schools connected</p>
            <p className="mt-6 max-w-[46ch] leading-relaxed text-muted">
              Built for local conditions first: patchy power, thin bandwidth, and a
              parent body reachable on SMS long before it is reachable on an app.
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
                  className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface-raised text-accent"
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
          {/* TODO: replace with a real, attributed quote. Name, role and school
              are placeholders and must not ship as-is. */}
          <figure className="rounded-card border-l-2 border-accent bg-surface-raised/60 py-8 pl-8 pr-7">
            <blockquote>
              <p className="text-xl leading-relaxed text-foreground sm:text-2xl">
                “The gate log used to be a book nobody read. Now I can tell a parent
                exactly when their child arrived, while they are still on the phone.”
              </p>
            </blockquote>
            <figcaption className="mt-7 border-t border-border pt-5 text-[0.9375rem] leading-relaxed text-muted">
              <span className="block font-semibold text-foreground">
                [Placeholder name]
              </span>
              Head Teacher, [Placeholder school]
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
