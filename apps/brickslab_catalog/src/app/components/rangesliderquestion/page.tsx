"use client";
import React, { useState } from "react";
import { RangeSliderQuestion } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "value", type: "number | [number, number]", required: false, description: "Current value — single number or [min, max] tuple for range mode." },
  { name: "onChange", type: "(v: number | [number, number]) => void", required: true, description: "Called with updated value." },
  { name: "min", type: "number", required: false, default: "0", description: "Minimum value." },
  { name: "max", type: "number", required: false, default: "100", description: "Maximum value." },
  { name: "step", type: "number", required: false, default: "1", description: "Increment step." },
  { name: "unit", type: "string", required: false, description: "Unit suffix displayed next to the value (e.g. «km», «%»)." },
  { name: "range", type: "boolean", required: false, default: "false", description: "Enables dual-handle range mode." },
  { name: "showValue", type: "boolean", required: false, default: "true", description: "Shows the current value next to the slider." },
  { name: "disabled", type: "boolean", required: false, default: "false", description: "Disables all interactions." },
];

export default function RangeSliderQuestionPage() {
  const [single, setSingle] = useState<number>(40);
  const [withUnit, setWithUnit] = useState<number>(25);
  const [range, setRange] = useState<[number, number]>([20, 70]);

  return (
    <main>
      <ComponentHeader name="RangeSliderQuestion" description="Single or dual-handle range slider with value display and unit label." section="Quiz" />

      <SectionTitle>Single slider</SectionTitle>
      <Preview>
        <div style={{ maxWidth: 480 }}>
          <RangeSliderQuestion value={single} onChange={(v) => setSingle(v as number)} min={0} max={100} />
        </div>
      </Preview>

      <SectionTitle>With unit</SectionTitle>
      <Preview>
        <div style={{ maxWidth: 480 }}>
          <RangeSliderQuestion value={withUnit} onChange={(v) => setWithUnit(v as number)} min={0} max={100} unit="%" />
        </div>
      </Preview>

      <SectionTitle>Range mode</SectionTitle>
      <Preview>
        <div style={{ maxWidth: 480 }}>
          <RangeSliderQuestion value={range} onChange={(v) => setRange(v as [number, number])} min={0} max={100} range unit="km" />
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { RangeSliderQuestion } from "@brickslab./ui-web";

const [value, setValue] = useState(50);

<RangeSliderQuestion
  value={value}
  onChange={(v) => setValue(v as number)}
  min={0}
  max={100}
  unit="%"
  showValue
/>`} />
    </main>
  );
}
