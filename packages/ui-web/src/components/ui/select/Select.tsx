import React from "react";
import { FiChevronDown } from "react-icons/fi";
import { SelectProps, SelectSize } from "./Select.type";

const sizeStyles: Record<SelectSize, { height: string; paddingH: string; fontSize: string }> = {
  sm: { height: "28px", paddingH: "var(--space-3)", fontSize: "var(--fontsize-xs)" },
  md: { height: "var(--height-input)", paddingH: "var(--space-4)", fontSize: "var(--fontsize-sm)" },
  lg: { height: "44px", paddingH: "var(--space-5)", fontSize: "var(--fontsize-medium)" },
};

const selectStyles = `
  [data-bl-select]:hover:not(:disabled) { border-color: var(--color-muted); }
  [data-bl-select]:focus { outline: none; border-color: var(--color-brand); box-shadow: var(--focus-ring); }
  [data-bl-select][data-error="true"] { border-color: var(--color-error); }
  [data-bl-select][data-error="true"]:focus { border-color: var(--color-error); box-shadow: var(--focus-ring); }
  [data-bl-select] option[value=""][disabled] { color: var(--color-muted); }
`;

export function Select({
  value,
  onChange,
  options,
  label,
  placeholder,
  helperText,
  errorText,
  disabled = false,
  size = "md",
  fullWidth = false,
  id,
  name,
  required = false,
}: SelectProps) {
  const autoId = React.useId();
  const selectId = id ?? autoId;

  const { height, paddingH, fontSize } = sizeStyles[size];
  const paddingRight = `calc(${paddingH} + 28px)`;

  const hasError = Boolean(errorText);

  return (
    <>
      <style>{selectStyles}</style>
      <div
        style={{
          display: fullWidth ? "block" : "inline-block",
          width: fullWidth ? "100%" : undefined,
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : undefined,
        }}
      >
        {label && (
          <label
            htmlFor={selectId}
            style={{
              display: "block",
              marginBottom: "var(--space-1)",
              fontSize: "var(--fontsize-sm)",
              fontWeight: "var(--fontweight-medium)" as React.CSSProperties["fontWeight"],
              color: "var(--color-fg)",
              cursor: disabled ? "not-allowed" : undefined,
            }}
          >
            {label}
            {required && (
              <span style={{ color: "var(--color-error)", marginLeft: "var(--space-1)" }} aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div style={{ position: "relative", display: "block" }}>
          <select
            data-bl-select
            data-error={hasError ? "true" : undefined}
            id={selectId}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            required={required}
            style={{
              display: "block",
              width: fullWidth ? "100%" : undefined,
              height,
              paddingLeft: paddingH,
              paddingRight,
              paddingTop: 0,
              paddingBottom: 0,
              fontSize,
              color: value === "" ? "var(--color-muted)" : "var(--color-fg)",
              backgroundColor: "var(--c-surface)",
              border: `1px solid ${hasError ? "var(--color-error)" : "var(--c-border)"}`,
              borderRadius: "var(--radius-sm)",
              transition: "var(--transition-all)",
              cursor: disabled ? "not-allowed" : "pointer",
              boxSizing: "border-box",
              fontFamily: "inherit",
              appearance: "none",
            }}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>

          <span
            style={{
              position: "absolute",
              top: "50%",
              right: paddingH,
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
              pointerEvents: "none",
              color: "var(--color-muted)",
              fontSize,
            }}
          >
            <FiChevronDown />
          </span>
        </div>

        {(errorText || helperText) && (
          <p
            style={{
              marginTop: "var(--space-1)",
              fontSize: "var(--fontsize-xs)",
              color: hasError ? "var(--color-error)" : "var(--color-muted)",
              lineHeight: 1.4,
            }}
          >
            {errorText ?? helperText}
          </p>
        )}
      </div>
    </>
  );
}
