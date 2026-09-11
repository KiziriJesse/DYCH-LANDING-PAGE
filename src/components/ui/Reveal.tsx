"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Scroll-in reveal used across the site: fade plus a slight y-offset,
 * staggered by passing an increasing `delay` to siblings. Motivated by
 * hierarchy, so content arrives in reading order rather than all at once.
 *
 * Under prefers-reduced-motion it renders statically: everything is in place
 * on load, nothing waits for the viewport observer, and nothing translates.
 *
 * That is enforced twice, on purpose:
 *
 *   1. In JS, by starting at the finished state and giving the transition
 *      zero duration.
 *   2. In CSS, by the `.reveal` class, which globals.css pins to opacity 1
 *      and no transform inside a reduced-motion media query.
 *
 * The CSS half is not belt-and-braces, it is the half that works. Two things
 * defeat the JS on its own. The server cannot know the reader's motion
 * preference, so the prerendered HTML always carries `opacity:0` and the page
 * is blank until hydration. And framer-motion writes animated values straight
 * onto the node rather than through React, so a later re-render does not
 * necessarily clear what it already set. Measured before this fix, with
 * reduced motion emulated: every block below the fold, and on some routes the
 * h1 itself, sat at opacity 0 with a transform applied and only appeared once
 * scrolled into view. An `!important` in a media query beats an inline style,
 * applies before any JS runs, and cannot be undone by the animation library.
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
      className={className ? `reveal ${className}` : "reveal"}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: reduce ? 0 : 0.25 }}
      transition={
        reduce ? { duration: 0 } : { duration: 0.75, delay, ease: EASE_OUT_EXPO }
      }
    >
      {children}
    </Tag>
  );
}
