import React from "react";
import type { FreeTextQuestionProps } from "./FreeTextQuestion.type";

const styles = `
[data-bl-free-text] {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
[data-bl-ft-input],
[data-bl-ft-textarea] {
  width: 100%;
  padding: 10px 12px;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-sm);
  background: var(--c-surface);
  color: var(--color-fg);
  font-size: var(--fontsize-sm);
  font-family: inherit;
  box-sizing: border-box;
  transition: border-color 0.15s ease;
  outline: none;
}
[data-bl-ft-input]:focus,
[data-bl-ft-textarea]:focus {
  border-color: var(--color-brand);
}
[data-bl-ft-input]:disabled,
[data-bl-ft-textarea]:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
[data-bl-ft-textarea] {
  min-height: 100px;
  resize: vertical;
  line-height: 1.6;
}
[data-bl-ft-footer] {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
[data-bl-ft-count] {
  font-size: var(--fontsize-xs);
  color: var(--color-muted);
}
[data-bl-ft-count][data-warn] {
  color: #F59E0B;
}
[data-bl-ft-count][data-over] {
  color: #CC4A48;
}
`;

export function FreeTextQuestion({
  value = "",
  onChange,
  multiline = false,
  minLength,
  maxLength,
  placeholder,
  showCount = false,
  disabled = false,
}: FreeTextQuestionProps) {
  const len = value.length;
  const isOver = maxLength !== undefined && len > maxLength;
  const isWarn = maxLength !== undefined && !isOver && len >= maxLength * 0.85;

  return (
    <>
      <style>{styles}</style>
      <div data-bl-free-text>
        {multiline ? (
          <textarea
            data-bl-ft-textarea
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <input
            data-bl-ft-input
            type="text"
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
        {(showCount || minLength) && (
          <div data-bl-ft-footer>
            {minLength && len < minLength && (
              <span data-bl-ft-count style={{ marginRight: "auto" }}>
                Min {minLength} characters
              </span>
            )}
            {showCount && maxLength && (
              <span
                data-bl-ft-count
                data-warn={isWarn ? "" : undefined}
                data-over={isOver ? "" : undefined}
              >
                {len}/{maxLength}
              </span>
            )}
            {showCount && !maxLength && (
              <span data-bl-ft-count>{len}</span>
            )}
          </div>
        )}
      </div>
    </>
  );
}
