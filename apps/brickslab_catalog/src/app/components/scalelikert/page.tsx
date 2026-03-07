"use client";
import React, { useState } from "react";
import { ScaleLikert } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "value", type: "number", required: false, description: "Currently selected step." },
  { name: "onChange", type: "(v: number) => void", required: true, description: "Called with the selected number." },
  { name: "min", type: "number", required: false, default: "1", description: "Scale start." },
  { name: "max", type: "number", required: false, default: "5", description: "Scale end." },
  { name: "step", type: "number", required: false, default: "1", description: "Increment between steps." },
  { name: "minLabel", type: "string", required: false, description: "Label displayed below the first step." },
  { name: "maxLabel", type: "string", required: false, description: "Label displayed below the last step." },
  { name: "showTicks", type: "boolean", required: false, default: "false", description: "Shows a progress tick bar below the steps." },
  { name: "disabled", type: "boolean", required: false, default: "false", description: "Disables all interactions." },
];

export default function ScaleLikertPage() {
  const [v5, setV5] = useState<number | undefined>();
  const [v7, setV7] = useState<number | undefined>();
  const [v10, setV10] = useState<number | undefined>();

  return (
    <main>
      <ComponentHeader name="ScaleLikert" description="Likert scale from 1–5 to 1–10 with optional tick bar and extreme labels." section="Quiz" />

      <SectionTitle>1–5 with labels and ticks</SectionTitle>
      <Preview>
        <ScaleLikert value={v5} onChange={setV5} min={1} max={5} minLabel="Strongly disagree" maxLabel="Strongly agree" showTicks />
      </Preview>

      <SectionTitle>1–7</SectionTitle>
      <Preview>
        <ScaleLikert value={v7} onChange={setV7} min={1} max={7} minLabel="Very poor" maxLabel="Excellent" />
      </Preview>

      <SectionTitle>1–10</SectionTitle>
      <Preview>
        <ScaleLikert value={v10} onChange={setV10} min={1} max={10} />
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { ScaleLikert } from "@brickslab./ui-web";

const [value, setValue] = useState<number | undefined>();

<ScaleLikert
  value={value}
  onChange={setValue}
  min={1}
  max={5}
  minLabel="Strongly disagree"
  maxLabel="Strongly agree"
  showTicks
/>`} />
    </main>
  );
}
