"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BellRinging,
  ChartLineUp,
  Fingerprint,
  SecurityCamera,
} from "@phosphor-icons/react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

// TODO: hardware names and quantities are indicative. Confirm the actual bill
// of materials with DYCH before this page goes live.
const STEPS = [
  {
    id: "step-security",
    title: "Security",
    Icon: SecurityCamera,
    lead: "Recognition happens at the boundary, so the record starts at the moment someone actually arrives rather than when a teacher gets to it.",
    detail: [
      {
        label: "What it needs",
        body: "A camera covering the approach to each entry point, a reader at the threshold, and a local unit that performs matching on site. Mains power with battery backup at the gate.",
      },
      {
        label: "What happens",
        body: "An arriving face is matched against the school’s enrolled records. A match writes an entry event. No match raises a prompt for the person on the gate.",
      },
      {
        label: "What the school sees",
        body: "A live list of who is on the grounds, and a queue of anything the system could not resolve on its own.",
      },
    ],
  },
  {
    id: "step-attendance",
    title: "Attendance",
    Icon: Fingerprint,
    lead: "The entry event is the attendance record. There is no second step for anyone to remember, and no paper register to transcribe afterwards.",
    detail: [
      {
        label: "What it needs",
        body: "Nothing beyond the gate hardware for arrival and departure. Schools that want a second checkpoint at a classroom door can add a reader there.",
      },
      {
        label: "What happens",
        body: "Arrival and departure are timestamped against the pupil profile and pushed into the class register as they occur.",
      },
      {
        label: "What the school sees",
        body: "A register that is already filled in when the teacher opens it, with late arrivals and early departures marked at their real times.",
      },
    ],
  },
  {
    id: "step-alerts",
    title: "Alerts",
    Icon: BellRinging,
    lead: "A parent hears within the minute, not at the end of the day. This is the part that changes what a school can promise a family.",
    detail: [
      {
        label: "What it needs",
        body: "A guardian contact number on each pupil profile, and an SMS gateway or WhatsApp Business connection configured for the school.",
      },
      {
        label: "What happens",
        body: "Three messages: arrived, left, and expected but not arrived. The third is the one that matters, and it fires without anyone deciding to send it.",
      },
      {
        label: "What the parent sees",
        body: "A short message from a number they recognise, on the handset they already carry, with no app to install and no data bundle required.",
      },
    ],
  },
  {
    id: "step-analytics",
    title: "Analytics",
    Icon: ChartLineUp,
    lead: "Everything above produces records. This is where they become something a head teacher can take into a meeting.",
    detail: [
      {
        label: "What it needs",
        body: "No additional hardware. Reporting reads the records the first three steps already produce.",
      },
      {
        label: "What happens",
        body: "Entry logs and attendance records are collected into one view and kept for the retention period the school sets.",
      },
      {
        label: "What the school sees",
        body: "Attendance trends by class and by pupil, a searchable security log, and exports for board papers and ministry returns.",
      },
    ],
  },
];

/**
 * A sticky rail beside a scrolling content column. Distinct from the split
 * sections on /product, and it keeps the reader's place in a four-part flow
 * that is longer than a viewport. The rail collapses out on mobile, where the
 * steps simply stack.
 */
export function StepSpine() {
  const [active, setActive] = useState(STEPS[0].id);
  const reduce = useReducedMotion();

  // IntersectionObserver, never a scroll listener.
  useEffect(() => {
    const nodes = STEPS.map((s) => document.getElementById(s.id)).filter(
      (n): n is HTMLElement => n !== null,
    );
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-background px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-12 lg:gap-16">
        <nav
          aria-label="Steps"
          className="hidden lg:col-span-4 lg:block lg:self-start"
          style={{ position: "sticky", top: "8rem" }}
        >
          <ol className="flex flex-col gap-1">
            {STEPS.map((step) => {
              const isActive = active === step.id;
              return (
                <li key={step.id}>
                  <a
                    href={`#${step.id}`}
                    aria-current={isActive ? "step" : undefined}
                    className={
                      "relative flex items-center gap-4 rounded-card px-4 py-3.5 transition-colors duration-300 " +
                      (isActive
                        ? "text-foreground"
                        : "text-muted hover:text-foreground")
                    }
                  >
                    {isActive && (
                      <motion.span
                        layoutId="spine-active"
                        aria-hidden
                        className="absolute inset-0 -z-10 rounded-card border border-accent-line bg-accent-soft"
                        transition={
                          reduce
                            ? { duration: 0 }
                            : { duration: 0.45, ease: [0.32, 0.72, 0, 1] }
                        }
                      />
                    )}
                    <span
                      aria-hidden
                      className={
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 " +
                        (isActive
                          ? "border-accent-line bg-surface text-accent"
                          : "border-border bg-surface-raised text-muted")
                      }
                    >
                      <step.Icon size={20} weight="light" />
                    </span>
                    <span className="font-semibold">{step.title}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="lg:col-span-7 lg:col-start-6">
          {STEPS.map((step, i) => (
            <motion.article
              key={step.id}
              id={step.id}
              initial={reduce ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
              className={
                i === 0 ? "scroll-mt-32" : "mt-20 scroll-mt-32 lg:mt-28"
              }
            >
              <span
                aria-hidden
                className="flex h-12 w-12 items-center justify-center rounded-full border border-accent-line bg-surface-raised text-accent lg:hidden"
              >
                <step.Icon size={24} weight="light" />
              </span>

              <h2 className="mt-6 text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-foreground lg:mt-0">
                {step.title}
              </h2>
              <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-muted">
                {step.lead}
              </p>

              <dl className="mt-9 border-t border-border">
                {step.detail.map((row) => (
                  <div key={row.label} className="border-b border-border py-5">
                    <dt className="font-semibold text-foreground">{row.label}</dt>
                    <dd className="mt-1.5 max-w-[58ch] leading-relaxed text-muted">
                      {row.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
