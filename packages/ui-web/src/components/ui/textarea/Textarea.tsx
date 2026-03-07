import React from "react";
import { TextareaProps, TextareaSize } from "./Textarea.type";

const sizeStyles: Record<TextareaSize, { paddingH: string; paddingV: string; fontSize: string }> = {
  sm: { paddingH: "var(--space-3)", paddingV: "var(--space-2)", fontSize: "var(--fontsize-xs)" },
  md: { paddingH: "var(--space-4)", paddingV: "var(--space-3)", fontSize: "var(--fontsize-sm)" },
  lg: { paddingH: "var(--space-5)", paddingV: "var(--space-4)", fontSize: "var(--fontsize-medium)" },
};

const textareaStyles = `
  [data-bl-textarea]:hover:not(:disabled):not([readonly]) { border-color: var(--color-muted); }
  [data-bl-textarea]:focus { outline: none; border-color: var(--color-brand); box-shadow: var(--focus-ring); }
  [data-bl-textarea][data-error="true"] { border-color: var(--color-error); }
  [data-bl-textarea][data-error="true"]:focus { border-color: var(--color-error); box-shadow: var(--focus-ring); }
  [data-bl-textarea]::placeholder { color: var(--color-muted); opacity: 0.7; }
`;

export function Textarea({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorText,
  disabled = false,
  readOnly = false,
  size = "md",
  fullWidth = false,
  id,
  name,
  required = false,
  rows = 4,
  maxLength,
  resize = "vertical",
  autoResize = false,
}: TextareaProps) {
  const autoId = React.useId();
  const textareaId = id ?? autoId;
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (!autoResize || !textareaRef.current) return;
    const el = textareaRef.current;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value, autoResize]);

  const { paddingH, paddingV, fontSize } = sizeStyles[size];
  const hasError = Boolean(errorText);
  const isAtLimit = maxLength !== undefined && value.length >= maxLength;

  return (
    <>
      <style>{textareaStyles}</style>
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
            htmlFor={textareaId}
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

        <textarea
          ref={textareaRef}
          data-bl-textarea
          data-error={hasError ? "true" : undefined}
          id={textareaId}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          rows={rows}
          maxLength={maxLength}
          style={{
            display: "block",
            width: "100%",
            padding: `${paddingV} ${paddingH}`,
            fontSize,
            color: "var(--color-fg)",
            backgroundColor: "var(--c-surface)",
            border: `1px solid ${hasError ? "var(--color-error)" : "var(--c-border)"}`,
            borderRadius: "var(--radius-sm)",
            transition: "var(--transition-all)",
            cursor: disabled ? "not-allowed" : readOnly ? "default" : "text",
            boxSizing: "border-box",
            fontFamily: "inherit",
            resize: autoResize ? "none" : resize,
            lineHeight: 1.5,
            minHeight: 0,
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginTop: "var(--space-1)",
          }}
        >
          {(errorText || helperText) ? (
            <p
              style={{
                margin: 0,
                fontSize: "var(--fontsize-xs)",
                color: hasError ? "var(--color-error)" : "var(--color-muted)",
                lineHeight: 1.4,
              }}
            >
              {errorText ?? helperText}
            </p>
          ) : (
            <span />
          )}

          {maxLength !== undefined && (
            <span
              style={{
                fontSize: "var(--fontsize-xs)",
                color: isAtLimit ? "var(--color-error)" : "var(--color-muted)",
                whiteSpace: "nowrap",
                marginLeft: "var(--space-2)",
              }}
            >
              {value.length}/{maxLength}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
