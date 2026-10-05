"use client";

import { useEffect, useRef } from "react";

/**
 * DetectionFigure - live nodal biometric wireframe.
 *
 * Ported from the prototype on `main`. A dense facial-landmark mesh rendered
 * to canvas: nodes drift on their own, react to the pointer, and snap into a
 * lock state on a self-running cycle, with a scan-line sweep. Fully static
 * under prefers-reduced-motion.
 *
 * Geometry is hand-placed facial topology (cranium, jaw, ears, brows, orbits,
 * iris rings, nasal ridge, alae, nostrils, philtrum, lips), not random
 * points, so the mesh reads as a face. Interior edges come from a Delaunay
 * triangulation of those landmarks, which is what gives the figure its
 * polygonal web.
 *
 * The stroke colour was originally hardcoded as `rgba(0, 113, 227, ...)` in
 * four places. It is a single module default plus an optional `stroke` prop,
 * which is now mostly redundant - there is one ground on the site - but is
 * kept so a caller can tune the mesh against an unusually deep wash.
 */

export type P = [number, number];
type Edge = [number, number];
type Tri = [number, number, number];

/** A lightened step of the brand core, NOT --accent - the two-colour rebrand
    moved --accent to #5416C4 and this value stayed where it was. It is kept
    because line art is held to 3:1, which it clears on every paper tone
    (3.94-4.70:1) while reading as a web rather than a drawn line. */
const DEFAULT_STROKE: [number, number, number] = [131, 105, 211];

/* The self-running scan cycle, in seconds. Idle drift, then a sweep down the
   mesh, a short lock, and a release back to idle. */
const CYCLE = 9;
const SCAN_START = 4.6;
const SCAN_END = 6.8;
const HOLD_END = 7.6;

export const W = 360;
export const H = 470;

const mirror = (pts: P[]): P[] => pts.map(([x, y]) => [W - x, y]);

function densify(pts: P[], closed: boolean, maxDist: number): P[] {
  const src = closed ? [...pts, pts[0]] : pts;
  const out: P[] = [];
  for (let i = 0; i < src.length - 1; i++) {
    const a = src[i];
    const b = src[i + 1];
    out.push(a);
    const d = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const steps = Math.max(0, Math.floor(d / maxDist));
    for (let k = 1; k <= steps; k++) {
      const t = k / (steps + 1);
      out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
    }
  }
  if (!closed) out.push(src[src.length - 1]);
  return out;
}

function ring(cx: number, cy: number, rx: number, ry: number, n: number, rot = -Math.PI / 2): P[] {
  const out: P[] = [];
  for (let i = 0; i < n; i++) {
    const a = rot + (i / n) * Math.PI * 2;
    out.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]);
  }
  return out;
}

function chain(start: number, len: number, closed = false): Edge[] {
  const e: Edge[] = [];
  for (let i = 0; i < len - 1; i++) e.push([start + i, start + i + 1]);
  if (closed && len > 2) e.push([start + len - 1, start]);
  return e;
}

function keyOf(a: number, b: number) {
  return a < b ? `${a}:${b}` : `${b}:${a}`;
}

function pip(x: number, y: number, poly: P[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0];
    const yi = poly[i][1];
    const xj = poly[j][0];
    const yj = poly[j][1];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi + 0.00001) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

function circumcircle(a: P, b: P, c: P) {
  const d = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
  if (Math.abs(d) < 1e-6) return null;
  const a2 = a[0] * a[0] + a[1] * a[1];
  const b2 = b[0] * b[0] + b[1] * b[1];
  const c2 = c[0] * c[0] + c[1] * c[1];
  const ux = (a2 * (b[1] - c[1]) + b2 * (c[1] - a[1]) + c2 * (a[1] - b[1])) / d;
  const uy = (a2 * (c[0] - b[0]) + b2 * (a[0] - c[0]) + c2 * (b[0] - a[0])) / d;
  const r2 = (a[0] - ux) ** 2 + (a[1] - uy) ** 2;
  return { ux, uy, r2 };
}

function delaunay(pts: P[], hull: P[]): Edge[] {
  const n = pts.length;
  const minX = 0;
  const minY = 0;
  const maxX = W;
  const maxY = H;
  const dx = maxX - minX;
  const dy = maxY - minY;
  const dmax = Math.max(dx, dy) * 4;
  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const all: P[] = pts.concat([
    [midX - 2 * dmax, midY - dmax],
    [midX, midY + 2 * dmax],
    [midX + 2 * dmax, midY - dmax],
  ]);
  let tris: Tri[] = [[n, n + 1, n + 2]];

  for (let i = 0; i < n; i++) {
    const bad: Edge[] = [];
    const keep: Tri[] = [];
    const p = pts[i];
    for (const t of tris) {
      const cc = circumcircle(all[t[0]], all[t[1]], all[t[2]]);
      if (!cc) continue;
      if ((p[0] - cc.ux) ** 2 + (p[1] - cc.uy) ** 2 <= cc.r2 + 0.4) {
        bad.push([t[0], t[1]], [t[1], t[2]], [t[2], t[0]]);
      } else {
        keep.push(t);
      }
    }
    const counts = new Map<string, { e: Edge; n: number }>();
    for (const e of bad) {
      const k = keyOf(e[0], e[1]);
      const prev = counts.get(k);
      if (prev) prev.n += 1;
      else counts.set(k, { e, n: 1 });
    }
    tris = keep;
    for (const { e, n: c } of counts.values()) {
      if (c === 1) tris.push([e[0], e[1], i]);
    }
  }

  const edges: Edge[] = [];
  const seen = new Set<string>();
  const add = (a: number, b: number) => {
    if (a >= n || b >= n) return;
    const k = keyOf(a, b);
    if (seen.has(k)) return;
    seen.add(k);
    edges.push([a, b]);
  };

  for (const [a, b, c] of tris) {
    if (a >= n || b >= n || c >= n) continue;
    const pa = pts[a];
    const pb = pts[b];
    const pc = pts[c];
    const lab = Math.hypot(pa[0] - pb[0], pa[1] - pb[1]);
    const lbc = Math.hypot(pb[0] - pc[0], pb[1] - pc[1]);
    const lca = Math.hypot(pc[0] - pa[0], pc[1] - pa[1]);
    if (Math.max(lab, lbc, lca) > 78) continue;
    const mx = (pa[0] + pb[0] + pc[0]) / 3;
    const my = (pa[1] + pb[1] + pc[1]) / 3;
    if (!pip(mx, my, hull)) continue;
    add(a, b);
    add(b, c);
    add(c, a);
  }
  return edges;
}

/* Silhouette includes the ear helices so the fill and the hull both carry
   the pinnae. Interior ear bowls sit as their own landmark chains. */
export const SILHOUETTE: P[] = [
  [180, 16], [208, 20], [236, 32], [260, 50], [282, 74], [300, 104], [312, 138],
  [318, 160],
  [332, 168], [348, 182], [356, 202], [356, 224], [348, 246], [334, 260], [320, 266],
  [316, 292], [306, 328], [288, 362], [264, 392], [234, 418], [206, 436], [180, 444],
  [154, 436], [126, 418], [96, 392], [72, 362], [54, 328], [44, 292],
  [40, 266], [26, 260], [12, 246], [4, 224], [4, 202], [12, 182], [28, 168],
  [42, 160], [48, 138], [60, 104], [78, 74], [100, 50], [124, 32], [152, 20],
];

const OUTLINE = densify(SILHOUETTE, true, 18);

const BROW_L = densify([[70, 168], [92, 150], [116, 142], [138, 144], [156, 154]], false, 16);
const BROW_R = mirror(BROW_L);

/* Almond lids, upper crease, then an iris ring and pupil so the orbits read
   as eyes rather than empty hexagons. */
const EYE_L = densify(
  [[80, 198], [96, 182], [116, 176], [136, 180], [152, 196], [140, 212], [118, 218], [96, 214]],
  true,
  12,
);
const EYE_R = mirror(EYE_L);
const CREASE_L = densify([[84, 172], [108, 162], [132, 160], [152, 170]], false, 14);
const CREASE_R = mirror(CREASE_L);
/** Nodes per iris ring. Exported because IRIS_INDEX stores ring starts,
    so a consumer needs the length to test membership. */
export const IRIS_LEN = 10;
const IRIS_L = ring(116, 196, 12.5, 11, IRIS_LEN);
const IRIS_R = ring(W - 116, 196, 12.5, 11, IRIS_LEN);
const PUPIL: P[] = [[116, 196], [W - 116, 196]];

const NOSE_RIDGE = densify(
  [[180, 168], [180, 192], [180, 216], [180, 240], [180, 258], [180, 276]],
  false,
  14,
);
const NOSE_L_WALL = densify([[170, 198], [166, 224], [160, 250], [152, 268]], false, 16);
const NOSE_R_WALL = mirror(NOSE_L_WALL);
const ALA_L = densify([[152, 266], [142, 276], [146, 290], [158, 298]], false, 12);
const ALA_R = mirror(ALA_L);
const NOSTRIL_L = densify([[162, 282], [172, 276], [178, 286], [168, 294]], true, 10);
const NOSTRIL_R = mirror(NOSTRIL_L);
const NOSE_BASE = densify([[158, 300], [180, 308], [202, 300]], false, 12);

const PHILTRUM: P[] = [[180, 318], [170, 328], [190, 328], [180, 332]];
const LIP_TOP = densify(
  [[132, 344], [150, 332], [164, 326], [172, 332], [180, 326], [188, 332], [196, 326], [210, 332], [228, 344]],
  false,
  12,
);
const LIP_TOP_IN = densify([[146, 350], [162, 346], [180, 348], [198, 346], [214, 350]], false, 12);
const LIP_BOT_IN = densify([[214, 358], [198, 364], [180, 366], [162, 364], [146, 358]], false, 12);
const LIP_BOT = densify(
  [[228, 352], [214, 370], [198, 382], [180, 386], [162, 382], [146, 370], [132, 352]],
  false,
  12,
);

/* Inner bowl of each pinna - helix itself lives on SILHOUETTE. */
const EAR_L = densify([[32, 186], [22, 200], [20, 218], [26, 238], [36, 250], [34, 216]], false, 12);
const EAR_R = mirror(EAR_L);

const STRUCTURE_SEED: P[] = [
  [180, 46], [150, 42], [210, 42], [120, 58], [240, 58], [180, 78],
  [140, 82], [220, 82], [100, 90], [260, 90], [160, 102], [200, 102],
  [180, 118], [88, 118], [272, 118], [120, 132], [240, 132], [180, 144],
  [64, 148], [296, 148], [164, 158], [196, 158], [180, 160],
  [58, 190], [302, 190], [78, 218], [282, 218],
  [100, 228], [260, 228], [128, 236], [232, 236],
  [64, 248], [296, 248], [96, 268], [264, 268], [130, 272], [230, 272],
  [70, 288], [290, 288], [108, 304], [252, 304], [140, 312], [220, 312],
  [88, 332], [272, 332], [118, 348], [242, 348],
  [100, 368], [260, 368], [140, 372], [220, 372],
  [180, 400], [156, 396], [204, 396], [128, 408], [232, 408],
  [180, 422], [160, 428], [200, 428],
  [108, 220], [252, 220], [88, 200], [272, 200],
  [148, 250], [212, 250], [180, 292],
];

export const NODES: P[] = [];
const FEATURE_EDGES: Edge[] = [];
const FEATURE_KEYS = new Set<string>();
export const PUPIL_INDEX: number[] = [];
export const IRIS_INDEX: number[] = [];

function addGroup(pts: P[], links?: { closed?: boolean; feature?: boolean }) {
  const start = NODES.length;
  NODES.push(...pts);
  if (links?.feature) {
    for (const e of chain(start, pts.length, !!links.closed)) {
      FEATURE_EDGES.push(e);
      FEATURE_KEYS.add(keyOf(e[0], e[1]));
    }
  }
  return start;
}

function addFeaturePair(a: number, b: number) {
  FEATURE_EDGES.push([a, b]);
  FEATURE_KEYS.add(keyOf(a, b));
}

addGroup(OUTLINE, { closed: true, feature: true });
addGroup(BROW_L, { feature: true });
addGroup(BROW_R, { feature: true });
addGroup(EYE_L, { closed: true, feature: true });
addGroup(EYE_R, { closed: true, feature: true });
addGroup(CREASE_L, { feature: true });
addGroup(CREASE_R, { feature: true });
const iIrisL = addGroup(IRIS_L, { closed: true, feature: true });
const iIrisR = addGroup(IRIS_R, { closed: true, feature: true });
IRIS_INDEX.push(iIrisL, iIrisR);
const iPupil = addGroup(PUPIL);
PUPIL_INDEX.push(iPupil, iPupil + 1);
addGroup(NOSE_RIDGE, { feature: true });
addGroup(NOSE_L_WALL, { feature: true });
addGroup(NOSE_R_WALL, { feature: true });
addGroup(ALA_L, { feature: true });
addGroup(ALA_R, { feature: true });
addGroup(NOSTRIL_L, { closed: true, feature: true });
addGroup(NOSTRIL_R, { closed: true, feature: true });
addGroup(NOSE_BASE, { feature: true });
const iPhil = addGroup(PHILTRUM);
addFeaturePair(iPhil, iPhil + 1);
addFeaturePair(iPhil, iPhil + 2);
addFeaturePair(iPhil, iPhil + 3);
const iLipT = addGroup(LIP_TOP, { feature: true });
const iLipTI = addGroup(LIP_TOP_IN, { feature: true });
const iLipBI = addGroup(LIP_BOT_IN, { feature: true });
const iLipB = addGroup(LIP_BOT, { feature: true });
addFeaturePair(iLipT, iLipB + LIP_BOT.length - 1);
addFeaturePair(iLipT + LIP_TOP.length - 1, iLipB);
addFeaturePair(iLipTI, iLipBI + LIP_BOT_IN.length - 1);
addFeaturePair(iLipTI + LIP_TOP_IN.length - 1, iLipBI);
addGroup(EAR_L, { feature: true });
addGroup(EAR_R, { feature: true });

{
  const extra: P[] = [];
  for (const p of STRUCTURE_SEED) {
    const taken = NODES.concat(extra).some((q) => Math.hypot(q[0] - p[0], q[1] - p[1]) < 12);
    if (!taken && pip(p[0], p[1], SILHOUETTE)) extra.push(p);
  }
  addGroup(extra);
}

function buildEdges(): Edge[] {
  const set = new Set<string>();
  const out: Edge[] = [];
  const add = (a: number, b: number) => {
    const k = keyOf(a, b);
    if (set.has(k)) return;
    set.add(k);
    out.push([a, b]);
  };
  FEATURE_EDGES.forEach(([a, b]) => add(a, b));
  delaunay(NODES, SILHOUETTE).forEach(([a, b]) => add(a, b));
  return out;
}

export const EDGES = buildEdges();

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
    let press = 0;      // eased 0..1, driven by the pointer
    let pressing = false;
    let raf = 0;
    let t = 0;
    // Real seconds, so the auto-cycle keeps the same tempo regardless of
    // frame rate. `t` is a frame counter and is left alone for the drift.
    let cycle = 0;
    let last = performance.now();

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

      /*  The silhouette, behind everything.

          Without it the mesh is a node network floating in white space; with
          it the same mesh reads as mapped onto a face, which is what the
          product actually does.

          Drawn from the HOME coordinates rather than the drifting ones, so
          the face holds still while the mesh breathes over it. */
      const face = new Path2D();
      face.moveTo(
        (SILHOUETTE[0][0] + SILHOUETTE[SILHOUETTE.length - 1][0]) / 2,
        (SILHOUETTE[0][1] + SILHOUETTE[SILHOUETTE.length - 1][1]) / 2,
      );
      for (let i = 0; i < SILHOUETTE.length; i++) {
        const cur = SILHOUETTE[i];
        const next = SILHOUETTE[(i + 1) % SILHOUETTE.length];
        face.quadraticCurveTo(
          cur[0],
          cur[1],
          (cur[0] + next[0]) / 2,
          (cur[1] + next[1]) / 2,
        );
      }
      face.closePath();

      const fill = ctx.createLinearGradient(0, 0, 0, H);
      fill.addColorStop(0, `rgba(${rgb}, 0.13)`);
      fill.addColorStop(0.55, `rgba(${rgb}, 0.08)`);
      fill.addColorStop(1, `rgba(${rgb}, 0.035)`);
      ctx.fillStyle = fill;
      ctx.fill(face);

      const now = performance.now();
      // Clamped so a backgrounded tab does not jump the cycle on return.
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      t += 0.0125;
      press += ((pressing ? 1 : 0) - press) * 0.14;

      // The figure runs its own scan on a loop, so it is alive on load with no
      // input: it drifts, sweeps a scan line down the mesh, holds a brief lock,
      // then releases. Under reduced motion the cycle does not advance at all,
      // which leaves the whole figure static rather than merely slower.
      if (!reduced) cycle = (cycle + dt) % CYCLE;
      let autoLock = 0;
      let scanY = -1;
      if (!reduced && cycle >= SCAN_START) {
        if (cycle < SCAN_END) {
          const p = (cycle - SCAN_START) / (SCAN_END - SCAN_START);
          scanY = 18 + p * (H - 36);
          autoLock = Math.min(1, p * 2.2);
        } else if (cycle < HOLD_END) {
          autoLock = 1;
        } else {
          autoLock = 1 - (cycle - HOLD_END) / (CYCLE - HOLD_END);
        }
      }

      // Pointer press and the auto-cycle drive the same visual state, so
      // hovering and pressing still layer on top of the loop rather than
      // replacing it.
      const lock = Math.max(press, autoLock);
      const reach = 74 + lock * 46;

      for (const n of state) {
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
            const dir = lock > 0.5 ? -1 : 1;
            const mag = f * (9 + lock * 11) * dir;
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

      for (const [a, b] of EDGES) {
        const A = state[a];
        const B = state[b];
        const feat = FEATURE_KEYS.has(keyOf(a, b));
        let alpha = (feat ? 0.7 : 0.38) + lock * 0.28;
        let width = (feat ? 1.15 : 0.7) + lock * 0.45;
        if (pointer.inside && !reduced) {
          const mx = (A.x + B.x) / 2;
          const my = (A.y + B.y) / 2;
          const d = Math.hypot(mx - pointer.x, my - pointer.y);
          if (d < reach) {
            const f = 1 - d / reach;
            alpha = Math.min(1, alpha + f * (0.45 + lock * 0.3));
            width = width + f * (0.8 + lock * 0.9);
          }
        }
        ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.stroke();
      }

      /* Iris discs sit under the nodes so the orbits have a pupil, matching
         the landmark plate, without becoming a photograph. */
      for (const i of PUPIL_INDEX) {
        const n = state[i];
        ctx.fillStyle = `rgba(${rgb}, ${0.16 + lock * 0.1})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 11.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${rgb}, ${0.34 + lock * 0.14})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 4.2, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < state.length; i++) {
        const n = state[i];
        let r = 1.55 + lock * 0.4;
        let alpha = 0.92;
        if (pointer.inside && !reduced) {
          const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
          if (d < reach) {
            const f = 1 - d / reach;
            r = r + f * (1.7 + lock * 2);
            alpha = 1;
          }
        }
        const isPupil = PUPIL_INDEX.includes(i);
        const isIris = IRIS_INDEX.some((start, k) => {
          const len = k === 0 ? IRIS_L.length : IRIS_R.length;
          return i >= start && i < start + len;
        });
        ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, isPupil ? r + 1.8 : isIris ? r + 0.6 : r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (scanY >= 0) {
        const y = scanY;
        ctx.strokeStyle = `rgba(${rgb}, 0.75)`;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(6, y);
        ctx.lineTo(W - 6, y);
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
      aria-label="An illustrated facial-landmark wireframe over a generic face silhouette, scanning on a loop and responding to pointer movement"
    />
  );
}

export default DetectionFigure;
