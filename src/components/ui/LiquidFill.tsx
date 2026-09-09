"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The liquid gradient, ported from the 21st.dev `button-1.tsx` reference.
 *
 * WHAT IS THE REFERENCE'S, KEPT AS-IS: the four gradient states, their exact
 * `gradientTransform` values and stop offsets, the svg1-2-3-4-3-2-1 cycle,
 * `createStopsArray`, and the seven stacked layers at their measured sizes,
 * rotations and blend modes. That stack is the effect: seven big
 * difference-blended gradients sliding over each other, clipped to a small
 * window, is what makes it read as liquid rather than as a moving gradient.
 *
 * WHAT IS NOT: the reference's button. No dark plate, no blur-glow halo, no
 * five stacked border spans, no GitHub content. This branch's button is a
 * ghost outline built to button.md and it keeps its shape exactly; the liquid
 * only replaces the flat colour of the fill it already had on hover.
 *
 * THREE DELIBERATE DEPARTURES, each for a reason:
 *
 *  1. `motion/react` -> `framer-motion`. Same library, earlier package name,
 *     API-compatible for animated SVG stops. Avoids a duplicate dependency.
 *
 *  2. The reference gives each stop `transition={{ duration: 0 }}`, which
 *     makes the stop animation a no-op - only `gradientTransform` actually
 *     moves. That looks like an oversight, so stops here get a real duration
 *     and the colours drift too. `gradientTransform` still does most of the
 *     work.
 *
 *  3. The reference animates at 10s at rest and 50s on hover, so hovering
 *     slows it down. That only makes sense when the effect is already running
 *     and visible. Here the button is transparent at rest, so this mounts on
 *     hover and uses the livelier timing - at 50s a two-second hover would
 *     show a still image.
 *
 * `AnimatePresence` around each stop is dropped: nothing enters or exits, so
 * it only added overhead.
 */

type ColorKey =
  | "color1" | "color2" | "color3" | "color4" | "color5" | "color6"
  | "color7" | "color8" | "color9" | "color10" | "color11" | "color12"
  | "color13" | "color14" | "color15" | "color16" | "color17";

export type Colors = Record<ColorKey, string>;

/*  The reference palette is white plus a blue ramp. This is the same
    structure in DYCH purple: the near-whites keep their role - they are what
    the difference blend inverts against, and removing them flattens the
    effect - and every blue becomes a purple of the same hue family.

    The label on a filled button is white, so the composited result is
    measured from rendered pixels rather than trusted. See the note on
    `--liquid-scrim` below. */
export const LIQUID_COLORS: Colors = {
  color1: "#FFFFFF",
  color2: "#3A1E8F", // was #1E10C5
  color3: "#9B8AE2", // was #9089E2
  color4: "#FCFCFE",
  color5: "#F9F9FD",
  color6: "#B4A8E7", // was #B2B8E7
  color7: "#3A1EA8", // was #0E2DCB
  color8: "#4A2AB8", // was #0017E9
  color9: "#6238C7", // was #4743EF  (--accent-on-light)
  color10: "#7C5CE0", // was #7D7BF4  (--accent)
  color11: "#2E1478", // was #0B06FC
  color12: "#CFC6EA", // was #C5C1EA
  color13: "#33179B", // was #1403DE
  color14: "#BCACF6", // was #B6BAF6
  color15: "#C4BAEB", // was #C1BEEB
  color16: "#2A0F8B", // was #290ECB
  color17: "#5744C0", // was #3F4CC0
};

const svgOrder = ["svg1", "svg2", "svg3", "svg4", "svg3", "svg2", "svg1"] as const;
type SvgKey = (typeof svgOrder)[number];

type Stop = { offset: number; stopColor: string };
type SvgState = { gradientTransform: string; stops: Stop[] };
type SvgStates = Record<SvgKey, SvgState>;

const createStopsArray = (
  svgStates: SvgStates,
  order: readonly SvgKey[],
  maxStops: number,
): Stop[][] => {
  const stopsArray: Stop[][] = [];
  for (let i = 0; i < maxStops; i++) {
    stopsArray.push(
      order.map((key) => {
        const svg = svgStates[key];
        return svg.stops[i] || svg.stops[svg.stops.length - 1];
      }),
    );
  }
  return stopsArray;
};

function GradientSvg({
  className,
  colors,
  gradientId,
}: {
  className: string;
  colors: Colors;
  gradientId: string;
}) {
  const svgStates: SvgStates = {
    svg1: {
      gradientTransform:
        "translate(287.5 280) rotate(-29.0546) scale(689.807 1000)",
      stops: [
        { offset: 0, stopColor: colors.color1 },
        { offset: 0.188423, stopColor: colors.color2 },
        { offset: 0.260417, stopColor: colors.color3 },
        { offset: 0.328792, stopColor: colors.color4 },
        { offset: 0.328892, stopColor: colors.color5 },
        { offset: 0.328992, stopColor: colors.color1 },
        { offset: 0.442708, stopColor: colors.color6 },
        { offset: 0.537556, stopColor: colors.color7 },
        { offset: 0.631738, stopColor: colors.color1 },
        { offset: 0.725645, stopColor: colors.color8 },
        { offset: 0.817779, stopColor: colors.color9 },
        { offset: 0.84375, stopColor: colors.color10 },
        { offset: 0.90569, stopColor: colors.color1 },
        { offset: 1, stopColor: colors.color11 },
      ],
    },
    svg2: {
      gradientTransform:
        "translate(126.5 418.5) rotate(-64.756) scale(533.444 773.324)",
      stops: [
        { offset: 0, stopColor: colors.color1 },
        { offset: 0.104167, stopColor: colors.color12 },
        { offset: 0.182292, stopColor: colors.color13 },
        { offset: 0.28125, stopColor: colors.color1 },
        { offset: 0.328792, stopColor: colors.color4 },
        { offset: 0.328892, stopColor: colors.color5 },
        { offset: 0.453125, stopColor: colors.color6 },
        { offset: 0.515625, stopColor: colors.color7 },
        { offset: 0.631738, stopColor: colors.color1 },
        { offset: 0.692708, stopColor: colors.color8 },
        { offset: 0.75, stopColor: colors.color14 },
        { offset: 0.817708, stopColor: colors.color9 },
        { offset: 0.869792, stopColor: colors.color10 },
        { offset: 1, stopColor: colors.color1 },
      ],
    },
    svg3: {
      gradientTransform:
        "translate(264.5 339.5) rotate(-42.3022) scale(946.451 1372.05)",
      stops: [
        { offset: 0, stopColor: colors.color1 },
        { offset: 0.188423, stopColor: colors.color2 },
        { offset: 0.307292, stopColor: colors.color1 },
        { offset: 0.328792, stopColor: colors.color4 },
        { offset: 0.328892, stopColor: colors.color5 },
        { offset: 0.442708, stopColor: colors.color15 },
        { offset: 0.537556, stopColor: colors.color16 },
        { offset: 0.631738, stopColor: colors.color1 },
        { offset: 0.725645, stopColor: colors.color17 },
        { offset: 0.817779, stopColor: colors.color9 },
        { offset: 0.84375, stopColor: colors.color10 },
        { offset: 0.90569, stopColor: colors.color1 },
        { offset: 1, stopColor: colors.color11 },
      ],
    },
    svg4: {
      gradientTransform:
        "translate(860.5 420) rotate(-153.984) scale(957.528 1388.11)",
      stops: [
        { offset: 0.109375, stopColor: colors.color11 },
        { offset: 0.171875, stopColor: colors.color2 },
        { offset: 0.260417, stopColor: colors.color13 },
        { offset: 0.328792, stopColor: colors.color4 },
        { offset: 0.328892, stopColor: colors.color5 },
        { offset: 0.328992, stopColor: colors.color1 },
        { offset: 0.442708, stopColor: colors.color6 },
        { offset: 0.515625, stopColor: colors.color7 },
        { offset: 0.631738, stopColor: colors.color1 },
        { offset: 0.692708, stopColor: colors.color8 },
        { offset: 0.817708, stopColor: colors.color9 },
        { offset: 0.869792, stopColor: colors.color10 },
        { offset: 1, stopColor: colors.color11 },
      ],
    },
  };

  const maxStops = Math.max(
    ...Object.values(svgStates).map((svg) => svg.stops.length),
  );
  const stopsAnimationArray = createStopsArray(svgStates, svgOrder, maxStops);
  const gradientTransform = svgOrder.map((key) => svgStates[key].gradientTransform);

  return (
    <svg
      className={className}
      width="1030"
      height="280"
      viewBox="0 0 1030 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      focusable="false"
    >
      <rect width="1030" height="280" rx="140" fill={`url(#${gradientId})`} />
      <defs>
        <motion.radialGradient
          id={gradientId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          animate={{ gradientTransform }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          {stopsAnimationArray.map((stopConfigs, index) => (
            <motion.stop
              key={index}
              initial={{
                offset: stopConfigs[0].offset,
                stopColor: stopConfigs[0].stopColor,
              }}
              animate={{
                offset: stopConfigs.map((c) => c.offset),
                stopColor: stopConfigs.map((c) => c.stopColor),
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </motion.radialGradient>
      </defs>
    </svg>
  );
}

/** The seven-layer stack. Sizes, offsets, rotations and blend modes are the
    reference's, scaled to roughly 40% because this button is a fraction of
    the reference's width and the layers must still overhang it. */
const LAYERS = [
  { size: "w-[177px] h-[48px]", pos: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", blend: "mix-blend-difference" },
  { size: "w-[177px] h-[48px]", pos: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[164.971deg]", blend: "mix-blend-difference" },
  { size: "w-[177px] h-[48px]", pos: "left-1/2 top-1/2 -translate-x-[53%] -translate-y-[53%] rotate-[-11.61deg]", blend: "mix-blend-difference" },
  { size: "w-[302px] h-[83px]", pos: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-[57%] rotate-[-179.012deg]", blend: "mix-blend-difference" },
  { size: "w-[302px] h-[83px]", pos: "left-1/2 top-1/2 -translate-x-[57%] -translate-y-1/2 rotate-[-29.722deg]", blend: "mix-blend-difference" },
  { size: "w-[302px] h-[83px]", pos: "left-1/2 top-1/2 -translate-x-[62%] -translate-y-[24%] rotate-[160.227deg]", blend: "mix-blend-difference" },
  { size: "w-[302px] h-[83px]", pos: "left-1/2 top-1/2 -translate-x-[67%] -translate-y-[29%] rotate-180", blend: "mix-blend-hard-light" },
];

export function Liquid({ colors = LIQUID_COLORS }: { colors?: Colors }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <>
      {LAYERS.map((l, i) => (
        <div key={i} className={`absolute ${l.size} ${l.pos} ${l.blend}`}>
          <GradientSvg
            className="h-full w-full"
            colors={colors}
            gradientId={`${uid}-${i}`}
          />
        </div>
      ))}
    </>
  );
}

/**
 * The wrapper Button renders. Mounts the stack on hover and focus, tears it
 * down on leave, and returns null under prefers-reduced-motion so the flat
 * --accent fill button.md specifies is what shows instead.
 *
 * WHY THE CLIENT BOUNDARY IS HERE AND NOT ON BUTTON. Button is a server
 * component and takes an `icon` prop that is a component reference, which
 * cannot cross a server boundary. Making Button a client component would
 * break every call site that passes one. So this listens on the button
 * element above it instead.
 *
 * WHY THE SCRIM. Seven difference-blended layers containing near-whites
 * produce light patches, and the label on top is white. The scrim is a
 * measured floor: it is set from rendered pixels so the lightest frame of
 * the animation still clears 4.5:1 under the label. Without it the effect is
 * prettier and the text is illegible for part of every cycle.
 */
export function LiquidFill() {
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host) return;
    const on = () => setActive(true);
    const off = () => setActive(false);
    host.addEventListener("pointerenter", on);
    host.addEventListener("pointerleave", off);
    host.addEventListener("focus", on);
    host.addEventListener("blur", off);
    return () => {
      host.removeEventListener("pointerenter", on);
      host.removeEventListener("pointerleave", off);
      host.removeEventListener("focus", on);
      host.removeEventListener("blur", off);
    };
  }, []);

  if (reduce) return null;

  return (
    <span
      ref={ref}
      aria-hidden
      /* The clip lives here rather than on the button: the button's ::after
         overlay deliberately extends past its own box to hold the 44px hit
         area, and overflow-hidden on the button would cut it off. */
      className={
        "pointer-events-none absolute inset-0 overflow-hidden rounded-full " +
        "transition-opacity duration-150 ease-out " +
        (active ? "opacity-100" : "opacity-0")
      }
    >
      {active && (
        <>
          {/* The plate the difference blend resolves against. Black would
              give the reference's look; the deepest brand purple keeps the
              result inside one hue. */}
          <span className="absolute inset-0 bg-[#2E1478]" />
          <Liquid />
          {/*  The measured floor.

               Not a guess. The difference stack peaks at pure white, so the
               worst frame decides the value. Modelled and then confirmed
               against rendered pixels, which agreed to 0.01:

                 alpha 0.55 -> 3.65 predicted, 3.64 measured   FAILS AA
                 alpha 0.62 -> 4.50                            exactly on the line
                 alpha 0.70 -> 5.77                            shipped

               0.62 is the true minimum and is too tight to trust across
               frames I did not sample. 0.70 keeps real headroom and still
               lets most of the liquid through. */}
          <span className="absolute inset-0 bg-[#2E1478]/70" />
        </>
      )}
    </span>
  );
}
