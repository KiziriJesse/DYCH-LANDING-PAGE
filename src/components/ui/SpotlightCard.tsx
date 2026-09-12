"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The site's signature card interaction, recalibrated for paper.
 *
 * The move survives the two-colour system; only the colour maths changed. On
 * the old near-black substrate the card lightened toward its centre. On paper
 * there is nothing above white to lighten into, so it now goes the other way:
 * the flat white card takes on a soft radial of --wash, deepest at the top
 * centre and fading back to white at the edges, and lifts on an accent-tinted
 * shadow rather than a neutral grey one.
 *
 * Two things it deliberately is not:
 *   - not a glow. A soft coloured halo on every card is banned outright, and
 *     the shadow here is a directional lift with a purple bias, not a bloom.
 *   - not frosted glass. No blur, no translucency, no border-light trick.
 *
 * Touch judgement: tap-and-hold and "whichever card is most in view" both
 * read as gimmicks, and every card in these grids is a link, so a hold gesture
 * would fight the tap that navigates. The spotlight fires on hover, on press
 * and on keyboard focus, which ties it to a real interaction.
 */
export function SpotlightCard({
  children,
  href,
  className = "",
  media,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  /** Optional full-bleed plate at the top of the well. Clipped to the same
      inner radius as the card, so corners sit flush with no leftover ears. */
  media?: ReactNode;
}) {
  const reduce = useReducedMotion();

  /* Offset above centre so the light has a direction. --wash at full strength
     in the middle is only three steps off white, which is the whole point:
     the card should warm, not change colour. */
  const spotlight =
    "radial-gradient(120% 88% at 50% 8%, var(--wash) 0%, color-mix(in srgb, var(--wash) 45%, #ffffff) 42%, #ffffff 78%)";

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
      /* Elevation is declared once at each end: a hairline border at rest,
         a tinted shadow when lifted. The border fades out as the shadow
         arrives rather than the card wearing both at once. */
      variants={{
        rest: {
          boxShadow: "0 0 0 0 rgba(98, 56, 199, 0)",
          borderColor: "var(--border)",
        },
        active: {
          boxShadow: "var(--shade-accent)",
          borderColor: "rgba(0, 0, 0, 0)",
        },
      }}
      transition={transition}
      className={`group relative flex h-full flex-col overflow-hidden rounded-card border bg-surface p-1.5 ${className}`}
    >
      {/* The spotlight fill. Opacity is the only animated property on it. */}
      <motion.span
        aria-hidden
        variants={{ rest: { opacity: 0 }, active: { opacity: 1 } }}
        transition={transition}
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight }}
      />
      <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-[calc(var(--radius-card)-0.375rem)]">
        {media ? <div className="relative shrink-0 overflow-hidden">{media}</div> : null}
        <div className="relative flex h-full flex-1 flex-col p-6 sm:p-7">
          {children}
        </div>
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
