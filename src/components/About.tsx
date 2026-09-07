import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="bg-canvas px-4 py-28 sm:px-6 lg:px-10 lg:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="max-w-[16ch] font-display text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink">
              Intelligent automation, built by DYCH Technologies.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-8 max-w-[58ch] text-lg leading-relaxed text-ink-muted">
              We build automation and system management for industries and education
              across Africa. The same platform runs a single-stream primary school and a
              multi-campus secondary, because the hardware scales down as readily as it
              scales up.
            </p>
          </Reveal>

          {/* Grouped facts, separated by a single hairline each. No card boxes,
              no bordered spec table. */}
          <dl className="mt-12 grid gap-px overflow-hidden rounded-shell border border-line bg-line sm:grid-cols-3">
            {[
              { term: "Deployment", detail: "Gate hardware and school records, installed together." },
              { term: "Connectivity", detail: "Runs through outages, syncs when the line returns." },
              { term: "Reach", detail: "Primary and secondary schools, Uganda and the region." },
            ].map((item, i) => (
              <Reveal key={item.term} delay={0.12 + i * 0.07} className="bg-canvas p-6">
                <dt className="font-display text-base font-bold text-[var(--accent-text)]">
                  {item.term}
                </dt>
                <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {item.detail}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>

        {/* Offset media plate: pushed down and past the grid edge so the column
            pair never reads as two matching rectangles. */}
        <Reveal delay={0.1} className="lg:col-span-5 lg:mt-24">
          <figure className="bezel shadow-[var(--shade)]">
            <div className="bezel-core relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://picsum.photos/seed/dych-school-corridor/1000/1250?grayscale"
                alt="A school corridor between lessons"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                style={{ filter: "var(--media-filter)" }}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 35%, var(--veil-strong) 100%)",
                }}
              />
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
