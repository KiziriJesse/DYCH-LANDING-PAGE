"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  /** Seconds of delay, used to cascade siblings. */
  delay?: number;
  /** Travel distance in px. Set 0 for elements that should only fade. */
  distance?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
};

/**
 * Motivated by hierarchy: content arrives in reading order as it enters the
 * viewport, so the eye is led down the page instead of meeting everything at once.
 * Collapses to a static render under prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 28,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.75, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </Tag>
  );
}
