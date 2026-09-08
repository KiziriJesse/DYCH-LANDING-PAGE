/* BAND 4 — LIGHT, 1.32vh. Real-time recognition and the
   unknown-person re-identification feature.

   ORANGE POLICY: #e8620f appears ONLY inside this product figure, because
   the orange bounding box is a real product behaviour, not decoration.
   It is never used for site chrome — no orange buttons, links or headings.
   The site's accent stays blue (CLAUDEwebdesign copy.md §4: one accent). */

const ORANGE = "#e8620f";

export function Reidentification() {
  return (
    <section className="min-h-[var(--band-md)] bg-[var(--paper)] px-[var(--shell)] py-28">
      <div className="grid items-center gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow text-[var(--ink)]/50">Real-time</p>
          <h2 className="mt-6 text-[var(--ink)]">
            The face it
            <br />
            keeps seeing.
          </h2>
          {/* [PLACEHOLDER] feature description */}
          <p className="mt-8 max-w-md text-[var(--ink)]/70">
            Recognition runs live against the enrolled set. When someone does
            not match — and then does not match again — the system stops
            treating them as noise and flags the repeat visit.
          </p>

          <dl className="mt-10 space-y-4 border-t border-[var(--ink)]/12 pt-8">
            <div className="flex items-baseline gap-4">
              <dt className="flex items-center gap-2 text-sm text-[var(--ink)]/60">
                <span
                  aria-hidden="true"
                  className="inline-block size-3 border"
                  style={{ borderColor: "var(--accent)" }}
                />
                Matched
              </dt>
              <dd className="text-sm text-[var(--ink)]/60">
                Known, enrolled identity
              </dd>
            </div>
            <div className="flex items-baseline gap-4">
              <dt className="flex items-center gap-2 text-sm text-[var(--ink)]/60">
                <span
                  aria-hidden="true"
                  className="inline-block size-3 border"
                  style={{ borderColor: ORANGE }}
                />
                Repeat unmatched
              </dt>
              <dd className="text-sm text-[var(--ink)]/60">
                Seen before, still unknown
              </dd>
            </div>
          </dl>
        </div>

        <figure className="md:col-span-7">
          <div className="relative aspect-[4/3] w-full bg-[var(--ink)]">
            <svg
              viewBox="0 0 400 300"
              className="absolute inset-0 size-full"
              role="img"
              aria-label="Camera view with three tracked faces: two matched in blue, one repeat unmatched visitor in orange"
            >
              {/* frame scan lines — restrained, not decorative glow */}
              <g stroke="var(--paper)" strokeWidth="0.3" opacity="0.07">
                {Array.from({ length: 15 }, (_, i) => (
                  <line key={i} x1="0" y1={i * 20} x2="400" y2={i * 20} />
                ))}
              </g>

              <TrackedBox x={40} y={70} w={70} h={88} color="var(--accent)" label="ID 4471" />
              <TrackedBox x={165} y={110} w={62} h={78} color="var(--accent)" label="ID 2208" />
              <TrackedBox x={280} y={84} w={76} h={94} color={ORANGE} label="UNKNOWN ×3" />
            </svg>
          </div>
          <figcaption className="mt-4 text-sm text-[var(--ink)]/50">
            [PLACEHOLDER] Illustrative camera view — not a product screenshot.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function TrackedBox({
  x, y, w, h, color, label,
}: {
  x: number; y: number; w: number; h: number; color: string; label: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={color} strokeWidth="1.5" />
      {[[x, y], [x + w, y], [x, y + h], [x + w, y + h]].map(([cx, cy], i) => (
        <g key={i} stroke={color} strokeWidth="2.5">
          <line x1={cx - 5} y1={cy} x2={cx + 5} y2={cy} />
          <line x1={cx} y1={cy - 5} x2={cx} y2={cy + 5} />
        </g>
      ))}
      <rect x={x} y={y - 15} width={label.length * 6.2 + 8} height="13" fill={color} />
      <text
        x={x + 4}
        y={y - 5}
        fill="#0f1012"
        fontSize="8.5"
        fontFamily="var(--font-sans), sans-serif"
        letterSpacing="0.06em"
      >
        {label}
      </text>
    </g>
  );
}
