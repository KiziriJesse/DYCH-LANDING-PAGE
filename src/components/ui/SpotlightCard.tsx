"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The site's signature card interaction.
 *
 * At rest the card is flat near-black, like every other card in the grid. On
 * hover (or press/focus on touch) its fill becomes a soft radial spotlight,
 * lighter in the centre and fading back to the base surface at the edges, so
 * the addressed card reads as lifted while its neighbours stay flat.
 *
 * Touch judgement (build plan, Design Principles 3): tap-and-hold and
 * "whichever card is most in view" both read as gimmicks here, and every card
 * in this grid is a link, so a hold gesture would fight the tap that
 * navigates. Instead the spotlight fires on press and on keyboard focus,
 * which ties it to a real interaction rather than to scroll position.
 *
 * `accent` is a CSS custom property name, so each feature card lights in its
 * own semantic hue while resting neutral.
 */
export function SpotlightCard({
  children,
  href,
  accent = "var(--accent-security)",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  accent?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();

  const spotlight = `radial-gradient(circle at 50% 30%, color-mix(in srgb, ${accent} 18%, var(--surface-raised)) 0%, transparent 70%)`;
  const transition = reduce
    ? { duration: 0 }
    : { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const };

  const inner = (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="active"
      whileFocus="active"
      whileTap="active"
      className={`group relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface p-1.5 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-border-strong ${className}`}
    >
      {/* The spotlight fill. Opacity is the only animated property. */}
      <motion.span
        aria-hidden
        variants={{ rest: { opacity: 0 }, active: { opacity: 1 } }}
        transition={transition}
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight }}
      />
      <div className="relative flex h-full flex-col rounded-[calc(var(--radius-card)-0.375rem)] p-6 sm:p-7">
        {children}
      </div>
    </motion.div>
  );

  if (!href) return inner;

  return (
    <Link href={href} className="block h-full rounded-card">
      {inner}
    </Link>
  );
}
