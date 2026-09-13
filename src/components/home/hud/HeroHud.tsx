"use client";
"use no memo";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { WireframeHead } from "./WireframeHead";
import { HudRays } from "./HudRays";
import { LensFlare } from "./LensFlare";
import { HudStarfield } from "./HudStarfield";
import { leftOrigin } from "./headMesh";

function HudScene({ reduced }: { reduced: boolean }) {
  const headRef = useRef<THREE.Group>(null);
  const origin = useRef(new THREE.Vector3(-4, 0, 0));
  const { camera } = useThree();

  useFrame(() => {
    leftOrigin(camera, origin.current, -0.985, 0);
  });

  return (
    <>
      <HudStarfield />
      <HudRays origin={origin} headRef={headRef} reduced={reduced} />
      <WireframeHead groupRef={headRef} />
      <LensFlare origin={origin} reduced={reduced} />
    </>
  );
}

export function HeroHud({ reduced }: { reduced: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);
  const play = !reduced && onScreen;

  useEffect(() => {
    const el = wrap.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: "80px" },
    );
    io.observe(el);
    const onVis = () => setOnScreen(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduced]);

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        className="h-full w-full touch-none"
        style={{ pointerEvents: "none" }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true,
        }}
        camera={{ fov: 32, position: [0, 0.04, 6.2], near: 0.1, far: 40 }}
        frameloop={play ? "always" : "demand"}
        onCreated={({ gl, invalidate }) => {
          gl.setClearColor(0x000000, 0);
          if (!play) invalidate();
        }}
      >
        <HudScene reduced={reduced} />
      </Canvas>
    </div>
  );
}
