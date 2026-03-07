"use client";
import React from "react";
import { DistributionChart } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "data", type: "DistributionDataPoint[]", required: true, description: "Array of { label, value, series? }." },
  { name: "type", type: '"bar" | "stack" | "hist"', required: false, default: '"bar"', description: "Chart style." },
  { name: "normalize", type: "boolean", required: false, default: "false", description: "All bars fill 100% width (relative comparison)." },
  { name: "showLegend", type: "boolean", required: false, default: "false", description: "Renders a series legend below the chart." },
];

const barData = [
  { label: "Strongly agree", value: 320 },
  { label: "Agree", value: 480 },
  { label: "Neutral", value: 210 },
  { label: "Disagree", value: 140 },
  { label: "Strongly disagree", value: 80 },
];

const stackData = [
  { label: "Q1", value: 400, series: { Developer: 200, Designer: 120, PM: 80 } },
  { label: "Q2", value: 380, series: { Developer: 180, Designer: 140, PM: 60 } },
  { label: "Q3", value: 450, series: { Developer: 230, Designer: 130, PM: 90 } },
];

export default function DistributionChartPage() {
  return (
    <main>
      <ComponentHeader name="DistributionChart" description="Horizontal bar chart with single bar, stacked series, and histogram modes." section="Analytics" />
      <SectionTitle>Bar</SectionTitle>
      <Preview><div style={{ maxWidth: 520 }}><DistributionChart data={barData} /></div></Preview>
      <SectionTitle>Stacked with legend</SectionTitle>
      <Preview><div style={{ maxWidth: 520 }}><DistributionChart data={stackData} type="stack" showLegend /></div></Preview>
      <SectionTitle>Normalized</SectionTitle>
      <Preview><div style={{ maxWidth: 520 }}><DistributionChart data={barData} normalize /></div></Preview>
      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />
      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { DistributionChart } from "@brickslab./ui-web";

<DistributionChart
  data={[
    { label: "Agree", value: 480 },
    { label: "Neutral", value: 210 },
    { label: "Disagree", value: 140 },
  ]}
  type="bar"
/>`} />
    </main>
  );
}
