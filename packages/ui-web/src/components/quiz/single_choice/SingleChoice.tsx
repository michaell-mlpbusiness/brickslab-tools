import React from "react";
import type { SingleChoiceProps } from "./SingleChoice.type";

const styles = `
[data-bl-single-choice] {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
/* ── Radio variant ───────────────────────────────────── */
[data-bl-sc-radio] {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 14px;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  background: var(--c-surface);
  transition: border-color 0.15s ease, background 0.15s ease;
  user-select: none;
}
[data-bl-sc-radio]:hover:not([data-disabled]) {
  border-color: var(--color-brand);
  background: var(--c-brand-subtle);
}
[data-bl-sc-radio][data-selected] {
  border-color: var(--color-brand);
  background: var(--c-brand-subtle);
}
[data-bl-sc-radio][data-disabled] {
  opacity: 0.45;
  cursor: not-allowed;
}
[data-bl-sc-radio-dot] {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1.5px solid var(--c-border);
  flex-shrink: 0;
  margin-top: 1px;
  background: var(--c-surface);
  transition: border-color 0.15s ease, background 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
[data-bl-sc-radio][data-selected] [data-bl-sc-radio-dot] {
  border-color: var(--color-brand);
  background: var(--color-brand);
}
[data-bl-sc-radio-dot-inner] {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #FBFBFB;
}
[data-bl-sc-radio-text] {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}
[data-bl-sc-radio-label] {
  font-size: var(--fontsize-sm);
  color: var(--color-fg);
  line-height: 1.4;
}
[data-bl-sc-radio-desc] {
  font-size: var(--fontsize-xs);
  color: var(--color-muted);
  line-height: 1.4;
}
/* ── Card variant ────────────────────────────────────── */
[data-bl-single-choice][data-variant="card"] {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
}
[data-bl-sc-card] {
  flex: 1;
  min-width: 120px;
  padding: 14px 16px;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  background: var(--c-surface);
  text-align: center;
  transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
  user-select: none;
}
[data-bl-sc-card]:hover:not([data-disabled]) {
  border-color: var(--color-brand);
  background: var(--c-brand-subtle);
}
[data-bl-sc-card][data-selected] {
  border-color: var(--color-brand);
  background: var(--c-brand-subtle);
  box-shadow: 0 0 0 3px var(--c-brand-border);
}
[data-bl-sc-card][data-disabled] {
  opacity: 0.45;
  cursor: not-allowed;
}
[data-bl-sc-card-label] {
  font-size: var(--fontsize-sm);
  font-weight: var(--fontweight-medium);
  color: var(--color-fg);
}
[data-bl-sc-card-desc] {
  font-size: var(--fontsize-xs);
  color: var(--color-muted);
  margin-top: 4px;
}
/* ── Other input ─────────────────────────────────────── */
[data-bl-sc-other] {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-sm);
  background: var(--c-surface);
  cursor: pointer;
  user-select: none;
}
[data-bl-sc-other][data-selected] {
  border-color: var(--color-brand);
  background: var(--c-brand-subtle);
}
[data-bl-sc-other-input] {
  flex: 1;
  border: none;
  background: transparent;
  font-size: var(--fontsize-sm);
  color: var(--color-fg);
  font-family: inherit;
  outline: none;
}
[data-bl-sc-other-input]::placeholder {
  color: var(--color-muted);
}
`;

const OTHER_ID = "__other__";

export function SingleChoice({
  value,
  onChange,
  options,
  variant = "radio",
  allowOther = false,
  otherLabel = "Other…",
  disabled = false,
}: SingleChoiceProps) {
  const [otherText, setOtherText] = React.useState("");
  const isOtherSelected = value === OTHER_ID || (value !== undefined && !options.find((o) => o.id === value));

  const select = (id: string) => {
    if (disabled) return;
    onChange(id);
  };

  if (variant === "card") {
    return (
      <>
        <style>{styles}</style>
        <div data-bl-single-choice data-variant="card" role="radiogroup">
          {options.map((opt) => (
            <div
              key={opt.id}
              data-bl-sc-card
              data-selected={value === opt.id ? "" : undefined}
              data-disabled={disabled || opt.disabled ? "" : undefined}
              role="radio"
              aria-checked={value === opt.id}
              tabIndex={disabled || opt.disabled ? -1 : 0}
              onClick={() => !opt.disabled && select(opt.id)}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && !opt.disabled) {
                  e.preventDefault();
                  select(opt.id);
                }
              }}
            >
              <div data-bl-sc-card-label>{opt.label}</div>
              {opt.description && <div data-bl-sc-card-desc>{opt.description}</div>}
            </div>
          ))}
          {allowOther && (
            <div
              data-bl-sc-card
              data-selected={isOtherSelected ? "" : undefined}
              data-disabled={disabled ? "" : undefined}
              role="radio"
              aria-checked={isOtherSelected}
              tabIndex={disabled ? -1 : 0}
              onClick={() => !disabled && select(OTHER_ID)}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && !disabled) {
                  e.preventDefault();
                  select(OTHER_ID);
                }
              }}
            >
              <div data-bl-sc-card-label>{otherLabel}</div>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div data-bl-single-choice role="radiogroup">
        {options.map((opt) => (
          <div
            key={opt.id}
            data-bl-sc-radio
            data-selected={value === opt.id ? "" : undefined}
            data-disabled={disabled || opt.disabled ? "" : undefined}
            role="radio"
            aria-checked={value === opt.id}
            tabIndex={disabled || opt.disabled ? -1 : 0}
            onClick={() => !opt.disabled && select(opt.id)}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && !opt.disabled) {
                e.preventDefault();
                select(opt.id);
              }
            }}
          >
            <div data-bl-sc-radio-dot>
              {value === opt.id && <div data-bl-sc-radio-dot-inner />}
            </div>
            <div data-bl-sc-radio-text>
              <span data-bl-sc-radio-label>{opt.label}</span>
              {opt.description && <span data-bl-sc-radio-desc>{opt.description}</span>}
            </div>
          </div>
        ))}
        {allowOther && (
          <div
            data-bl-sc-other
            data-selected={isOtherSelected ? "" : undefined}
            onClick={() => !disabled && select(OTHER_ID)}
          >
            <div data-bl-sc-radio-dot>
              {isOtherSelected && <div data-bl-sc-radio-dot-inner />}
            </div>
            <input
              data-bl-sc-other-input
              placeholder={otherLabel}
              value={otherText}
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation();
                !disabled && select(OTHER_ID);
              }}
              onChange={(e) => {
                setOtherText(e.target.value);
                onChange(e.target.value || OTHER_ID);
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
