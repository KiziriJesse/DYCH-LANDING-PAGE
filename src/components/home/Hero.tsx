"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CloudSlash, DeviceMobileSpeaker, ScanSmiley } from "@phosphor-icons/react";
import { Button, TextLink } from "@/components/ui/Button";
import { DetectionFigure } from "@/components/ui/DetectionFigure";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** --accent, #7C5CE0. The mesh is line art, so 3:1 is the bar and it clears
    it on every paper tone (3.94-4.70:1). */
const MESH: [number, number, number] = [124, 92, 224];

/*  DYCH's own approved hero line, used as written. The previous headline -
    "The face at the door is the safest record you'll ever keep" - was a
    better sentence but it sold a record. This sells knowing, which is what
    the buyer is actually short of. */
/* Non-breaking space before the dash: the headline is split on spaces
   for the word-by-word reveal, so a bare "—" becomes its own token and can
   start a line on its own, which looks like a mistake. */
const HEADLINE = "Know who is on your premises — in real time.";

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
      className="relative overflow-hidden bg-background px-4 pb-12 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-10 lg:pb-28 lg:pt-40"
    >
      {/* The lavender field, on its own layer so it can drift. Painting it on
          the section itself would mean animating a background, which cannot
          go on the compositor; this is a transform on an inert child.
          -z-10 keeps it under the content, aria-hidden keeps it out of the
          accessibility tree, and the reduced-motion rule in globals.css
          stops the animation without removing the light. */}
      <span
        aria-hidden
        className="wash-field wash-drift pointer-events-none absolute -inset-x-24 -inset-y-32 -z-10"
      />
      {/* Side by side at EVERY width, phones included - the mesh is never
          pushed onto its own line below the copy.

          It used to stack below lg, then below md. Both left the headline and
          CTA sitting alone above a gap with the mesh far beneath, which reads
          as two unrelated blocks rather than one composition.

          The split widens as room appears: 8/4 on a phone, where the copy
          needs every pixel and the mesh is an accent, 7/5 from sm up. The
          column gap and the headline scale both come down at the narrow end
          so the headline still breaks sensibly in 8 columns of a 375px
          screen. */}
      <div className="mx-auto grid max-w-[1240px] grid-cols-12 items-center gap-x-3 gap-y-0 sm:gap-x-6 md:gap-8 lg:gap-10">
        <div className="col-span-7">
          {/* One h1 for assistive tech, then the animated words hidden from
              it, so a screen reader gets the sentence once and unbroken. */}
          <h1
            id="hero-heading"
            className="max-w-[16ch] text-[clamp(1.375rem,5.4vw,4.75rem)] leading-[1.08] tracking-[-0.025em] text-foreground sm:leading-[1.03] sm:tracking-[-0.035em]"
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
            className="mt-5 max-w-[48ch] text-[0.9375rem] leading-relaxed text-muted sm:mt-8 sm:text-lg lg:text-xl"
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
            className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-4 sm:mt-11"
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

        {/* The mesh, beside the copy at every width. The fragments that
            drift around it stay off below md: they carry two lines of text
            each and would be wider than the mesh they annotate on a phone. */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: reduce ? 0 : 0.12, ease: EASE_OUT_EXPO }}
          className="relative col-span-5"
        >
          <DetectionFigure className="mx-auto w-full max-w-[24rem]" stroke={MESH} />

          {FRAGMENTS.map((f, i) => (
            <motion.div
              key={f.label}
              aria-hidden
              className={`drift absolute ${f.place} pointer-events-none hidden items-center gap-2.5 rounded-full border border-border-strong bg-surface py-2 pl-2 pr-4 md:flex`}
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

    </section>
  );
}
