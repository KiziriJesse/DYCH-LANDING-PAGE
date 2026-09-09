"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The animated liquid gradient that fills a Button on hover.
 *
 * BUILT FROM THE DESCRIPTION, NOT THE REFERENCE. The brief points at a
 * `button-1.tsx` / `demo.tsx` pair "provided alongside this prompt". Those
 * files are not in the repo, not in Downloads, and not anywhere on this
 * machine, so this implements the mechanism the brief describes - several
 * overlapping radial-gradient layers whose stops animate through a colour
 * sequence on long, out-of-phase loops - rather than a port of code I could
 * not read. Hand me the file and I will reconcile the two.
 *
 * The reference imports from `motion/react`. This project already depends on
 * framer-motion, which is the same library under its earlier package name and
 * API-compatible for animated SVG stops, so the import is rewritten rather
 * than a second animation package added.
 *
 * PALETTE - AND WHERE IT DEPARTS FROM THE BRIEF. The brief asked for tints
 * "between those and white/--paper". Measured, that breaks the button: the
 * label on a filled button is white, and white on #9B7DE9 is 3.23:1, on
 * #BCA9F2 2.08:1, on --wash 1.19:1. Any stop lighter than --accent makes the
 * label unreadable at the moment the fill arrives.
 *
 * So the ramp runs the other way - downward from --accent into deeper tints
 * of the same hue. Every stop measured under a white label:
 *
 *     #4A2A9E  9.92:1     #7049D4  5.85:1
 *     #5730B5  8.42:1     #7C5CE0  4.70:1   (--accent, the lightest allowed)
 *     #6238C7  7.22:1     (--accent-on-light)
 *
 * All five sit between 254.5 and 257.6 degrees of hue, so this is still one
 * purple moving within itself and no third colour enters the site.
 *
 * WHY IT MOUNTS ON HOVER. At rest the button is an outline with no fill, so
 * there is nothing for a gradient to be seen in, and the brief is explicit
 * that nothing should be animating at rest on a page showing several buttons
 * at once. The layers are created when the pointer arrives and torn down when
 * it leaves; between times this costs nothing.
 *
 * WHY IT LISTENS TO ITS OWN PARENT. Button is a server component and receives
 * an `icon` prop that is a component reference, which cannot cross a server
 * boundary. Making Button a client component would break every call site that
 * passes an icon. So the client boundary stays here, at the leaf, and this
 * attaches its hover and focus listeners to the button element above it.
 */

/* Lightest last: the sequence is walked in order and wraps. */
const COLORS = ["#7C5CE0", "#6238C7", "#5730B5", "#4A2A9E", "#7049D4"];

/* Three overlapping blobs on long, deliberately non-multiple periods, so the
   pattern never lands in the same arrangement twice. 14-26s is the ambient
   pacing the brief asks for: felt, not watched. */
const BLOBS = [
  { cx: "28%", cy: "22%", r: "78%", dur: 14, from: 0 },
  { cx: "76%", cy: "72%", r: "86%", dur: 19, from: 2 },
  { cx: "52%", cy: "48%", r: "64%", dur: 26, from: 3 },
];

/** The sequence starting at `from`, wrapped, with the first value repeated
    at the end so the loop closes without a jump. */
function sequence(from: number) {
  const out = COLORS.slice(from).concat(COLORS.slice(0, from));
  return [...out, out[0]];
}

export function LiquidFill() {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    // The button element this sits inside.
    const host = ref.current?.parentElement;
    if (!host) return;

    const on = () => setActive(true);
    const off = () => setActive(false);

    host.addEventListener("pointerenter", on);
    host.addEventListener("pointerleave", off);
    // Keyboard users get the same fill the pointer does.
    host.addEventListener("focus", on);
    host.addEventListener("blur", off);

    return () => {
      host.removeEventListener("pointerenter", on);
      host.removeEventListener("pointerleave", off);
      host.removeEventListener("focus", on);
      host.removeEventListener("blur", off);
    };
  }, []);

  /* Under reduced motion the button keeps the flat --accent fill it already
     has from `hover:bg-accent`, and nothing is rendered here. */
  if (reduce) return null;

  return (
    <span
      ref={ref}
      aria-hidden
      /* The clip lives here rather than on the button, because the button's
         ::after overlay deliberately extends past its own box to hold the
         44px hit area, and overflow-hidden on the button would cut it off. */
      className={
        "pointer-events-none absolute inset-0 overflow-hidden rounded-full " +
        "transition-opacity duration-150 ease-out " +
        (active ? "opacity-100" : "opacity-0")
      }
    >
      {active && (
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          focusable="false"
        >
          <defs>
            {BLOBS.map((b, i) => (
              <radialGradient
                key={i}
                id={`${uid}-${i}`}
                cx={b.cx}
                cy={b.cy}
                r={b.r}
              >
                <motion.stop
                  offset="0%"
                  animate={{ stopColor: sequence(b.from) }}
                  transition={{
                    duration: b.dur,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                {/* The outer stop fades rather than hard-edging, so the blobs
                    blend into each other instead of stacking as discs. */}
                <motion.stop
                  offset="100%"
                  stopOpacity={0}
                  animate={{ stopColor: sequence((b.from + 2) % COLORS.length) }}
                  transition={{
                    duration: b.dur * 1.4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </radialGradient>
            ))}
          </defs>

          {/* A solid floor of --accent under the blobs, so there is never a
              translucent gap for the paper behind to show through. */}
          <rect width="100" height="100" fill="#7C5CE0" />
          {BLOBS.map((b, i) => (
            <rect key={i} width="100" height="100" fill={`url(#${uid}-${i})`} />
          ))}
        </svg>
      )}
    </span>
  );
}
