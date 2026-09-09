import Image from "next/image";

/**
 * The real DYCH mark plus a live-text wordmark.
 *
 * The supplied lockup sets "DYCH TECHNOLOGIES" and the tagline in deep navy
 * and purple, which measure between 1.3:1 and 1.7:1 against this site's
 * near-black substrate. Rendering that artwork here would be illegible, so
 * only the mark is used as an image and the words are set in the site's own
 * type at full contrast. The complete supplied lockup lives at
 * /logo/dych-lockup-on-white.png for light surfaces.
 */
export function Wordmark({
  /** The company motto, carried in both the nav and the footer. */
  subline = "AUTOMATING TOMORROW",
  markHeight = 34,
  /** The nav hides the subline below xl to keep its single line uncrowded. */
  sublineClass = "",
  textClass = "text-[1.0625rem]",
  /**
   * Applied to the whole words block. The nav drops it entirely between the
   * lg and xl breakpoints, where the product label "Smart School Systems" is
   * long enough that the words plus seven links plus the CTA overflow the
   * pill. The mark alone still reads as the home link, and the anchor keeps
   * its own aria-label, so nothing is lost but width.
   */
  wordsClass = "flex",
  /** True only in the navbar, which is above the fold. */
  priority = false,
}: {
  subline?: string;
  markHeight?: number;
  sublineClass?: string;
  textClass?: string;
  wordsClass?: string;
  priority?: boolean;
}) {
  return (
    <span className="flex items-center gap-3">
      <Image
        src="/logo/dych-mark.png"
        alt=""
        aria-hidden
        width={320}
        height={235}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        style={{ height: markHeight, width: "auto" }}
        className="shrink-0"
      />
      <span className={`${wordsClass} flex-col whitespace-nowrap leading-none`}>
        <span className={`${textClass} font-bold tracking-[-0.02em] text-foreground`}>
          DYCH TECHNOLOGIES
        </span>
        {subline && (
          <span
            /* text-muted, not text-faint. At 10px the motto needs the full
               4.5:1, and --faint on the footer's --surface-sunk measures
               4.17:1. --muted keeps it quiet without failing. */
            className={`mt-1 text-[0.625rem] font-medium tracking-[0.14em] text-muted ${sublineClass}`}
          >
            {subline}
          </span>
        )}
      </span>
    </span>
  );
}
