import { Reveal } from "@/components/ui/Reveal";
import { Cta } from "@/components/ui/Cta";

/**
 * The closing band every page ends on. Solid panel, never video, so a page
 * does not finish on a repeat of how it opened. The heading changes per page;
 * the button label does not, so there is one label per intent across the site.
 */
export function CtaBand({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
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

            <h2 className="mx-auto max-w-[22ch] text-[clamp(1.875rem,4.2vw,3rem)] leading-[1.08] tracking-[-0.03em] text-foreground">
              {title}
            </h2>
            <p className="mx-auto mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">
              {body}
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
