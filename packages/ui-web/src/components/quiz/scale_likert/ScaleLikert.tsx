import React from "react";
import type { ScaleLikertProps } from "./ScaleLikert.type";

const styles = `
[data-bl-scale-likert] {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
[data-bl-sl-track] {
  display: flex;
  gap: 4px;
}
[data-bl-sl-step] {
  flex: 1;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-sm);
  font-size: var(--fontsize-sm);
  font-weight: var(--fontweight-medium);
  color: var(--color-fg);
  background: var(--c-surface);
  cursor: pointer;
  user-select: none;
  transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
  position: relative;
}
[data-bl-sl-step]:hover:not([data-disabled]) {
  border-color: var(--color-brand);
  background: var(--c-brand-subtle);
}
[data-bl-sl-step][data-selected] {
  border-color: var(--color-brand);
  background: var(--color-brand);
  color: #FBFBFB;
}
[data-bl-sl-step][data-disabled] {
  opacity: 0.45;
  cursor: not-allowed;
}
[data-bl-sl-ticks] {
  display: flex;
  gap: 4px;
}
[data-bl-sl-tick] {
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: var(--c-border);
  transition: background 0.15s ease;
}
[data-bl-sl-tick][data-active] {
  background: var(--color-brand);
}
[data-bl-sl-labels] {
  display: flex;
  justify-content: space-between;
  font-size: var(--fontsize-xs);
  color: var(--color-muted);
}
`;

export function ScaleLikert({
  value,
  onChange,
  min = 1,
  max = 5,
  step = 1,
  minLabel,
  maxLabel,
  showTicks = false,
  disabled = false,
}: ScaleLikertProps) {
  const steps: number[] = [];
  for (let i = min; i <= max; i += step) steps.push(i);

  return (
    <>
      <style>{styles}</style>
      <div data-bl-scale-likert>
        <div data-bl-sl-track role="radiogroup">
          {steps.map((s) => (
            <div
              key={s}
              data-bl-sl-step
              data-selected={value === s ? "" : undefined}
              data-disabled={disabled ? "" : undefined}
              role="radio"
              aria-checked={value === s}
              aria-label={String(s)}
              tabIndex={disabled ? -1 : 0}
              onClick={() => !disabled && onChange(s)}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && !disabled) {
                  e.preventDefault();
                  onChange(s);
                }
                if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                  e.preventDefault();
                  const next = Math.min(s + step, max);
                  !disabled && onChange(next);
                }
                if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                  e.preventDefault();
                  const prev = Math.max(s - step, min);
                  !disabled && onChange(prev);
                }
              }}
            >
              {s}
            </div>
          ))}
        </div>
        {showTicks && (
          <div data-bl-sl-ticks aria-hidden>
            {steps.map((s) => (
              <div
                key={s}
                data-bl-sl-tick
                data-active={value !== undefined && s <= value ? "" : undefined}
              />
            ))}
          </div>
        )}
        {(minLabel || maxLabel) && (
          <div data-bl-sl-labels>
            <span>{minLabel ?? ""}</span>
            <span>{maxLabel ?? ""}</span>
          </div>
        )}
      </div>
    </>
  );
}
