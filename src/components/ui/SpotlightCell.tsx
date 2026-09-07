"use client";

import type { PointerEvent, ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";

/**
 * Feedback: the tray edge lights where the cursor is, so a large grid tells you
 * which cell you are addressing before you click.
 * Pointer position lives in motion values, never React state, so tracking never
 * re-renders the tree.
 */
export function SpotlightCell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const reduce = useReducedMotion();

  const glow = useMotionTemplate`radial-gradient(220px circle at ${x}px ${y}px, var(--accent-line), transparent 72%)`;

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - bounds.left);
    y.set(event.clientY - bounds.top);
  }

  function onPointerLeave() {
    x.set(-400);
    y.set(-400);
  }

  return (
    <div
      onPointerMove={reduce ? undefined : onPointerMove}
      onPointerLeave={reduce ? undefined : onPointerLeave}
      className={`bezel group relative isolate overflow-hidden transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shade-lift)] ${className}`}
    >
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glow }}
        />
      )}
      {children}
    </div>
  );
}
