import { Hero } from "@/components/home/Hero";
import { Problem } from "@/components/home/Problem";
import { ProductSnapshot } from "@/components/home/ProductSnapshot";
import { HowItWorksTeaser } from "@/components/home/HowItWorksTeaser";
import { Proof } from "@/components/home/Proof";
import { ClosingCta } from "@/components/home/ClosingCta";

/**
 * Six sections, six different layout families: media hero, text-led list,
 * asymmetric bento, horizontal rail, split proof, solid panel. The full About
 * and Trust blocks have moved off the homepage; they belong to /about and
 * /security-and-trust in Phases 3-4.
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
