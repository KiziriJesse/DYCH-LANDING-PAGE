"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { Button, TextLink } from "@/components/ui/Button";
import { HudOverlay } from "@/components/home/hud/HudOverlay";

const HeroHud = dynamic(
  () => import("@/components/home/hud/HeroHud").then((m) => m.HeroHud),
  { ssr: false },
);

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const HEADLINE = "Know who is on your premises — in real time.";

/**
 * Full-bleed HUD hero. Copy is pinned to the far left; the Three.js scene
 * owns the rest of the frame so the scan origin can sit on the container
 * edge and still reach the static wireframe head on the right.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const words = HEADLINE.split(" ");

  return (
    <section
      aria-labelledby="hero-heading"
      className="surface-recess relative isolate min-h-[100dvh] overflow-hidden"
    >
      <span aria-hidden className="hero-grid" />
      <HudOverlay />

      {/* Glass sits behind the mesh so the wireframe stays sharp, matching
          the reference where the frosted plate is a backplane. */}
      <div aria-hidden className="hero-glass hero-glass--main" />
      <div aria-hidden className="hero-glass hero-glass--cut" />

      <div className="absolute inset-0 z-[2]">
        <HeroHud reduced={!!reduce} />
      </div>

      <span aria-hidden className="hero-noise" />

      <div className="relative z-raise flex min-h-[100dvh] items-center px-4 pb-16 pt-24 sm:px-6 lg:px-8 lg:pb-20">
        <div className="hero-panel w-full max-w-[40rem] px-6 py-8 sm:px-9 sm:py-11 xl:max-w-[44rem]">
          {/* The eyebrow carries the technical tracking at full strength.
              The headline takes a gentler open setting: 0.3em on 52px type
              breaks the word shapes apart and costs more than it buys. */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: reduce ? 0 : 0.3, ease: EASE_OUT_EXPO }}
            className="hud-tag hud-tag--glint mb-5 flex items-center gap-3 sm:mb-6"
          >
            <span className="hud-box shrink-0" />
            Facial recognition access control
          </motion.p>

          <h1
            id="hero-heading"
            className="text-[clamp(1.5rem,4.2vw,3.25rem)] leading-[1.12] tracking-[0.015em] text-white sm:leading-[1.08]"
          >
            <span className="sr-only">{HEADLINE}</span>
            <span aria-hidden className="block pb-1">
              {words.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  className="resolve-word inline-block whitespace-pre"
                  initial={
                    reduce ? false : { opacity: 0, y: 18, filter: "blur(10px)" }
                  }
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.7,
                    delay: reduce ? 0 : 0.05 * i,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  {word}
                  {i < words.length - 1 ? " " : ""}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: reduce ? 0 : 0.55, ease: EASE_OUT_EXPO }}
            className="mt-5 max-w-[38ch] text-[0.9375rem] leading-relaxed tracking-[0.012em] text-muted sm:mt-6 sm:text-lg"
          >
            Cards, PINs and paper registers are easy to share, forget or fake.
            Our system uses the face as the credential: cameras recognise enrolled
            people as they walk in, mark presence automatically, and flag anyone
            the system does not know.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: reduce ? 0 : 0.66, ease: EASE_OUT_EXPO }}
            className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-4 sm:mt-10"
          >
            <Button href="/contact" size="lg" variant="inverted">
              Book a Demo
            </Button>
            <TextLink href="/how-it-works" className="ml-2">
              See How It Works
            </TextLink>
          </motion.div>
        </div>
      </div>

      <span aria-hidden className="hero-fade" />
    </section>
  );
}
