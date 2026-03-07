"use client";
import React from "react";
import { KPITrendWidget } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "title", type: "string", required: true, description: "Card label." },
  { name: "value", type: "number | string", required: true, description: "Primary metric value." },
  { name: "delta", type: "number", required: false, description: "Percentage change (positive = up, negative = down)." },
  { name: "target", type: "number", required: false, description: "Shows a progress bar toward this target value." },
  { name: "sparkline", type: "number[]", required: false, description: "Array of historical values drawn as an SVG sparkline." },
  { name: "format", type: '"number" | "percent" | "currency" | "time"', required: false, default: '"number"', description: "Formats the displayed value." },
  { name: "timeframe", type: "string", required: false, description: "Small timeframe label (e.g. «Last 30 days»)." },
  { name: "loading", type: "boolean", required: false, default: "false", description: "Shows a shimmer skeleton." },
];

export default function KPITrendWidgetPage() {
  return (
    <main>
      <ComponentHeader name="KPITrendWidget" description="KPI card with SVG sparkline, delta badge, target progress bar, and loading skeleton." section="Analytics" />
      <SectionTitle>Variants</SectionTitle>
      <Preview>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          <KPITrendWidget title="Completion rate" value={74} format="percent" delta={12} sparkline={[55, 60, 58, 65, 70, 74]} target={80} timeframe="Last 30 days" />
          <KPITrendWidget title="NPS score" value={42} delta={-3} sparkline={[50, 48, 45, 44, 42]} />
          <KPITrendWidget title="Avg. duration" value={185} format="time" delta={5} sparkline={[160, 170, 175, 180, 185]} />
          <KPITrendWidget title="Revenue" value={12400} format="currency" delta={8} />
        </div>
      </Preview>
      <SectionTitle>Loading state</SectionTitle>
      <Preview>
        <div style={{ maxWidth: 220 }}>
          <KPITrendWidget title="Completion rate" value={0} loading />
        </div>
      </Preview>
      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />
      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { KPITrendWidget } from "@brickslab./ui-web";

<KPITrendWidget
  title="Completion rate"
  value={74}
  format="percent"
  delta={12}
  sparkline={[55, 60, 65, 70, 74]}
  target={80}
  timeframe="Last 30 days"
/>`} />
    </main>
  );
}
