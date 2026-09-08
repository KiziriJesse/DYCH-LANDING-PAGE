/* BAND 5 — DARK, 1.56vh. Vision One's six stated components.
   Six peers in an even bordered grid — they are not a sequence, so no
   01-06 numbering (§5), and no shadows (§1). */

const PARTS = [
  {
    name: "Admin dashboard",
    // [PLACEHOLDER] component descriptions — only the names are user-supplied
    body: "Central control for the school's access and safety record.",
  },
  { name: "Parent Portal", body: "Guardian-facing access to their own child's record." },
  { name: "Guard app", body: "The gate, on a phone." },
  { name: "Camera management", body: "Enrolment, placement and status of every camera." },
  { name: "Live display", body: "The current state of the gate, on screen." },
  { name: "Report card automation", body: "Report cards generated from the record." },
];

export function VisionOne() {
  return (
    <section
      id="vision-one"
      className="min-h-[var(--band-md)] bg-[var(--ink-raised)] px-[var(--shell)] py-28 text-[var(--paper)]"
    >
      <div className="grid gap-x-16 gap-y-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow text-[var(--paper)]/40">Product 02</p>
          <h2 className="mt-6 text-[var(--paper)]">Vision One</h2>
        </div>
        <p className="self-end text-[var(--paper)]/60 md:col-span-6 md:col-start-7">
          {/* [PLACEHOLDER] section intro */}
          School safety and access management — six parts of one system.
        </p>
      </div>

      <div className="mt-20 grid gap-px border border-[var(--paper)]/12 bg-[var(--paper)]/12 sm:grid-cols-2 lg:grid-cols-3">
        {PARTS.map((p) => (
          <article
            key={p.name}
            className="bg-[var(--ink-raised)] p-8 md:p-10"
          >
            <h3 className="text-[var(--paper)]">{p.name}</h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--paper)]/55">
              {p.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
