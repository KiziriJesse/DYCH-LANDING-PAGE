import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Thesis } from "@/components/Thesis";
import { Pipeline } from "@/components/Pipeline";
import { Reidentification } from "@/components/Reidentification";
import { VisionOne } from "@/components/VisionOne";
import { Statement } from "@/components/Statement";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

/* Band order mirrors the measured rhythm of the visual reference:
   WHITE · LIGHT · DARK · LIGHT · DARK · BLUE · LIGHT · DARK      */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Thesis />
        <Pipeline />
        <Reidentification />
        <VisionOne />
        <Statement />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
