import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Solutions } from "@/components/Solutions";
import { Integration } from "@/components/Integration";
import { Trust } from "@/components/Trust";

/**
 * Phase 1 keeps the existing homepage sections intact. The homepage itself is
 * rebuilt in Phase 2; Navbar and Footer now live in the root layout so every
 * route shares them.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Solutions />
      <Integration />
      <Trust />
    </>
  );
}
