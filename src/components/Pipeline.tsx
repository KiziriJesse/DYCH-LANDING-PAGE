/* BAND 3 — DARK, 1.44vh. The facial-recognition pipeline.
   01–04 numbering is used here and nowhere else, because this content
   genuinely is a sequence (§5). */

const STAGES = [
  {
    n: "01",
    name: "Detection",
    // [PLACEHOLDER] stage description
    body: "Faces are located in the frame before anything else runs.",
  },
  {
    n: "02",
    name: "Alignment",
    body: "Each detected face is normalised to a consistent geometry.",
  },
  {
    n: "03",
    name: "Embedding",
    body: "The aligned face becomes a numerical representation.",
  },
  {
    n: "04",
    name: "Matching",
    body: "That representation is compared against the enrolled set.",
  },
];

export function Pipeline() {
  return (
    <section
      id="recognition"
      className="min-h-[var(--band-md)] bg-[var(--ink)] px-[var(--shell)] py-28 text-[var(--paper)]"
    >
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="eyebrow text-[var(--paper)]/40">Product 01</p>
          <h2 className="mt-6 text-[var(--paper)]">
            Facial
            <br />
            Recognition
          </h2>
          {/* [PLACEHOLDER] section intro */}
          <p className="mt-8 max-w-sm text-[var(--paper)]/60">
            A four-stage pipeline, running in real time.
          </p>
        </div>

        <ol className="md:col-span-8">
          {STAGES.map((s) => (
            <li
              key={s.n}
              className="grid grid-cols-[3rem_1fr] items-start gap-x-6 border-t border-[var(--paper)]/15 py-8 md:grid-cols-[4rem_14rem_1fr] md:gap-x-10"
            >
              <span className="eyebrow pt-1 text-[var(--accent-on-dark)]">
                {s.n}
              </span>
              <h3 className="text-[var(--paper)]">{s.name}</h3>
              <p className="col-start-2 mt-3 text-[var(--paper)]/60 md:col-start-3 md:mt-1">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
