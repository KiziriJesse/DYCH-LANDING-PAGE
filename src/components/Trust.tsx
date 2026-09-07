"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { CloudSlash, DeviceMobile } from "@phosphor-icons/react";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/motion";

const POINTS = [
  {
    Icon: CloudSlash,
    title: "Offline first",
    body: "The gate keeps reading and the register keeps writing when the line drops. Everything syncs on its own once connectivity returns.",
  },
  {
    Icon: DeviceMobile,
    title: "On the phone parents already own",
    body: "Alerts travel over SMS and WhatsApp. No download, no data bundle, no assumption about the handset in a parent's pocket.",
  },
];

export function Trust() {
  const bandRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Depth: the ground moves slower than the copy, which separates the band
  // from the sections above and below it.
  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ["start end", "end start"],
  });
  const groundY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={bandRef}
      aria-labelledby="trust-heading"
      className="relative isolate overflow-hidden px-4 py-32 sm:px-6 lg:px-10 lg:py-48"
    >
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: groundY }}
        /* Taller than the band by more than the parallax travel, so no edge
           creeps into view at either end of the scroll. */
        className="absolute inset-x-0 -inset-y-[12%] -z-20"
      >
        <Image
          src="https://picsum.photos/seed/dych-open-country-road/1920/1200?grayscale"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{
            opacity: "var(--media-opacity)" as never,
            filter: "var(--media-filter)",
          }}
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, var(--canvas) 0%, var(--veil-soft) 26%, var(--veil-soft) 74%, var(--canvas) 100%)",
        }}
      />

      <div className="mx-auto max-w-[1400px]">
        <motion.h2
          id="trust-heading"
          initial={reduce ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          className="max-w-[22ch] font-display text-[clamp(2.5rem,6vw,4.25rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-ink"
        >
          Designed around how African schools actually run.
        </motion.h2>

        <div className="mt-16 grid gap-px overflow-hidden rounded-shell border border-line bg-line md:grid-cols-2">
          {POINTS.map(({ Icon, title, body }, i) => (
            <motion.article
              key={title}
              initial={reduce ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7, delay: 0.08 + i * 0.08, ease: EASE_OUT_EXPO }}
              className="bg-surface p-8 sm:p-10"
            >
              <span className="mb-7 flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-[var(--accent-text)] ring-1 ring-[var(--accent-line)]">
                <Icon size={24} weight="light" />
              </span>
              <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-ink">
                {title}
              </h3>
              <p className="mt-3 max-w-[46ch] leading-relaxed text-ink-muted">{body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
