import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { StepSpine } from "@/components/how-it-works/StepSpine";
import { DeploymentTimeline } from "@/components/how-it-works/DeploymentTimeline";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How a DYCH Technologies deployment runs: recognition at entry, attendance capture, parent alerts, analytics, and what installation involves.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        title="From the gate to the head teacher, in one line."
        intro="Four parts pass the same record along, so nothing is re-typed between the gate log and the report at the end of term. Each one below covers what it needs on site, what happens without anyone doing it, and what the school and the parent actually see."
      />

      <StepSpine />
      <DeploymentTimeline />

      <CtaBand
        title="Ready to see this running at your school?"
        body="A site assessment is a walk around your entry points and an hour of questions. It costs nothing and it ends with a written scope."
      />
    </>
  );
}
