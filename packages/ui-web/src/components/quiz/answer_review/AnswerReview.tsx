import React from "react";
import type { AnswerReviewProps } from "./AnswerReview.type";
import type { Answer } from "../quiz.types";

const styles = `
[data-bl-answer-review] {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
[data-bl-ar-item] {
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-sm);
  overflow: hidden;
  transition: border-color 0.15s ease;
}
[data-bl-ar-item][data-correct] {
  border-color: #4ADE80;
}
[data-bl-ar-item][data-incorrect] {
  border-color: #CC4A48;
}
[data-bl-ar-header] {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 16px;
  background: var(--c-surface-elevated);
  border-bottom: 1px solid var(--c-border);
}
[data-bl-ar-label] {
  font-size: var(--fontsize-sm);
  font-weight: var(--fontweight-semibold);
  color: var(--color-fg);
  flex: 1;
}
[data-bl-ar-badge] {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: var(--fontsize-xs);
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 999px;
  flex-shrink: 0;
}
[data-bl-ar-badge][data-correct] {
  background: color-mix(in srgb, #4ADE80 15%, transparent);
  color: #4ADE80;
}
[data-bl-ar-badge][data-incorrect] {
  background: color-mix(in srgb, #CC4A48 12%, transparent);
  color: #CC4A48;
}
[data-bl-ar-body] {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
[data-bl-ar-row] {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
[data-bl-ar-row-label] {
  font-size: var(--fontsize-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-muted);
  opacity: 0.7;
}
[data-bl-ar-value] {
  font-size: var(--fontsize-sm);
  color: var(--color-fg);
  padding: 6px 10px;
  background: var(--c-surface-elevated);
  border-radius: var(--radius-sm);
  border: 1px solid var(--c-border);
}
[data-bl-ar-value][data-correct-val] {
  border-color: #4ADE80;
  color: #4ADE80;
  background: color-mix(in srgb, #4ADE80 8%, transparent);
}
[data-bl-ar-feedback] {
  font-size: var(--fontsize-xs);
  color: var(--color-muted);
  font-style: italic;
  padding: 4px 0;
}
[data-bl-ar-points] {
  font-size: var(--fontsize-xs);
  font-weight: 600;
  color: var(--color-brand);
}
[data-bl-ar-unanswered] {
  font-size: var(--fontsize-sm);
  color: var(--color-muted);
  font-style: italic;
}
`;

function displayAnswer(answer: Answer): string {
  if (answer === null || answer === undefined) return "—";
  if (Array.isArray(answer)) return answer.join(", ");
  if (typeof answer === "object") return JSON.stringify(answer);
  return String(answer);
}

export function AnswerReview({
  questions,
  answers,
  corrections,
  mode = "review",
}: AnswerReviewProps) {
  return (
    <>
      <style>{styles}</style>
      <div data-bl-answer-review>
        {questions.map((q) => {
          const answer = answers[q.id] ?? null;
          const correction = corrections?.[q.id];
          const hasCorrection = mode === "correction" && correction !== undefined;
          const isCorrect = correction?.correct;
          const unanswered = answer === null || answer === undefined || answer === "";

          return (
            <div
              key={q.id}
              data-bl-ar-item
              data-correct={hasCorrection && isCorrect ? "" : undefined}
              data-incorrect={hasCorrection && !isCorrect ? "" : undefined}
            >
              <div data-bl-ar-header>
                <span data-bl-ar-label>{q.label}</span>
                {hasCorrection && (
                  <span
                    data-bl-ar-badge
                    data-correct={isCorrect ? "" : undefined}
                    data-incorrect={!isCorrect ? "" : undefined}
                  >
                    {isCorrect ? (
                      <>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Correct
                      </>
                    ) : (
                      <>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        Incorrect
                      </>
                    )}
                  </span>
                )}
              </div>
              <div data-bl-ar-body>
                <div data-bl-ar-row>
                  <span data-bl-ar-row-label>Your answer</span>
                  {unanswered ? (
                    <span data-bl-ar-unanswered>Not answered</span>
                  ) : (
                    <div data-bl-ar-value>{displayAnswer(answer)}</div>
                  )}
                </div>

                {hasCorrection && !isCorrect && correction.correctAnswer !== undefined && (
                  <div data-bl-ar-row>
                    <span data-bl-ar-row-label>Correct answer</span>
                    <div data-bl-ar-value data-correct-val="">
                      {displayAnswer(correction.correctAnswer)}
                    </div>
                  </div>
                )}

                {hasCorrection && correction.feedback && (
                  <div data-bl-ar-feedback>{correction.feedback}</div>
                )}

                {hasCorrection && correction.points !== undefined && (
                  <div data-bl-ar-points>+{correction.points} pts</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
