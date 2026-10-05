"use client";
"use no memo";

import { useLayoutEffect, useMemo } from "react";
import type { RefObject } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getPackedHead, HUD_CYAN, type PackedHead } from "./headMesh";

/** Sharp left profile. No idle drift, no mouse follow. */
const PROFILE_YAW = -1.48;
const PROFILE_PITCH = 0.04;

/**
 * Noble biometric wireframe: hollow cyan triangulation with bright nodal
 * vertices. Matches the attached profile reference - static pose only.
 */
export function WireframeHead({
  groupRef,
}: {
  groupRef: RefObject<THREE.Group | null>;
}) {
  const packed = useMemo<PackedHead>(() => getPackedHead(), []);
  const { viewport, size } = useThree();

  useLayoutEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    const mobile = size.width / size.height < 0.9;
    const scale = mobile ? 0.92 : 1.34;
    group.scale.setScalar(scale);
    group.position.set(
      viewport.width * (mobile ? 0.32 : 0.28),
      mobile ? -0.08 : -0.02,
      0,
    );
    group.rotation.set(PROFILE_PITCH, PROFILE_YAW, 0);
  }, [groupRef, viewport.width, size.width, size.height]);

  return (
    <group ref={groupRef} rotation={[PROFILE_PITCH, PROFILE_YAW, 0]}>
      {/* Soft subsurface tint only - the reference is a hollow mesh. */}
      <mesh geometry={packed.fill} renderOrder={1}>
        <meshBasicMaterial
          color="#040214"
          transparent
          opacity={0.22}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Surface facets, quieter than the landmark web. */}
      <lineSegments geometry={packed.edges} renderOrder={2}>
        <lineBasicMaterial
          color={HUD_CYAN}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </lineSegments>
      {/* Landmark triangulation - the noble biometric signature. */}
      <lineSegments geometry={packed.landmarkLines} renderOrder={3}>
        <lineBasicMaterial
          color={HUD_CYAN}
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </lineSegments>
      <points geometry={packed.points} renderOrder={4}>
        <pointsMaterial
          color={HUD_CYAN}
          size={0.014}
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
          sizeAttenuation
        />
      </points>
      {/* Bright nodes at every landmark vertex. */}
      <points geometry={packed.landmarks} renderOrder={5}>
        <pointsMaterial
          color="#f4f0ff"
          size={0.034}
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
          sizeAttenuation
        />
      </points>
      <points geometry={packed.landmarks} renderOrder={6}>
        <pointsMaterial
          color={HUD_CYAN}
          size={0.07}
          transparent
          opacity={0.42}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
