import React from "react";
import type { CheckboxProps, CheckboxSize } from "./Checkbox.type";

const checkboxStyles = `
[data-bl-checkbox] {
  appearance: none;
  -webkit-appearance: none;
  width: var(--bl-cb-size);
  height: var(--bl-cb-size);
  border: 1.5px solid var(--c-border);
  border-radius: 3px;
  background-color: var(--c-surface);
  cursor: pointer;
  flex-shrink: 0;
  transition: border-color 0.15s ease, background-color 0.15s ease;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 65%;
}
[data-bl-checkbox]:hover:not(:disabled) {
  border-color: var(--color-brand);
}
[data-bl-checkbox]:checked {
  background-color: var(--color-brand);
  border-color: var(--color-brand);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M2 6l3 3 5-5' stroke='%23FBFBFB' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
}
[data-bl-checkbox]:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 2px;
}
[data-bl-checkbox]:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
[data-bl-checkbox-label] {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}
[data-bl-checkbox-label][data-disabled] {
  cursor: not-allowed;
}
`;

const sizeMap: Record<CheckboxSize, number> = {
  sm: 14,
  md: 16,
  lg: 20,
};

export function Checkbox({
  checked,
  defaultChecked,
  onChange,
  label,
  disabled = false,
  size = "md",
  id,
  name,
  value,
}: CheckboxProps) {
  const px = sizeMap[size];

  return (
    <>
      <style>{checkboxStyles}</style>
      <label
        data-bl-checkbox-label
        data-disabled={disabled ? "" : undefined}
        style={{
          fontSize: "var(--fontsize-sm)",
          color: "var(--color-fg)",
        }}
      >
        <input
          type="checkbox"
          data-bl-checkbox
          id={id}
          name={name}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          style={{ "--bl-cb-size": `${px}px` } as React.CSSProperties}
        />
        {label && <span style={{ lineHeight: 1.4 }}>{label}</span>}
      </label>
    </>
  );
}
