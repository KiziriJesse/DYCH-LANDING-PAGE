import * as THREE from "three";
import { getHeadGeometry, type HeadGeometry } from "@/components/ui/DetectionFigure3D";

export const HUD_CYAN = 0x00d2ff;

let packed: PackedHead | null = null;

export type PackedHead = {
  geo: HeadGeometry;
  fill: THREE.BufferGeometry;
  edges: THREE.BufferGeometry;
  points: THREE.BufferGeometry;
  landmarks: THREE.BufferGeometry;
  landmarkLines: THREE.BufferGeometry;
  /** Local-space hit points along the facial profile, sorted crown → chin. */
  targets: Float32Array;
};

function uniqueQuadEdges(quads: Uint16Array): [number, number][] {
  const seen = new Set<string>();
  const out: [number, number][] = [];
  for (let k = 0; k < quads.length; k += 4) {
    const v = [quads[k], quads[k + 1], quads[k + 2], quads[k + 3]];
    for (let e = 0; e < 4; e++) {
      const a = v[e];
      const b = v[(e + 1) % 4];
      const key = a < b ? `${a}:${b}` : `${b}:${a}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push([a, b]);
    }
  }
  return out;
}

/**
 * Dense vertical fan of landmarks the rays strike: brow, eye, nose ridge,
 * lips, jaw - the left-facing profile silhouette in the reference.
 */
function pickRayTargets(lm: Float32Array, bright: Uint8Array): Float32Array {
  const n = lm.length / 3;
  type Hit = { i: number; y: number; score: number };
  const hits: Hit[] = [];

  for (let i = 0; i < n; i++) {
    const x = lm[i * 3];
    const y = lm[i * 3 + 1];
    const z = lm[i * 3 + 2];
    const ax = Math.abs(x);
    // Prefer the forward facial midline / near-midline (profile edge when yawed).
    const forward = z > 0.02 ? 1 : 0;
    const mid = 1 - Math.min(1, ax / 0.42);
    const feature =
      bright[i] ||
      (ax < 0.18 && y < 0.35 && y > -0.72) ||
      (ax < 0.32 && y > -0.05 && y < 0.32)
        ? 1.4
        : 1;
    if (!forward && mid < 0.35) continue;
    const score = forward * 1.2 + mid * feature;
    if (score < 0.55) continue;
    hits.push({ i, y, score });
  }

  hits.sort((a, b) => b.y - a.y);

  // Even vertical sampling so the fan spans forehead → chin like the reference.
  const COUNT = 36;
  const chosen: number[] = [];
  if (hits.length <= COUNT) {
    for (const h of hits) chosen.push(h.i);
  } else {
    for (let k = 0; k < COUNT; k++) {
      const t = k / (COUNT - 1);
      const idx = Math.round(t * (hits.length - 1));
      // Prefer higher-score neighbors near the sample.
      let best = idx;
      for (let d = -2; d <= 2; d++) {
        const j = idx + d;
        if (j < 0 || j >= hits.length) continue;
        if (hits[j].score > hits[best].score) best = j;
      }
      chosen.push(hits[best].i);
    }
  }

  const seen = new Set<number>();
  const pos: number[] = [];
  for (const i of chosen) {
    if (seen.has(i)) continue;
    seen.add(i);
    pos.push(lm[i * 3], lm[i * 3 + 1], lm[i * 3 + 2]);
  }
  return new Float32Array(pos);
}

export function getPackedHead(): PackedHead {
  if (packed) return packed;

  const geo = getHeadGeometry();
  const { pos, quads, lm, lmEdges, lmBright } = geo;

  const tri: number[] = [];
  for (let k = 0; k < quads.length; k += 4) {
    const a = quads[k];
    const b = quads[k + 1];
    const c = quads[k + 2];
    const d = quads[k + 3];
    tri.push(a, b, c, a, c, d);
  }

  const fill = new THREE.BufferGeometry();
  fill.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  fill.setIndex(tri);
  fill.computeVertexNormals();

  const edgesList = uniqueQuadEdges(quads);
  const edgePos = new Float32Array(edgesList.length * 6);
  let w = 0;
  for (const [a, b] of edgesList) {
    edgePos[w++] = pos[a * 3];
    edgePos[w++] = pos[a * 3 + 1];
    edgePos[w++] = pos[a * 3 + 2];
    edgePos[w++] = pos[b * 3];
    edgePos[w++] = pos[b * 3 + 1];
    edgePos[w++] = pos[b * 3 + 2];
  }
  const edges = new THREE.BufferGeometry();
  edges.setAttribute("position", new THREE.BufferAttribute(edgePos, 3));

  const points = new THREE.BufferGeometry();
  points.setAttribute("position", new THREE.BufferAttribute(pos, 3));

  const landmarks = new THREE.BufferGeometry();
  landmarks.setAttribute("position", new THREE.BufferAttribute(lm, 3));

  const lmLinePos = new Float32Array(lmEdges.length * 6);
  w = 0;
  for (const [a, b] of lmEdges) {
    lmLinePos[w++] = lm[a * 3];
    lmLinePos[w++] = lm[a * 3 + 1];
    lmLinePos[w++] = lm[a * 3 + 2];
    lmLinePos[w++] = lm[b * 3];
    lmLinePos[w++] = lm[b * 3 + 1];
    lmLinePos[w++] = lm[b * 3 + 2];
  }
  const landmarkLines = new THREE.BufferGeometry();
  landmarkLines.setAttribute("position", new THREE.BufferAttribute(lmLinePos, 3));

  packed = {
    geo,
    fill,
    edges,
    points,
    landmarks,
    landmarkLines,
    targets: pickRayTargets(lm, lmBright),
  };
  return packed;
}

export function makeFlareTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.08, "rgba(180,245,255,0.95)");
  g.addColorStop(0.18, "rgba(0,210,255,0.55)");
  g.addColorStop(0.42, "rgba(0,160,255,0.12)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

export function makeStreakTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 32, 512, 32);
  g.addColorStop(0, "rgba(0,210,255,0)");
  g.addColorStop(0.45, "rgba(160,240,255,0.55)");
  g.addColorStop(0.5, "rgba(255,255,255,0.9)");
  g.addColorStop(0.55, "rgba(160,240,255,0.55)");
  g.addColorStop(1, "rgba(0,210,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 64);
  const vg = ctx.createLinearGradient(0, 0, 0, 64);
  vg.addColorStop(0, "rgba(0,0,0,1)");
  vg.addColorStop(0.5, "rgba(0,0,0,0)");
  vg.addColorStop(1, "rgba(0,0,0,1)");
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, 512, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

const _ndc = new THREE.Vector3();
const _dir = new THREE.Vector3();

/** World-space point at the far-left, vertically centered edge of the canvas,
    on the z = 0 plane where the head sits. */
export function leftOrigin(camera: THREE.Camera, target: THREE.Vector3, ndcX = -1, ndcY = 0) {
  _ndc.set(ndcX, ndcY, 0.5).unproject(camera);
  _dir.copy(_ndc).sub(camera.position);
  const z = _dir.z;
  if (Math.abs(z) < 1e-5) return target.copy(camera.position);
  const t = (0 - camera.position.z) / z;
  return target.copy(camera.position).addScaledVector(_dir, t);
}
