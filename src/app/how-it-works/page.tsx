import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { StepSpine } from "@/components/how-it-works/StepSpine";
import { DeploymentTimeline } from "@/components/how-it-works/DeploymentTimeline";
/* The operations-console section is withdrawn at the client's instruction:
   it described the software screen by screen and showed captures of it, and
   DYCH judged that a competitor could build from it. The component is left in
   the tree with its copy intact so the decision can be reversed, but it is no
   longer imported and the captures it referenced have been deleted from
   public/ - see src/components/how-it-works/AdminDashboard.tsx. */
// import { AdminDashboard } from "@/components/how-it-works/AdminDashboard";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How a DYCH Technologies deployment runs: recognition at entry, attendance capture, parent alerts, analytics, the admin dashboard, and what installation involves.",
};

export default function HowItWorksPage() {
  return (
    <>
      {/* Written from the school deployment, which is the one with source
          documents behind it. The mechanism is identical at a business
          entrance, so the header says so rather than leaving a business
          reader to work out whether this page is about them. */}
      <PageHeader
        title="From the door to the office, in one line."
        intro="Four parts pass the same record along, so nothing is re-typed between the entry log and the report at the end of the term. It is written here from a school deployment, because that is the one with the fullest detail; at a business entrance the mechanism is the same and only the nouns change. Each part below covers what it needs on site, what happens without anyone doing it, and what people actually see."
      />

      {/* StepSpine ends on --background and DeploymentTimeline opens on
          --surface, so the two still alternate with the console section gone
          and the join needs no filler. */}
      <StepSpine />
      {/* <AdminDashboard /> */}
      <DeploymentTimeline />

      <CtaBand
        title="Ready to see this running at your entrance?"
        body="A site assessment is a walk around your entry points and an hour of questions. It costs nothing and it ends with a written scope."
      />
    </>
  );
}
