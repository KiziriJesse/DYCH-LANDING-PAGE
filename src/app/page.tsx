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
 * The page alternates light and dark bands rather than running one substrate
 * throughout. Light carries the human sections: the hero, the problem framing
 * and the proof. Dark carries the technical ones, the product grid and the
 * pipeline, which is the register the prototype uses for its product bands.
 * The closing CtaBand brings its own dark scope.
 */
export default function Home() {
  return (
    <>
      <div className="theme-light">
        <Hero />
        <Problem />
      </div>

      <ProductSnapshot />
      <HowItWorksTeaser />

      <div className="theme-light">
        <Proof />
      </div>

      <ClosingCta />
    </>
  );
}
