import React from "react";
import type { QuizSubmitBarProps, QuizSubmitBarState } from "./QuizSubmitBar.type";

const styles = `
[data-bl-quiz-submit-bar] {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: var(--c-surface);
  border-top: 1.5px solid var(--c-border);
  flex-wrap: wrap;
}
[data-bl-qsb-btn] {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-sm);
  background: var(--c-surface);
  color: var(--color-fg);
  font-size: var(--fontsize-sm);
  font-weight: var(--fontweight-medium);
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease, opacity 0.15s ease;
  white-space: nowrap;
}
[data-bl-qsb-btn]:hover:not(:disabled) {
  border-color: var(--color-brand);
  background: var(--c-brand-subtle);
}
[data-bl-qsb-btn]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
[data-bl-qsb-btn][data-variant="primary"] {
  border-color: var(--color-brand);
  background: var(--color-brand);
  color: #FBFBFB;
}
[data-bl-qsb-btn][data-variant="primary"]:hover:not(:disabled) {
  opacity: 0.88;
}
[data-bl-qsb-btn][data-variant="danger"] {
  border-color: transparent;
  background: transparent;
  color: var(--color-muted);
}
[data-bl-qsb-btn][data-variant="danger"]:hover:not(:disabled) {
  color: #CC4A48;
  background: color-mix(in srgb, #CC4A48 8%, transparent);
  border-color: #CC4A48;
}
[data-bl-qsb-status] {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--fontsize-xs);
  margin-left: 4px;
}
[data-bl-qsb-status][data-state="success"] { color: #4ADE80; }
[data-bl-qsb-status][data-state="error"] { color: #CC4A48; }
[data-bl-qsb-status][data-state="saving"],
[data-bl-qsb-status][data-state="submitting"] { color: var(--color-muted); }
[data-bl-qsb-spacer] { flex: 1; }
[data-bl-qsb-spinner] {
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: bl-qsb-spin 0.7s linear infinite;
  flex-shrink: 0;
}
@keyframes bl-qsb-spin { to { transform: rotate(360deg); } }
`;

const STATE_LABEL: Record<QuizSubmitBarState, string> = {
  idle: "",
  saving: "Saving…",
  submitting: "Submitting…",
  success: "Saved",
  error: "",
};

export function QuizSubmitBar({
  onSaveDraft,
  onSubmit,
  onReset,
  state = "idle",
  error,
}: QuizSubmitBarProps) {
  const busy = state === "saving" || state === "submitting";

  return (
    <>
      <style>{styles}</style>
      <div data-bl-quiz-submit-bar role="toolbar" aria-label="Quiz submission">
        {onReset && (
          <button
            data-bl-qsb-btn
            data-variant="danger"
            disabled={busy}
            onClick={onReset}
          >
            Reset
          </button>
        )}

        {(STATE_LABEL[state] || error) && (
          <div data-bl-qsb-status data-state={state}>
            {busy && <div data-bl-qsb-spinner />}
            {state === "success" && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7l3.5 3.5 5.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {error && state === "error" ? error : STATE_LABEL[state]}
          </div>
        )}

        <div data-bl-qsb-spacer />

        {onSaveDraft && (
          <button
            data-bl-qsb-btn
            disabled={busy}
            onClick={onSaveDraft}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 2h7l2 2v7a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.2" />
              <path d="M4 12V8h5v4M4 2v3h4V2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Save draft
          </button>
        )}

        <button
          data-bl-qsb-btn
          data-variant="primary"
          disabled={busy}
          onClick={onSubmit}
        >
          {state === "submitting" ? (
            <div data-bl-qsb-spinner />
          ) : (
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5h9M7.5 3l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          Submit
        </button>
      </div>
    </>
  );
}
