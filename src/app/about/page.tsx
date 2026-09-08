import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "About — Dych Technologies",
  description: "About Dych Technologies.",
};

/* [PLACEHOLDER PAGE]
   Every paragraph here is drafted, not supplied. PRODUCT.md records the
   company facts that are still missing (positioning, audience, geography,
   stage, team). Replace before this page is shown to anyone. */
export default function About() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-[var(--paper-pure)] px-[var(--shell)] pb-24 pt-20">
          <p className="eyebrow text-[var(--ink)]/50">About</p>
          <h1 className="mt-6 max-w-[20ch] text-[var(--ink)]">
            The company behind the pipeline.
          </h1>
        </section>

        <section className="bg-[var(--paper-alt)] px-[var(--shell)] py-24">
          <div className="grid gap-12 md:grid-cols-12">
            <p className="eyebrow text-[var(--ink)]/50 md:col-span-3">
              01
              <br />
              What we build
            </p>
            <div className="md:col-span-8">
              <p className="font-[family-name:var(--font-display)] text-2xl font-light leading-snug tracking-tight text-[var(--ink)]">
                Dych Technologies builds two systems: a facial recognition
                pipeline, and Vision One — school safety and access management
                built on top of it.
              </p>
              <p className="mt-8 max-w-2xl text-[var(--ink)]/70">
                [PLACEHOLDER] This page needs real company copy. The facts it
                should carry — founding, team, markets served, and the privacy
                posture behind the recognition products — have not been
                supplied, and are deliberately not invented here.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[var(--ink)] px-[var(--shell)] py-24 text-[var(--paper)]">
          <div className="grid gap-12 md:grid-cols-12">
            <p className="eyebrow text-[var(--paper)]/40 md:col-span-3">
              02
              <br />
              Get in touch
            </p>
            <div className="md:col-span-8">
              <h2 className="text-[var(--paper)]">Talk to the team</h2>
              <p className="mt-6 max-w-xl text-[var(--paper)]/60">
                [PLACEHOLDER] Questions about deployment, integration or the
                privacy model are welcome.
              </p>
              <div className="mt-10">
                <Button href="/#contact" ground="dark" icon={<Arrow />}>
                  Contact
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden="true">
      <path
        d="M2 10 L10 2 M10 2 H4.5 M10 2 V7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
