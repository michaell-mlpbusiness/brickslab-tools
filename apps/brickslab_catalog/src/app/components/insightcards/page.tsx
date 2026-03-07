"use client";
import React from "react";
import { InsightCards } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "items", type: "InsightCardItem[]", required: true, description: "Array of { label, value, delta?, trend?, format? }." },
  { name: "variant", type: '"solid" | "glass"', required: false, default: '"solid"', description: "Card background style." },
];

const items = [
  { label: "Completion rate", value: 74, format: "percent" as const, delta: 12, trend: "up" as const },
  { label: "NPS score", value: 42, delta: -3, trend: "down" as const },
  { label: "Avg. duration", value: 185, format: "time" as const, delta: 5, trend: "up" as const },
  { label: "Responses", value: 1284, delta: 0, trend: "flat" as const },
];

export default function InsightCardsPage() {
  return (
    <main>
      <ComponentHeader name="InsightCards" description="Survey KPI cards grid with trend arrow, delta badge, and solid or glass variant." section="Analytics" />
      <SectionTitle>Solid</SectionTitle>
      <Preview><InsightCards items={items} /></Preview>
      <SectionTitle>Glass</SectionTitle>
      <Preview style={{ background: "linear-gradient(135deg, #CC4A48 0%, #1a1a2e 100%)", padding: 24 }}>
        <InsightCards items={items} variant="glass" />
      </Preview>
      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />
      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { InsightCards } from "@brickslab./ui-web";

<InsightCards
  items={[
    { label: "Completion rate", value: 74, format: "percent", delta: 12, trend: "up" },
    { label: "NPS score", value: 42, delta: -3, trend: "down" },
  ]}
/>`} />
    </main>
  );
}
