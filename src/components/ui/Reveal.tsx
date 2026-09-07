"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Scroll-in reveal used across the site: fade plus a slight y-offset,
 * staggered by passing an increasing `delay` to siblings. Motivated by
 * hierarchy, so content arrives in reading order rather than all at once.
 * Renders statically under prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 26,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  distance?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </Tag>
  );
}
