import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "DYCH Technologies pricing: trial deployment and full-school deployment, with hardware and support included.",
};

export default function PricingPage() {
  return (
    <PagePlaceholder
      title="Start with one gate. Decide after that."
      summary="Two ways in: a trial on a single entry point, or a full deployment across the school. Hardware, installation and support are part of the plan rather than a separate line."
      buildsIn="Phase 5"
    />
  );
}
