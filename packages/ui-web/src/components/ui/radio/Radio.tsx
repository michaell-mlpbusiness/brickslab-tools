import React from "react";
import type { RadioProps, RadioGroupProps, RadioSize } from "./Radio.type";

const radioStyles = `
[data-bl-radio] {
  appearance: none;
  -webkit-appearance: none;
  width: var(--bl-radio-size);
  height: var(--bl-radio-size);
  border: 1.5px solid var(--c-border);
  border-radius: 50%;
  background-color: var(--c-surface);
  cursor: pointer;
  flex-shrink: 0;
  transition: border-color 0.15s ease, background-image 0.1s ease;
}
[data-bl-radio]:hover:not(:disabled) {
  border-color: var(--color-brand);
}
[data-bl-radio]:checked {
  border-color: var(--color-brand);
  background-image: radial-gradient(var(--color-brand) 38%, transparent 38%);
}
[data-bl-radio]:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 2px;
}
[data-bl-radio]:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
[data-bl-radio-label] {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}
[data-bl-radio-label][data-disabled] {
  cursor: not-allowed;
}
`;

const sizeMap: Record<RadioSize, number> = {
  sm: 14,
  md: 16,
  lg: 20,
};

export function Radio({
  value,
  checked,
  onChange,
  label,
  name,
  disabled = false,
  size = "md",
  id,
}: RadioProps) {
  const px = sizeMap[size];

  return (
    <>
      <style>{radioStyles}</style>
      <label
        data-bl-radio-label
        data-disabled={disabled ? "" : undefined}
        style={{
          fontSize: "var(--fontsize-sm)",
          color: "var(--color-fg)",
        }}
      >
        <input
          type="radio"
          data-bl-radio
          id={id}
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={() => onChange?.(value)}
          style={{ "--bl-radio-size": `${px}px` } as React.CSSProperties}
        />
        {label && <span style={{ lineHeight: 1.4 }}>{label}</span>}
      </label>
    </>
  );
}

export function RadioGroup({
  name,
  value,
  onChange,
  children,
  direction = "vertical",
  gap = 10,
}: RadioGroupProps) {
  const cloned = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    const childProps = (child as React.ReactElement<RadioProps>).props;
    return React.cloneElement(child as React.ReactElement<RadioProps>, {
      name,
      ...(value !== undefined && { checked: childProps.value === value }),
      ...(onChange && { onChange }),
    });
  });

  return (
    <div
      role="radiogroup"
      style={{
        display: "flex",
        flexDirection: direction === "horizontal" ? "row" : "column",
        gap,
        flexWrap: direction === "horizontal" ? "wrap" : undefined,
      }}
    >
      {cloned}
    </div>
  );
}
