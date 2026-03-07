"use client";
import React from "react";
import { AnomalyBadge } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "message", type: "string", required: true, description: "Anomaly description text." },
  { name: "level", type: '"info" | "warn" | "critical"', required: false, default: '"info"', description: "Severity level controlling color." },
  { name: "confidence", type: "number", required: false, description: "Confidence score 0–1, displayed as percentage." },
  { name: "onClick", type: "() => void", required: false, description: "Makes the badge interactive when provided." },
];

export default function AnomalyBadgePage() {
  return (
    <main>
      <ComponentHeader name="AnomalyBadge" description="Pulsing anomaly indicator badge with info, warn, and critical severity levels." section="Analytics" />
      <SectionTitle>Levels</SectionTitle>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <AnomalyBadge level="info" message="Completion spike detected" confidence={0.87} />
          <AnomalyBadge level="warn" message="Drop-off increase" confidence={0.72} onClick={() => alert("warn clicked")} />
          <AnomalyBadge level="critical" message="NPS drop — 8 pts" confidence={0.95} onClick={() => alert("critical clicked")} />
        </div>
      </Preview>
      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />
      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { AnomalyBadge } from "@brickslab./ui-web";

<AnomalyBadge
  level="warn"
  message="Drop-off rate increased by 12%"
  confidence={0.82}
  onClick={() => openDrilldown()}
/>`} />
    </main>
  );
}
