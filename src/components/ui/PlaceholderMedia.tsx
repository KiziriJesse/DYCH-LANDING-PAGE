import Image from "next/image";

/**
 * A media slot that is either a real image or a clearly-marked gap.
 *
 * Pass `src` and it renders the real thing. Leave `src` off and it renders
 * the marked placeholder. That is the whole switch: dropping a screenshot in
 * is one line at the call site, never a restructure, and every call site
 * already carries the `description` the real image needs as alt text.
 *
 * The placeholder is deliberately not a stock photo. These slots want product
 * screenshots and hardware shots, and a random image of an unrelated subject
 * would read as real and be harder to notice and replace. The bracketed label
 * is greppable, and the aria-label describes the intended content so the slot
 * is announced sensibly in the meantime.
 *
 * See public/how-it-works/README.md for the admin-dashboard screenshots and
 * the filenames they are expected under.
 */
export function PlaceholderMedia({
  description,
  src,
  aspect = "aspect-[4/3]",
  className = "",
}: {
  /** What should eventually go here. Written for whoever sources the asset,
      and used as the alt text once `src` is supplied. */
  description: string;
  /** Path under /public. Supply it and the real image replaces the slot. */
  src?: string;
  aspect?: string;
  className?: string;
}) {
  if (src) {
    return (
      <div
        className={`relative ${aspect} w-full overflow-hidden rounded-card border border-border ${className}`}
      >
        <Image
          src={src}
          alt={description}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Placeholder for ${description}`}
      className={`flex ${aspect} w-full items-center justify-center rounded-card border border-dashed border-border-strong bg-surface-raised/40 p-8 text-center ${className}`}
    >
      <span className="max-w-[36ch] text-[0.8125rem] leading-relaxed text-muted">
        [Placeholder image: {description}]
      </span>
    </div>
  );
}
