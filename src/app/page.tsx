import { Hero } from "@/components/home/Hero";
import { Problem } from "@/components/home/Problem";
import { ProductSnapshot } from "@/components/home/ProductSnapshot";
import { HowItWorksTeaser } from "@/components/home/HowItWorksTeaser";
import { Proof } from "@/components/home/Proof";
import { ClosingCta } from "@/components/home/ClosingCta";

/**
 * Six sections, six different layout families: media hero, text-led list,
 * asymmetric bento, horizontal rail, split proof, solid panel.
 *
 * The page used to alternate light and dark bands. There is no dark scope any
 * more, so section rhythm now comes from the three paper tones - --paper,
 * white and --paper-alt - plus the one solid accent plate at the foot. Each
 * section carries its own ground, so the order is legible here rather than
 * hidden in a wrapper.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <ProductSnapshot />
      <HowItWorksTeaser />
      <Proof />
      <ClosingCta />
    </>
  );
}
