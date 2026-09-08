import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sign in — Vision One",
  description: "Sign in to Vision One.",
};

/* [PLACEHOLDER PAGE — NOT WIRED TO ANY BACKEND]
   No authentication exists yet. This form has no action, no handler and no
   network call: it is layout only, so nothing a visitor types is collected
   or transmitted. The notice below says so on the page itself, so it cannot
   be mistaken for a working login. Wire it to the real service before
   removing that notice. */
export default function SignIn() {
  return (
    <>
      <Navbar />
      <main className="bg-[var(--paper-pure)] px-[var(--shell)] pb-28 pt-20">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-[var(--ink)]/50">Vision One</p>
            <h1 className="mt-6 text-[var(--ink)]">Sign in</h1>
            <p className="mt-8 max-w-sm text-[var(--ink)]/70">
              [PLACEHOLDER] Access for administrators, guards and parents.
            </p>

            <p className="mt-8 max-w-sm border-l-2 border-[var(--accent)] pl-4 text-sm text-[var(--ink)]/60">
              This form is a layout placeholder. It is not connected to any
              authentication service and does not send or store anything —
              please don&apos;t enter a real password.
            </p>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <div className="border border-[var(--ink)]/12 p-8 md:p-10">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="eyebrow block text-[var(--ink)]/60"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="off"
                    className="mt-3 h-11 w-full border border-[var(--ink)]/20 bg-transparent px-3 text-base text-[var(--ink)] outline-none transition-colors focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="eyebrow block text-[var(--ink)]/60"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="off"
                    className="mt-3 h-11 w-full border border-[var(--ink)]/20 bg-transparent px-3 text-base text-[var(--ink)] outline-none transition-colors focus:border-[var(--accent)]"
                  />
                </div>

                {/* Disabled: there is nothing to submit to. */}
                <button
                  type="button"
                  disabled
                  className="flex h-11 w-full items-center justify-center rounded-full border border-[var(--accent)] text-sm text-[var(--accent-on-light)] opacity-40"
                >
                  Sign in
                </button>

                <p className="text-center text-sm text-[var(--ink)]/50">
                  Not set up yet?{" "}
                  <Link
                    href="/#contact"
                    className="text-[var(--accent-on-light)] underline underline-offset-4"
                  >
                    Talk to us
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
