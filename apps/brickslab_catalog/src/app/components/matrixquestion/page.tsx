"use client";
import React, { useState } from "react";
import { MatrixQuestion } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "value", type: "Record<string, string | number>", required: true, description: "Map of rowId → selected colId(s). Multi-mode stores comma-separated colIds." },
  { name: "onChange", type: "(v: Record<string, string | number>) => void", required: true, description: "Called with updated value map." },
  { name: "rows", type: "MatrixRow[]", required: true, description: "Array of { id, label } row definitions." },
  { name: "cols", type: "MatrixCol[]", required: true, description: "Array of { id, label } column definitions." },
  { name: "type", type: '"single" | "multi"', required: false, default: '"single"', description: "Radio or checkbox per cell." },
  { name: "requiredRows", type: "boolean", required: false, default: "false", description: "Marks unanswered rows with an asterisk." },
  { name: "disabled", type: "boolean", required: false, default: "false", description: "Disables all interactions." },
];

const rows = [
  { id: "r1", label: "Ease of use" },
  { id: "r2", label: "Performance" },
  { id: "r3", label: "Design quality" },
  { id: "r4", label: "Documentation" },
];

const cols = [
  { id: "1", label: "Poor" },
  { id: "2", label: "Fair" },
  { id: "3", label: "Good" },
  { id: "4", label: "Very good" },
  { id: "5", label: "Excellent" },
];

export default function MatrixQuestionPage() {
  const [single, setSingle] = useState<Record<string, string | number>>({});
  const [multi, setMulti] = useState<Record<string, string | number>>({});

  return (
    <main>
      <ComponentHeader name="MatrixQuestion" description="Rows × columns matrix for Likert multi-item grids with single or multi selection per row." section="Quiz" />

      <SectionTitle>Single selection per row</SectionTitle>
      <Preview>
        <MatrixQuestion value={single} onChange={setSingle} rows={rows} cols={cols} requiredRows />
      </Preview>

      <SectionTitle>Multi selection per row</SectionTitle>
      <Preview>
        <MatrixQuestion value={multi} onChange={setMulti} rows={rows.slice(0, 2)} cols={cols} type="multi" />
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { MatrixQuestion } from "@brickslab./ui-web";

const [value, setValue] = useState<Record<string, string | number>>({});

<MatrixQuestion
  value={value}
  onChange={setValue}
  rows={[
    { id: "r1", label: "Ease of use" },
    { id: "r2", label: "Performance" },
  ]}
  cols={[
    { id: "1", label: "Poor" },
    { id: "5", label: "Excellent" },
  ]}
  type="single"
  requiredRows
/>`} />
    </main>
  );
}
