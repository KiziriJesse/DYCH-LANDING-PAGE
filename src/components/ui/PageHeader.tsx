import { Reveal } from "@/components/ui/Reveal";

/**
 * Opening block for every interior route. Headline and body stack vertically
 * at reading width rather than splitting into a big-headline-left,
 * small-paragraph-right header, which is the templated pattern.
 *
 * It sits on the brand gradient, so every route opens on the same violet as
 * the homepage hero, and the first light section below reads as the page
 * beginning. The intro stays within 64ch, clear of the gradient's light
 * corner.
 */
export function PageHeader({
  title,
  intro,
}: {
  title: string;
  intro: string;
}) {
  return (
    <header className="surface-violet px-4 pb-20 pt-32 sm:px-6 lg:px-10 lg:pb-24 lg:pt-40">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <h1 className="max-w-[18ch] text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.035em] text-foreground">
            {title}
          </h1>
          <p className="mt-7 max-w-[64ch] text-lg leading-relaxed text-muted sm:text-xl">
            {intro}
          </p>
        </Reveal>
      </div>
    </header>
  );
}
