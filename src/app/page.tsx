import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Solutions } from "@/components/Solutions";
import { Integration } from "@/components/Integration";
import { Trust } from "@/components/Trust";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Solutions />
        <Integration />
        <Trust />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
