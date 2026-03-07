"use client";

import React, { useState } from "react";
import { QuizSection } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "id", type: "string", required: true, description: "Unique identifier for the section element." },
  { name: "title", type: "string", required: true, description: "Section title." },
  { name: "description", type: "string", required: false, description: "Optional subtitle below the title." },
  { name: "collapsible", type: "boolean", required: false, default: "false", description: "Enables native collapse/expand via <details>." },
  { name: "defaultCollapsed", type: "boolean", required: false, default: "false", description: "Initial collapsed state when collapsible is true." },
  { name: "required", type: "boolean", required: false, default: "false", description: "Displays a required asterisk next to the title." },
  { name: "helperText", type: "string", required: false, description: "Small helper note shown at the bottom of the section." },
  { name: "children", type: "ReactNode", required: true, description: "Question content." },
];

export default function QuizSectionPage() {
  return (
    <main>
      <ComponentHeader
        name="QuizSection"
        description="Collapsible section container for quiz questions with title, description, required marker, and helper text."
        section="Quiz"
      />

      <SectionTitle>Default</SectionTitle>
      <Preview>
        <div style={{ maxWidth: 560 }}>
          <QuizSection id="s1" title="Personal information" description="Tell us a bit about yourself." required>
            <div style={{ color: "var(--color-muted)", fontSize: "var(--fontsize-sm)" }}>— questions here —</div>
          </QuizSection>
        </div>
      </Preview>

      <SectionTitle>Collapsible</SectionTitle>
      <Preview>
        <div style={{ maxWidth: 560, display: "flex", flexDirection: "column", gap: 12 }}>
          <QuizSection id="s2" title="Collapsible open" collapsible>
            <div style={{ color: "var(--color-muted)", fontSize: "var(--fontsize-sm)" }}>— questions here —</div>
          </QuizSection>
          <QuizSection id="s3" title="Collapsible collapsed" collapsible defaultCollapsed helperText="Complete all questions before submitting.">
            <div style={{ color: "var(--color-muted)", fontSize: "var(--fontsize-sm)" }}>— questions here —</div>
          </QuizSection>
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { QuizSection } from "@brickslab./ui-web";

<QuizSection
  id="section-1"
  title="Personal information"
  description="Tell us a bit about yourself."
  required
  collapsible
  helperText="All fields are required."
>
  {/* QuestionCard components */}
</QuizSection>`} />
    </main>
  );
}
