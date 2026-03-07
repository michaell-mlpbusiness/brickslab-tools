import React from "react";
import type { QuizSectionProps } from "./QuizSection.type";

const quizSectionStyles = `
[data-bl-quiz-section] {
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  background: var(--c-surface);
  overflow: hidden;
}
[data-bl-quiz-section-header] {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 20px 24px;
}
[data-bl-quiz-section-header][data-clickable] {
  cursor: pointer;
  user-select: none;
  list-style: none;
}
[data-bl-quiz-section-header][data-clickable]::-webkit-details-marker {
  display: none;
}
[data-bl-quiz-section-header][data-clickable]:hover {
  background: var(--c-surface-elevated);
}
[data-bl-quiz-section-meta] {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}
[data-bl-quiz-section-title] {
  font-size: var(--fontsize-md);
  font-weight: var(--fontweight-semibold);
  color: var(--color-fg);
  display: flex;
  align-items: center;
  gap: 6px;
}
[data-bl-quiz-section-required] {
  color: #CC4A48;
  font-size: var(--fontsize-sm);
}
[data-bl-quiz-section-description] {
  font-size: var(--fontsize-sm);
  color: var(--color-muted);
  line-height: 1.5;
}
[data-bl-quiz-section-chevron] {
  flex-shrink: 0;
  color: var(--color-muted);
  transition: transform 0.2s ease;
}
details[data-bl-quiz-section-details][open] [data-bl-quiz-section-chevron] {
  transform: rotate(180deg);
}
[data-bl-quiz-section-body] {
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
[data-bl-quiz-section-helper] {
  font-size: var(--fontsize-xs);
  color: var(--color-muted);
  padding: 0 24px 16px;
  border-top: 1px solid var(--c-border);
  padding-top: 12px;
}
`;

export function QuizSection({
  id,
  title,
  description,
  collapsible = false,
  defaultCollapsed = false,
  required = false,
  helperText,
  children,
}: QuizSectionProps) {
  const header = (
    <div data-bl-quiz-section-meta>
      <span data-bl-quiz-section-title>
        {title}
        {required && <span data-bl-quiz-section-required aria-hidden>*</span>}
      </span>
      {description && (
        <span data-bl-quiz-section-description>{description}</span>
      )}
    </div>
  );

  const chevron = (
    <svg
      data-bl-quiz-section-chevron
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (collapsible) {
    return (
      <>
        <style>{quizSectionStyles}</style>
        <details
          id={id}
          data-bl-quiz-section
          data-bl-quiz-section-details
          open={!defaultCollapsed}
        >
          <summary data-bl-quiz-section-header data-clickable>
            {header}
            {chevron}
          </summary>
          <div data-bl-quiz-section-body>{children}</div>
          {helperText && (
            <div data-bl-quiz-section-helper>{helperText}</div>
          )}
        </details>
      </>
    );
  }

  return (
    <>
      <style>{quizSectionStyles}</style>
      <div id={id} data-bl-quiz-section>
        <div data-bl-quiz-section-header>
          {header}
        </div>
        <div data-bl-quiz-section-body>{children}</div>
        {helperText && (
          <div data-bl-quiz-section-helper>{helperText}</div>
        )}
      </div>
    </>
  );
}
