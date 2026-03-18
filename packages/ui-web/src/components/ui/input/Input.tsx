import React from "react";
import { InputProps, InputSize } from "./Input.type";

const sizeStyles: Record<InputSize, { height: string; paddingH: string; fontSize: string }> = {
  sm: { height: "28px", paddingH: "var(--space-3)", fontSize: "var(--fontsize-xs)" },
  md: { height: "var(--height-input)", paddingH: "var(--space-4)", fontSize: "var(--fontsize-sm)" },
  lg: { height: "44px", paddingH: "var(--space-5)", fontSize: "var(--fontsize-medium)" },
};

const iconOffset = "28px";

const inputStyles = `
  [data-bl-input-field]:hover:not(:disabled):not([readonly]) { border-color: var(--color-muted); }
  [data-bl-input-field]:focus { outline: none; border-color: var(--color-brand); box-shadow: var(--focus-ring); }
  [data-bl-input-field][data-error="true"] { border-color: var(--color-error); }
  [data-bl-input-field][data-error="true"]:focus { border-color: var(--color-error); box-shadow: var(--focus-ring); }
  [data-bl-input-field]::placeholder { color: var(--color-muted); opacity: 0.7; }
`;

export function Input({
  value,
  onChange,
  type = "text",
  label,
  placeholder,
  helperText,
  errorText,
  disabled = false,
  readOnly = false,
  leftIcon,
  rightIcon,
  size = "md",
  fullWidth = false,
  id,
  name,
  required = false,
  autoFocus = false,
  maxLength,
  anyError: hasErrorProp = false,
}: InputProps) {
  const autoId = React.useId();
  const inputId = id ?? autoId;

  const { height, paddingH, fontSize } = sizeStyles[size];

  const paddingLeft = leftIcon ? `calc(${paddingH} + ${iconOffset})` : paddingH;
  const paddingRight = rightIcon ? `calc(${paddingH} + ${iconOffset})` : paddingH;

  const isDisabled = disabled;
  const hasError = Boolean(errorText) || hasErrorProp;
  const iconStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    pointerEvents: "none",
    color: hasError ? "var(--color-error)" : "var(--color-muted)",
    fontSize: fontSize,
  };

  return (
    <>
      <style>{inputStyles}</style>
      <div
        style={{
          display: fullWidth ? "block" : "inline-block",
          width: fullWidth ? "100%" : undefined,
          opacity: isDisabled ? 0.5 : 1,
          cursor: isDisabled ? "not-allowed" : undefined,
        }}
      >
        {label && (
          <label
            htmlFor={inputId}
            style={{
              display: "block",
              marginBottom: "var(--space-1)",
              fontSize: "var(--fontsize-sm)",
              fontWeight: "var(--fontweight-medium)" as React.CSSProperties["fontWeight"],
              color: "var(--color-fg)",
              cursor: isDisabled ? "not-allowed" : undefined,
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
          {leftIcon && (
            <span style={{ ...iconStyle, left: paddingH }}>
              {leftIcon}
            </span>
          )}

          <input
            data-bl-input-field
            data-error={hasError ? "true" : undefined}
            id={inputId}
            name={name}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={isDisabled}
            readOnly={readOnly}
            required={required}
            autoFocus={autoFocus}
            maxLength={maxLength}
            style={{
              display: "block",
              width: "100%",
              height,
              paddingLeft,
              paddingRight,
              paddingTop: 0,
              paddingBottom: 0,
              fontSize,
              color: "var(--color-fg)",
              backgroundColor: hasError ? "var(--color-error-bg, #cc4a481d)" : "var(--c-surface)",
              border: `1px solid ${hasError ? "var(--color-error)" : "var(--c-border)"}`,
              borderRadius: "var(--radius-sm)",
              transition: "var(--transition-all)",
              cursor: isDisabled ? "not-allowed" : readOnly ? "default" : "text",
              boxSizing: "border-box",
              fontFamily: "inherit",
            }}
          />

          {rightIcon && (
            <span style={{ ...iconStyle, right: paddingH }}>
              {rightIcon}
            </span>
          )}
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