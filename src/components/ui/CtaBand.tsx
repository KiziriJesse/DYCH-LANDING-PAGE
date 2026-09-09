import { Reveal } from "@/components/ui/Reveal";
import { Cta } from "@/components/ui/Cta";

/**
 * The closing band every page ends on.
 *
 * Carries `.theme-dark` so it keeps its own register at the foot of a light
 * page: the surrounding scope does not leak in, and the band reads as a
 * deliberate change of gear rather than more of the same page.
 *
 * The panel is a solid accent fill, closer to the prototype's solid closing
 * band than the bordered panel this used to be. The CTA inside inverts to the
 * on-accent tone, because a primary CTA on an accent ground would be the same
 * colour as the thing behind it.
 *
 * The heading changes per page; the button label does not, so there is still
 * one label per intent across the site.
 */
export function CtaBand({ title, body }: { title: string; body: string }) {
  return (
    <section className="theme-dark bg-background px-4 pb-28 pt-4 sm:px-6 lg:px-10 lg:pb-40">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <div className="band-accent relative isolate overflow-hidden rounded-card px-6 py-16 text-center sm:px-12 lg:py-24">
            <h2 className="mx-auto max-w-[22ch] text-[clamp(1.875rem,4.2vw,3rem)] leading-[1.08] tracking-[-0.03em]">
              {title}
            </h2>
            <p className="mx-auto mt-6 max-w-[52ch] text-lg leading-relaxed text-white/80">
              {body}
            </p>

            <div className="mt-10 flex justify-center">
              <Cta href="/contact" tone="on-accent">
                Book a Demo
              </Cta>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
