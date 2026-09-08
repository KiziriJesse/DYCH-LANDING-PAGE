/**
 * RecognitionFigure - illustrative camera view for the security capability.
 *
 * Ported from `Reidentification.tsx` on the prototype branch. The SVG grammar
 * (bounding box, corner ticks, label chip) is unchanged; only the colours move
 * onto this branch's tokens.
 *
 * ORANGE POLICY, carried over from the original: #e8620f appears ONLY inside
 * this figure, because an unmatched face is a real product signal rather than
 * decoration. It is never used as site chrome - no orange buttons, links or
 * headings anywhere else.
 *
 * Colour note: matched boxes use --accent-security rather than the brand
 * purple. This figure belongs to the security capability, so its own feature
 * accent is the correct one here; brand purple stays reserved for interactive
 * controls.
 *
 * CONTENT NOTE: the original legend read "Repeat unmatched / Seen before,
 * still unknown", which claims the product tracks an unmatched visitor across
 * repeat visits. Nothing in this branch's copy says that: /product and
 * /how-it-works both describe a single unmatched face being flagged at the
 * gate for a person to check. The safer legend is used here instead. If DYCH
 * confirms repeat-visit tracking is real, restore the original wording and the
 * "x3" count on the chip.
 */

const ORANGE = "#e8620f";

export function RecognitionFigure() {
  return (
    <figure>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-border bg-surface-sunk">
        <svg
          viewBox="0 0 400 300"
          className="absolute inset-0 size-full"
          role="img"
          aria-label="Illustrative camera view with three tracked faces: two matched, one unmatched and flagged for the gate to check"
        >
          {/* Frame scan lines. Restrained, not a decorative glow. */}
          <g stroke="var(--foreground)" strokeWidth="0.3" opacity="0.07">
            {Array.from({ length: 15 }, (_, i) => (
              <line key={i} x1="0" y1={i * 20} x2="400" y2={i * 20} />
            ))}
          </g>

          <TrackedBox
            x={40}
            y={70}
            w={70}
            h={88}
            color="var(--accent-security)"
            label="ID 4471"
          />
          <TrackedBox
            x={165}
            y={110}
            w={62}
            h={78}
            color="var(--accent-security)"
            label="ID 2208"
          />
          <TrackedBox x={280} y={84} w={76} h={94} color={ORANGE} label="UNMATCHED" />
        </svg>
      </div>

      <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
        <div className="flex items-baseline gap-2.5">
          <dt className="flex items-center gap-2 text-sm text-muted">
            <span
              aria-hidden
              className="inline-block size-3 border"
              style={{ borderColor: "var(--accent-security)" }}
            />
            Matched
          </dt>
          <dd className="text-sm text-faint">Known, enrolled identity</dd>
        </div>
        <div className="flex items-baseline gap-2.5">
          <dt className="flex items-center gap-2 text-sm text-muted">
            <span
              aria-hidden
              className="inline-block size-3 border"
              style={{ borderColor: ORANGE }}
            />
            Unmatched
          </dt>
          <dd className="text-sm text-faint">Flagged for the gate to check</dd>
        </div>
      </dl>

      <figcaption className="mt-4 text-sm text-faint">
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
  color,
  label,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  label: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={color} strokeWidth="1.5" />
      {[
        [x, y],
        [x + w, y],
        [x, y + h],
        [x + w, y + h],
      ].map(([cx, cy], i) => (
        <g key={i} stroke={color} strokeWidth="2.5">
          <line x1={cx - 5} y1={cy} x2={cx + 5} y2={cy} />
          <line x1={cx} y1={cy - 5} x2={cx} y2={cy + 5} />
        </g>
      ))}
      <rect x={x} y={y - 15} width={label.length * 6.2 + 8} height="13" fill={color} />
      <text
        x={x + 4}
        y={y - 5}
        fill="var(--background)"
        fontSize="8.5"
        fontFamily="var(--font-plex), sans-serif"
        letterSpacing="0.06em"
      >
        {label}
      </text>
    </g>
  );
}
