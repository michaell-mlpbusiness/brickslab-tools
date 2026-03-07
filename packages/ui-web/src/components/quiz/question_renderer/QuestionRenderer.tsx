import React from "react";
import type { QuestionRendererProps } from "./QuestionRenderer.type";
import type { Answer } from "../quiz.types";

const rendererStyles = `
[data-bl-question-renderer] {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
[data-bl-question-renderer][data-layout="inline"] {
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}
[data-bl-question-renderer][data-layout="grid"] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 10px;
}
[data-bl-qr-fallback] {
  font-size: var(--fontsize-sm);
  color: var(--color-muted);
  padding: 12px;
  border: 1px dashed var(--c-border);
  border-radius: var(--radius-sm);
  text-align: center;
}
[data-bl-qr-option] {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: var(--fontsize-sm);
  color: var(--color-fg);
  background: var(--c-surface);
  transition: border-color 0.15s ease, background 0.15s ease;
  user-select: none;
}
[data-bl-qr-option]:hover:not([data-disabled]) {
  border-color: var(--color-brand);
  background: var(--c-brand-subtle);
}
[data-bl-qr-option][data-selected] {
  border-color: var(--color-brand);
  background: var(--c-brand-subtle);
}
[data-bl-qr-option][data-disabled] {
  opacity: 0.45;
  cursor: not-allowed;
}
[data-bl-qr-scale] {
  display: flex;
  align-items: center;
  gap: 8px;
}
[data-bl-qr-scale-labels] {
  display: flex;
  justify-content: space-between;
  font-size: var(--fontsize-xs);
  color: var(--color-muted);
}
[data-bl-qr-step] {
  flex: 1;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: var(--fontsize-sm);
  font-weight: var(--fontweight-medium);
  color: var(--color-fg);
  background: var(--c-surface);
  transition: border-color 0.15s ease, background 0.15s ease;
}
[data-bl-qr-step]:hover:not([data-disabled]) {
  border-color: var(--color-brand);
  background: var(--c-brand-subtle);
}
[data-bl-qr-step][data-selected] {
  border-color: var(--color-brand);
  background: var(--color-brand);
  color: #FBFBFB;
}
[data-bl-qr-textarea] {
  width: 100%;
  min-height: 80px;
  padding: 10px 12px;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-sm);
  background: var(--c-surface);
  color: var(--color-fg);
  font-size: var(--fontsize-sm);
  font-family: inherit;
  resize: vertical;
  box-sizing: border-box;
  transition: border-color 0.15s ease;
}
[data-bl-qr-textarea]:focus {
  outline: none;
  border-color: var(--color-brand);
}
[data-bl-qr-input] {
  width: 100%;
  padding: 9px 12px;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-sm);
  background: var(--c-surface);
  color: var(--color-fg);
  font-size: var(--fontsize-sm);
  font-family: inherit;
  box-sizing: border-box;
  transition: border-color 0.15s ease;
}
[data-bl-qr-input]:focus {
  outline: none;
  border-color: var(--color-brand);
}
`;

function SingleChoiceRenderer({
  options = [],
  value,
  onChange,
  disabled,
  layout,
}: {
  options: { id: string; label: string; disabled?: boolean }[];
  value: Answer;
  onChange: (v: Answer) => void;
  disabled?: boolean;
  layout?: string;
}) {
  return (
    <div
      data-bl-question-renderer
      data-layout={layout}
      role="radiogroup"
    >
      {options.map((opt) => {
        const selected = value === opt.id;
        return (
          <div
            key={opt.id}
            data-bl-qr-option
            data-selected={selected ? "" : undefined}
            data-disabled={disabled || opt.disabled ? "" : undefined}
            role="radio"
            aria-checked={selected}
            tabIndex={disabled || opt.disabled ? -1 : 0}
            onClick={() => !disabled && !opt.disabled && onChange(opt.id)}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && !disabled && !opt.disabled) {
                e.preventDefault();
                onChange(opt.id);
              }
            }}
          >
            {opt.label}
          </div>
        );
      })}
    </div>
  );
}

function MultiChoiceRenderer({
  options = [],
  value,
  onChange,
  disabled,
  layout,
}: {
  options: { id: string; label: string; disabled?: boolean }[];
  value: Answer;
  onChange: (v: Answer) => void;
  disabled?: boolean;
  layout?: string;
}) {
  const selected = Array.isArray(value) ? (value as string[]) : [];
  const toggle = (id: string) => {
    if (disabled) return;
    const next = selected.includes(id)
      ? selected.filter((v) => v !== id)
      : [...selected, id];
    onChange(next);
  };

  return (
    <div data-bl-question-renderer data-layout={layout}>
      {options.map((opt) => {
        const isSelected = selected.includes(opt.id);
        return (
          <div
            key={opt.id}
            data-bl-qr-option
            data-selected={isSelected ? "" : undefined}
            data-disabled={disabled || opt.disabled ? "" : undefined}
            role="checkbox"
            aria-checked={isSelected}
            tabIndex={disabled || opt.disabled ? -1 : 0}
            onClick={() => !opt.disabled && toggle(opt.id)}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && !opt.disabled) {
                e.preventDefault();
                toggle(opt.id);
              }
            }}
          >
            {opt.label}
          </div>
        );
      })}
    </div>
  );
}

function ScaleRenderer({
  min = 1,
  max = 5,
  step = 1,
  minLabel,
  maxLabel,
  value,
  onChange,
  disabled,
}: {
  min?: number;
  max?: number;
  step?: number;
  minLabel?: string;
  maxLabel?: string;
  value: Answer;
  onChange: (v: Answer) => void;
  disabled?: boolean;
}) {
  const steps: number[] = [];
  for (let i = min; i <= max; i += step) steps.push(i);

  return (
    <div data-bl-question-renderer>
      <div data-bl-qr-scale>
        {steps.map((s) => (
          <div
            key={s}
            data-bl-qr-step
            data-selected={value === s ? "" : undefined}
            data-disabled={disabled ? "" : undefined}
            tabIndex={disabled ? -1 : 0}
            role="radio"
            aria-checked={value === s}
            onClick={() => !disabled && onChange(s)}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && !disabled) {
                e.preventDefault();
                onChange(s);
              }
            }}
          >
            {s}
          </div>
        ))}
      </div>
      {(minLabel || maxLabel) && (
        <div data-bl-qr-scale-labels>
          <span>{minLabel ?? ""}</span>
          <span>{maxLabel ?? ""}</span>
        </div>
      )}
    </div>
  );
}

function TextRenderer({
  value,
  onChange,
  disabled,
  multiline,
  maxLength,
  placeholder,
}: {
  value: Answer;
  onChange: (v: Answer) => void;
  disabled?: boolean;
  multiline?: boolean;
  maxLength?: number;
  placeholder?: string;
}) {
  const strVal = typeof value === "string" ? value : "";
  if (multiline) {
    return (
      <textarea
        data-bl-qr-textarea
        value={strVal}
        maxLength={maxLength}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  return (
    <input
      data-bl-qr-input
      type="text"
      value={strVal}
      maxLength={maxLength}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function QuestionRenderer({
  question,
  value,
  onChange,
  disabled = false,
  layout = "stack",
}: QuestionRendererProps) {
  const { type, options, min, max, step, minLabel, maxLabel, multiline, maxLength } = question;

  return (
    <>
      <style>{rendererStyles}</style>
      {(type === "single") && (
        <SingleChoiceRenderer
          options={options ?? []}
          value={value}
          onChange={onChange}
          disabled={disabled}
          layout={layout}
        />
      )}
      {(type === "multi") && (
        <MultiChoiceRenderer
          options={options ?? []}
          value={value}
          onChange={onChange}
          disabled={disabled}
          layout={layout}
        />
      )}
      {(type === "scale" || type === "nps") && (
        <ScaleRenderer
          min={type === "nps" ? 0 : (min ?? 1)}
          max={type === "nps" ? 10 : (max ?? 5)}
          step={step ?? 1}
          minLabel={minLabel}
          maxLabel={maxLabel}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      )}
      {(type === "text") && (
        <TextRenderer
          value={value}
          onChange={onChange}
          disabled={disabled}
          multiline={multiline}
          maxLength={maxLength}
        />
      )}
      {(type === "rating") && (
        <ScaleRenderer
          min={1}
          max={max ?? 5}
          step={1}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      )}
      {(type === "range" || type === "date" || type === "file" || type === "matrix" || type === "rank") && (
        <div data-bl-qr-fallback>
          Question type <strong>{type}</strong> — renderer available in Family 2 components.
        </div>
      )}
    </>
  );
}
