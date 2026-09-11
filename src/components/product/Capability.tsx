import type { ReactNode } from "react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Reveal } from "@/components/ui/Reveal";
// import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";

export type CapabilityLayout = "split-right" | "split-left" | "stage" | "wide";

export type CapabilityData = {
  id: string;
  title: string;
  lead: string;
  points: { label: string; body: string }[];
  /** Description of the artwork this section wants. Also the fallback slot's
      label, and useful as alt text once a real asset lands. */
  media: string;
  mediaAspect: string;
  /** Render a real figure instead of the marked placeholder slot. */
  renderMedia?: () => ReactNode;
  Icon: PhosphorIcon;
  layout: CapabilityLayout;
};

/** A real figure where one exists. Placeholder image slots are parked. */
function Media({ item }: { item: CapabilityData }) {
  if (item.renderMedia) return <>{item.renderMedia()}</>;
  // return <PlaceholderMedia description={item.media} aspect={item.mediaAspect} />;
  return null;
}

function Head({ item, centered = false }: { item: CapabilityData; centered?: boolean }) {
  return (
    <div className={centered ? "flex flex-col items-center text-center" : ""}>
      <span
        aria-hidden
        className="flex h-12 w-12 items-center justify-center rounded-full border border-accent-line bg-wash text-accent-on-light"
      >
        <item.Icon size={26} weight="light" />
      </span>

      <h2 className="mt-7 max-w-[16ch] text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-foreground">
        {item.title}
      </h2>
      <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-muted">{item.lead}</p>
    </div>
  );
}

/** Always left-aligned. Centred definition rows are unreadable. */
function Points({ item, className = "" }: { item: CapabilityData; className?: string }) {
  return (
    <dl className={`border-t border-border text-left ${className}`}>
      {item.points.map((point) => (
        <div key={point.label} className="border-b border-border py-4">
          <dt className="font-semibold text-foreground">{point.label}</dt>
          <dd className="mt-1.5 max-w-[54ch] text-[0.9375rem] leading-relaxed text-muted">
            {point.body}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * One section per capability.
 *
 * The build plan asks for five alternating image+text splits. The taste skill
 * caps that pattern at two in a row, so the run is broken twice: the parent
 * alert becomes a centre stage for a tall phone frame, and analytics runs
 * full-width under its copy for a wide dashboard. Both breaks suit their asset
 * shape better than a 50/50 split would, so the cap costs nothing here.
 */
export function Capability({
  item,
  tone,
}: {
  item: CapabilityData;
  /** Alternating substrate, so the page has vertical rhythm. */
  tone: "base" | "raised";
}) {
  const background = tone === "base" ? "bg-background" : "bg-surface";
  const section = `${background} px-4 py-24 sm:px-6 lg:px-10 lg:py-32`;

  const hasMedia = Boolean(item.renderMedia);

  if (item.layout === "stage") {
    return (
      <section id={item.id} className={section}>
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="mx-auto max-w-[54ch]">
            <Head item={item} centered />
          </Reveal>

          <div className="mt-14 grid items-center gap-12 lg:grid-cols-12">
            {hasMedia && (
              <Reveal delay={0.08} className="mx-auto w-full max-w-[16rem] lg:col-span-5 lg:col-start-2">
                <Media item={item} />
              </Reveal>
            )}
            <Reveal delay={0.14} className={hasMedia ? "lg:col-span-5" : "lg:col-span-8 lg:col-start-3"}>
              <Points item={item} />
            </Reveal>
          </div>
        </div>
      </section>
    );
  }

  if (item.layout === "wide") {
    return (
      <section id={item.id} className={section}>
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <Head item={item} />
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-5 lg:col-start-8 lg:self-end">
              <Points item={item} />
            </Reveal>
          </div>
          {hasMedia && (
            <Reveal delay={0.14} className="mt-14">
              <Media item={item} />
            </Reveal>
          )}
        </div>
      </section>
    );
  }

  const mediaFirst = item.layout === "split-left";

  return (
    <section id={item.id} className={section}>
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal
          className={
            mediaFirst ? "lg:col-span-6 lg:col-start-7 lg:row-start-1" : "lg:col-span-6"
          }
        >
          <Head item={item} />
          <Points item={item} className="mt-9" />
        </Reveal>

        {hasMedia && (
          <Reveal
            delay={0.08}
            className={mediaFirst ? "lg:col-span-6 lg:row-start-1" : "lg:col-span-6"}
          >
            <Media item={item} />
          </Reveal>
        )}
      </div>
    </section>
  );
}
