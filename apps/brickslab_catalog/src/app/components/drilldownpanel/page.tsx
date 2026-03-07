"use client";
import React, { useState } from "react";
import { DrilldownPanel, DistributionChart } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "open", type: "boolean", required: true, description: "Controls panel visibility." },
  { name: "onOpenChange", type: "(v: boolean) => void", required: true, description: "Called to close the panel (overlay click or Escape)." },
  { name: "title", type: "string", required: false, description: "Panel header title." },
  { name: "context", type: "unknown", required: false, description: "Arbitrary context passed from the triggering chart (not rendered directly)." },
  { name: "children", type: "ReactNode", required: true, description: "Panel body content." },
];

const drillData = [
  { label: "Developer", value: 420 },
  { label: "Designer", value: 280 },
  { label: "PM", value: 180 },
  { label: "Other", value: 95 },
];

export default function DrilldownPanelPage() {
  const [open, setOpen] = useState(false);

  return (
    <main>
      <ComponentHeader name="DrilldownPanel" description="Slide-in side panel for chart drilldown details with overlay and keyboard close." section="Analytics" />
      <SectionTitle>Panel demo</SectionTitle>
      <Preview>
        <button
          style={{ padding: "9px 18px", border: "1.5px solid var(--color-brand)", borderRadius: "var(--radius-sm)", background: "var(--color-brand)", color: "#FBFBFB", cursor: "pointer", fontSize: "var(--fontsize-sm)", fontFamily: "inherit" }}
          onClick={() => setOpen(true)}
        >
          Open drilldown panel
        </button>
        <DrilldownPanel open={open} onOpenChange={setOpen} title="Respondent breakdown">
          <p style={{ fontSize: "var(--fontsize-sm)", color: "var(--color-muted)", marginBottom: 16 }}>
            Click on any bar to filter the main dashboard.
          </p>
          <DistributionChart data={drillData} />
        </DrilldownPanel>
      </Preview>
      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />
      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { DrilldownPanel } from "@brickslab./ui-web";

const [open, setOpen] = useState(false);

<button onClick={() => setOpen(true)}>View details</button>

<DrilldownPanel
  open={open}
  onOpenChange={setOpen}
  title="Segment breakdown"
>
  <DistributionChart data={segmentData} />
</DrilldownPanel>`} />
    </main>
  );
}
