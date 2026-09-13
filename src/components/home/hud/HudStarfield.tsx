"use client";
"use no memo";

import { useMemo } from "react";
import * as THREE from "three";
import { HUD_CYAN } from "./headMesh";

function seededPoints(count: number, seed = 17) {
  let s = seed;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = rand() * 9 - 5.8;
    pos[i * 3 + 1] = rand() * 5.2 - 2.6;
    pos[i * 3 + 2] = -1.2 - rand() * 2.4;
  }
  return pos;
}

export function HudStarfield() {
  const { points, links } = useMemo(() => {
    const pos = seededPoints(72);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

    const linePos: number[] = [];
    const n = pos.length / 3;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < 1.15 && pos[i * 3] < 0.4 && pos[j * 3] < 0.4) {
          linePos.push(
            pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
            pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2],
          );
        }
      }
    }
    const lines = new THREE.BufferGeometry();
    lines.setAttribute("position", new THREE.Float32BufferAttribute(linePos, 3));
    return { points: geo, links: lines };
  }, []);

  return (
    <group>
      <points geometry={points} frustumCulled={false}>
        <pointsMaterial
          color={HUD_CYAN}
          size={0.035}
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
          toneMapped={false}
        />
      </points>
      <lineSegments geometry={links} frustumCulled={false}>
        <lineBasicMaterial
          color={0x7a5cff}
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </lineSegments>
    </group>
  );
}
