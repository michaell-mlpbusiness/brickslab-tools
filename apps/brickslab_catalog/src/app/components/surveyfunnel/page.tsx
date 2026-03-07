"use client";
import React from "react";
import { SurveyFunnel } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "steps", type: "FunnelStep[]", required: true, description: "Array of { id, label, started, completed }." },
  { name: "mode", type: '"bar" | "step"', required: false, default: '"bar"', description: "Bar shows horizontal progress. Step shows vertical columns." },
  { name: "showRates", type: "boolean", required: false, default: "true", description: "Shows completion rate badges." },
];

const steps = [
  { id: "s1", label: "Survey started", started: 1200, completed: 1200 },
  { id: "s2", label: "Section 1", started: 1100, completed: 960 },
  { id: "s3", label: "Section 2", started: 960, completed: 780 },
  { id: "s4", label: "Section 3", started: 780, completed: 620 },
  { id: "s5", label: "Submitted", started: 620, completed: 580 },
];

export default function SurveyFunnelPage() {
  return (
    <main>
      <ComponentHeader name="SurveyFunnel" description="Start-to-complete funnel with bar and step modes, drop-off labels, and completion rates." section="Analytics" />
      <SectionTitle>Bar mode</SectionTitle>
      <Preview><div style={{ maxWidth: 560 }}><SurveyFunnel steps={steps} /></div></Preview>
      <SectionTitle>Step mode</SectionTitle>
      <Preview><div style={{ maxWidth: 480 }}><SurveyFunnel steps={steps} mode="step" /></div></Preview>
      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />
      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { SurveyFunnel } from "@brickslab./ui-web";

<SurveyFunnel
  steps={[
    { id: "s1", label: "Started", started: 1200, completed: 1200 },
    { id: "s2", label: "Section 1", started: 1100, completed: 960 },
    { id: "s3", label: "Submitted", started: 960, completed: 780 },
  ]}
  mode="bar"
  showRates
/>`} />
    </main>
  );
}
