"use client";
import React, { useState } from "react";
import { QuizSubmitBar, type QuizSubmitBarState } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "onSubmit", type: "() => Promise<void>", required: true, description: "Async callback for form submission." },
  { name: "onSaveDraft", type: "() => Promise<void>", required: false, description: "Shows a Save draft button when provided." },
  { name: "onReset", type: "() => void", required: false, description: "Shows a Reset button when provided." },
  { name: "state", type: '"idle" | "saving" | "submitting" | "success" | "error"', required: false, default: '"idle"', description: "Controls loading and feedback display." },
  { name: "error", type: "string", required: false, description: "Error message shown when state is «error»." },
];

function Demo({ withDraft, withReset }: { withDraft?: boolean; withReset?: boolean }) {
  const [state, setState] = useState<QuizSubmitBarState>("idle");
  const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

  return (
    <QuizSubmitBar
      state={state}
      onSubmit={async () => { setState("submitting"); await delay(1500); setState("success"); }}
      onSaveDraft={withDraft ? async () => { setState("saving"); await delay(1000); setState("idle"); } : undefined}
      onReset={withReset ? () => setState("idle") : undefined}
    />
  );
}

export default function QuizSubmitBarPage() {
  return (
    <main>
      <ComponentHeader name="QuizSubmitBar" description="Sticky submission bar with save-draft, submit, and reset actions and loading states." section="Quiz" />

      <SectionTitle>Submit only</SectionTitle>
      <Preview><Demo /></Preview>

      <SectionTitle>With Save draft and Reset</SectionTitle>
      <Preview><Demo withDraft withReset /></Preview>

      <SectionTitle>Error state</SectionTitle>
      <Preview>
        <QuizSubmitBar state="error" error="Submission failed. Please try again." onSubmit={async () => {}} />
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { QuizSubmitBar } from "@brickslab./ui-web";

const [state, setState] = useState("idle");

<QuizSubmitBar
  state={state}
  onSubmit={async () => {
    setState("submitting");
    await api.submit(answers);
    setState("success");
  }}
  onSaveDraft={async () => {
    setState("saving");
    await api.saveDraft(answers);
    setState("idle");
  }}
  onReset={() => resetForm()}
/>`} />
    </main>
  );
}
