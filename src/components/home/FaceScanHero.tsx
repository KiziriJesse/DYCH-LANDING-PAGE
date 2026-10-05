"use client";

import Image from "next/image";
import { useEffect, useRef, type RefObject } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Button, TextLink } from "@/components/ui/Button";

/**
 * Face Scan hero, implemented from the Claude Design comp
 * "Face Scan Hero.dc.html" (face-scan-scene.jsx).
 *
 * The comp is a 22s, 1920x1080 video piece. The web version keeps its hero
 * scenes - face resolve, line-by-line headline, scan sweep, tracking
 * brackets - and drops the ID-document scenes, which describe a product DYCH
 * does not sell. The comp's "FACE MATCH · 99,7%" readout is replaced with
 * "Match confirmed": no invented accuracy figures on this site.
 *
 * Geometry is authored in the comp's 1130x1080 face column and expressed
 * here as percentages of that column (or cqw, where a size has to track the
 * column's width), so the whole rig scales as one piece.
 */

const HEADLINE = "Know who is on your premises — in real time.";
// The comp sets its headline as three hand-broken lines, not a reflow.
const HEADLINE_LINES = ["Know who is on", "your premises —", "in real time."];

/* The family's light violet, read from the surface scope rather than restated
   as a literal: both dark scopes in globals.css define --hud-glint-rgb, so
   the dot follows the ground it is placed on. */
const MATCH_DOT = "rgb(var(--hud-glint-rgb))";

/* ---- Easing, ported from animations-v3.jsx so timings match the comp ---- */
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  return 1 + (c1 + 1) * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

function tween(
  t: number,
  from: number,
  to: number,
  start: number,
  end: number,
  ease: (t: number) => number = easeInOutCubic,
) {
  if (t <= start) return from;
  if (t >= end) return to;
  return from + (to - from) * ease((t - start) / (end - start));
}

// Framer's cubic-bezier equivalents for the one-shot copy entrance.
const EASE_OUT_CUBIC = [0.33, 1, 0.68, 1] as const;
const EASE_OUT_BACK = [0.34, 1.56, 0.64, 1] as const;

/* ---- Timeline (seconds) ----
   The comp runs once; a hero has to idle forever. The opening camera settle
   plays once, then the scan block from the comp's Scan + Close scenes
   (3.6s + 2.6s) repeats with a rest gap, so the brackets are not on screen
   permanently. */
const REVEAL_START = 0.2;
const REVEAL_END = 2.6;
const SETTLE_END = 3.2;
const CAMERA_PERIOD = 30; // one slow push-in and back; the comp's push spans ~15s one way
const SCAN_START = 2.4; // first sweep once the face is mostly resolved
const SCAN_PERIOD = 9; // 6.6s of scan activity + 2.4s of rest
// Reduced motion holds here: sweeps finished, brackets and readout shown.
const REST_POSE = SCAN_START + 4;

function scanLocal(t: number) {
  return t < SCAN_START ? -1 : (t - SCAN_START) % SCAN_PERIOD;
}

/**
 * One authored-time axis for every looping layer, written to a motion value
 * so nothing re-renders per frame. Stops when the hero leaves the viewport or
 * the tab is hidden - it is decoration and the most expensive thing on the
 * page - and resumes where it left off rather than jumping ahead.
 */
function useSceneClock(ref: RefObject<HTMLElement | null>, reduced: boolean) {
  const clock = useMotionValue(0);

  useEffect(() => {
    if (reduced) {
      clock.set(REST_POSE);
      return;
    }
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let last = 0;
    let onScreen = true;
    let elapsed = clock.get();

    const tick = (now: number) => {
      // Cap the step so a throttled frame cannot skip half a sweep.
      if (last) elapsed += Math.min((now - last) / 1000, 0.1);
      last = now;
      clock.set(elapsed);
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (raf || !onScreen || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(el);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [clock, reduced, ref]);

  return clock;
}

/* ---- Face ---- */

function Face({ clock }: { clock: MotionValue<number> }) {
  const opacity = useTransform(clock, (t) => {
    const r = tween(t, 0, 1, REVEAL_START, REVEAL_END, easeOutCubic);
    return 0.15 + 0.85 * r;
  });
  // Filter on a full-column image is not free, so it drops to none once
  // the reveal is done.
  const filter = useTransform(clock, (t) => {
    const r = tween(t, 0, 1, REVEAL_START, REVEAL_END, easeOutCubic);
    return r >= 1
      ? "none"
      : `saturate(${1 + 0.25 * (1 - r)}) brightness(${0.72 + 0.28 * r})`;
  });

  // Camera: settle in from 1.12, then breathe between rest and a slow push.
  // Offsets are the comp's px over the 1130x1080 column.
  const settle = (t: number) => tween(t, 0, 1, 0, SETTLE_END);
  const breath = (t: number) =>
    (1 - Math.cos((2 * Math.PI * Math.max(0, t - SETTLE_END)) / CAMERA_PERIOD)) / 2;
  const scale = useTransform(clock, (t) => 1.12 - 0.12 * settle(t) + 0.1 * breath(t));
  const x = useTransform(clock, (t) => `${2.65 * (1 - settle(t)) - 5.3 * breath(t)}%`);
  const y = useTransform(clock, (t) => `${0.93 * (1 - settle(t)) - 1.67 * breath(t)}%`);

  return (
    <motion.div className="scan-face" style={{ opacity, filter, scale, x, y }}>
      <div className="scan-face-inner">
        {/* The comp draws face.png at 1.85x, offset (-1054, -35) in the
            column. This asset is that image cropped to the face alone, so its
            box is the same placement shifted by the 560px crop. */}
        <div className="scan-face-grade absolute left-[-1.583%] top-[-3.241%] h-[106.39%] w-[109.21%]">
          {/* unoptimized: the source is only 621px tall and drawn at up to
              1.85x, so the optimizer's q=75 re-encode was the visible loss.
              The @2x file is a Lanczos upscale with a light unsharp mask,
              saved as WebP q96 (223KB against 1.25MB as PNG) and served
              byte-for-byte. */}
          <Image
            src="/hero/face-scan@2x.webp"
            alt=""
            fill
            priority
            unoptimized
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ---- Particle field ----

   Triangles and squares across the whole hero ground. Each runs its own
   loop: rise, fading in and back out on a sine, turning a little as it goes.
   This takes the comp's particle motion (the same fade curve, the same 40deg
   turn, the same two fills) from its 16 face-column particles out to the full
   field.

   Slower and fainter than the comp's, because these sit behind the copy as
   well as the face: 6-12s loops rather than 3-7s, and a peak alpha of 0.25-0.65
   so they read as a field without competing with the headline. The scrim
   still sits above the field, which dims the copy side further. */

type ParticleSpec = {
  left: number;
  top: number;
  size: number;
  rot: number;
  dur: number;
  delay: number;
  rise: number;
  tri: boolean;
  alpha: number;
  wide: boolean;
};

const PARTICLE_COUNT = 40;
// A phone-width field at full count reads as noise; the rest join from md up.
const PARTICLES_ON_PHONE = 22;

// Seeded (the comp's generator and seed) so server and client render the
// same field and hydration does not shift a single shape.
const PARTICLES: ParticleSpec[] = (() => {
  let s = 7;
  const r = () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296;
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    left: 2 + r() * 96,
    // Nothing starts in the top tenth: everything drifts up, so shapes born
    // there would spend their whole loop under the navbar.
    top: 10 + r() * 90,
    size: 6 + r() * 14,
    rot: r() * 360,
    dur: 6 + r() * 6,
    delay: r() * 12,
    rise: 80 + r() * 120,
    tri: r() > 0.5,
    alpha: 0.25 + r() * 0.4,
    wide: i >= PARTICLES_ON_PHONE,
  }));
})();

// Rounded because these values are server-rendered: Math.sin in Node and in
// the browser can disagree in the last bit, which React reports as a
// hydration mismatch on the style attribute. Four decimals is invisible.
const round4 = (v: number) => Math.round(v * 1e4) / 1e4;

function Particle({ p, clock }: { p: ParticleSpec; clock: MotionValue<number> }) {
  const phase = useTransform(clock, (t) => ((t + p.delay) % p.dur) / p.dur);
  const opacity = useTransform(phase, (v) => round4(p.alpha * Math.sin(v * Math.PI)));
  const y = useTransform(phase, (v) => round4(-v * p.rise));
  const rotate = useTransform(phase, (v) => round4(p.rot + v * 40));

  return (
    <motion.span
      className={`absolute ${p.wide ? "hidden md:block" : "block"}`}
      style={{
        left: `${p.left}%`,
        top: `${p.top}%`,
        width: p.size,
        height: p.size,
        background: p.tri
          ? "rgb(244 240 255 / 0.85)"
          : "rgb(var(--hud-glint-rgb) / 0.75)",
        clipPath: p.tri ? "polygon(50% 0, 100% 100%, 0 100%)" : undefined,
        opacity,
        y,
        rotate,
      }}
    />
  );
}

function ParticleField({ clock }: { clock: MotionValue<number> }) {
  return (
    <div aria-hidden className="scan-particles pointer-events-none absolute inset-0 overflow-hidden">
      {PARTICLES.map((p, i) => (
        <Particle key={i} p={p} clock={clock} />
      ))}
    </div>
  );
}

/* ---- Scan sweep ---- */

function Sweep({
  clock,
  from,
  to,
}: {
  clock: MotionValue<number>;
  from: number;
  to: number;
}) {
  const progress = (t: number) => (scanLocal(t) - from) / (to - from);
  // 40px to 1040px of 1080: the comp stops the bar just short of each edge.
  const y = useTransform(
    clock,
    (t) => `${3.7 + 92.6 * easeInOutSine(clamp(progress(t), 0, 1))}%`,
  );
  const opacity = useTransform(clock, (t) => {
    const p = progress(t);
    return scanLocal(t) < 0 || p < 0 || p > 1 ? 0 : Math.sin(p * Math.PI);
  });

  return (
    <motion.div className="absolute inset-0" style={{ y, opacity }}>
      <div className="absolute left-[-7.96%] top-0 h-[2px] w-[107.96%]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(244_240_255/0)_0%,rgb(215_199_250/0.95)_30%,#f4f0ff_60%,rgb(244_240_255/0)_100%)] shadow-[0_0_24px_6px_rgb(89_9_246/0.55)]" />
        <div className="absolute inset-x-0 bottom-0 h-[12.39cqw] bg-[linear-gradient(to_top,rgb(208_208_244/0.18),rgb(208_208_244/0))]" />
      </div>
    </motion.div>
  );
}

/* ---- Tracking brackets ---- */

const CORNERS = [
  { key: "tl", className: "left-0 top-0", sx: 1, sy: 1 },
  { key: "tr", className: "right-0 top-0", sx: -1, sy: 1 },
  { key: "bl", className: "bottom-0 left-0", sx: 1, sy: -1 },
  { key: "br", className: "bottom-0 right-0", sx: -1, sy: -1 },
] as const;

function Brackets({ clock }: { clock: MotionValue<number> }) {
  const arm = useTransform(clock, (t) => {
    const s = scanLocal(t);
    return s < 0 ? 0 : tween(s, 0, 1, 1.3, 2.2, easeOutBack);
  });
  const opacity = useTransform(clock, (t) => {
    const s = scanLocal(t);
    if (s < 0) return 0;
    const pop = tween(s, 0, 1, 1.3, 2.2, easeOutBack);
    const out = tween(s, 0, 1, 5.8, 6.6, easeOutCubic);
    return clamp(pop - out, 0, 1);
  });
  const readout = useTransform(clock, (t) => clamp((scanLocal(t) - 2) * 2, 0, 1));

  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      {/* Box (1055, 170, 660x790) in stage px = the column rect below. */}
      <div className="absolute left-[23.45%] top-[15.74%] h-[73.15%] w-[58.41%]">
        {CORNERS.map((c) => (
          <span
            key={c.key}
            className={`absolute block size-[4.78cqw] ${c.className}`}
            style={{ transform: `scale(${c.sx}, ${c.sy})` }}
          >
            <motion.span
              className="absolute left-0 top-0 block h-[max(2px,0.354cqw)] w-full origin-left bg-white"
              style={{ scaleX: arm }}
            />
            <motion.span
              className="absolute left-0 top-0 block h-full w-[max(2px,0.354cqw)] origin-top bg-white"
              style={{ scaleY: arm }}
            />
          </span>
        ))}
      </div>
      {/* On a small recessed chip, so nothing that moves behind the readout -
          a particle, a sweep's glow, the light corner of the gradient - can
          take the label under 4.5:1. */}
      <motion.p
        className="absolute left-[23.45%] top-[90.74%] -ml-[0.8cqw] flex items-center gap-[0.9cqw] bg-[var(--recess)] px-[0.8cqw] py-[0.6cqw] font-mono text-[max(10px,1.77cqw)] uppercase leading-none tracking-[0.16em] text-faint"
        style={{ opacity: readout }}
      >
        <span
          className="block size-[max(6px,0.8cqw)] rounded-full"
          style={{ background: MATCH_DOT, boxShadow: `0 0 12px ${MATCH_DOT}` }}
        />
        Match confirmed
      </motion.p>
    </motion.div>
  );
}

/* ---- Section ---- */

export function FaceScanHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();
  const clock = useSceneClock(sectionRef, reduce);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="surface-violet scan-field relative isolate min-h-[100dvh] overflow-hidden"
    >
      {/* Left 150px of 1920 in the comp: 7.8vw on desktop. */}
      <div className="relative z-raise flex items-start px-5 pt-28 sm:px-8 lg:min-h-[100dvh] lg:items-center lg:px-[7.8vw] lg:py-24">
        <div className="w-full max-w-[56rem]">
          <h1
            id="hero-heading"
            className="font-bold text-[clamp(2.125rem,3.65vw,4.375rem)] leading-[1.16] tracking-[-0.01em] text-foreground"
          >
            <span className="sr-only">{HEADLINE}</span>
            <span aria-hidden className="block">
              {HEADLINE_LINES.map((line, i) => (
                <motion.span
                  key={line}
                  className="resolve-word block lg:whitespace-nowrap"
                  initial={reduce ? false : { opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1,
                    delay: reduce ? 0 : 0.2 + i * 0.22,
                    ease: EASE_OUT_CUBIC,
                  }}
                >
                  {line}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: reduce ? 0 : 1.1, ease: EASE_OUT_CUBIC }}
            className="reveal mt-6 max-w-[44ch] text-[clamp(1rem,1.35vw,1.625rem)] leading-[1.55] text-muted lg:mt-8"
          >
            Cards, PINs and paper registers are easy to share, forget or fake.
            Our system uses the face as the credential: cameras recognise enrolled
            people as they walk in, mark presence automatically, and flag anyone
            the system does not know.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              opacity: { duration: 0.6, delay: reduce ? 0 : 1.7, ease: EASE_OUT_CUBIC },
              scale: { duration: 0.8, delay: reduce ? 0 : 1.7, ease: EASE_OUT_BACK },
            }}
            className="reveal mt-8 flex origin-left flex-wrap items-center gap-x-3 gap-y-4 lg:mt-11"
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

      {/* After the copy in source order so that below lg, where the stage
          drops into flow, the face stacks under the text rather than behind
          it. On desktop the stage is absolute and the copy's z-raise keeps
          it on top. */}
      <div aria-hidden className="scan-stage">
        {/* First in the stage, so it paints under the face and the scrim. It
            lives here rather than on the section so that below lg it covers
            only the stage under the copy; .scan-particles masks it out of the
            copy column on desktop. Particles never pass behind type. There is
            no copy-side scrim: the copy sits on the bare gradient, as every
            dark section's copy does. */}
        <ParticleField clock={clock} />

        <div className="scan-rig scan-rig--face">
          <Face clock={clock} />
        </div>

        <div className="scan-rig">
          <Sweep clock={clock} from={-0.2} to={2.0} />
          <Sweep clock={clock} from={1.6} to={3.4} />
          <Brackets clock={clock} />
        </div>
      </div>
    </section>
  );
}
