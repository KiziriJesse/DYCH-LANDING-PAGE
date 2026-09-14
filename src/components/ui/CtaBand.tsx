import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * The closing band every page ends on.
 *
 * Full bleed on the brand gradient, like every dark section. The primary
 * action on violet is the #f4f0ff fill with an indigo label, so the one light
 * shape in the band is the thing to press.
 *
 * The heading changes per page; the button label does not, so there is still
 * one label per intent across the site.
 */
export function CtaBand({ title, body }: { title: string; body: string }) {
  return (
    <section className="surface-violet px-4 py-28 sm:px-6 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1240px] text-center">
        <Reveal>
          <h2 className="mx-auto max-w-[22ch] text-[clamp(1.875rem,4.2vw,3rem)] leading-[1.08] tracking-[-0.03em] text-foreground">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">
            {body}
          </p>

          <div className="mt-10 flex justify-center">
            <Button href="/contact" size="lg">
              Book a Demo
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
