import { Reveal } from "@/components/ui/Reveal";
import { Cta } from "@/components/ui/Cta";

/**
 * Solid panel, no video: the page opened on moving footage and should not
 * close on a repeat of it. The only decoration is a single off-axis accent
 * wash, which keeps this band distinct from both the hero and the surface
 * sections above it.
 */
export function ClosingCta() {
  return (
    <section className="bg-background px-4 pb-28 pt-4 sm:px-6 lg:px-10 lg:pb-40">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-card border border-border bg-surface-raised px-6 py-16 text-center sm:px-12 lg:py-24">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-1/2 left-1/2 -z-10 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full opacity-60"
              style={{
                background:
                  "radial-gradient(closest-side, var(--accent-soft), transparent 70%)",
              }}
            />

            <h2 className="mx-auto max-w-[22ch] text-[clamp(1.875rem,4.2vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] text-foreground">
              See your school’s security and attendance transformed this term.
            </h2>
            <p className="mx-auto mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">
              Tell us the size of your roll and how attendance is taken today. We will
              come back with what an installation would involve at your site.
            </p>

            <div className="mt-10 flex justify-center">
              <Cta href="/contact">Book a Demo</Cta>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
