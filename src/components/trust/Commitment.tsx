import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Reveal } from "@/components/ui/Reveal";

export type CommitmentData = {
  id: string;
  title: string;
  lead: string;
  points: { label: string; body: string }[];
  Icon: PhosphorIcon;
};

/**
 * Heading on the left, substance on the right, hairline between each row.
 *
 * Deliberately reads like a policy document rather than a marketing section:
 * this page's job is to look careful, so it carries no imagery and no card
 * elevation, and it repeats one structure instead of varying for interest.
 * That is also why it uses the brand accent only, never a feature hue.
 */
export function Commitment({ item }: { item: CommitmentData }) {
  return (
    <Reveal
      as="article"
      className="grid gap-x-12 gap-y-6 border-b border-border py-14 lg:grid-cols-12 lg:py-20"
    >
      <div className="lg:col-span-4">
        <span
          aria-hidden
          className="flex h-12 w-12 items-center justify-center rounded-full border border-accent-line bg-surface-raised text-accent"
        >
          <item.Icon size={24} weight="light" />
        </span>
        <h2
          id={item.id}
          className="mt-6 max-w-[16ch] scroll-mt-32 text-[clamp(1.5rem,3vw,2rem)] leading-[1.15] tracking-[-0.025em] text-foreground"
        >
          {item.title}
        </h2>
      </div>

      <div className="lg:col-span-7 lg:col-start-6">
        <p className="max-w-[60ch] text-lg leading-relaxed text-muted">{item.lead}</p>

        <dl className="mt-8 space-y-6">
          {item.points.map((point) => (
            <div key={point.label}>
              <dt className="font-semibold text-foreground">{point.label}</dt>
              <dd className="mt-1.5 max-w-[60ch] leading-relaxed text-muted">
                {point.body}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Reveal>
  );
}
