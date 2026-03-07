import React from "react";
import type { SegmentFilterBarProps } from "./SegmentFilterBar.type";
import type { FilterState } from "../analytics.types";

const styles = `
[data-bl-sfb] {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 10px 14px;
  background: var(--c-surface);
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-md);
}
[data-bl-sfb-field] {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
[data-bl-sfb-label] {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-muted);
  opacity: 0.7;
}
[data-bl-sfb-input],
[data-bl-sfb-select] {
  padding: 6px 10px;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-sm);
  background: var(--c-surface);
  color: var(--color-fg);
  font-size: var(--fontsize-sm);
  font-family: inherit;
  outline: none;
  min-width: 120px;
  transition: border-color 0.15s ease;
}
[data-bl-sfb-input]:focus,
[data-bl-sfb-select]:focus {
  border-color: var(--color-brand);
}
[data-bl-sfb-divider] {
  width: 1px;
  height: 32px;
  background: var(--c-border);
  flex-shrink: 0;
}
[data-bl-sfb-presets] {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}
[data-bl-sfb-preset] {
  padding: 5px 10px;
  border: 1.5px solid var(--c-border);
  border-radius: 999px;
  background: transparent;
  color: var(--color-muted);
  font-size: var(--fontsize-xs);
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
}
[data-bl-sfb-preset]:hover {
  border-color: var(--color-brand);
  color: var(--color-brand);
}
[data-bl-sfb-preset][data-active] {
  border-color: var(--color-brand);
  background: var(--color-brand);
  color: #FBFBFB;
}
[data-bl-sfb-clear] {
  padding: 5px 10px;
  border: none;
  background: transparent;
  color: var(--color-muted);
  font-size: var(--fontsize-xs);
  cursor: pointer;
  font-family: inherit;
  transition: color 0.15s ease;
  margin-left: auto;
}
[data-bl-sfb-clear]:hover {
  color: #CC4A48;
}
[data-bl-sfb-tags] {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}
[data-bl-sfb-tag] {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border: 1.5px solid var(--c-border);
  border-radius: 999px;
  font-size: var(--fontsize-xs);
  cursor: pointer;
  color: var(--color-fg);
  background: var(--c-surface-elevated);
  transition: border-color 0.15s ease;
}
[data-bl-sfb-tag]:hover {
  border-color: var(--color-brand);
}
[data-bl-sfb-tag][data-selected] {
  border-color: var(--color-brand);
  background: var(--color-brand);
  color: #FBFBFB;
}
`;

export function SegmentFilterBar({ value, onChange, fields, presets }: SegmentFilterBarProps) {
  const hasValues = Object.values(value).some((v) => v !== null && v !== "" && !(Array.isArray(v) && v.length === 0));

  const activePreset = presets?.find((p) =>
    Object.entries(p.value).every(([k, v]) => JSON.stringify(value[k]) === JSON.stringify(v))
  );

  const applyPreset = (pv: FilterState) => onChange({ ...value, ...pv });

  const clearField = (id: string) => onChange({ ...value, [id]: null });

  return (
    <>
      <style>{styles}</style>
      <div data-bl-sfb role="search" aria-label="Segment filters">
        {fields.map((field, idx) => (
          <React.Fragment key={field.id}>
            {idx > 0 && <div data-bl-sfb-divider aria-hidden />}
            <div data-bl-sfb-field>
              <span data-bl-sfb-label>{field.label}</span>
              {field.type === "select" && (
                <select
                  data-bl-sfb-select
                  value={(value[field.id] as string) ?? ""}
                  onChange={(e) => onChange({ ...value, [field.id]: e.target.value || null })}
                >
                  <option value="">All</option>
                  {field.options?.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
              )}
              {(field.type === "text" || field.type === "date") && (
                <input
                  data-bl-sfb-input
                  type={field.type === "date" ? "date" : "text"}
                  placeholder={field.type === "text" ? `Filter ${field.label}…` : undefined}
                  value={(value[field.id] as string) ?? ""}
                  onChange={(e) => onChange({ ...value, [field.id]: e.target.value || null })}
                />
              )}
              {field.type === "tag" && (
                <div data-bl-sfb-tags>
                  {field.options?.map((opt) => {
                    const selected = Array.isArray(value[field.id])
                      ? (value[field.id] as string[]).includes(opt.id)
                      : false;
                    const toggle = () => {
                      const current = (value[field.id] as string[]) ?? [];
                      const next = selected ? current.filter((v) => v !== opt.id) : [...current, opt.id];
                      onChange({ ...value, [field.id]: next.length ? next : null });
                    };
                    return (
                      <button key={opt.id} data-bl-sfb-tag data-selected={selected ? "" : undefined} onClick={toggle}>
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </React.Fragment>
        ))}

        {presets && presets.length > 0 && (
          <>
            <div data-bl-sfb-divider aria-hidden />
            <div data-bl-sfb-presets>
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  data-bl-sfb-preset
                  data-active={activePreset?.id === preset.id ? "" : undefined}
                  onClick={() => applyPreset(preset.value)}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </>
        )}

        {hasValues && (
          <button data-bl-sfb-clear onClick={() => onChange({})}>
            Clear all
          </button>
        )}
      </div>
    </>
  );
}
