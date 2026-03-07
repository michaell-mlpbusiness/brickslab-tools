"use client";
import React from "react";
import { HeatmapMatrix } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "rows", type: "string[]", required: true, description: "Row labels." },
  { name: "cols", type: "string[]", required: true, description: "Column labels." },
  { name: "values", type: "number[][]", required: true, description: "2D matrix — values[rowIndex][colIndex]." },
  { name: "min", type: "number", required: false, description: "Minimum value for color scale. Defaults to data minimum." },
  { name: "max", type: "number", required: false, description: "Maximum value for color scale. Defaults to data maximum." },
  { name: "showScale", type: "boolean", required: false, default: "true", description: "Shows a color scale legend below the matrix." },
];

const rows = ["Ease of use", "Performance", "Design", "Documentation", "Support"];
const cols = ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"];
const values = [
  [12, 28, 45, 180, 320],
  [8, 42, 89, 210, 240],
  [5, 20, 60, 250, 350],
  [30, 80, 120, 180, 175],
  [18, 55, 95, 200, 220],
];

export default function HeatmapMatrixPage() {
  return (
    <main>
      <ComponentHeader name="HeatmapMatrix" description="Color-intensity matrix for aggregated Likert or cross-tab data with optional scale legend." section="Analytics" />
      <SectionTitle>Likert response matrix</SectionTitle>
      <Preview><HeatmapMatrix rows={rows} cols={cols} values={values} /></Preview>
      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />
      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { HeatmapMatrix } from "@brickslab./ui-web";

<HeatmapMatrix
  rows={["Ease of use", "Performance"]}
  cols={["Poor", "Fair", "Good", "Excellent"]}
  values={[
    [12, 45, 180, 320],
    [8, 89, 210, 240],
  ]}
/>`} />
    </main>
  );
}
