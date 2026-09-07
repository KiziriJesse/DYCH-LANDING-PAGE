import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How a DYCH deployment runs: recognition at entry, attendance capture, parent alerts, analytics, and what installation involves.",
};

export default function HowItWorksPage() {
  return (
    <PagePlaceholder
      title="From the gate to the head teacher, in one line."
      summary="The four parts pass the same record along, so nothing is re-typed between the gate log and the report at the end of term. This page covers what each step needs and how a school gets set up."
      buildsIn="Phase 3"
    />
  );
}
