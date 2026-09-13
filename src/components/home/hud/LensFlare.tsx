"use client";
"use no memo";

import { useRef } from "react";
import type { MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeFlareTexture, makeStreakTexture } from "./headMesh";

export function LensFlare({
  origin,
  reduced,
}: {
  origin: MutableRefObject<THREE.Vector3>;
  reduced: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const flare = useRef(makeFlareTexture());
  const streak = useRef(makeStreakTexture());

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.position.copy(origin.current);
    if (reduced) {
      group.current.scale.setScalar(1);
      return;
    }
    const s = 1 + Math.sin(clock.getElapsedTime() * 2.4) * 0.07;
    group.current.scale.setScalar(s);
  });

  return (
    <group ref={group}>
      <sprite scale={[1.2, 1.2, 1]} renderOrder={6}>
        <spriteMaterial
          map={flare.current}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.95}
          toneMapped={false}
        />
      </sprite>
      <sprite scale={[0.4, 0.4, 1]} renderOrder={7}>
        <spriteMaterial
          map={flare.current}
          color="#ffffff"
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={1}
          toneMapped={false}
        />
      </sprite>
      <sprite scale={[5.6, 0.18, 1]} renderOrder={6}>
        <spriteMaterial
          map={streak.current}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.5}
          rotation={0.07}
          toneMapped={false}
        />
      </sprite>
      <sprite scale={[0.1, 3.4, 1]} renderOrder={6}>
        <spriteMaterial
          map={streak.current}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.26}
          rotation={1.5}
          toneMapped={false}
        />
      </sprite>
    </group>
  );
}
