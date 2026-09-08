"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Cta } from "@/components/ui/Cta";

/**
 * TODO: replace hero-background.mp4 with real footage. A product demo
 * screen-recording, or real campus/gate footage, is strongly preferred over
 * the generic cityscape stock clip currently in /public. Swap the path here
 * and nothing else needs to change.
 */
const HERO_VIDEO = "/hero-background.mp4";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  // A muted decorative loop must stop under prefers-reduced-motion.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduce) {
      video.pause();
      video.currentTime = 0;
    } else {
      void video.play().catch(() => {
        /* the browser may refuse autoplay; the still frame is an acceptable
           fallback and the scrim keeps the type readable either way */
      });
    }
  }, [reduce]);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-[100dvh] w-full overflow-hidden"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
        tabIndex={-1}
        // The stock clip is saturated neon teal, which competed with the brand
        // purple once the palette was re-keyed. Pulling the saturation down
        // lets it read as texture behind the type instead of as a second
        // palette. Remove this when real campus footage replaces it.
        style={{ filter: "saturate(0.45)" }}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Scrim. Carries the substrate hue so the footage sits inside the page
          palette instead of punching a brighter hole through it. */}
      <div
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,14,20,0.86) 0%, rgba(10,14,20,0.74) 45%, rgba(10,14,20,0.95) 100%)",
        }}
      />

      {/* Hero holds four things only: headline, subhead, two CTAs. No stat
          pill, badge or nested card in the first viewport. */}
      <div className="relative z-20 flex min-h-[100dvh] items-center justify-center px-4 pb-16 pt-28 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.h1
            id="hero-heading"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
            className="text-[clamp(2.25rem,5.4vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.035em] text-foreground"
          >
            The face at the gate is the safest record you’ll ever keep.
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: reduce ? 0 : 0.18, ease: EASE_OUT_EXPO }}
            className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
          >
            Facial-recognition entry, automatic attendance and instant parent alerts,
            built for how African schools actually run.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: reduce ? 0 : 0.3, ease: EASE_OUT_EXPO }}
            className="mt-11 flex flex-wrap items-center justify-center gap-3"
          >
            <Cta href="/contact">Book a Demo</Cta>
            <Cta href="/how-it-works" tone="quiet">
              See How It Works
            </Cta>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
