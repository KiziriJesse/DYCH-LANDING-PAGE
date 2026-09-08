import { Button } from "./Button";

/* BAND 7 — LIGHT, 0.62vh. Two-column contact rail, as in the reference. */
export function Contact() {
  return (
    <section
      id="contact"
      className="min-h-[var(--band-sm)] bg-[var(--paper-alt)] px-[var(--shell)] py-28"
    >
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow text-[var(--ink)]/50">20 — Deployments</p>
          <h3 className="mt-6 text-[var(--ink)]">Bringing this to a school</h3>
          {/* [PLACEHOLDER] */}
          <p className="mt-5 max-w-sm text-[var(--ink)]/70">
            Tell us about the site, the gates and the roll, and we will scope
            what a deployment looks like.
          </p>
          <div className="mt-8">
            <Button href="mailto:hello@dych.example" ground="light" icon={<Arrow />}>
              Start a conversation
            </Button>
          </div>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <p className="eyebrow text-[var(--ink)]/50">30 — Enquiries</p>
          <h3 className="mt-6 text-[var(--ink)]">Questions first</h3>
          {/* [PLACEHOLDER] — real contact address needed */}
          <p className="mt-5 max-w-sm text-[var(--ink)]/70">
            Technical questions about the pipeline, privacy posture or
            integration are welcome before any commitment.
          </p>
          <div className="mt-8">
            <Button href="mailto:hello@dych.example" ground="light" icon={<Arrow />}>
              Say hello
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden="true">
      <path d="M2 10 L10 2 M10 2 H4.5 M10 2 V7.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
