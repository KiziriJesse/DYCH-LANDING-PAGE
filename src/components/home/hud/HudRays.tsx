"use client";
"use no memo";

import { useMemo, useRef } from "react";
import type { MutableRefObject, RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getPackedHead, HUD_CYAN } from "./headMesh";

const _world = new THREE.Vector3();

/** Crown → chin sweep, then a short hold, then release. */
const CYCLE = 5.4;
const SWEEP_END = 3.6;
const HOLD_END = 4.2;

const RAY_VERT = /* glsl */ `
  attribute float aAlong;
  attribute float aBoost;
  varying float vAlong;
  varying float vBoost;
  void main() {
    vAlong = aAlong;
    vBoost = aBoost;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const RAY_FRAG = /* glsl */ `
  varying float vAlong;
  varying float vBoost;
  uniform float uTravel;
  uniform float uAlive;
  void main() {
    // Soft beam body, brighter near the face hit.
    float body = mix(0.18, 0.95, pow(vAlong, 1.35));
    // Traveling scan packet moving origin → face.
    float packet = 1.0 - smoothstep(0.0, 0.22, abs(vAlong - uTravel));
    float a = (body * 0.22 + packet * 0.85) * vBoost * uAlive;
    vec3 col = mix(vec3(0.0, 0.72, 1.0), vec3(0.85, 0.98, 1.0), packet * 0.7 + vAlong * 0.3);
    gl_FragColor = vec4(col, a);
  }
`;

const VOL_VERT = /* glsl */ `
  attribute float along;
  varying float vAlong;
  void main() {
    vAlong = along;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const VOL_FRAG = /* glsl */ `
  varying float vAlong;
  uniform float uPulse;
  void main() {
    float a = (1.0 - vAlong) * (1.0 - vAlong) * 0.07 * uPulse;
    gl_FragColor = vec4(0.12, 0.78, 1.0, a);
  }
`;

/**
 * Scanning rays only. A vertical band sweeps the static profile while energy
 * packets travel along each beam from the left origin into the face.
 */
export function HudRays({
  origin,
  headRef,
  reduced,
}: {
  origin: MutableRefObject<THREE.Vector3>;
  headRef: RefObject<THREE.Group | null>;
  reduced: boolean;
}) {
  const packed = useMemo(() => getPackedHead(), []);
  const n = packed.targets.length / 3;

  // Each ray is a thin ribbon (2 triangles) so we can shade along its length.
  const ribbon = useMemo(() => {
    const pos = new Float32Array(n * 4 * 3);
    const along = new Float32Array(n * 4);
    const boost = new Float32Array(n * 4);
    const idx: number[] = [];
    for (let i = 0; i < n; i++) {
      const b = i * 4;
      along[b] = 0;
      along[b + 1] = 0;
      along[b + 2] = 1;
      along[b + 3] = 1;
      idx.push(b, b + 1, b + 2, b + 1, b + 3, b + 2);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aAlong", new THREE.BufferAttribute(along, 1));
    g.setAttribute("aBoost", new THREE.BufferAttribute(boost, 1));
    g.setIndex(idx);
    const mat = new THREE.ShaderMaterial({
      vertexShader: RAY_VERT,
      fragmentShader: RAY_FRAG,
      uniforms: {
        uTravel: { value: 0 },
        uAlive: { value: 1 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      toneMapped: false,
    });
    return { g, mat, boost };
  }, [n]);

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 6), 3));
    return g;
  }, [n]);

  const vol = useMemo(() => {
    const verts = n + 1;
    const pos = new Float32Array(verts * 3);
    const along = new Float32Array(verts);
    along[0] = 0;
    for (let i = 1; i < verts; i++) along[i] = 1;
    const idx: number[] = [];
    for (let i = 1; i < n; i++) idx.push(0, i, i + 1);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("along", new THREE.BufferAttribute(along, 1));
    g.setIndex(idx);
    const mat = new THREE.ShaderMaterial({
      vertexShader: VOL_VERT,
      fragmentShader: VOL_FRAG,
      uniforms: { uPulse: { value: 1 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      toneMapped: false,
    });
    return { g, mat };
  }, [n]);

  const lineMat = useRef<THREE.LineBasicMaterial>(null);
  const hitYs = useRef(new Float32Array(n));
  const sortedHits = useRef<{ x: number; y: number; z: number }[]>([]);

  useFrame(({ clock }) => {
    const head = headRef.current;
    if (!head) return;
    head.updateWorldMatrix(true, false);

    const o = origin.current;
    const rPos = ribbon.g.attributes.position as THREE.BufferAttribute;
    const lPos = lineGeo.attributes.position as THREE.BufferAttribute;
    const vPos = vol.g.attributes.position as THREE.BufferAttribute;
    const boostAttr = ribbon.g.attributes.aBoost as THREE.BufferAttribute;

    vPos.setXYZ(0, o.x, o.y, o.z);
    sortedHits.current.length = 0;

    let yMin = Infinity;
    let yMax = -Infinity;

    for (let i = 0; i < n; i++) {
      _world.set(
        packed.targets[i * 3],
        packed.targets[i * 3 + 1],
        packed.targets[i * 3 + 2],
      );
      _world.applyMatrix4(head.matrixWorld);
      hitYs.current[i] = _world.y;
      yMin = Math.min(yMin, _world.y);
      yMax = Math.max(yMax, _world.y);
      sortedHits.current.push({ x: _world.x, y: _world.y, z: _world.z });

      // Ribbon half-width in world units, tapering toward the face.
      const dx = _world.x - o.x;
      const dy = _world.y - o.y;
      const dz = _world.z - o.z;
      const len = Math.hypot(dx, dy, dz) || 1;
      // Perpendicular in the screen-ish plane (mostly vertical offset).
      const hx = (-dy / len) * 0.012;
      const hy = (dx / len) * 0.012;

      const b = i * 4;
      rPos.setXYZ(b, o.x + hx, o.y + hy, o.z);
      rPos.setXYZ(b + 1, o.x - hx, o.y - hy, o.z);
      rPos.setXYZ(b + 2, _world.x + hx * 0.35, _world.y + hy * 0.35, _world.z);
      rPos.setXYZ(b + 3, _world.x - hx * 0.35, _world.y - hy * 0.35, _world.z);

      lPos.setXYZ(i * 2, o.x, o.y, o.z);
      lPos.setXYZ(i * 2 + 1, _world.x, _world.y, _world.z);
    }

    sortedHits.current.sort((a, b) => b.y - a.y);
    for (let i = 0; i < sortedHits.current.length; i++) {
      const h = sortedHits.current[i];
      vPos.setXYZ(i + 1, h.x, h.y, h.z);
    }

    const t = clock.getElapsedTime();
    const cycle = reduced ? SWEEP_END * 0.55 : t % CYCLE;
    const span = Math.max(0.001, yMax - yMin);
    let scanY: number;
    let alive = 1;

    if (reduced) {
      scanY = (yMin + yMax) * 0.5;
    } else if (cycle < SWEEP_END) {
      const p = cycle / SWEEP_END;
      // Ease: crown → chin.
      const e = p * p * (3 - 2 * p);
      scanY = yMax - e * span;
    } else if (cycle < HOLD_END) {
      scanY = yMin;
    } else {
      const p = (cycle - HOLD_END) / (CYCLE - HOLD_END);
      scanY = yMin;
      alive = 1 - p;
    }

    const band = span * 0.14;
    for (let i = 0; i < n; i++) {
      const dist = Math.abs(hitYs.current[i] - scanY);
      const near = Math.max(0, 1 - dist / band);
      // Soft ambient floor so the fan stays readable between sweeps.
      const b = 0.18 + near * near * 0.95;
      const base = i * 4;
      boostAttr.setX(base, b);
      boostAttr.setX(base + 1, b);
      boostAttr.setX(base + 2, b);
      boostAttr.setX(base + 3, b);
    }

    const travel = reduced ? 0.72 : (t * 0.55) % 1.15;
    ribbon.mat.uniforms.uTravel.value = Math.min(1, travel);
    ribbon.mat.uniforms.uAlive.value = alive;
    vol.mat.uniforms.uPulse.value = alive * (0.65 + 0.35 * Math.sin(t * 2.2));
    if (lineMat.current) {
      lineMat.current.opacity = 0.16 * alive + 0.28 * alive * (0.5 + 0.5 * Math.sin(t * 2.2));
    }

    rPos.needsUpdate = true;
    boostAttr.needsUpdate = true;
    lPos.needsUpdate = true;
    vPos.needsUpdate = true;
    ribbon.g.computeBoundingSphere();
    vol.g.computeBoundingSphere();
  });

  return (
    <group>
      <mesh geometry={vol.g} material={vol.mat} renderOrder={0} frustumCulled={false} />
      <mesh geometry={ribbon.g} material={ribbon.mat} renderOrder={1} frustumCulled={false} />
      <lineSegments geometry={lineGeo} frustumCulled={false} renderOrder={2}>
        <lineBasicMaterial
          ref={lineMat}
          color={HUD_CYAN}
          transparent
          opacity={0.28}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </lineSegments>
    </group>
  );
}
