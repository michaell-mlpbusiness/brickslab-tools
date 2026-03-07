"use client";

import React from "react";
import { QuestionCard } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "id", type: "string", required: true, description: "Unique identifier; used for aria-labelledby." },
  { name: "label", type: "string", required: true, description: "The question label shown as a heading." },
  { name: "description", type: "string", required: false, description: "Optional sub-text below the label." },
  { name: "required", type: "boolean", required: false, default: "false", description: "Shows a required asterisk." },
  { name: "points", type: "number", required: false, description: "Points badge displayed in the top-right." },
  { name: "status", type: '"default" | "success" | "warning" | "error"', required: false, default: '"default"', description: "Border color variant indicating answer state." },
  { name: "error", type: "string", required: false, description: "Error message shown below the children (overrides hint)." },
  { name: "hint", type: "string", required: false, description: "Helper hint shown below the children." },
  { name: "actions", type: "ReactNode", required: false, description: "Extra controls shown in the top-right (e.g. delete button)." },
  { name: "children", type: "ReactNode", required: true, description: "The question input (QuestionRenderer, etc.)." },
];

export default function QuestionCardPage() {
  return (
    <main>
      <ComponentHeader
        name="QuestionCard"
        description="Standardized question wrapper with label, required indicator, points badge, status border, and error/hint messaging."
        section="Quiz"
      />

      <SectionTitle>Statuses</SectionTitle>
      <Preview>
        <div style={{ maxWidth: 560, display: "flex", flexDirection: "column", gap: 12 }}>
          <QuestionCard id="q1" label="What is your role?" required points={5}>
            <div style={{ color: "var(--color-muted)", fontSize: "var(--fontsize-sm)" }}>— input here —</div>
          </QuestionCard>
          <QuestionCard id="q2" label="Rate your experience" status="success" hint="Select a value from 1 to 5.">
            <div style={{ color: "var(--color-muted)", fontSize: "var(--fontsize-sm)" }}>— input here —</div>
          </QuestionCard>
          <QuestionCard id="q3" label="Describe an issue" status="error" error="This field is required.">
            <div style={{ color: "var(--color-muted)", fontSize: "var(--fontsize-sm)" }}>— input here —</div>
          </QuestionCard>
          <QuestionCard id="q4" label="Optional feedback" description="Share any additional thoughts." status="warning">
            <div style={{ color: "var(--color-muted)", fontSize: "var(--fontsize-sm)" }}>— input here —</div>
          </QuestionCard>
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { QuestionCard } from "@brickslab./ui-web";

<QuestionCard
  id="q-role"
  label="What is your role?"
  required
  points={5}
  hint="Choose the option that best describes you."
>
  {/* QuestionRenderer or custom input */}
</QuestionCard>`} />
    </main>
  );
}
