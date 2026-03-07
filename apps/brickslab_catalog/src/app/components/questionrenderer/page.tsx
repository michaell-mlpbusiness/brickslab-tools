"use client";

import React, { useState } from "react";
import { QuestionRenderer, type Answer, type Question } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "question", type: "Question", required: true, description: "Question schema object including type, options, and config." },
  { name: "value", type: "Answer", required: true, description: "Current answer value (controlled)." },
  { name: "onChange", type: "(answer: Answer) => void", required: true, description: "Called with the new answer on user interaction." },
  { name: "disabled", type: "boolean", required: false, default: "false", description: "Disables all interaction." },
  { name: "showValidation", type: "boolean", required: false, default: "false", description: "Triggers validation state display." },
  { name: "layout", type: '"stack" | "inline" | "grid"', required: false, default: '"stack"', description: "Controls option arrangement for choice questions." },
];

const singleQ: Question = {
  id: "q-single", type: "single", label: "Single choice",
  options: [
    { id: "a", label: "Option A" },
    { id: "b", label: "Option B" },
    { id: "c", label: "Option C" },
  ],
};

const multiQ: Question = {
  id: "q-multi", type: "multi", label: "Multi choice",
  options: [
    { id: "x", label: "Feature X" },
    { id: "y", label: "Feature Y" },
    { id: "z", label: "Feature Z" },
  ],
};

const scaleQ: Question = { id: "q-scale", type: "scale", label: "Scale", min: 1, max: 7, minLabel: "Strongly disagree", maxLabel: "Strongly agree" };
const npsQ: Question = { id: "q-nps", type: "nps", label: "NPS", minLabel: "Not at all", maxLabel: "Extremely likely" };
const textQ: Question = { id: "q-text", type: "text", label: "Free text", multiline: true };

export default function QuestionRendererPage() {
  const [singleVal, setSingleVal] = useState<Answer>(null);
  const [multiVal, setMultiVal] = useState<Answer>([]);
  const [scaleVal, setScaleVal] = useState<Answer>(null);
  const [npsVal, setNpsVal] = useState<Answer>(null);
  const [textVal, setTextVal] = useState<Answer>("");

  return (
    <main>
      <ComponentHeader
        name="QuestionRenderer"
        description="Dynamic renderer that dispatches to the correct input UI based on question.type. Supports single, multi, scale, NPS, rating, and text types natively; remaining types (matrix, rank, range, date, file) are fulfilled by Family 2 components."
        section="Quiz"
      />

      <SectionTitle>Single choice</SectionTitle>
      <Preview>
        <div style={{ maxWidth: 480 }}>
          <QuestionRenderer question={singleQ} value={singleVal} onChange={setSingleVal} />
        </div>
      </Preview>

      <SectionTitle>Multi choice (inline)</SectionTitle>
      <Preview>
        <div style={{ maxWidth: 480 }}>
          <QuestionRenderer question={multiQ} value={multiVal} onChange={setMultiVal} layout="inline" />
        </div>
      </Preview>

      <SectionTitle>Scale / Likert</SectionTitle>
      <Preview>
        <div style={{ maxWidth: 520 }}>
          <QuestionRenderer question={scaleQ} value={scaleVal} onChange={setScaleVal} />
        </div>
      </Preview>

      <SectionTitle>NPS (0–10)</SectionTitle>
      <Preview>
        <div style={{ maxWidth: 600 }}>
          <QuestionRenderer question={npsQ} value={npsVal} onChange={setNpsVal} />
        </div>
      </Preview>

      <SectionTitle>Free text</SectionTitle>
      <Preview>
        <div style={{ maxWidth: 480 }}>
          <QuestionRenderer question={textQ} value={textVal} onChange={setTextVal} />
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { QuestionRenderer, type Question, type Answer } from "@brickslab./ui-web";

const question: Question = {
  id: "q1",
  type: "single",
  label: "How did you hear about us?",
  options: [
    { id: "social", label: "Social media" },
    { id: "friend", label: "Friend referral" },
    { id: "search", label: "Search engine" },
  ],
};

const [answer, setAnswer] = useState<Answer>(null);

<QuestionRenderer
  question={question}
  value={answer}
  onChange={setAnswer}
  layout="stack"
/>`} />
    </main>
  );
}
