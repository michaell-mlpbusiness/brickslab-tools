import React from "react";
import type { QuestionCardProps, QuestionStatus } from "./QuestionCard.type";

const questionCardStyles = `
[data-bl-question-card] {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-md);
  background: var(--c-surface);
  transition: border-color 0.15s ease;
}
[data-bl-question-card][data-status="success"] {
  border-color: #4ADE80;
}
[data-bl-question-card][data-status="warning"] {
  border-color: #F59E0B;
}
[data-bl-question-card][data-status="error"] {
  border-color: #CC4A48;
}
[data-bl-question-card-header] {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
[data-bl-question-card-top] {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}
[data-bl-question-card-label] {
  font-size: var(--fontsize-sm);
  font-weight: var(--fontweight-semibold);
  color: var(--color-fg);
  line-height: 1.4;
  flex: 1;
}
[data-bl-question-card-required] {
  color: #CC4A48;
  margin-left: 3px;
}
[data-bl-question-card-meta] {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
[data-bl-question-card-points] {
  font-size: var(--fontsize-xs);
  color: var(--color-muted);
  background: var(--c-surface-elevated);
  border: 1px solid var(--c-border);
  border-radius: 4px;
  padding: 2px 7px;
  white-space: nowrap;
}
[data-bl-question-card-description] {
  font-size: var(--fontsize-sm);
  color: var(--color-muted);
  line-height: 1.5;
}
[data-bl-question-card-content] {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
[data-bl-question-card-hint] {
  font-size: var(--fontsize-xs);
  color: var(--color-muted);
  display: flex;
  align-items: center;
  gap: 5px;
}
[data-bl-question-card-error] {
  font-size: var(--fontsize-xs);
  color: #CC4A48;
  display: flex;
  align-items: center;
  gap: 5px;
}
[data-bl-question-card-actions] {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 4px;
  border-top: 1px solid var(--c-border);
}
`;

const statusMap: Record<QuestionStatus, string | undefined> = {
  default: undefined,
  success: "success",
  warning: "warning",
  error: "error",
};

export function QuestionCard({
  id,
  label,
  description,
  required = false,
  points,
  status = "default",
  error,
  hint,
  actions,
  children,
}: QuestionCardProps) {
  return (
    <>
      <style>{questionCardStyles}</style>
      <div
        id={id}
        data-bl-question-card
        data-status={statusMap[status]}
        role="group"
        aria-labelledby={`${id}-label`}
      >
        <div data-bl-question-card-header>
          <div data-bl-question-card-top>
            <span id={`${id}-label`} data-bl-question-card-label>
              {label}
              {required && (
                <span
                  data-bl-question-card-required
                  aria-label="required"
                >
                  *
                </span>
              )}
            </span>
            <div data-bl-question-card-meta>
              {points !== undefined && (
                <span data-bl-question-card-points>{points} pt{points !== 1 ? "s" : ""}</span>
              )}
              {actions && (
                <div data-bl-question-card-actions>{actions}</div>
              )}
            </div>
          </div>
          {description && (
            <span data-bl-question-card-description>{description}</span>
          )}
        </div>

        <div data-bl-question-card-content>{children}</div>

        {hint && !error && (
          <span data-bl-question-card-hint>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M6 5.5v3M6 4h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            {hint}
          </span>
        )}
        {error && (
          <span data-bl-question-card-error role="alert">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M6 4v2.5M6 8h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            {error}
          </span>
        )}
      </div>
    </>
  );
}
