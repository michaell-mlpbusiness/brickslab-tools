import React from "react";
import type { RangeSliderQuestionProps } from "./RangeSliderQuestion.type";

const styles = `
[data-bl-range-slider] {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
[data-bl-rs-row] {
  display: flex;
  align-items: center;
  gap: 12px;
}
[data-bl-rs-input] {
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  border-radius: 2px;
  background: var(--c-border);
  outline: none;
  cursor: pointer;
}
[data-bl-rs-input]:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
[data-bl-rs-input]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--color-brand);
  cursor: pointer;
  border: 2px solid #FBFBFB;
  box-shadow: 0 1px 4px rgba(0,0,0,0.18);
  transition: transform 0.1s ease;
}
[data-bl-rs-input]:not(:disabled)::-webkit-slider-thumb:hover {
  transform: scale(1.15);
}
[data-bl-rs-input]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--color-brand);
  cursor: pointer;
  border: 2px solid #FBFBFB;
  box-shadow: 0 1px 4px rgba(0,0,0,0.18);
}
[data-bl-rs-value] {
  font-size: var(--fontsize-sm);
  font-weight: var(--fontweight-semibold);
  color: var(--color-fg);
  white-space: nowrap;
  min-width: 40px;
  text-align: right;
}
[data-bl-rs-bounds] {
  display: flex;
  justify-content: space-between;
  font-size: var(--fontsize-xs);
  color: var(--color-muted);
}
`;

export function RangeSliderQuestion({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit,
  range = false,
  showValue = true,
  disabled = false,
}: RangeSliderQuestionProps) {
  const formatVal = (v: number) => (unit ? `${v} ${unit}` : String(v));

  if (range) {
    const [lo, hi] = Array.isArray(value) ? (value as [number, number]) : [min, max];
    return (
      <>
        <style>{styles}</style>
        <div data-bl-range-slider>
          <div data-bl-rs-row>
            <input
              data-bl-rs-input
              type="range"
              min={min}
              max={max}
              step={step}
              value={lo}
              disabled={disabled}
              onChange={(e) => {
                const next = Math.min(Number(e.target.value), hi);
                onChange([next, hi]);
              }}
            />
            <input
              data-bl-rs-input
              type="range"
              min={min}
              max={max}
              step={step}
              value={hi}
              disabled={disabled}
              onChange={(e) => {
                const next = Math.max(Number(e.target.value), lo);
                onChange([lo, next]);
              }}
            />
            {showValue && (
              <span data-bl-rs-value>
                {formatVal(lo)} – {formatVal(hi)}
              </span>
            )}
          </div>
          <div data-bl-rs-bounds>
            <span>{formatVal(min)}</span>
            <span>{formatVal(max)}</span>
          </div>
        </div>
      </>
    );
  }

  const single = typeof value === "number" ? value : min;
  return (
    <>
      <style>{styles}</style>
      <div data-bl-range-slider>
        <div data-bl-rs-row>
          <input
            data-bl-rs-input
            type="range"
            min={min}
            max={max}
            step={step}
            value={single}
            disabled={disabled}
            onChange={(e) => onChange(Number(e.target.value))}
          />
          {showValue && <span data-bl-rs-value>{formatVal(single)}</span>}
        </div>
        <div data-bl-rs-bounds>
          <span>{formatVal(min)}</span>
          <span>{formatVal(max)}</span>
        </div>
      </div>
    </>
  );
}
