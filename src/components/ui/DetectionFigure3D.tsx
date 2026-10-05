"use client";

import { useEffect, useRef } from "react";
import {
  EDGES,
  H,
  IRIS_INDEX,
  IRIS_LEN,
  NODES,
  type P,
  PUPIL_INDEX,
  SILHOUETTE,
  W,
} from "@/components/ui/DetectionFigure";

/**
 * DetectionFigure3D - the detection mesh as a solid.
 *
 * The flat figure in DetectionFigure draws the landmark web on a tinted
 * silhouette. This one sculpts the same landmarks into an actual surface and
 * turns it in space: a soft matte head, lit by one light, with the identical
 * web lying on its face. Same nodes, same Delaunay edges, same nine-second
 * scan cycle - the mesh is lifted off the page rather than redrawn.
 *
 * It imports its geometry from DetectionFigure rather than restating it, so
 * the two figures cannot drift apart. Everything below is the lift: depth
 * over that topology, and a renderer.
 *
 * WHY IT IS HAND-ROLLED. There is no three.js here and no WebGL. The object is
 * ~2,300 quads of flat-shaded geometry, which canvas 2D draws comfortably, and
 * the alternative was ~150KB gzipped of renderer to carry one hero figure. It
 * also keeps the look under control: a WebGL wireframe material renders every
 * edge at one weight, where the whole point here is that the web is line art
 * with a surface behind it.
 *
 * MATTE, DELIBERATELY. No environment map, no specular, no reflections. The
 * surface is Lambert only, between two pastels from the site's own purple
 * family, so it sits on the mesh ground instead of floating above it the way
 * a glass or chrome object would. Two colours, one light, no rainbow.
 *
 * The face is an illustration by construction - a generic contour with generic
 * features, and no photograph anywhere near it. Same reasoning the flat figure
 * carries: putting a real, identifiable person behind a facial-recognition
 * company's marketing implies that specific person is the one under
 * surveillance.
 *
 * Static under prefers-reduced-motion: one render, held pose, no cycle.
 */

/** A lightened step of the brand core, matching the flat figure's web. Not
    --accent: see the note on DEFAULT_STROKE in DetectionFigure. */
const DEFAULT_STROKE: [number, number, number] = [124, 92, 224];

/* The two ends of the matte ramp: --iris deepened for the shadow, and a
   near-white lavender for the light. Both sit inside the accent family, so
   the solid reads as the same purple as everything else on the page. */
const SHADOW = [100, 78, 162] as const;
const LIGHT = [247, 242, 255] as const;

/* One light, upper-left and slightly forward. Raking enough that the brow,
   nose and lips read as form rather than as a flat disc. */
const LIGHT_DIR = (() => {
  const v = [-0.56, 0.44, 0.7];
  const m = Math.hypot(v[0], v[1], v[2]);
  return [v[0] / m, v[1] / m, v[2] / m] as const;
})();

/* The same cycle the flat figure runs, so the two keep one tempo. */
const CYCLE = 9;
const SCAN_START = 4.6;
const SCAN_END = 6.8;
const HOLD_END = 7.6;

/** Grid resolution per side. 34 puts the facets under ~9px at hero size,
    where the web sits over them; 44 is visibly smoother only at twice that
    size and costs 70% more fills. */
const GRID = 34;
const CAM = 5.4;

/** Shade buckets. Quads are batched by shade into one path each, which turns
    ~1,200 fill calls a frame into at most 56. */
const BUCKETS = 56;

/* 2D landmark space -> the unit space the solid is built in. The head stands
   about 2 units tall, so 1 unit is roughly 115mm of face and the feature
   depths below can be read as millimetres. */
const SPAN = 212;
const CX = 180;
const CY = 230;
const nz = (p: P): [number, number] => [(p[0] - CX) / SPAN, (CY - p[1]) / SPAN];

const gauss = (d2: number) => Math.exp(-d2 * 0.5);
/** A gaussian with a squarer shoulder, for features that need an edge (the
    orbits, the nasal ridge) rather than a soft mound. */
const sgauss = (d2: number, p: number) => Math.exp(-Math.pow(d2, p) * 0.5);
const smoothstep = (e0: number, e1: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

/* ---- The contour ----

   SILHOUETTE carries the ear pinnae, because the flat figure needs them in
   its hull. This solid puts ears on the sides of a head, not on the front
   surface, so the contour here is that silhouette with the ear excursion
   dropped - which leaves the straight run of cheek in front of each ear.
   Everything else is the same outline the flat figure is built on, so the two
   agree head-on. */
const EAR_REACH = 140;
const FACE_CONTOUR = SILHOUETTE.filter((p) => Math.abs(p[0] - CX) <= EAR_REACH).map(nz);

const ORIGIN: [number, number] = [0, -0.09];
const TABLE = 512;
const RADIUS = (() => {
  const out = new Float64Array(TABLE);
  for (let k = 0; k < TABLE; k++) {
    const a = (k / TABLE) * Math.PI * 2;
    const dx = Math.cos(a);
    const dy = Math.sin(a);
    let best = 0;
    for (let i = 0; i < FACE_CONTOUR.length; i++) {
      const p1 = FACE_CONTOUR[i];
      const p2 = FACE_CONTOUR[(i + 1) % FACE_CONTOUR.length];
      const ex = p2[0] - p1[0];
      const ey = p2[1] - p1[1];
      const den = dx * ey - dy * ex;
      if (Math.abs(den) < 1e-9) continue;
      const t = ((p1[0] - ORIGIN[0]) * ey - (p1[1] - ORIGIN[1]) * ex) / den;
      const s = (dx * (p1[1] - ORIGIN[1]) - dy * (p1[0] - ORIGIN[0])) / -den;
      if (t > 0 && s >= 0 && s <= 1) best = Math.max(best, t);
    }
    out[k] = best;
  }
  return out;
})();

function boundary(a: number) {
  const f = ((((a % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2)) * TABLE;
  const i = Math.floor(f);
  const t = f - i;
  return RADIUS[i % TABLE] * (1 - t) + RADIUS[(i + 1) % TABLE] * t;
}

/** Unclamped, so callers can tell a point outside the contour from one on it. */
function rawRadius(x: number, y: number) {
  const dx = x - ORIGIN[0];
  const dy = y - ORIGIN[1];
  const d = Math.hypot(dx, dy);
  if (d < 1e-6) return 0;
  return d / boundary(Math.atan2(dy, dx));
}

/**
 * The face, as depth over that contour. `r` runs 0 at the centre to 1 at the
 * edge. Each term is one feature; amplitudes are millimetres over 115, which
 * is why the nose is the only large number in the list.
 */
function faceZ(x: number, y: number, r: number) {
  const ax = Math.abs(x);
  let z = 0.4 * (1 - r * r);
  z += 0.06 * sgauss((x / 0.42) ** 2 + ((y - 0.335) / 0.075) ** 2, 1.3); // brow ridge
  z -= 0.082 * sgauss(((ax - 0.29) / 0.115) ** 2 + ((y - 0.175) / 0.08) ** 2, 1.4); // orbits
  z -= 0.02 * gauss(((ax - 0.29) / 0.13) ** 2 + ((y - 0.24) / 0.03) ** 2); // lid crease
  const ridge = sgauss((x / 0.115) ** 2, 1.6);
  z += ridge * (0.075 * gauss(((y - 0.02) / 0.22) ** 2)
    + 0.145 * sgauss(((y + 0.175) / 0.095) ** 2, 1.4)); // bridge, then tip
  z += 0.055 * sgauss(((ax - 0.135) / 0.058) ** 2 + ((y + 0.268) / 0.052) ** 2, 1.4); // alae
  z -= 0.03 * gauss(((ax - 0.072) / 0.042) ** 2 + ((y + 0.292) / 0.034) ** 2); // nostrils
  z += 0.038 * gauss(((ax - 0.36) / 0.17) ** 2 + ((y + 0.1) / 0.16) ** 2); // cheekbones
  z -= 0.03 * gauss((x / 0.15) ** 2 + ((y + 0.372) / 0.048) ** 2); // philtrum
  z += 0.046 * gauss((x / 0.245) ** 2 + ((y + 0.452) / 0.055) ** 2); // upper lip
  z -= 0.036 * gauss((x / 0.28) ** 2 + ((y + 0.5) / 0.022) ** 2); // mouth line
  z += 0.044 * gauss((x / 0.235) ** 2 + ((y + 0.552) / 0.055) ** 2); // lower lip
  z -= 0.024 * gauss((x / 0.26) ** 2 + ((y + 0.63) / 0.045) ** 2); // under lip
  z += 0.05 * gauss((x / 0.21) ** 2 + ((y + 0.78) / 0.13) ** 2); // chin
  z -= 0.05 * smoothstep(0.9, 1, r); // ease into the rim
  return z;
}

/** The cranium behind, smooth and undetailed, sharing the contour. It exists
    so the solid is closed: an open shell reads as a mask the moment it turns,
    and a mask is a different and much worse idea on this page. */
const backZ = (r: number) => -0.86 * Math.pow(Math.max(0, 1 - r * r), 0.68);

/** Square to disc, so the grid carries no pole. A radial grid puts its
    singularity wherever it is centred, and on a face that is the nose. */
function squircle(u: number, v: number): [number, number] {
  return [
    u * Math.sqrt(Math.max(0, 1 - (v * v) / 2)),
    v * Math.sqrt(Math.max(0, 1 - (u * u) / 2)),
  ];
}

export type HeadGeometry = {
  pos: Float32Array;
  nrm: Float32Array;
  quads: Uint16Array;
  quadY: Float32Array;
  lm: Float32Array;
  lmN: Float32Array;
  lmEdges: [number, number][];
  lmBright: Uint8Array;
};

let cached: HeadGeometry | null = null;

function buildGeometry(): HeadGeometry {
  if (cached) return cached;

  const per = (GRID + 1) * (GRID + 1);
  const count = per * 2;
  const pos = new Float32Array(count * 3);
  const nrm = new Float32Array(count * 3);
  const facing = new Int8Array(count);

  let w = 0;
  for (let side = 0; side < 2; side++) {
    for (let i = 0; i <= GRID; i++) {
      for (let j = 0; j <= GRID; j++) {
        const d = squircle(-1 + (2 * i) / GRID, -1 + (2 * j) / GRID);
        const r = Math.min(1, Math.hypot(d[0], d[1]));
        const a = Math.atan2(d[1], d[0]);
        const R = boundary(a) * r;
        const x = ORIGIN[0] + Math.cos(a) * R;
        const y = ORIGIN[1] + Math.sin(a) * R;
        pos[w * 3] = x;
        pos[w * 3 + 1] = y;
        pos[w * 3 + 2] = side ? backZ(r) : faceZ(x, y, r);
        facing[w] = side ? -1 : 1;
        w++;
      }
    }
  }

  const quadCount = GRID * GRID * 2;
  const quads = new Uint16Array(quadCount * 4);
  const quadY = new Float32Array(quadCount);
  let q = 0;
  const F = (i: number, j: number) => i * (GRID + 1) + j;
  for (let i = 0; i < GRID; i++) {
    for (let j = 0; j < GRID; j++) {
      // Front winds one way and the cranium the other, so a single
      // screen-space winding test culls the far side of a closed solid.
      quads[q * 4] = F(i, j);
      quads[q * 4 + 1] = F(i + 1, j);
      quads[q * 4 + 2] = F(i + 1, j + 1);
      quads[q * 4 + 3] = F(i, j + 1);
      q++;
      quads[q * 4] = per + F(i, j);
      quads[q * 4 + 1] = per + F(i, j + 1);
      quads[q * 4 + 2] = per + F(i + 1, j + 1);
      quads[q * 4 + 3] = per + F(i + 1, j);
      q++;
    }
  }

  for (let k = 0; k < quadCount; k++) {
    const a = quads[k * 4];
    const b = quads[k * 4 + 1];
    const c = quads[k * 4 + 2];
    const ux = pos[b * 3] - pos[a * 3];
    const uy = pos[b * 3 + 1] - pos[a * 3 + 1];
    const uz = pos[b * 3 + 2] - pos[a * 3 + 2];
    const vx = pos[c * 3] - pos[a * 3];
    const vy = pos[c * 3 + 1] - pos[a * 3 + 1];
    const vz = pos[c * 3 + 2] - pos[a * 3 + 2];
    const nx = uy * vz - uz * vy;
    const ny = uz * vx - ux * vz;
    const nzz = ux * vy - uy * vx;
    for (let e = 0; e < 4; e++) {
      const idx = quads[k * 4 + e];
      nrm[idx * 3] += nx;
      nrm[idx * 3 + 1] += ny;
      nrm[idx * 3 + 2] += nzz;
      quadY[k] += pos[idx * 3 + 1] * 0.25;
    }
  }
  for (let k = 0; k < count; k++) {
    const m = Math.hypot(nrm[k * 3], nrm[k * 3 + 1], nrm[k * 3 + 2]) || 1;
    let s = 1 / m;
    if (Math.sign(nrm[k * 3 + 2] || facing[k]) !== facing[k]) s = -s;
    nrm[k * 3] *= s;
    nrm[k * 3 + 1] *= s;
    nrm[k * 3 + 2] *= s;
  }

  /* The landmarks, lifted onto the surface they belong to.

     Nodes outside the face contour are the ear helices and the inner ear
     bowls. They have nowhere to sit on a front surface - lifting them would
     pile them onto the rim in a clot - so they are dropped here, along with
     any edge that touched one. The web keeps every landmark that is actually
     on the face. */
  const keep = new Int16Array(NODES.length).fill(-1);
  const kept: number[] = [];
  for (let i = 0; i < NODES.length; i++) {
    const p = nz(NODES[i]);
    if (rawRadius(p[0], p[1]) > 1.03) continue;
    keep[i] = kept.length;
    kept.push(i);
  }

  const lm = new Float32Array(kept.length * 3);
  const lmN = new Float32Array(kept.length * 3);
  const lmBright = new Uint8Array(kept.length);
  /* IRIS_INDEX stores the first node of each iris ring, so membership is a
     range test - the same one the flat figure makes. Pupils are single
     nodes. Both read brighter than the rest of the web. */
  const pupils = new Set<number>(PUPIL_INDEX);
  const isBrightNode = (i: number) =>
    pupils.has(i) || IRIS_INDEX.some((start) => i >= start && i < start + IRIS_LEN);
  const h = 0.012;
  const at = (x: number, y: number) => faceZ(x, y, Math.min(1, rawRadius(x, y)));
  for (let k = 0; k < kept.length; k++) {
    const src = kept[k];
    const p = nz(NODES[src]);
    lm[k * 3] = p[0];
    lm[k * 3 + 1] = p[1];
    lm[k * 3 + 2] = at(p[0], p[1]) + 0.012;
    const dzdx = (at(p[0] + h, p[1]) - at(p[0] - h, p[1])) / (2 * h);
    const dzdy = (at(p[0], p[1] + h) - at(p[0], p[1] - h)) / (2 * h);
    const m = Math.hypot(-dzdx, -dzdy, 1);
    lmN[k * 3] = -dzdx / m;
    lmN[k * 3 + 1] = -dzdy / m;
    lmN[k * 3 + 2] = 1 / m;
    lmBright[k] = isBrightNode(src) ? 1 : 0;
  }

  const lmEdges: [number, number][] = [];
  for (const [a, b] of EDGES) {
    if (keep[a] < 0 || keep[b] < 0) continue;
    lmEdges.push([keep[a], keep[b]]);
  }

  cached = { pos, nrm, quads, quadY, lm, lmN, lmEdges, lmBright };
  return cached;
}

/** Shared with the HUD scene so the wireframe and the matte figure stay on
    the same topology. */
export function getHeadGeometry(): HeadGeometry {
  return buildGeometry();
}

export function DetectionFigure3D({
  className = "",
  stroke = DEFAULT_STROKE,
}: {
  className?: string;
  /** RGB triple for the landmark web. */
  stroke?: [number, number, number];
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const rgb = stroke.join(", ");

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { pos, nrm, quads, quadY, lm, lmN, lmEdges, lmBright } = buildGeometry();
    const vcount = pos.length / 3;
    const qcount = quadY.length;
    const ncount = lm.length / 3;
    const [sr, sg, sb] = stroke;

    const vn = new Float32Array(nrm.length); // rotated normals
    const sp = new Float32Array(vcount * 2); // projected, in CSS pixels
    const lp = new Float32Array(ncount * 2);
    const lf = new Float32Array(ncount); // how square-on each node is

    const shades: string[] = [];
    for (let i = 0; i < BUCKETS; i++) {
      const t = i / (BUCKETS - 1);
      shades.push(
        `rgb(${Math.round(SHADOW[0] + (LIGHT[0] - SHADOW[0]) * t)}, ${
          Math.round(SHADOW[1] + (LIGHT[1] - SHADOW[1]) * t)
        }, ${Math.round(SHADOW[2] + (LIGHT[2] - SHADOW[2]) * t)})`,
      );
    }

    let box = { w: 0, h: 0 };
    const scale = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = cv.getBoundingClientRect();
      cv.width = Math.max(1, Math.round(r.width * dpr));
      cv.height = Math.max(1, Math.round(r.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      box = { w: r.width, h: r.height };
    };
    scale();

    let pointer = { x: 0, y: 0, inside: false };
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      pointer = {
        x: ((e.clientX - r.left) / r.width - 0.5) * 2,
        y: ((e.clientY - r.top) / r.height - 0.5) * 2,
        inside: true,
      };
    };
    const onLeave = () => { pointer = { x: 0, y: 0, inside: false }; };
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerleave", onLeave);

    let yaw = -0.32;
    let pitch = 0.09;
    let cycle = 0;
    let t = 0;
    let last = performance.now();
    let raf = 0;
    let onScreen = true;

    const draw = () => {
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (!reduced) {
        t += dt;
        cycle = (cycle + dt) % CYCLE;
        /* Idle drift, with the pointer layered on top rather than replacing
           it, so the figure never freezes just because a cursor is resting. */
        const idleYaw = -0.28 + 0.16 * Math.sin(t * 0.26);
        const idlePitch = 0.07 + 0.045 * Math.sin(t * 0.19);
        const wantYaw = idleYaw + (pointer.inside ? pointer.x * 0.28 : 0);
        const wantPitch = idlePitch + (pointer.inside ? pointer.y * 0.16 : 0);
        const k = 1 - Math.exp(-dt * 3.4);
        yaw += (wantYaw - yaw) * k;
        pitch += (wantPitch - pitch) * k;
      }

      let scanY = 2;
      let lock = 0;
      if (!reduced && cycle >= SCAN_START) {
        if (cycle < SCAN_END) {
          const p = (cycle - SCAN_START) / (SCAN_END - SCAN_START);
          scanY = 1.08 - p * 2.16;
          lock = Math.min(1, p * 2.2);
        } else if (cycle < HOLD_END) {
          lock = 1;
        } else {
          lock = 1 - (cycle - HOLD_END) / (CYCLE - HOLD_END);
        }
      }

      const cy = Math.cos(yaw), sy = Math.sin(yaw);
      const cx = Math.cos(pitch), sx = Math.sin(pitch);
      const S0 = box.h * 0.4;
      const ox = box.w / 2;
      const oy = box.h / 2 + box.h * 0.03;

      for (let i = 0; i < vcount; i++) {
        const x = pos[i * 3], y = pos[i * 3 + 1], z = pos[i * 3 + 2];
        const X = x * cy + z * sy;
        let Z = -x * sy + z * cy;
        const Y = y * cx - Z * sx;
        Z = y * sx + Z * cx;
        const k = CAM / (CAM - Z);
        sp[i * 2] = ox + X * S0 * k;
        sp[i * 2 + 1] = oy - Y * S0 * k;

        const nx = nrm[i * 3], ny = nrm[i * 3 + 1], nzv = nrm[i * 3 + 2];
        const NX = nx * cy + nzv * sy;
        let NZ = -nx * sy + nzv * cy;
        const NY = ny * cx - NZ * sx;
        NZ = ny * sx + NZ * cx;
        vn[i * 3] = NX; vn[i * 3 + 1] = NY; vn[i * 3 + 2] = NZ;
      }

      ctx.clearRect(0, 0, box.w, box.h);

      const paths: (Path2D | null)[] = new Array(BUCKETS).fill(null);
      const hot: number[] = [];

      for (let k = 0; k < qcount; k++) {
        const a = quads[k * 4], b = quads[k * 4 + 1], c = quads[k * 4 + 2], d = quads[k * 4 + 3];
        const ax = sp[a * 2], ay = sp[a * 2 + 1];
        const bx = sp[b * 2], by = sp[b * 2 + 1];
        const cx2 = sp[c * 2], cy2 = sp[c * 2 + 1];
        const area = (bx - ax) * (cy2 - ay) - (by - ay) * (cx2 - ax);
        // Screen-space winding culls the far half of a closed solid. The
        // magnitude test drops the slivers the squircle leaves at its four
        // corners, which are sub-pixel and shade unpredictably.
        if (area >= -0.7) continue;

        if (scanY < 1.5 && Math.abs(quadY[k] - scanY) < 0.06) { hot.push(k); continue; }

        let nx = 0, ny = 0, nzv = 0;
        for (let e = 0; e < 4; e++) {
          const idx = quads[k * 4 + e];
          nx += vn[idx * 3]; ny += vn[idx * 3 + 1]; nzv += vn[idx * 3 + 2];
        }
        const m = Math.hypot(nx, ny, nzv) || 1;
        const lam = Math.max(0, (nx * LIGHT_DIR[0] + ny * LIGHT_DIR[1] + nzv * LIGHT_DIR[2]) / m);
        let bi = (0.14 + 0.86 * lam) * (BUCKETS - 1);
        bi = bi < 0 ? 0 : bi > BUCKETS - 1 ? BUCKETS - 1 : bi;
        const bucket = bi | 0;

        let p = paths[bucket];
        if (!p) { p = new Path2D(); paths[bucket] = p; }
        p.moveTo(ax, ay);
        p.lineTo(bx, by);
        p.lineTo(cx2, cy2);
        p.lineTo(sp[d * 2], sp[d * 2 + 1]);
        p.closePath();
      }

      /* Fill and stroke each bucket in its own colour. The hairline stroke
         closes the antialiasing seams between neighbouring quads, which are
         otherwise a grid of pale cracks across the surface. */
      ctx.lineJoin = "round";
      ctx.lineWidth = 1;
      for (let i = 0; i < BUCKETS; i++) {
        const p = paths[i];
        if (!p) continue;
        ctx.fillStyle = shades[i];
        ctx.strokeStyle = shades[i];
        ctx.fill(p);
        ctx.stroke(p);
      }

      /* The scan is a band in object space, not a line drawn over the top, so
         it bends around the nose and lips the way a real sweep would. */
      for (const k of hot) {
        const falloff = 1 - Math.abs(quadY[k] - scanY) / 0.06;
        let nx = 0, ny = 0, nzv = 0;
        for (let e = 0; e < 4; e++) {
          const idx = quads[k * 4 + e];
          nx += vn[idx * 3]; ny += vn[idx * 3 + 1]; nzv += vn[idx * 3 + 2];
        }
        const m = Math.hypot(nx, ny, nzv) || 1;
        const lam = Math.max(0, (nx * LIGHT_DIR[0] + ny * LIGHT_DIR[1] + nzv * LIGHT_DIR[2]) / m);
        const s = 0.14 + 0.86 * lam;
        const mix = 0.55 * falloff;
        const p = new Path2D();
        p.moveTo(sp[quads[k * 4] * 2], sp[quads[k * 4] * 2 + 1]);
        for (let e = 1; e < 4; e++) {
          const idx = quads[k * 4 + e];
          p.lineTo(sp[idx * 2], sp[idx * 2 + 1]);
        }
        p.closePath();
        ctx.fillStyle = `rgb(${
          Math.round((SHADOW[0] + (LIGHT[0] - SHADOW[0]) * s) * (1 - mix) + sr * mix)
        }, ${
          Math.round((SHADOW[1] + (LIGHT[1] - SHADOW[1]) * s) * (1 - mix) + sg * mix)
        }, ${
          Math.round((SHADOW[2] + (LIGHT[2] - SHADOW[2]) * s) * (1 - mix) + sb * mix)
        })`;
        ctx.strokeStyle = ctx.fillStyle;
        ctx.fill(p);
        ctx.stroke(p);
      }

      /* ---- the landmark web, lying on the surface ---- */
      for (let i = 0; i < ncount; i++) {
        const x = lm[i * 3], y = lm[i * 3 + 1], z = lm[i * 3 + 2];
        const X = x * cy + z * sy;
        let Z = -x * sy + z * cy;
        const Y = y * cx - Z * sx;
        Z = y * sx + Z * cx;
        const k = CAM / (CAM - Z);
        lp[i * 2] = ox + X * S0 * k;
        lp[i * 2 + 1] = oy - Y * S0 * k;

        const nx = lmN[i * 3], ny = lmN[i * 3 + 1], nzv = lmN[i * 3 + 2];
        const NX = nx * cy + nzv * sy;
        let NZ = -nx * sy + nzv * cy;
        const NY = ny * cx - NZ * sx;
        NZ = ny * sx + NZ * cx;
        // Square-on nodes are solid; nodes rolling over the edge fade out
        // instead of piling up along the silhouette.
        lf[i] = smoothstep(0.02, 0.42, NZ / (Math.hypot(NX, NY, NZ) || 1));
      }

      const LEVELS = 6;
      const near = 0.4 + lock * 0.28;
      const edgePaths: Path2D[] = [];
      for (let i = 0; i < LEVELS; i++) edgePaths.push(new Path2D());
      for (const [a, b] of lmEdges) {
        const seen = Math.min(lf[a], lf[b]);
        if (seen <= 0.01) continue;
        let boost = 0;
        if (scanY < 1.5) {
          const dy = Math.abs((lm[a * 3 + 1] + lm[b * 3 + 1]) / 2 - scanY);
          if (dy < 0.09) boost = 1 - dy / 0.09;
        }
        let lvl = Math.round((seen * 0.7 + boost * 0.3) * (LEVELS - 1));
        lvl = lvl < 0 ? 0 : lvl > LEVELS - 1 ? LEVELS - 1 : lvl;
        edgePaths[lvl].moveTo(lp[a * 2], lp[a * 2 + 1]);
        edgePaths[lvl].lineTo(lp[b * 2], lp[b * 2 + 1]);
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < LEVELS; i++) {
        ctx.strokeStyle = `rgba(${rgb}, ${(0.14 + (i / (LEVELS - 1)) * near).toFixed(3)})`;
        ctx.stroke(edgePaths[i]);
      }

      const dots = new Path2D();
      const litDots = new Path2D();
      for (let i = 0; i < ncount; i++) {
        if (lf[i] <= 0.02) continue;
        const hotNode = scanY < 1.5 && Math.abs(lm[i * 3 + 1] - scanY) < 0.07;
        const isBright = lmBright[i] === 1;
        const r = (isBright ? 1.9 : 1.25) + (hotNode ? 1 : 0) + lock * 0.25;
        const target = hotNode || isBright ? litDots : dots;
        target.moveTo(lp[i * 2] + r, lp[i * 2 + 1]);
        target.arc(lp[i * 2], lp[i * 2 + 1], r, 0, Math.PI * 2);
      }
      ctx.fillStyle = `rgba(${rgb}, 0.55)`;
      ctx.fill(dots);
      ctx.fillStyle = `rgba(${rgb}, 0.92)`;
      ctx.fill(litDots);

      if (!reduced && onScreen) raf = requestAnimationFrame(draw);
    };

    draw();

    /* Only run while it is on screen and the tab is in front - this is the
       most expensive thing on the page, and it is decoration. */
    const start = () => {
      if (reduced || raf || !onScreen || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(draw);
    };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    const io = new IntersectionObserver((entries) => {
      onScreen = entries[0].isIntersecting;
      if (onScreen) start(); else stop();
    }, { rootMargin: "120px" });
    io.observe(cv);

    const onVisibility = () => { if (document.hidden) stop(); else start(); };
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => { scale(); if (reduced || !raf) draw(); };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerleave", onLeave);
    };
  }, [rgb, stroke]);

  return (
    <canvas
      ref={ref}
      className={className + " touch-none"}
      style={{ aspectRatio: `${W} / ${H}` }}
      role="img"
      aria-label="An illustrated three-dimensional face, turning slowly, with a landmark wireframe mapped onto it and a scan passing down the surface on a loop"
    />
  );
}

export default DetectionFigure3D;
