"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CloudSlash, DeviceMobileSpeaker, ScanSmiley } from "@phosphor-icons/react";
import { Button, TextLink } from "@/components/ui/Button";
import { DetectionFigure } from "@/components/ui/DetectionFigure";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** --accent, #7C5CE0. The mesh is line art, so 3:1 is the bar and it clears
    it on every paper tone (3.94-4.70:1). */
const MESH: [number, number, number] = [124, 92, 224];

const HEADLINE = "The face at the door is the safest record you’ll ever keep.";

/*  The three drifting fragments.

    Every one of them is a STATE or a claim DYCH already makes, never a
    figure. No percentages, no uptime, no "recognised in 0.4s" - the governing
    standard bans meaningless stat pills outright, and a latency number DYCH
    has not published would be exactly that with extra steps. "Works offline"
    is the only one making a claim at all, and it is document-backed.

    Each drifts on its own loop at its own period, so they never sync into a
    single pulse. Transform and opacity only. */
const FRAGMENTS = [
  {
    Icon: ScanSmiley,
    label: "Match confirmed",
    note: "at the entry point",
    // Positioned around the figure column, never over the headline.
    place: "left-[-2.5rem] top-[14%]",
    drift: { y: [0, -12, 0], x: [0, 4, 0] },
    period: 7.5,
  },
  {
    Icon: DeviceMobileSpeaker,
    label: "Alert sent",
    note: "push, then SMS",
    place: "right-[-1.5rem] top-[44%]",
    drift: { y: [0, 10, 0], x: [0, -5, 0] },
    period: 9.1,
  },
  {
    Icon: CloudSlash,
    label: "Works offline",
    note: "matching runs on site",
    place: "bottom-[8%] left-[-1rem]",
    drift: { y: [0, -8, 0], x: [0, -3, 0] },
    period: 8.3,
  },
];

/**
 * Asymmetric editorial composition: copy on the left, the detection mesh on
 * the right, rather than a centred slogan over stock video.
 *
 * Three things make it feel alive rather than idle:
 *   - the headline resolves word by word out of blur, which echoes what the
 *     mesh below it is doing. Motion, not a gradient fill - gradient headline
 *     words are a hard ban.
 *   - the mesh runs its own scan loop and now sits over a face silhouette.
 *   - three small UI fragments drift around the figure at different periods.
 *
 * The section sits on a soft --wash field rather than flat paper, which is
 * the one place the lavender gradient is allowed to be large.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const words = HEADLINE.split(" ");

  return (
    <section
      aria-labelledby="hero-heading"
      className="wash-field relative overflow-hidden bg-background px-4 pb-20 pt-32 sm:px-6 lg:px-10 lg:pb-28 lg:pt-40"
    >
      <div className="mx-auto grid max-w-[1240px] items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          {/* One h1 for assistive tech, then the animated words hidden from
              it, so a screen reader gets the sentence once and unbroken. */}
          <h1
            id="hero-heading"
            className="max-w-[16ch] text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.03] tracking-[-0.035em] text-foreground"
          >
            <span className="sr-only">{HEADLINE}</span>
            <span aria-hidden className="block">
              {words.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  className="resolve-word inline-block whitespace-pre"
                  initial={
                    reduce
                      ? false
                      : { opacity: 0, y: 18, filter: "blur(10px)" }
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
            className="mt-8 max-w-[48ch] text-lg leading-relaxed text-muted sm:text-xl"
          >
            Facial-recognition entry, automatic attendance and real-time alerts.
            For schools at the gate and for businesses at reception, built where
            the power cuts and the line drops.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: reduce ? 0 : 0.66, ease: EASE_OUT_EXPO }}
            className="mt-11 flex flex-wrap items-center gap-3"
          >
            <Button href="/contact" size="lg">
              Book a Demo
            </Button>
            {/* Second tier is a bare text link with an icon, not a second
                pill. Two outlined pills side by side read as equal weight,
                and a fill on either one is banned. */}
            <TextLink href="/how-it-works" className="ml-2">
              See How It Works
            </TextLink>
          </motion.div>
        </div>

        {/* Desktop: the mesh sits beside the copy, with the fragments drifting
            around it. Hidden below lg, where they would crowd the headline. */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: reduce ? 0 : 0.12, ease: EASE_OUT_EXPO }}
          className="relative hidden lg:col-span-5 lg:block"
        >
          <DetectionFigure className="mx-auto w-full max-w-[24rem]" stroke={MESH} />

          {FRAGMENTS.map((f, i) => (
            <motion.div
              key={f.label}
              aria-hidden
              className={`drift absolute ${f.place} pointer-events-none flex items-center gap-2.5 rounded-full border border-border bg-surface py-2 pl-2 pr-4 shadow-[var(--shade)]`}
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              animate={
                reduce
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 1, scale: 1, ...f.drift }
              }
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      opacity: { duration: 0.6, delay: 0.8 + i * 0.14 },
                      scale: { duration: 0.6, delay: 0.8 + i * 0.14 },
                      y: {
                        duration: f.period,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.8 + i * 0.14,
                      },
                      x: {
                        duration: f.period * 1.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.8 + i * 0.14,
                      },
                    }
              }
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full border border-accent-line bg-wash text-accent-on-light">
                <f.Icon size={16} weight="light" />
              </span>
              <span className="leading-tight">
                <span className="block text-[0.8125rem] font-semibold text-foreground">
                  {f.label}
                </span>
                <span className="block text-[0.6875rem] text-muted">{f.note}</span>
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mobile: stacked below the copy at a reduced size, without the
          fragments. */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: reduce ? 0 : 0.2, ease: EASE_OUT_EXPO }}
        className="mx-auto mt-16 max-w-[1240px] lg:hidden"
      >
        <DetectionFigure className="w-2/3 max-w-[16rem]" stroke={MESH} />
      </motion.div>
    </section>
  );
}
