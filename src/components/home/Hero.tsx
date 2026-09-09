"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Cta } from "@/components/ui/Cta";
import { DetectionFigure } from "@/components/ui/DetectionFigure";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/* The light scope’s accent, #6b3fd6. The component defaults to the dark-theme
   accent, which is too pale to read on paper. */
const LIGHT_MESH: [number, number, number] = [107, 63, 214];

/**
 * Asymmetric editorial composition: copy on the left, the detection mesh on
 * the right, rather than the centred-over-video block this used to be.
 *
 * The background video is gone entirely, along with its scrim and saturation
 * filter. DetectionFigure is the visual now, and it says something true about
 * the product instead of being stock footage of a city.
 *
 * The section runs on the light scope, which is the ground this figure was
 * originally drawn for, with a stroke tuned for paper rather than near-black.
 */
export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-background px-4 pb-20 pt-32 sm:px-6 lg:px-10 lg:pb-28 lg:pt-40"
    >
      <div className="mx-auto grid max-w-[1240px] items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <motion.h1
            id="hero-heading"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
            className="max-w-[16ch] text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.03] tracking-[-0.035em] text-foreground"
          >
            The face at the gate is the safest record you’ll ever keep.
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: reduce ? 0 : 0.18, ease: EASE_OUT_EXPO }}
            className="mt-8 max-w-[46ch] text-lg leading-relaxed text-muted sm:text-xl"
          >
            Facial-recognition entry, automatic attendance and instant parent alerts,
            built for how African schools actually run.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: reduce ? 0 : 0.3, ease: EASE_OUT_EXPO }}
            className="mt-11 flex flex-wrap items-center gap-3"
          >
            <Cta href="/contact">Book a Demo</Cta>
            <Cta href="/how-it-works" tone="quiet">
              See How It Works
            </Cta>
          </motion.div>
        </div>

        {/* Desktop: the mesh sits beside the copy. */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: reduce ? 0 : 0.12, ease: EASE_OUT_EXPO }}
          className="hidden lg:col-span-5 lg:block"
        >
          <DetectionFigure className="mx-auto w-full max-w-[24rem]" stroke={LIGHT_MESH} />
        </motion.div>
      </div>

      {/* Mobile: stacked below the copy at a reduced size. */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: reduce ? 0 : 0.2, ease: EASE_OUT_EXPO }}
        className="mx-auto mt-16 max-w-[1240px] lg:hidden"
      >
        <DetectionFigure className="w-2/3 max-w-[16rem]" stroke={LIGHT_MESH} />
      </motion.div>
    </section>
  );
}
