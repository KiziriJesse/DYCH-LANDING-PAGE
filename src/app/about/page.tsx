import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who DYCH Technologies is, why the company exists, and where it operates from in Kampala, Uganda.",
};

export default function AboutPage() {
  return (
    <PagePlaceholder
      title="Intelligent automation, built by DYCH Technologies."
      summary="We build automation and system management for industries and education across Africa, from Kampala. This page covers why the company exists and who is behind it."
      buildsIn="Phase 4"
    />
  );
}
