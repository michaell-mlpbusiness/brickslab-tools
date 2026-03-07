"use client";

import React, { useState } from "react";
import { ConditionalLogic, type LogicRule } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "rules", type: "LogicRule[]", required: true, description: "Array of logic rules (controlled)." },
  { name: "onChange", type: "(rules: LogicRule[]) => void", required: true, description: "Called with updated rules on every edit." },
  { name: "questionsIndex", type: "QuestionIndex[]", required: true, description: "Flat list of { id, label, type } used to populate condition and target selects." },
];

const questionsIndex = [
  { id: "q1", label: "What is your role?", type: "single" },
  { id: "q2", label: "Rate your experience", type: "scale" },
  { id: "q3", label: "Would you recommend us?", type: "nps" },
  { id: "q4", label: "Additional comments", type: "text" },
];

export default function ConditionalLogicPage() {
  const [rules, setRules] = useState<LogicRule[]>([]);

  return (
    <main>
      <ComponentHeader
        name="ConditionalLogic"
        description="Visual IF-condition THEN-action rule editor for quiz branching, scoring, and show/hide logic."
        section="Quiz"
      />

      <SectionTitle>Editor</SectionTitle>
      <Preview>
        <div style={{ maxWidth: 680 }}>
          <ConditionalLogic
            rules={rules}
            onChange={setRules}
            questionsIndex={questionsIndex}
          />
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { ConditionalLogic, type LogicRule } from "@brickslab./ui-web";

const [rules, setRules] = useState<LogicRule[]>([]);

<ConditionalLogic
  rules={rules}
  onChange={setRules}
  questionsIndex={[
    { id: "q1", label: "What is your role?", type: "single" },
    { id: "q2", label: "Rate your experience", type: "scale" },
  ]}
/>`} />
    </main>
  );
}
