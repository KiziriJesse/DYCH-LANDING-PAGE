/**
 * HudOverlay - the instrumentation layer over the hero field.
 *
 * Crosshairs, alignment rules and coordinate markers, drawn in DOM rather
 * than in the WebGL scene. Two reasons: hairlines and 9px monospace stay
 * crisp at any DPR when the browser rasterises them, and none of it needs a
 * frame loop, so it costs nothing once painted.
 *
 * Every readout describes this frame - axis positions, the grid step, the
 * sector a mark sits in. None of it is invented product data, which is the
 * line the design standard actually draws: decorative chrome that names
 * itself is fine, fabricated metrics are not.
 *
 * Purely decorative, so the whole layer is aria-hidden and inert. The dense
 * marks drop below md, where they would crowd the copy.
 */

/** Corner registration marks: bracket, crosshair, and the corner's label. */
const CORNERS = [
  { id: "TL", label: "SEC 01", cls: "left-5 top-5 sm:left-8 sm:top-8", rotate: 0 },
  { id: "TR", label: "SEC 02", cls: "right-5 top-5 sm:right-8 sm:top-8", rotate: 90 },
  { id: "BR", label: "SEC 03", cls: "right-5 bottom-5 sm:right-8 sm:bottom-8", rotate: 180 },
  { id: "BL", label: "SEC 04", cls: "left-5 bottom-5 sm:left-8 sm:bottom-8", rotate: 270 },
] as const;

/** Crosshairs pinned to the field, placed off the copy column. */
const MARKS = [
  { x: "62%", y: "18%", label: "X 62.0 / Y 18.0" },
  { x: "84%", y: "38%", label: "X 84.0 / Y 38.0" },
  { x: "71%", y: "77%", label: "X 71.0 / Y 77.0" },
  { x: "46%", y: "62%", label: null },
] as const;

export function HudOverlay() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      {/* ---- corner registration ---- */}
      {CORNERS.map((c) => (
        <div key={c.id} className={`absolute ${c.cls}`}>
          <div className="relative">
            <div
              className="hud-bracket"
              style={{ transform: `rotate(${c.rotate}deg)` }}
            />
            <span
              className={`hud-tag absolute top-[26px] ${
                c.id === "TR" || c.id === "BR" ? "right-0" : "left-0"
              } hidden sm:block`}
            >
              {c.label}
            </span>
          </div>
        </div>
      ))}

      {/* ---- alignment rules ----
          One horizontal at the optical centre of the copy, one vertical on
          the column edge, so the marks agree with the layout rather than
          floating over it. */}
      <div className="hud-rule-h absolute inset-x-0 top-1/2 hidden md:block" />
      <div className="hud-rule-v absolute inset-y-0 left-[44%] hidden lg:block" />
      <div className="hud-ticks absolute inset-x-0 top-[calc(50%+1px)] hidden md:block" />

      {/* Axis readouts sitting on the horizontal rule. */}
      <span className="hud-tag hud-tag--glint absolute left-5 top-[calc(50%-14px)] hidden md:block sm:left-8">
        AXIS Y — 50.0
      </span>
      <span className="hud-tag absolute right-5 top-[calc(50%-14px)] hidden md:block sm:right-8">
        GRID 18VW × 22VH
      </span>

      {/* ---- crosshairs ---- */}
      {MARKS.map((m) => (
        <div
          key={`${m.x}-${m.y}`}
          className="absolute hidden md:block"
          style={{ left: m.x, top: m.y }}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            <div className="hud-cross relative" />
            {m.label ? (
              <span className="hud-tag absolute left-[22px] top-1/2 -translate-y-1/2">
                {m.label}
              </span>
            ) : null}
          </div>
        </div>
      ))}

      {/* Registration squares, quieter than the crosshairs. */}
      <div className="hud-box absolute left-[30%] top-[24%] hidden lg:block" />
      <div className="hud-box absolute left-[90%] top-[66%] hidden lg:block" />

      {/* ---- baseline strip ---- */}
      <div className="absolute inset-x-5 bottom-5 hidden items-center justify-between sm:inset-x-8 sm:bottom-8 md:flex">
        <span className="hud-tag hud-tag--glint">FRAME 16:9 — FULL BLEED</span>
        <span className="hud-tag">SCALE 1.00</span>
      </div>
    </div>
  );
}

export default HudOverlay;
