import React from "react";
import type { QuizProgressProps } from "./QuizProgress.type";

const styles = `
[data-bl-quiz-progress] {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
/* ── Bar ─────────────────────────────────────────────── */
[data-bl-qp-bar-track] {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: var(--c-border);
  overflow: hidden;
  min-width: 120px;
}
[data-bl-qp-bar-fill] {
  height: 100%;
  border-radius: 3px;
  background: var(--color-brand);
  transition: width 0.3s ease;
}
/* ── Steps ───────────────────────────────────────────── */
[data-bl-qp-steps] {
  display: flex;
  align-items: center;
  gap: 4px;
}
[data-bl-qp-step] {
  width: 28px;
  height: 6px;
  border-radius: 3px;
  background: var(--c-border);
  transition: background 0.2s ease;
}
[data-bl-qp-step][data-done] {
  background: var(--color-brand);
}
[data-bl-qp-step][data-current] {
  background: var(--color-brand);
  opacity: 0.55;
}
/* ── Ring ────────────────────────────────────────────── */
[data-bl-qp-ring] {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
[data-bl-qp-ring-label] {
  position: absolute;
  font-size: 11px;
  font-weight: 700;
  color: var(--color-fg);
  line-height: 1;
}
/* ── Label ───────────────────────────────────────────── */
[data-bl-qp-label] {
  font-size: var(--fontsize-xs);
  color: var(--color-muted);
  white-space: nowrap;
}
`;

const RING_SIZE = 48;
const STROKE = 4;
const R = (RING_SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * R;

export function QuizProgress({
  current,
  total,
  mode = "bar",
  showLabel = true,
}: QuizProgressProps) {
  const pct = total > 0 ? Math.min(current / total, 1) : 0;

  if (mode === "steps") {
    return (
      <>
        <style>{styles}</style>
        <div data-bl-quiz-progress>
          <div data-bl-qp-steps aria-label={`Step ${current} of ${total}`} role="progressbar" aria-valuenow={current} aria-valuemax={total}>
            {Array.from({ length: total }, (_, i) => (
              <div
                key={i}
                data-bl-qp-step
                data-done={i < current ? "" : undefined}
                data-current={i === current - 1 ? "" : undefined}
              />
            ))}
          </div>
          {showLabel && (
            <span data-bl-qp-label>{current}/{total}</span>
          )}
        </div>
      </>
    );
  }

  if (mode === "ring") {
    const offset = CIRC * (1 - pct);
    return (
      <>
        <style>{styles}</style>
        <div data-bl-quiz-progress>
          <div data-bl-qp-ring role="progressbar" aria-valuenow={Math.round(pct * 100)} aria-valuemax={100}>
            <svg width={RING_SIZE} height={RING_SIZE}>
              <circle
                cx={RING_SIZE / 2}
                cy={RING_SIZE / 2}
                r={R}
                fill="none"
                stroke="var(--c-border)"
                strokeWidth={STROKE}
              />
              <circle
                cx={RING_SIZE / 2}
                cy={RING_SIZE / 2}
                r={R}
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth={STROKE}
                strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={offset}
                transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
                style={{ transition: "stroke-dashoffset 0.3s ease" }}
              />
            </svg>
            <span data-bl-qp-ring-label>{Math.round(pct * 100)}%</span>
          </div>
          {showLabel && (
            <span data-bl-qp-label>{current}/{total}</span>
          )}
        </div>
      </>
    );
  }

  // bar (default)
  return (
    <>
      <style>{styles}</style>
      <div data-bl-quiz-progress style={{ width: "100%" }}>
        <div
          data-bl-qp-bar-track
          role="progressbar"
          aria-valuenow={Math.round(pct * 100)}
          aria-valuemax={100}
        >
          <div data-bl-qp-bar-fill style={{ width: `${pct * 100}%` }} />
        </div>
        {showLabel && (
          <span data-bl-qp-label>{current}/{total}</span>
        )}
      </div>
    </>
  );
}
