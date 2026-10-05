"use client";

import { useId, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { HelpTip } from "@/components/ui/HelpTip";

/**
 * The time the entrance gives back, worked out from the reader's own numbers.
 *
 * TIME, NOT MONEY. A shilling figure would need fee data, staff costs and a
 * volume of customer evidence DYCH does not have yet, and inventing one is
 * how a calculator stops being believable. Seconds are a unit one pilot
 * school's gate can actually support, so seconds are what this reports.
 *
 * Every figure the arithmetic rests on is stated under the result rather
 * than buried here: the scan time, the one-scan-per-person-per-day
 * assumption, and the five-day week. A number a reader cannot check is worth
 * less than no number.
 */

/** Seconds for one Smart Vision recognition at the entry point, confirmed by
    DYCH (2026-10-05). If this is ever re-measured, change it here and in the
    assumptions line below, which states it to the reader. */
const SCAN_SECONDS = 3;

/** School days in a week. The weekly figure is five times the daily one. */
const DAYS_PER_WEEK = 5;

const PEOPLE = {
  min: 50,
  max: 2000,
  step: 10,
  initial: 400,
  presets: [150, 400, 800, 1500],
};

const MANUAL = {
  min: 4,
  max: 60,
  step: 1,
  initial: 20,
  presets: [10, 20, 30, 45],
};

/** Thousands grouped by Intl rather than a hardcoded comma. The locale is
    pinned: left to the environment, the server would format with Node's
    locale and the browser with the reader's, and the two renders would not
    match on a figure like 1,500. The site is English, written for Uganda. */
const count = (v: number) => new Intl.NumberFormat("en-UG").format(v);

/** Seconds as the longest sensible unit, never a bare "13800 seconds". */
function duration(totalSeconds: number) {
  const mins = Math.round(totalSeconds / 60);
  if (mins < 1) return "under a minute";
  if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"}`;

  const hours = Math.floor(mins / 60);
  const rest = mins % 60;
  const h = `${hours} hour${hours === 1 ? "" : "s"}`;
  return rest === 0 ? h : `${h} ${rest} min`;
}

function Slider({
  id,
  label,
  hint,
  value,
  onChange,
  config,
  format,
}: {
  id: string;
  label: string;
  hint: string;
  value: number;
  onChange: (v: number) => void;
  config: { min: number; max: number; step: number; presets: number[] };
  format: (v: number) => string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[0.9375rem] font-medium text-foreground">
          {label}
        </label>
        <output htmlFor={id} className="nums text-[0.9375rem] font-semibold text-accent-on-light">
          {format(value)}
        </output>
      </div>

      <input
        id={id}
        type="range"
        min={config.min}
        max={config.max}
        step={config.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        /* accent-color styles the native track and thumb, which keeps the
           control a real range input: drag, arrow keys, Home/End and screen
           reader announcements all come free. */
        style={{ accentColor: "var(--accent)" }}
        className="mt-3 w-full cursor-pointer"
      />

      {/* Drag, or tap a common figure. Both reach the same state. */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {config.presets.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onChange(preset)}
            aria-pressed={value === preset}
            className={
              "nums rounded-full border px-3 py-1 text-[0.75rem] font-medium transition-colors duration-200 " +
              (value === preset
                ? "border-accent bg-accent text-accent-ink"
                : "border-border bg-surface text-muted hover:border-accent-line hover:text-foreground")
            }
          >
            {format(preset)}
          </button>
        ))}
      </div>

      <p className="mt-2 text-[0.8125rem] leading-snug text-faint">{hint}</p>
    </div>
  );
}

export function TimeSaved() {
  const uid = useId();
  const [people, setPeople] = useState(PEOPLE.initial);
  const [manual, setManual] = useState(MANUAL.initial);

  const savedPerPerson = Math.max(0, manual - SCAN_SECONDS);
  const perDay = people * savedPerPerson;
  const perWeek = perDay * DAYS_PER_WEEK;

  return (
    <section className="bg-surface px-4 py-28 sm:px-6 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <p className="text-sm font-medium tracking-[0.1em] text-accent-on-light">
            THE ARITHMETIC
          </p>
          <h2 className="mt-5 max-w-[20ch] text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.08] tracking-[-0.03em] text-foreground">
            How much of the day the entrance is taking.
          </h2>
          <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-muted">
            A manual register or a sign-in book costs a few seconds per person,
            every single morning. Put your own two numbers in and see what that
            adds up to.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal delay={0.07} className="lg:col-span-7">
            <SpotlightCard className="h-full">
              <div className="flex flex-col gap-9">
                <Slider
                  id={`${uid}-people`}
                  label="People through the entrance each day"
                  hint="Pupils and staff together, counted once each as they arrive."
                  value={people}
                  onChange={setPeople}
                  config={PEOPLE}
                  format={count}
                />
                <Slider
                  id={`${uid}-manual`}
                  label="Seconds per manual check-in today"
                  hint="Finding the name, marking it, and the queue that builds behind it."
                  value={manual}
                  onChange={setManual}
                  config={MANUAL}
                  format={(v) => `${v}s`}
                />
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.14} className="lg:col-span-5">
            <div className="surface-recess flex h-full flex-col justify-center rounded-card p-8">
              <p className="text-sm font-medium tracking-[0.1em] text-faint">
                TIME RECOVERED
              </p>

              {/* aria-live, so the figure is announced as the sliders move
                  rather than silently changing behind a screen reader. */}
              <div aria-live="polite">
                <p className="mt-5 text-[0.9375rem] text-muted">Every day</p>
                <p className="nums mt-1 text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.05] tracking-[-0.03em] text-foreground">
                  {duration(perDay)}
                </p>

                <p className="mt-7 text-[0.9375rem] text-muted">Every week</p>
                <p className="nums mt-1 text-[clamp(1.5rem,2.8vw,2rem)] font-light leading-[1.05] tracking-[-0.03em] text-foreground">
                  {duration(perWeek)}
                </p>
              </div>

              <div className="mt-8 border-t border-border pt-5">
                <p className="text-[0.8125rem] leading-relaxed text-faint">
                  <span className="font-semibold text-foreground">Assumptions.</span>{" "}
                  {SCAN_SECONDS}&nbsp;seconds per Smart Vision recognition, as
                  measured by DYCH. One scan per person per day.{" "}
                  {DAYS_PER_WEEK}&nbsp;school days a week. Departures, second entrances and visitors are not
                  counted, so the real figure is higher.
                </p>
                <div className="mt-3">
                  <HelpTip title="What this works out">
                    It takes the seconds a manual check-in costs you today,
                    subtracts the {SCAN_SECONDS} seconds a scan takes, and
                    multiplies what is left by the number of people arriving.
                    It is staff and pupil time returned to the day, not money —
                    DYCH would need far more customer data before putting a
                    shilling figure on it.
                  </HelpTip>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
