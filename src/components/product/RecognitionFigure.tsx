/**
 * RecognitionFigure - illustrative camera view for the recognition capability.
 *
 * THE ORANGE IS GONE. This figure used #e8620f for an unmatched face, on the
 * reasoning that an unmatched face is a real product signal rather than
 * decoration. That reasoning was sound under the old multi-accent system; it
 * does not survive the two-colour one, where the whole site is a paper family
 * and one purple and there is no third hue to spend.
 *
 * So matched and unmatched are now told apart by TREATMENT rather than by
 * hue: a matched face gets a solid box with a filled label chip, an unmatched
 * one gets a dashed box with an outlined chip. That is arguably the better
 * signal anyway - it survives greyscale, it survives colour blindness, and it
 * does not rely on a reader knowing that orange means "check this one".
 *
 * The label chip states which is which in words as well, so nothing here
 * depends on the visual distinction alone.
 *
 * CONTENT NOTE: the original legend read "Repeat unmatched / Seen before,
 * still unknown", which claims the product tracks an unmatched visitor across
 * repeat visits. Nothing in this branch's copy says that: the product pages
 * and /how-it-works both describe a single unmatched face being flagged at the
 * entry point for a person to check. The safer legend is used here instead. If
 * DYCH confirms repeat-visit tracking is real, restore the original wording
 * and the "x3" count on the chip.
 */

export function RecognitionFigure() {
  return (
    <figure>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-border bg-surface-sunk">
        <svg
          viewBox="0 0 400 300"
          className="absolute inset-0 size-full"
          role="img"
          aria-label="Illustrative camera view with three tracked faces: two matched, shown with solid boxes, and one unmatched, shown with a dashed box and flagged for a person to check"
        >
          {/* Frame scan lines. Restrained, not a decorative glow. */}
          <g stroke="var(--foreground)" strokeWidth="0.3" opacity="0.07">
            {Array.from({ length: 15 }, (_, i) => (
              <line key={i} x1="0" y1={i * 20} x2="400" y2={i * 20} />
            ))}
          </g>

          <TrackedBox x={40} y={70} w={70} h={88} label="ID 4471" />
          <TrackedBox x={165} y={110} w={62} h={78} label="ID 2208" />
          <TrackedBox x={280} y={84} w={76} h={94} label="UNMATCHED" unmatched />
        </svg>
      </div>

      <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
        <div className="flex items-baseline gap-2.5">
          <dt className="flex items-center gap-2 text-sm text-muted">
            <span
              aria-hidden
              className="inline-block size-3 border border-accent bg-accent"
            />
            Matched
          </dt>
          <dd className="text-sm text-muted">Known, enrolled identity</dd>
        </div>
        <div className="flex items-baseline gap-2.5">
          <dt className="flex items-center gap-2 text-sm text-muted">
            <span
              aria-hidden
              className="inline-block size-3 border border-dashed border-accent"
            />
            Unmatched
          </dt>
          <dd className="text-sm text-muted">Flagged for a person to check</dd>
        </div>
      </dl>

      <figcaption className="mt-4 text-sm text-muted">
        Illustrative camera view, not a product screenshot.
      </figcaption>
    </figure>
  );
}

function TrackedBox({
  x,
  y,
  w,
  h,
  label,
  unmatched = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  unmatched?: boolean;
}) {
  const chipW = label.length * 6.2 + 8;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeDasharray={unmatched ? "5 4" : undefined}
      />
      {[
        [x, y],
        [x + w, y],
        [x, y + h],
        [x + w, y + h],
      ].map(([cx, cy], i) => (
        <g key={i} stroke="var(--accent)" strokeWidth="2.5">
          <line x1={cx - 5} y1={cy} x2={cx + 5} y2={cy} />
          <line x1={cx} y1={cy - 5} x2={cx} y2={cy + 5} />
        </g>
      ))}
      {/* Matched: filled chip, paper label. Unmatched: outlined chip, accent
          label - the same inversion the buttons use. */}
      <rect
        x={x}
        y={y - 15}
        width={chipW}
        height="13"
        fill={unmatched ? "var(--surface)" : "var(--accent)"}
        stroke="var(--accent)"
        strokeWidth={unmatched ? 1 : 0}
      />
      <text
        x={x + 4}
        y={y - 5}
        fill={unmatched ? "var(--accent-on-light)" : "var(--accent-ink)"}
        fontSize="8.5"
        fontWeight={unmatched ? 600 : 400}
        fontFamily="var(--font-plex), sans-serif"
        letterSpacing="0.06em"
      >
        {label}
      </text>
    </g>
  );
}
