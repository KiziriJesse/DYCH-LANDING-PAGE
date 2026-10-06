import Image from "next/image";

/**
 * A line drawing in a capability media slot.
 *
 * Not PlaceholderMedia, which exists for photographs and screenshots: it
 * crops its image to a fixed ratio with object-cover, which is right for a
 * photograph and wrong for a drawing on a transparent ground, where cropping
 * would cut the subject and the ratio would letterbox it against a border.
 *
 * So this one gives the figure a well to sit in and lets it keep its own
 * proportions inside it. The well is what makes the slot read as deliberate
 * rather than as a drawing floating in the column, and it holds a minimum
 * height so a wide figure and a tall one leave the section the same shape.
 *
 * These are illustrations and the sections they sit beside carry the actual
 * claims, so each is aria-hidden rather than given alt text that would repeat
 * the heading to a screen reader for no gain.
 */
export function LineFigure({
  src,
  width,
  height,
  className = "",
}: {
  src: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <div
      className={`relative z-raise flex min-h-[18rem] w-full items-center justify-center rounded-card border border-border bg-surface p-8 sm:p-10 ${className}`}
    >
      <Image
        src={src}
        alt=""
        aria-hidden
        width={width}
        height={height}
        className="h-auto max-h-[20rem] w-auto max-w-full object-contain"
      />
    </div>
  );
}
