import type { Transition, Variants } from "motion/react";

/** Weighted glide used for every entrance on the page. No linear, no ease-in-out. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_GLIDE = [0.32, 0.72, 0, 1] as const;

/** Spring used for anything the pointer drives, so hover feels like mass, not a fade. */
export const POINTER_SPRING: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.6,
};

/** Parent/child pair for staggered section entrances. */
export const stagger = (delayChildren = 0, staggerChildren = 0.08): Variants => ({
  hidden: {},
  shown: {
    transition: { delayChildren, staggerChildren },
  },
});

export const riseIn: Variants = {
  hidden: { opacity: 0, y: 28 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

/** Headline lines that clear a mask, so the message assembles rather than fades. */
export const maskLine: Variants = {
  hidden: { y: "108%" },
  shown: {
    y: "0%",
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
};

export const VIEWPORT = { once: true, amount: 0.25 } as const;
