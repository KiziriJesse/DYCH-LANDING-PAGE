import type { CSSProperties } from "react";

/**
 * ShapeField - triangles and squares drifting up the whole site.
 *
 * The same motion as the Face Scan hero's particle field (rise, fade in and
 * back out, a 40deg turn) carried to every page. Two differences, both
 * because every other surface on the site is light:
 *
 *  - Purple, not white. Triangles take --accent, squares --iris, so the
 *    shapes stay inside the site's one hue family.
 *  - A fixed overlay with mix-blend-mode: multiply, not a layer behind the
 *    content. About half the sections paint an opaque ground (bg-surface,
 *    bg-surface-raised, the footer), which would hide anything underneath.
 *    Multiply only ever darkens, so a shape crossing body text leaves the
 *    text as dark as it was, and over the dark hero it all but disappears -
 *    the hero keeps its own white field. body::after already sets this
 *    precedent with the grain.
 *
 * Server-rendered and CSS-animated: no client JS, no rAF loop, nothing to
 * hydrate. The browser already throttles CSS animation in background tabs.
 * Keyframes and the reduced-motion hold live in globals.css.
 */

type Shape = {
  left: number;
  top: number;
  size: number;
  rot: number;
  dur: number;
  delay: number;
  rise: number;
  tri: boolean;
  alpha: number;
  wide: boolean;
};

const SHAPE_COUNT = 36;
// A phone-width viewport at full count reads as noise; the rest join from md.
const SHAPES_ON_PHONE = 20;

const round2 = (v: number) => Math.round(v * 100) / 100;

// Seeded, so every render - and every page - lays out the same field.
const SHAPES: Shape[] = (() => {
  let s = 11;
  const r = () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296;
  return Array.from({ length: SHAPE_COUNT }, (_, i) => ({
    left: round2(r() * 98),
    top: round2(8 + r() * 92),
    size: round2(6 + r() * 14),
    rot: round2(r() * 360),
    // Slow on purpose: this runs behind reading, not behind a headline.
    dur: round2(9 + r() * 8),
    // Negative in CSS, so the field is already mid-cycle on first paint
    // instead of every shape fading in from nothing at once.
    delay: round2(r() * 17),
    rise: round2(70 + r() * 110),
    tri: r() > 0.5,
    // Peak alpha under multiply. Light enough that a paragraph never has a
    // visible shape competing with it.
    alpha: round2(0.14 + r() * 0.2),
    wide: i >= SHAPES_ON_PHONE,
  }));
})();

export function ShapeField() {
  return (
    <div aria-hidden className="shape-field">
      {SHAPES.map((shape, i) => (
        <span
          key={i}
          className={
            "shape-field__item" +
            (shape.tri ? " shape-field__item--tri" : "") +
            (shape.wide ? " hidden md:block" : "")
          }
          style={
            {
              left: `${shape.left}%`,
              top: `${shape.top}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              "--shape-dur": `${shape.dur}s`,
              "--shape-delay": `-${shape.delay}s`,
              "--shape-rise": `${shape.rise}px`,
              "--shape-rot": `${shape.rot}deg`,
              "--shape-alpha": shape.alpha,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
