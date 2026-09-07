import { Cta } from "@/components/ui/Cta";

/**
 * Phase 1 route shell. Gives each new route a real, navigable page with a
 * correct heading hierarchy and metadata while its content is built out in
 * Phases 2-5. Replace the whole component call, not just the copy.
 */
export function PagePlaceholder({
  title,
  summary,
  buildsIn,
}: {
  title: string;
  summary: string;
  /** Which phase of the build plan fills this page in. */
  buildsIn: string;
}) {
  return (
    <div className="px-4 pb-28 pt-32 sm:px-6 lg:px-10 lg:pt-40">
      <div className="mx-auto max-w-[1240px]">
        <h1 className="max-w-[18ch] text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.06] tracking-[-0.03em] text-foreground">
          {title}
        </h1>
        <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-muted">{summary}</p>

        {/* Visually marked placeholder, easy to grep and remove. */}
        <div className="mt-12 rounded-card border border-dashed border-border-strong bg-surface/50 p-8">
          <p className="text-sm font-semibold tracking-[0.1em] text-accent">
            PLACEHOLDER
          </p>
          <p className="mt-3 max-w-[58ch] leading-relaxed text-muted">
            This page is scaffolded in Phase 1 and gets its real content in{" "}
            {buildsIn}. The route, navigation, metadata and shared shell are live
            now so links resolve rather than 404.
          </p>
        </div>

        <div className="mt-12">
          <Cta href="/contact">Book a Demo</Cta>
        </div>
      </div>
    </div>
  );
}
