"use client";
import React from "react";
import { AnswerReview, type Question, type AnswerMap, type CorrectionMap } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "questions", type: "Question[]", required: true, description: "Array of question definitions." },
  { name: "answers", type: "AnswerMap", required: true, description: "Map of questionId → Answer." },
  { name: "corrections", type: "CorrectionMap", required: false, description: "Map of questionId → { correct, correctAnswer?, feedback?, points? }." },
  { name: "mode", type: '"review" | "correction"', required: false, default: '"review"', description: "Review shows answers only. Correction shows correct/incorrect feedback." },
];

const questions: Question[] = [
  { id: "q1", type: "single", label: "What is your primary role?", options: [{ id: "dev", label: "Developer" }, { id: "pm", label: "Product Manager" }] },
  { id: "q2", type: "scale", label: "Rate overall satisfaction (1–5)", min: 1, max: 5 },
  { id: "q3", type: "text", label: "What could we improve?", multiline: true },
  { id: "q4", type: "multi", label: "Which features do you use?", options: [{ id: "a", label: "A" }, { id: "b", label: "B" }] },
];

const answers: AnswerMap = { q1: "dev", q2: 4, q3: "Better documentation would help.", q4: ["a", "b"] };

const corrections: CorrectionMap = {
  q1: { correct: true, points: 10 },
  q2: { correct: false, correctAnswer: 5, feedback: "The expected answer was 5.", points: 0 },
  q3: { correct: true, points: 5 },
  q4: { correct: false, correctAnswer: ["a"], feedback: "Only feature A was expected." },
};

export default function AnswerReviewPage() {
  return (
    <main>
      <ComponentHeader name="AnswerReview" description="Question-by-question answer review with correct/incorrect feedback and correction display." section="Quiz" />

      <SectionTitle>Review mode</SectionTitle>
      <Preview>
        <div style={{ maxWidth: 560 }}>
          <AnswerReview questions={questions} answers={answers} mode="review" />
        </div>
      </Preview>

      <SectionTitle>Correction mode</SectionTitle>
      <Preview>
        <div style={{ maxWidth: 560 }}>
          <AnswerReview questions={questions} answers={answers} corrections={corrections} mode="correction" />
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { AnswerReview } from "@brickslab./ui-web";

<AnswerReview
  questions={quiz.questions}
  answers={userAnswers}
  corrections={serverCorrections}
  mode="correction"
/>`} />
    </main>
  );
}
