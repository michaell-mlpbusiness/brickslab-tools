"use client";

import React, { useState } from "react";
import { QuizBuilder, type QuizSchema } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "value", type: "QuizSchema", required: true, description: "Full quiz schema (controlled)." },
  { name: "onChange", type: "(v: QuizSchema) => void", required: true, description: "Called with updated schema on every edit." },
  { name: "mode", type: '"builder" | "preview" | "split"', required: false, default: '"builder"', description: "Initial view mode." },
  { name: "readOnly", type: "boolean", required: false, default: "false", description: "Disables all editing controls." },
  { name: "autosave", type: "boolean", required: false, default: "false", description: "Triggers onAutosave 1.5 s after each change." },
  { name: "onAutosave", type: "(v: QuizSchema) => Promise<void>", required: false, description: "Async callback for autosave or manual save." },
  { name: "validate", type: "(v: QuizSchema) => ValidationResult", required: false, description: "Validation function; result shown in status bar." },
  { name: "locale", type: "string", required: false, description: "Locale hint for labels (reserved for i18n)." },
];

const initialQuiz: QuizSchema = {
  id: "demo",
  title: "Customer satisfaction survey",
  sections: [
    {
      id: "s1",
      title: "About you",
      questions: [
        { id: "q1", type: "single", label: "What is your role?", options: [{ id: "dev", label: "Developer" }, { id: "pm", label: "Product Manager" }, { id: "design", label: "Designer" }] },
        { id: "q2", type: "text", label: "Company name", multiline: false },
      ],
    },
    {
      id: "s2",
      title: "Your experience",
      questions: [
        { id: "q3", type: "scale", label: "Overall satisfaction", min: 1, max: 5, minLabel: "Very poor", maxLabel: "Excellent" },
        { id: "q4", type: "nps", label: "Would you recommend us?", minLabel: "Not at all likely", maxLabel: "Extremely likely" },
      ],
    },
  ],
};

export default function QuizBuilderPage() {
  const [quiz, setQuiz] = useState<QuizSchema>(initialQuiz);

  return (
    <main>
      <ComponentHeader
        name="QuizBuilder"
        description="Visual quiz editor with builder, preview, and split modes. Manages sections, questions, and optional autosave."
        section="Quiz"
      />

      <SectionTitle>Builder (full editor)</SectionTitle>
      <Preview>
        <div style={{ height: 520, width: "100%" }}>
          <QuizBuilder value={quiz} onChange={setQuiz} mode="builder" />
        </div>
      </Preview>

      <SectionTitle>Split mode</SectionTitle>
      <Preview>
        <div style={{ height: 400, width: "100%" }}>
          <QuizBuilder value={quiz} onChange={setQuiz} mode="split" />
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { QuizBuilder, type QuizSchema } from "@brickslab./ui-web";

const [quiz, setQuiz] = useState<QuizSchema>({
  id: "my-quiz",
  title: "My survey",
  sections: [],
});

<QuizBuilder
  value={quiz}
  onChange={setQuiz}
  mode="split"
  autosave
  onAutosave={async (v) => {
    await api.saveQuiz(v);
  }}
/>`} />
    </main>
  );
}
