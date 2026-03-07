"use client";
import React, { useState } from "react";
import { QuizNavigation } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "canNext", type: "boolean", required: false, default: "true", description: "Enables the Next button." },
  { name: "canPrev", type: "boolean", required: false, default: "true", description: "Enables the Previous button." },
  { name: "onNext", type: "() => void", required: true, description: "Called when Next is clicked." },
  { name: "onPrev", type: "() => void", required: true, description: "Called when Previous is clicked." },
  { name: "onJump", type: "(id: string) => void", required: false, description: "Called with the selected question/section id from the summary panel." },
  { name: "showSummary", type: "boolean", required: false, default: "false", description: "Shows the Summary button that opens a jump-to panel." },
  { name: "summaryItems", type: "QuizNavSummaryItem[]", required: false, description: "Items shown in the summary panel: { id, label, completed? }." },
];

const summaryItems = [
  { id: "q1", label: "Your role", completed: true },
  { id: "q2", label: "Satisfaction score", completed: true },
  { id: "q3", label: "Open feedback", completed: false },
  { id: "q4", label: "Recommendation", completed: false },
];

export default function QuizNavigationPage() {
  const [step, setStep] = useState(2);

  return (
    <main>
      <ComponentHeader name="QuizNavigation" description="Previous/Next navigation bar with optional summary panel and jump-to support." section="Quiz" />

      <SectionTitle>Basic</SectionTitle>
      <Preview>
        <div style={{ width: "100%", maxWidth: 560 }}>
          <QuizNavigation canPrev={step > 1} canNext={step < 4} onPrev={() => setStep((s) => s - 1)} onNext={() => setStep((s) => s + 1)} />
        </div>
      </Preview>

      <SectionTitle>With summary panel</SectionTitle>
      <Preview>
        <div style={{ width: "100%", maxWidth: 560 }}>
          <QuizNavigation
            canPrev canNext
            onPrev={() => {}} onNext={() => {}}
            showSummary
            summaryItems={summaryItems}
            onJump={(id) => alert(`Jump to: ${id}`)}
          />
        </div>
      </Preview>

      <SectionTitle>Disabled states</SectionTitle>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 560 }}>
          <QuizNavigation canPrev={false} canNext onPrev={() => {}} onNext={() => {}} />
          <QuizNavigation canPrev canNext={false} onPrev={() => {}} onNext={() => {}} />
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { QuizNavigation } from "@brickslab./ui-web";

<QuizNavigation
  canPrev={currentStep > 0}
  canNext={isCurrentValid}
  onPrev={() => setStep((s) => s - 1)}
  onNext={() => setStep((s) => s + 1)}
  showSummary
  summaryItems={sections.map((s) => ({ id: s.id, label: s.title, completed: s.isDone }))}
  onJump={(id) => jumpToSection(id)}
/>`} />
    </main>
  );
}
