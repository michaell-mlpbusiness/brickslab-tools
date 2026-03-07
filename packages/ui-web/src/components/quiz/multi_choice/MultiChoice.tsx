import React from "react";
import type { MultiChoiceProps } from "./MultiChoice.type";

const styles = `
[data-bl-multi-choice] {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
/* ── Checkbox variant ────────────────────────────────── */
[data-bl-mc-checkbox] {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  background: var(--c-surface);
  user-select: none;
  transition: border-color 0.15s ease, background 0.15s ease;
}
[data-bl-mc-checkbox]:hover:not([data-disabled]) {
  border-color: var(--color-brand);
  background: var(--c-brand-subtle);
}
[data-bl-mc-checkbox][data-selected] {
  border-color: var(--color-brand);
  background: var(--c-brand-subtle);
}
[data-bl-mc-checkbox][data-disabled] {
  opacity: 0.45;
  cursor: not-allowed;
}
[data-bl-mc-box] {
  width: 16px;
  height: 16px;
  border-radius: 3px;
  border: 1.5px solid var(--c-border);
  flex-shrink: 0;
  background: var(--c-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.15s ease, background 0.15s ease;
}
[data-bl-mc-checkbox][data-selected] [data-bl-mc-box] {
  border-color: var(--color-brand);
  background: var(--color-brand);
}
[data-bl-mc-check] {
  color: #FBFBFB;
}
[data-bl-mc-checkbox-label] {
  font-size: var(--fontsize-sm);
  color: var(--color-fg);
  line-height: 1.4;
  flex: 1;
}
/* ── Tag variant ─────────────────────────────────────── */
[data-bl-multi-choice][data-variant="tag"] {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
}
[data-bl-mc-tag] {
  padding: 6px 14px;
  border: 1.5px solid var(--c-border);
  border-radius: 999px;
  font-size: var(--fontsize-sm);
  color: var(--color-muted);
  cursor: pointer;
  user-select: none;
  background: var(--c-surface);
  transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
}
[data-bl-mc-tag]:hover:not([data-disabled]) {
  border-color: var(--color-brand);
  color: var(--color-brand);
}
[data-bl-mc-tag][data-selected] {
  border-color: var(--color-brand);
  background: var(--color-brand);
  color: #FBFBFB;
}
[data-bl-mc-tag][data-disabled] {
  opacity: 0.45;
  cursor: not-allowed;
}
[data-bl-mc-limit] {
  font-size: var(--fontsize-xs);
  color: var(--color-muted);
  margin-top: 4px;
}
`;

export function MultiChoice({
  value,
  onChange,
  options,
  variant = "checkbox",
  maxSelected,
  minSelected,
  disabled = false,
}: MultiChoiceProps) {
  const toggle = (id: string) => {
    if (disabled) return;
    const isSelected = value.includes(id);
    if (!isSelected && maxSelected !== undefined && value.length >= maxSelected) return;
    const next = isSelected ? value.filter((v) => v !== id) : [...value, id];
    onChange(next);
  };

  const atMax = maxSelected !== undefined && value.length >= maxSelected;

  if (variant === "tag") {
    return (
      <>
        <style>{styles}</style>
        <div data-bl-multi-choice data-variant="tag">
          {options.map((opt) => {
            const selected = value.includes(opt.id);
            const isDisabled = disabled || opt.disabled || (!selected && atMax);
            return (
              <div
                key={opt.id}
                data-bl-mc-tag
                data-selected={selected ? "" : undefined}
                data-disabled={isDisabled ? "" : undefined}
                role="checkbox"
                aria-checked={selected}
                tabIndex={isDisabled ? -1 : 0}
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
          {maxSelected && (
            <div data-bl-mc-limit style={{ width: "100%" }}>
              {value.length}/{maxSelected} selected
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div data-bl-multi-choice>
        {options.map((opt) => {
          const selected = value.includes(opt.id);
          const isDisabled = disabled || opt.disabled || (!selected && atMax);
          return (
            <div
              key={opt.id}
              data-bl-mc-checkbox
              data-selected={selected ? "" : undefined}
              data-disabled={isDisabled ? "" : undefined}
              role="checkbox"
              aria-checked={selected}
              tabIndex={isDisabled ? -1 : 0}
              onClick={() => !opt.disabled && toggle(opt.id)}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && !opt.disabled) {
                  e.preventDefault();
                  toggle(opt.id);
                }
              }}
            >
              <div data-bl-mc-box>
                {selected && (
                  <svg data-bl-mc-check width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span data-bl-mc-checkbox-label>{opt.label}</span>
            </div>
          );
        })}
        {maxSelected && (
          <div data-bl-mc-limit>{value.length}/{maxSelected} selected</div>
        )}
      </div>
    </>
  );
}
