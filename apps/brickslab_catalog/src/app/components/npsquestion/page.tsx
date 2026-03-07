"use client";
import React, { useState } from "react";
import { NPSQuestion } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "value", type: "number", required: false, description: "Selected score (0–10)." },
  { name: "onChange", type: "(v: number) => void", required: true, description: "Called with the selected score." },
  { name: "labels", type: "{ left?: string; right?: string }", required: false, description: "Custom extreme labels." },
  { name: "showBuckets", type: "boolean", required: false, default: "false", description: "Displays Detractors / Passives / Promoters zone labels above the scale." },
  { name: "disabled", type: "boolean", required: false, default: "false", description: "Disables all interactions." },
];

export default function NPSQuestionPage() {
  const [v1, setV1] = useState<number | undefined>();
  const [v2, setV2] = useState<number | undefined>();

  return (
    <main>
      <ComponentHeader name="NPSQuestion" description="Net Promoter Score 0–10 selector with detractor / passive / promoter color zones." section="Quiz" />

      <SectionTitle>Default</SectionTitle>
      <Preview>
        <NPSQuestion value={v1} onChange={setV1} />
      </Preview>

      <SectionTitle>With bucket labels</SectionTitle>
      <Preview>
        <NPSQuestion value={v2} onChange={setV2} showBuckets />
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { NPSQuestion } from "@brickslab./ui-web";

const [score, setScore] = useState<number | undefined>();

<NPSQuestion
  value={score}
  onChange={setScore}
  showBuckets
  labels={{ left: "Not at all likely", right: "Extremely likely" }}
/>`} />
    </main>
  );
}
