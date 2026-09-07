"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  BellRinging,
  ChartLineUp,
  Fingerprint,
  SecurityCamera,
} from "@phosphor-icons/react";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/motion";

const ICON = { size: 24, weight: "light" } as const;

const FLOW = [
  {
    label: "Identify",
    body: "Cameras and facial recognition are wired to the entry points, so the gate knows a face before a person reaches the desk.",
    Icon: SecurityCamera,
  },
  {
    label: "Record",
    body: "RFID or biometric marking writes the arrival straight into the register. The class teacher opens a list that is already correct.",
    Icon: Fingerprint,
  },
  {
    label: "Notify",
    body: "The parent gets an SMS or WhatsApp message on arrival, on departure, and whenever a pupil does not appear in the register.",
    Icon: BellRinging,
  },
  {
    label: "Review",
    body: "Security logs and attendance trends collect into one view, so the head teacher can answer a question with a record rather than a memory.",
    Icon: ChartLineUp,
  },
];

export function Integration() {
  const railRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Storytelling: the rail fills as you read, so the page shows the same
  // entry-to-insight progression the section describes.
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 72%", "end 55%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const height = useTransform(fill, (v) => `${Math.max(v, 0) * 100}%`);

  return (
    <section id="integration" className="bg-canvas px-4 py-28 sm:px-6 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
        >
          <h2 className="max-w-[20ch] font-display text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink">
            From the gate to the head teacher, in one line.
          </h2>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink-muted">
            The four parts pass the same record along. Nothing is re-typed, so nothing
            drifts between the gate log and the report at the end of term.
          </p>
        </motion.div>

        <div ref={railRef} className="relative mt-20 pl-12 sm:pl-20">
          {/* Rail track, and the fill that tracks scroll progress. */}
          <div
            aria-hidden
            className="absolute bottom-6 left-[1.4375rem] top-6 w-px bg-line sm:left-[2.6875rem]"
          >
            <motion.div
              className="w-px bg-accent origin-top"
              style={{ height: reduce ? "100%" : height }}
            />
          </div>

          <ol className="flex flex-col gap-16 sm:gap-20">
            {FLOW.map(({ label, body, Icon }, i) => (
              <motion.li
                key={label}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.7, delay: i * 0.05, ease: EASE_OUT_EXPO }}
                className="relative"
              >
                <span
                  aria-hidden
                  className="absolute -left-12 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-[var(--accent-text)] shadow-[var(--shade)] sm:-left-20"
                >
                  <Icon {...ICON} />
                </span>
                <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-ink sm:text-3xl">
                  {label}
                </h3>
                <p className="mt-3 max-w-[58ch] leading-relaxed text-ink-muted">{body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
