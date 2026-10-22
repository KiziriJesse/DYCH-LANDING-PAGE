import { FaceScanHero } from "@/components/home/FaceScanHero";
import { Problem } from "@/components/home/Problem";
import { ProductSnapshot } from "@/components/home/ProductSnapshot";
import { HowItWorksTeaser } from "@/components/home/HowItWorksTeaser";
import { Solutions } from "@/components/home/Solutions";
import { TimeSaved } from "@/components/home/TimeSaved";
import { Proof } from "@/components/home/Proof";
import { ClosingCta } from "@/components/home/ClosingCta";

/**
 * Eight sections, eight different layout families: media hero, text-led
 * comparison, asymmetric bento, sector grid, horizontal rail, the
 * calculator's split form-and-readout, split proof, solid panel.
 *
 * TimeSaved sits after the pipeline and before the proof: the reader has
 * just seen how the thing works, so this is the first point at which "how
 * much of my morning does it give back" is a question they can answer with
 * their own numbers - and the claim it produces is theirs, which is a better
 * way into Proof than another of ours.
 *
 * Section rhythm comes from lightness along the logo's one hue: the recessed
 * hero, paper and paper-hi light sections, the violet gradient on Proof, and
 * the near-black ground under the closing CTA. Each section carries its own
 * ground, so the order is legible here rather than hidden in a wrapper.
 *
 * Solutions sits after the capability bento and before the pipeline: the
 * reader has just seen what the system does, and this is where they find
 * themselves in it. Education is one of its eight cards rather than the
 * premise of the page, which is the whole point of it being there.
 */
export default function Home() {
  return (
    <>
      <FaceScanHero />
      <Problem />
      <ProductSnapshot />
      <Solutions />
      <HowItWorksTeaser />
      <TimeSaved />
      <Proof />
      <ClosingCta />
    </>
  );
}
