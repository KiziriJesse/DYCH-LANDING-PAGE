"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * ShapeField - triangles and squares drifting up the whole site.
 *
 * The same motion as the Face Scan hero's particle field (rise, fade in and
 * back out, a 40deg turn) carried to every page. Two differences, both
 * because every other surface on the site is light:
 *
 *  - Violet, not white. Triangles take the core violet, squares the
 *    highlight edge, so the shapes stay inside the logo's one hue family.
 *  - A fixed overlay with mix-blend-mode: multiply, not a layer behind the
 *    content. About half the sections paint an opaque ground (bg-surface,
 *    bg-surface-raised, the footer), which would hide anything underneath.
 *    Multiply only ever darkens, so a shape crossing body text leaves the
 *    text as dark as it was. The dark and violet surfaces (z-index 2) and
 *    the cards and images (z-raise) all sit above the field, so it only
 *    ever crosses bare paper. body::after already sets this precedent with
 *    the grain.
 *
 * SCROLL. The layer is fixed to the viewport, but the shapes inside it travel
 * with the page at 60% of the scroll speed, so scrolling down brings new
 * shapes in from below rather than leaving one set parked over moving
 * content. They sit on a band 150lvh tall, rendered twice: the strip moves up
 * by (scrollY x 0.6) modulo the band's height, and because the two copies are
 * identical the wrap is seamless. The band is taller than any viewport, so a
 * shape and its copy are never on screen together.
 *
 * The rise-and-fade loop is still pure CSS. The only JS is one passive scroll
 * listener writing a transform at most once per frame. Under reduced motion
 * the listener is never attached and the field holds still. Keyframes and
 * the reduced-motion hold live in globals.css.
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

// Per band. The band is 1.5 viewports tall, so this keeps the density the
// field had when it was one viewport of 36.
const SHAPE_COUNT = 54;
// A phone-width viewport at full count reads as noise; the rest join from md.
const SHAPES_ON_PHONE = 30;
// Fraction of the page's scroll speed the shapes move at.
const PARALLAX = 0.6;

const round2 = (v: number) => Math.round(v * 100) / 100;

// Seeded, so every render - and every page - lays out the same field.
const SHAPES: Shape[] = (() => {
  let s = 11;
  const r = () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296;
  return Array.from({ length: SHAPE_COUNT }, (_, i) => ({
    left: round2(r() * 98),
    top: round2(r() * 100),
    // 3-10px: small enough to read as texture rather than as objects.
    size: round2(3 + r() * 7),
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
  const stripRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const strip = stripRef.current;
    const band = bandRef.current;
    if (!strip || !band) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let height = band.offsetHeight;
    let frame = 0;

    const paint = () => {
      frame = 0;
      if (!height) return;
      const offset = (window.scrollY * PARALLAX) % height;
      strip.style.transform = `translate3d(0, ${-offset}px, 0)`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    // The band is in lvh, so a phone's address bar does not resize it, but a
    // window resize or rotation does.
    const measure = () => {
      height = band.offsetHeight;
      schedule();
    };

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div aria-hidden className="shape-field">
      <div ref={stripRef} className="shape-field__strip">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            ref={copy === 0 ? bandRef : undefined}
            className="shape-field__band"
          >
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
        ))}
      </div>
    </div>
  );
}
