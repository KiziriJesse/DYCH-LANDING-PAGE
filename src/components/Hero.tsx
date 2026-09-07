"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { EASE_OUT_EXPO, maskLine } from "@/lib/motion";
import { Cta } from "@/components/ui/Cta";

const HEADLINE = ["Every child", "accounted for."];

export function Hero() {
  const plateRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Storytelling depth: the footage drifts slower than the page, so the media
  // plate reads as a window rather than a sticker.
  const { scrollYProgress } = useScroll({
    target: plateRef,
    offset: ["start end", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      className="relative flex min-h-[100dvh] items-center overflow-hidden px-4 pb-16 pt-24 sm:px-6 lg:px-10"
      aria-labelledby="hero-heading"
    >
      {/* Ambient ground: a soft off-axis wash, not a centered mesh blob. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[20%] top-[-10%] h-[70vmax] w-[70vmax] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, var(--accent-soft), transparent 72%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6 lg:pr-6 xl:col-span-5">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            className="mb-6 inline-flex items-center rounded-full border border-accent-line bg-accent-soft px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent-text)]"
          >
            Smart School Systems
          </motion.p>

          <h1
            id="hero-heading"
            className="font-display text-[clamp(2.75rem,7vw,4.75rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-ink"
          >
            {HEADLINE.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  variants={maskLine}
                  initial={reduce ? false : "hidden"}
                  animate="shown"
                  transition={{ delay: reduce ? 0 : 0.1 + i * 0.12 }}
                >
                  {i === 1 ? (
                    <>
                      accounted{" "}
                      <span className="text-[var(--accent-text)]">for.</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: reduce ? 0 : 0.38, ease: EASE_OUT_EXPO }}
            className="mt-7 max-w-[46ch] text-lg leading-relaxed text-ink-muted sm:text-xl"
          >
            Biometric attendance, secured entry points and same-minute alerts to
            parents. Built for schools across Uganda.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: reduce ? 0 : 0.48, ease: EASE_OUT_EXPO }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Cta href="#contact-team">Book a walkthrough</Cta>
            <Cta href="#solutions" tone="quiet">
              See the system
            </Cta>
          </motion.div>
        </div>

        {/* Media plate: the footage lives inside its own tray, so no text ever
            sits on top of moving image. */}
        <div
          ref={plateRef}
          className="lg:col-span-6 lg:-mr-10 xl:col-span-7 xl:-mr-16"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: reduce ? 0 : 0.2, ease: EASE_OUT_EXPO }}
            className="bezel shadow-[var(--shade-lift)] lg:rotate-[-1.25deg]"
          >
            <div className="bezel-core relative aspect-[4/3] overflow-hidden sm:aspect-[16/10] lg:aspect-[4/3.4]">
              <motion.video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="Students arriving at a school gate"
                style={{
                  ...(reduce ? {} : { y: mediaY }),
                  // The supplied footage is saturated blue stock. The duotone
                  // filter pulls it into the brand neutrals so it reads as
                  // texture rather than as a second, competing palette.
                  filter: "var(--media-filter)",
                }}
                /* Oversized and offset upward so the +/-6% parallax travel never
                   exposes an edge inside the plate. */
                className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover"
              >
                <source src="/hero-background.mp4" type="video/mp4" />
              </motion.video>

              {/* Theme veil: keeps the footage inside the page palette in both
                  light and dark, instead of punching a dark hole in the page. */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(200deg, transparent 8%, var(--veil-soft) 78%, var(--veil-strong) 100%)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 ring-1 ring-inset ring-[var(--line)]"
                style={{ borderRadius: "inherit" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
