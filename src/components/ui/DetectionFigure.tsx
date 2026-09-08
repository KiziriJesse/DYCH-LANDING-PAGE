"use client";

import { useEffect, useRef } from "react";

/**
 * DetectionFigure - live nodal biometric wireframe.
 *
 * Ported from the prototype on `main`. A dense facial-landmark mesh rendered
 * to canvas: nodes drift on their own, react to the pointer, and snap into a
 * lock state while pressed, with a scan-line sweep. Fully static under
 * prefers-reduced-motion.
 *
 * Geometry is hand-placed facial topology (cranium, jaw, brows, orbits, nasal
 * ridge, philtrum, lips, cheekbones), not random points, so the mesh reads as
 * a face. All of that is unchanged from the original.
 *
 * The one change made in porting: the stroke colour was hardcoded as
 * `rgba(0, 113, 227, ...)` in four places. It is now a single module default
 * plus an optional `stroke` prop, because the hero renders this on a light
 * ground and needs a more saturated purple than a dark section would.
 */

type P = [number, number];

/** Dark-theme brand purple, matching --accent (#9570eb). */
const DEFAULT_STROKE: [number, number, number] = [149, 112, 235];

const W = 360;
const H = 470;

const OUTLINE: P[] = [
  [180, 18], [222, 26], [258, 44], [288, 72], [308, 110], [320, 155],
  [324, 200], [321, 246], [313, 288], [300, 326], [281, 360], [256, 391],
  [226, 416], [204, 434], [180, 442], [156, 434], [134, 416], [104, 391],
  [79, 360], [60, 326], [47, 288], [39, 246], [36, 200], [40, 155],
  [52, 110], [72, 72], [102, 44], [138, 26],
];

const BROW_L: P[] = [[70, 170], [96, 152], [124, 146], [152, 154]];
const BROW_R: P[] = [[208, 154], [236, 146], [264, 152], [290, 170]];

const EYE_L: P[] = [[84, 197], [106, 181], [131, 179], [151, 193], [130, 206], [105, 205]];
const EYE_R: P[] = [[209, 193], [229, 179], [254, 181], [276, 197], [255, 205], [230, 206]];
const IRIS: P[] = [[118, 193], [242, 193]];

const NOSE: P[] = [
  [180, 188], [180, 216], [180, 244], [180, 266],
  [158, 258], [202, 258],
  [151, 287], [165, 297], [180, 301], [195, 297], [209, 287],
];

const LIP_TOP: P[] = [[138, 341], [158, 329], [172, 336], [180, 331], [188, 336], [202, 329], [222, 341]];
const LIP_BOT: P[] = [[208, 357], [190, 366], [180, 368], [170, 366], [152, 357]];

const STRUCTURE: P[] = [
  [180, 78], [120, 90], [240, 90], [150, 118], [210, 118], [180, 122],
  [88, 128], [272, 128], [58, 190], [302, 190],
  [78, 240], [120, 250], [240, 250], [282, 240],
  [94, 292], [140, 300], [220, 300], [266, 292],
  [108, 342], [252, 342], [126, 300], [234, 300],
  [138, 392], [222, 392], [180, 398], [180, 420],
  [104, 220], [256, 220], [180, 160],
  [148, 56], [212, 56], [92, 104], [268, 104], [180, 46],
];

const NODES: P[] = [
  ...OUTLINE, ...BROW_L, ...BROW_R, ...EYE_L, ...EYE_R, ...IRIS,
  ...NOSE, ...LIP_TOP, ...LIP_BOT, ...STRUCTURE,
];

/** Explicit feature chains, so eyes/lips/brows always read as contours. */
function chain(start: number, len: number, closed = false): [number, number][] {
  const e: [number, number][] = [];
  for (let i = 0; i < len - 1; i++) e.push([start + i, start + i + 1]);
  if (closed) e.push([start + len - 1, start]);
  return e;
}

const iOutline = 0;
const iBrowL = iOutline + OUTLINE.length;
const iBrowR = iBrowL + BROW_L.length;
const iEyeL = iBrowR + BROW_R.length;
const iEyeR = iEyeL + EYE_L.length;
const iIris = iEyeR + EYE_R.length;
const iNose = iIris + IRIS.length;
const iLipT = iNose + NOSE.length;
const iLipB = iLipT + LIP_TOP.length;

const FEATURE_EDGES: [number, number][] = [
  ...chain(iOutline, OUTLINE.length, true),
  ...chain(iBrowL, BROW_L.length),
  ...chain(iBrowR, BROW_R.length),
  ...chain(iEyeL, EYE_L.length, true),
  ...chain(iEyeR, EYE_R.length, true),
  ...chain(iNose, 4),
  ...chain(iLipT, LIP_TOP.length),
  ...chain(iLipB, LIP_BOT.length),
  [iLipT, iLipB + LIP_BOT.length - 1],
  [iLipT + LIP_TOP.length - 1, iLipB],
];

/** Proximity mesh - this is what gives the figure its triangulated web. */
function buildEdges(): [number, number][] {
  const set = new Set<string>();
  const out: [number, number][] = [];
  const add = (a: number, b: number) => {
    const k = a < b ? `${a}:${b}` : `${b}:${a}`;
    if (!set.has(k)) {
      set.add(k);
      out.push([a, b]);
    }
  };
  FEATURE_EDGES.forEach(([a, b]) => add(a, b));
  for (let i = 0; i < NODES.length; i++) {
    for (let j = i + 1; j < NODES.length; j++) {
      const dx = NODES[i][0] - NODES[j][0];
      const dy = NODES[i][1] - NODES[j][1];
      if (Math.hypot(dx, dy) < 46) add(i, j);
    }
  }
  return out;
}

const EDGES = buildEdges();

export function DetectionFigure({
  className = "",
  stroke = DEFAULT_STROKE,
}: {
  className?: string;
  /** RGB triple for the mesh. Tune per background; see the note above. */
  stroke?: [number, number, number];
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  // A stable primitive, so passing a fresh array literal each render does not
  // tear down and rebuild the animation.
  const rgb = stroke.join(", ");

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const state = NODES.map(([x, y], i) => ({
      hx: x, hy: y, x, y, vx: 0, vy: 0,
      phase: (i * 2.399) % (Math.PI * 2),
      amp: 0.5 + ((i * 7) % 10) / 10,
    }));

    let pointer = { x: -999, y: -999, inside: false };
    let press = 0;      // eased 0..1
    let pressing = false;
    let raf = 0;
    let t = 0;

    const scale = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = cv.getBoundingClientRect();
      cv.width = Math.round(r.width * dpr);
      cv.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { w: r.width, h: r.height };
    };
    let box = scale();
    const onResize = () => { box = scale(); };
    window.addEventListener("resize", onResize);

    const toLocal = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      const s = Math.min(r.width / W, r.height / H);
      const ox = (r.width - W * s) / 2;
      const oy = (r.height - H * s) / 2;
      return { x: (e.clientX - r.left - ox) / s, y: (e.clientY - r.top - oy) / s };
    };

    const onMove = (e: PointerEvent) => {
      const p = toLocal(e);
      pointer = { ...p, inside: true };
    };
    const onLeave = () => { pointer.inside = false; pressing = false; };
    const onDown = (e: PointerEvent) => {
      pressing = true;
      const p = toLocal(e);
      pointer = { ...p, inside: true };
    };
    const onUp = () => { pressing = false; };

    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerleave", onLeave);
    cv.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    const draw = () => {
      const { w, h } = box;
      const s = Math.min(w / W, h / H);
      const ox = (w - W * s) / 2;
      const oy = (h - H * s) / 2;

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(ox, oy);
      ctx.scale(s, s);

      t += 0.0125;
      press += ((pressing ? 1 : 0) - press) * 0.14;

      const reach = 74 + press * 46;

      for (const n of state) {
        // idle drift
        const dx0 = reduced ? 0 : Math.cos(t + n.phase) * 0.5 * n.amp;
        const dy0 = reduced ? 0 : Math.sin(t * 0.85 + n.phase) * 0.5 * n.amp;
        let tx = n.hx + dx0;
        let ty = n.hy + dy0;

        if (pointer.inside && !reduced) {
          const dx = n.hx - pointer.x;
          const dy = n.hy - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < reach && d > 0.001) {
            const f = (1 - d / reach) ** 2;
            // hover pushes the mesh outward; pressing pulls it into a lock
            const dir = press > 0.5 ? -1 : 1;
            const mag = f * (9 + press * 11) * dir;
            tx += (dx / d) * mag;
            ty += (dy / d) * mag;
          }
        }

        n.vx += (tx - n.x) * 0.14;
        n.vy += (ty - n.y) * 0.14;
        n.vx *= 0.76;
        n.vy *= 0.76;
        n.x += n.vx;
        n.y += n.vy;
      }

      // edges
      for (const [a, b] of EDGES) {
        const A = state[a];
        const B = state[b];
        let alpha = 0.32;
        let width = 0.5;
        if (pointer.inside && !reduced) {
          const mx = (A.x + B.x) / 2;
          const my = (A.y + B.y) / 2;
          const d = Math.hypot(mx - pointer.x, my - pointer.y);
          if (d < reach) {
            const f = 1 - d / reach;
            alpha = 0.32 + f * (0.62 + press * 0.3);
            width = 0.5 + f * (0.7 + press * 0.9);
          }
        }
        ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.stroke();
      }

      // nodes
      for (let i = 0; i < state.length; i++) {
        const n = state[i];
        let r = 1.5;
        let alpha = 0.85;
        if (pointer.inside && !reduced) {
          const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
          if (d < reach) {
            const f = 1 - d / reach;
            r = 1.5 + f * (1.7 + press * 2.2);
            alpha = 1;
          }
        }
        const isIris = i >= iIris && i < iIris + IRIS.length;
        ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, isIris ? r + 1.6 : r, 0, Math.PI * 2);
        ctx.fill();
      }

      // scan line while pressed - the "reading" moment
      if (press > 0.02 && !reduced) {
        const y = 18 + ((t * 46) % (H - 36));
        ctx.strokeStyle = `rgba(${rgb}, ${0.5 * press})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(6, y);
        ctx.lineTo(W - 6, y);
        ctx.stroke();
      }

      // bounding box + corner ticks - the product's visual grammar
      const inset = 6 - press * 4;
      ctx.strokeStyle = `rgba(${rgb}, ${0.55 + press * 0.45})`;
      ctx.lineWidth = 1;
      ctx.strokeRect(inset, inset, W - inset * 2, H - inset * 2);
      const corners: P[] = [
        [inset, inset], [W - inset, inset],
        [inset, H - inset], [W - inset, H - inset],
      ];
      ctx.lineWidth = 2 + press;
      for (const [cx, cy] of corners) {
        ctx.beginPath();
        ctx.moveTo(cx - 8, cy); ctx.lineTo(cx + 8, cy);
        ctx.moveTo(cx, cy - 8); ctx.lineTo(cx, cy + 8);
        ctx.stroke();
      }

      ctx.restore();
      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointerup", onUp);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerleave", onLeave);
      cv.removeEventListener("pointerdown", onDown);
    };
  }, [rgb]);

  return (
    <canvas
      ref={ref}
      className={className + " touch-none"}
      style={{ aspectRatio: `${W} / ${H}` }}
      role="img"
      aria-label="Interactive facial-landmark wireframe that responds to pointer movement and pressing"
    />
  );
}
