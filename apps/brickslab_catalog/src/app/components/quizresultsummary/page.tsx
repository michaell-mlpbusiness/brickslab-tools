"use client";
import React from "react";
import { QuizResultSummary, type QuizResult } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "result", type: "QuizResult", required: true, description: "Result data: score, maxScore, percent, timeSpent, badges, recommendations." },
  { name: "variant", type: '"compact" | "detailed"', required: false, default: '"compact"', description: "Compact shows score + badges. Detailed also shows recommendations." },
  { name: "showAnswers", type: "boolean", required: false, default: "false", description: "Reserved — triggers answer review integration." },
  { name: "onRetake", type: "() => void", required: false, description: "Shows a Retake quiz button when provided." },
];

const result: QuizResult = {
  score: 78,
  maxScore: 100,
  percent: 78,
  timeSpent: 245,
  badges: [
    { id: "fast", label: "Speed demon", icon: "⚡" },
    { id: "perfect", label: "High scorer", icon: "🏆" },
  ],
  recommendations: [
    { label: "Review chapter 3", description: "You missed 3 questions on this topic.", href: "#" },
    { label: "Practice set B", description: "Strengthen your weak areas." },
  ],
  completedAt: new Date().toISOString(),
};

const lowResult: QuizResult = { score: 32, maxScore: 100, percent: 32, timeSpent: 420 };

export default function QuizResultSummaryPage() {
  return (
    <main>
      <ComponentHeader name="QuizResultSummary" description="Post-quiz result card with score ring, badges, and recommendations in compact or detailed mode." section="Quiz" />

      <SectionTitle>Compact</SectionTitle>
      <Preview>
        <div style={{ maxWidth: 480 }}>
          <QuizResultSummary result={result} onRetake={() => {}} />
        </div>
      </Preview>

      <SectionTitle>Detailed</SectionTitle>
      <Preview>
        <div style={{ maxWidth: 480 }}>
          <QuizResultSummary result={result} variant="detailed" onRetake={() => {}} />
        </div>
      </Preview>

      <SectionTitle>Low score</SectionTitle>
      <Preview>
        <div style={{ maxWidth: 480 }}>
          <QuizResultSummary result={lowResult} variant="detailed" onRetake={() => {}} />
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { QuizResultSummary } from "@brickslab./ui-web";

<QuizResultSummary
  result={{
    score: 78,
    maxScore: 100,
    timeSpent: 245,
    badges: [{ id: "b1", label: "High scorer", icon: "🏆" }],
    recommendations: [{ label: "Review chapter 3" }],
  }}
  variant="detailed"
  onRetake={() => resetQuiz()}
/>`} />
    </main>
  );
}
