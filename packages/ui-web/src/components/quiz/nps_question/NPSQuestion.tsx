import React from "react";
import type { NPSQuestionProps } from "./NPSQuestion.type";

const styles = `
[data-bl-nps] {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
[data-bl-nps-track] {
  display: flex;
  gap: 3px;
}
[data-bl-nps-btn] {
  flex: 1;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-sm);
  font-size: var(--fontsize-sm);
  font-weight: var(--fontweight-medium);
  cursor: pointer;
  user-select: none;
  background: var(--c-surface);
  color: var(--color-fg);
  transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
}
[data-bl-nps-btn]:hover:not([data-disabled]) {
  border-color: var(--color-brand);
  background: var(--c-brand-subtle);
}
[data-bl-nps-btn][data-selected] {
  background: var(--color-brand);
  border-color: var(--color-brand);
  color: #FBFBFB;
}
[data-bl-nps-btn][data-bucket="detractor"]:hover:not([data-disabled]),
[data-bl-nps-btn][data-bucket="detractor"][data-selected] {
  border-color: #CC4A48;
  background: color-mix(in srgb, #CC4A48 15%, transparent);
  color: #CC4A48;
}
[data-bl-nps-btn][data-bucket="detractor"][data-selected] {
  background: #CC4A48;
  color: #FBFBFB;
}
[data-bl-nps-btn][data-bucket="passive"]:hover:not([data-disabled]),
[data-bl-nps-btn][data-bucket="passive"][data-selected] {
  border-color: #F59E0B;
  background: color-mix(in srgb, #F59E0B 15%, transparent);
  color: #F59E0B;
}
[data-bl-nps-btn][data-bucket="passive"][data-selected] {
  background: #F59E0B;
  color: #FBFBFB;
}
[data-bl-nps-btn][data-bucket="promoter"]:hover:not([data-disabled]),
[data-bl-nps-btn][data-bucket="promoter"][data-selected] {
  border-color: #4ADE80;
  background: color-mix(in srgb, #4ADE80 12%, transparent);
  color: #4ADE80;
}
[data-bl-nps-btn][data-bucket="promoter"][data-selected] {
  background: #4ADE80;
  color: #FBFBFB;
}
[data-bl-nps-btn][data-disabled] {
  opacity: 0.45;
  cursor: not-allowed;
}
[data-bl-nps-labels] {
  display: flex;
  justify-content: space-between;
  font-size: var(--fontsize-xs);
  color: var(--color-muted);
}
[data-bl-nps-buckets] {
  display: flex;
  gap: 3px;
}
[data-bl-nps-bucket] {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 0;
  font-size: 10px;
  font-weight: 600;
  border-radius: 3px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
[data-bl-nps-bucket][data-type="detractor"] {
  background: color-mix(in srgb, #CC4A48 12%, transparent);
  color: #CC4A48;
}
[data-bl-nps-bucket][data-type="passive"] {
  background: color-mix(in srgb, #F59E0B 12%, transparent);
  color: #F59E0B;
}
[data-bl-nps-bucket][data-type="promoter"] {
  background: color-mix(in srgb, #4ADE80 12%, transparent);
  color: #4ADE80;
}
`;

function getBucket(n: number): "detractor" | "passive" | "promoter" {
  if (n <= 6) return "detractor";
  if (n <= 8) return "passive";
  return "promoter";
}

export function NPSQuestion({
  value,
  onChange,
  labels,
  showBuckets = false,
  disabled = false,
}: NPSQuestionProps) {
  const scores = Array.from({ length: 11 }, (_, i) => i);

  return (
    <>
      <style>{styles}</style>
      <div data-bl-nps>
        {showBuckets && (
          <div data-bl-nps-buckets aria-hidden>
            <div data-bl-nps-bucket data-type="detractor" style={{ flex: "7 1 0" }}>Detractors</div>
            <div data-bl-nps-bucket data-type="passive" style={{ flex: "2 1 0" }}>Passives</div>
            <div data-bl-nps-bucket data-type="promoter" style={{ flex: "2 1 0" }}>Promoters</div>
          </div>
        )}
        <div data-bl-nps-track role="radiogroup" aria-label="Net Promoter Score">
          {scores.map((n) => (
            <div
              key={n}
              data-bl-nps-btn
              data-selected={value === n ? "" : undefined}
              data-bucket={getBucket(n)}
              data-disabled={disabled ? "" : undefined}
              role="radio"
              aria-checked={value === n}
              aria-label={String(n)}
              tabIndex={disabled ? -1 : 0}
              onClick={() => !disabled && onChange(n)}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && !disabled) {
                  e.preventDefault();
                  onChange(n);
                }
              }}
            >
              {n}
            </div>
          ))}
        </div>
        <div data-bl-nps-labels>
          <span>{labels?.left ?? "Not at all likely"}</span>
          <span>{labels?.right ?? "Extremely likely"}</span>
        </div>
      </div>
    </>
  );
}
