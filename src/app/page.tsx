import { Hero } from "@/components/home/Hero";
import { Problem } from "@/components/home/Problem";
import { ProductSnapshot } from "@/components/home/ProductSnapshot";
import { HowItWorksTeaser } from "@/components/home/HowItWorksTeaser";
import { Solutions } from "@/components/home/Solutions";
import { Proof } from "@/components/home/Proof";
import { ClosingCta } from "@/components/home/ClosingCta";

/**
 * Seven sections, seven different layout families: media hero, text-led
 * comparison, asymmetric bento, sector grid, horizontal rail, split proof,
 * solid panel.
 *
 * The page used to alternate light and dark bands. There is no dark scope any
 * more, so section rhythm now comes from the three paper tones - --paper,
 * white and --paper-alt - plus the one solid accent plate at the foot. Each
 * section carries its own ground, so the order is legible here rather than
 * hidden in a wrapper.
 *
 * Solutions sits after the capability bento and before the pipeline: the
 * reader has just seen what the system does, and this is where they find
 * themselves in it. Education is one of its eight cards rather than the
 * premise of the page, which is the whole point of it being there.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <ProductSnapshot />
      <Solutions />
      <HowItWorksTeaser />
      <Proof />
      <ClosingCta />
    </>
  );
}
