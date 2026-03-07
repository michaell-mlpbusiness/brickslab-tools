"use client";
import React from "react";
import { CohortTrends } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "series", type: "TrendSeries[]", required: true, description: "Array of { name, points: { x, y }[] }." },
  { name: "metric", type: "string", required: true, description: "Metric label shown above the chart." },
  { name: "granularity", type: '"day" | "week" | "month"', required: false, default: '"day"', description: "Time granularity label." },
];

const weeks = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];
const series = [
  { name: "Campaign A", points: weeks.map((x, i) => ({ x, y: 320 + i * 18 + Math.sin(i) * 20 })) },
  { name: "Campaign B", points: weeks.map((x, i) => ({ x, y: 180 + i * 8 + Math.cos(i) * 15 })) },
  { name: "Organic", points: weeks.map((x, i) => ({ x, y: 250 + i * 12 })) },
];

export default function CohortTrendsPage() {
  return (
    <main>
      <ComponentHeader name="CohortTrends" description="Multi-series SVG line chart with axis labels, data point tooltips, and legend." section="Analytics" />
      <SectionTitle>Multi-series</SectionTitle>
      <Preview><CohortTrends series={series} metric="Completions" granularity="week" /></Preview>
      <SectionTitle>Single series</SectionTitle>
      <Preview><CohortTrends series={[series[0]]} metric="NPS score" granularity="month" /></Preview>
      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />
      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { CohortTrends } from "@brickslab./ui-web";

<CohortTrends
  metric="Completion rate"
  granularity="week"
  series={[
    { name: "Group A", points: [{ x: "W1", y: 320 }, { x: "W2", y: 380 }] },
    { name: "Group B", points: [{ x: "W1", y: 180 }, { x: "W2", y: 210 }] },
  ]}
/>`} />
    </main>
  );
}
