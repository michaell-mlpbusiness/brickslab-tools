import React from "react";
import type { QuizNavigationProps } from "./QuizNavigation.type";

const styles = `
[data-bl-quiz-nav] {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
[data-bl-qn-btn] {
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
  transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
  white-space: nowrap;
}
[data-bl-qn-btn]:hover:not(:disabled) {
  border-color: var(--color-brand);
  background: var(--c-brand-subtle);
  color: var(--color-brand);
}
[data-bl-qn-btn]:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
[data-bl-qn-btn][data-primary] {
  border-color: var(--color-brand);
  background: var(--color-brand);
  color: #FBFBFB;
}
[data-bl-qn-btn][data-primary]:hover:not(:disabled) {
  opacity: 0.85;
  color: #FBFBFB;
  background: var(--color-brand);
}
[data-bl-qn-spacer] {
  flex: 1;
}
[data-bl-qn-summary-wrap] {
  position: relative;
}
[data-bl-qn-summary-panel] {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--c-surface);
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-md);
  padding: 8px;
  min-width: 200px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
[data-bl-qn-summary-item] {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border-radius: var(--radius-sm);
  font-size: var(--fontsize-sm);
  color: var(--color-fg);
  cursor: pointer;
  transition: background 0.12s ease;
  background: transparent;
  border: none;
  font-family: inherit;
  text-align: left;
  width: 100%;
}
[data-bl-qn-summary-item]:hover {
  background: var(--c-surface-elevated);
}
[data-bl-qn-dot] {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  background: var(--c-border);
}
[data-bl-qn-dot][data-done] {
  background: #4ADE80;
}
`;

export function QuizNavigation({
  canNext = true,
  canPrev = true,
  onNext,
  onPrev,
  onJump,
  showSummary = false,
  summaryItems = [],
}: QuizNavigationProps) {
  const [summaryOpen, setSummaryOpen] = React.useState(false);

  return (
    <>
      <style>{styles}</style>
      <nav data-bl-quiz-nav aria-label="Quiz navigation">
        <button
          data-bl-qn-btn
          disabled={!canPrev}
          onClick={onPrev}
          aria-label="Previous question"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Previous
        </button>

        {showSummary && summaryItems.length > 0 && (
          <div data-bl-qn-summary-wrap>
            <button
              data-bl-qn-btn
              aria-expanded={summaryOpen}
              aria-haspopup="menu"
              onClick={() => setSummaryOpen((o) => !o)}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="2.5" width="12" height="1.5" rx="0.75" fill="currentColor" />
                <rect x="1" y="6.25" width="12" height="1.5" rx="0.75" fill="currentColor" />
                <rect x="1" y="10" width="12" height="1.5" rx="0.75" fill="currentColor" />
              </svg>
              Summary
            </button>
            {summaryOpen && (
              <div data-bl-qn-summary-panel role="menu">
                {summaryItems.map((item) => (
                  <button
                    key={item.id}
                    data-bl-qn-summary-item
                    role="menuitem"
                    onClick={() => {
                      onJump?.(item.id);
                      setSummaryOpen(false);
                    }}
                  >
                    <div data-bl-qn-dot data-done={item.completed ? "" : undefined} />
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div data-bl-qn-spacer />

        <button
          data-bl-qn-btn
          data-primary=""
          disabled={!canNext}
          onClick={onNext}
          aria-label="Next question"
        >
          Next
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </nav>
    </>
  );
}
