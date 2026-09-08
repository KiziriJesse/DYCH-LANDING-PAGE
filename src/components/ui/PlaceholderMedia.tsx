/**
 * A clearly-marked slot for artwork that does not exist yet.
 *
 * Deliberately not a picsum photo: these slots want product screenshots and
 * hardware shots, and a random stock image of an unrelated subject would read
 * as real and be harder to notice and replace. The bracketed label is
 * greppable, and the aria-label describes the intended content so the slot is
 * announced sensibly in the meantime.
 */
export function PlaceholderMedia({
  description,
  aspect = "aspect-[4/3]",
  className = "",
}: {
  /** What should eventually go here. Written for whoever sources the asset. */
  description: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Placeholder for ${description}`}
      className={`flex ${aspect} w-full items-center justify-center rounded-card border border-dashed border-border-strong bg-surface-raised/40 p-8 text-center ${className}`}
    >
      <span className="max-w-[36ch] text-[0.8125rem] leading-relaxed text-faint">
        [Placeholder image: {description}]
      </span>
    </div>
  );
}
