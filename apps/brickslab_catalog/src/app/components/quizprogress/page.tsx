"use client";
import React from "react";
import { QuizProgress } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "current", type: "number", required: true, description: "Number of completed questions/sections." },
  { name: "total", type: "number", required: true, description: "Total number of questions/sections." },
  { name: "mode", type: '"steps" | "bar" | "ring"', required: false, default: '"bar"', description: "Visual style of the indicator." },
  { name: "showLabel", type: "boolean", required: false, default: "true", description: "Shows current/total label next to the indicator." },
];

export default function QuizProgressPage() {
  return (
    <main>
      <ComponentHeader name="QuizProgress" description="Quiz progress indicator with bar, steps, and ring modes and optional label." section="Quiz" />

      <SectionTitle>Bar</SectionTitle>
      <Preview>
        <div style={{ width: "100%", maxWidth: 400 }}>
          <QuizProgress current={6} total={10} mode="bar" />
        </div>
      </Preview>

      <SectionTitle>Steps</SectionTitle>
      <Preview>
        <QuizProgress current={3} total={7} mode="steps" />
      </Preview>

      <SectionTitle>Ring</SectionTitle>
      <Preview>
        <QuizProgress current={7} total={10} mode="ring" />
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { QuizProgress } from "@brickslab./ui-web";

<QuizProgress current={3} total={10} mode="bar" showLabel />`} />
    </main>
  );
}
