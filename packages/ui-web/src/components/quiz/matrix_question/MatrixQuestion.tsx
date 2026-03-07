import React from "react";
import type { MatrixQuestionProps } from "./MatrixQuestion.type";

const styles = `
[data-bl-matrix] {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
[data-bl-matrix-table] {
  width: 100%;
  border-collapse: collapse;
  min-width: 400px;
}
[data-bl-matrix-table] th,
[data-bl-matrix-table] td {
  padding: 10px 12px;
  text-align: center;
  border-bottom: 1px solid var(--c-border);
  font-size: var(--fontsize-sm);
}
[data-bl-matrix-table] th {
  font-weight: var(--fontweight-semibold);
  color: var(--color-muted);
  font-size: var(--fontsize-xs);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  background: var(--c-surface-elevated);
}
[data-bl-matrix-table] th:first-child,
[data-bl-matrix-table] td:first-child {
  text-align: left;
  font-weight: var(--fontweight-medium);
  color: var(--color-fg);
  min-width: 140px;
}
[data-bl-matrix-table] tr:last-child td {
  border-bottom: none;
}
[data-bl-matrix-table] tr:hover td {
  background: var(--c-surface-elevated);
}
[data-bl-matrix-cell] {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1.5px solid var(--c-border);
  cursor: pointer;
  background: var(--c-surface);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  transition: border-color 0.15s ease, background 0.15s ease;
}
[data-bl-matrix-cell]:hover:not([data-disabled]) {
  border-color: var(--color-brand);
}
[data-bl-matrix-cell][data-checked] {
  border-color: var(--color-brand);
  background: var(--color-brand);
}
[data-bl-matrix-cell][data-disabled] {
  opacity: 0.45;
  cursor: not-allowed;
}
[data-bl-matrix-cell-inner] {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #FBFBFB;
}
[data-bl-matrix-cell][data-type="multi"] {
  border-radius: 3px;
}
`;

export function MatrixQuestion({
  value,
  onChange,
  rows,
  cols,
  type = "single",
  requiredRows = false,
  disabled = false,
}: MatrixQuestionProps) {
  const toggle = (rowId: string, colId: string) => {
    if (disabled) return;
    if (type === "single") {
      onChange({ ...value, [rowId]: colId });
    } else {
      const current = value[rowId];
      const selected: string[] = Array.isArray(current) ? (current as unknown as string[]) : current ? [String(current)] : [];
      const next = selected.includes(colId)
        ? selected.filter((c) => c !== colId)
        : [...selected, colId];
      onChange({ ...value, [rowId]: next.join(",") });
    }
  };

  const isChecked = (rowId: string, colId: string): boolean => {
    const v = value[rowId];
    if (type === "single") return v === colId;
    if (typeof v === "string") return v.split(",").includes(colId);
    return false;
  };

  return (
    <>
      <style>{styles}</style>
      <div data-bl-matrix>
        <table data-bl-matrix-table>
          <thead>
            <tr>
              <th />
              {cols.map((col) => (
                <th key={col.id}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>
                  {row.label}
                  {requiredRows && !value[row.id] && (
                    <span style={{ color: "#CC4A48", marginLeft: 3 }}>*</span>
                  )}
                </td>
                {cols.map((col) => {
                  const checked = isChecked(row.id, col.id);
                  return (
                    <td key={col.id}>
                      <div
                        data-bl-matrix-cell
                        data-checked={checked ? "" : undefined}
                        data-disabled={disabled ? "" : undefined}
                        data-type={type}
                        role={type === "single" ? "radio" : "checkbox"}
                        aria-checked={checked}
                        aria-label={`${row.label} — ${col.label}`}
                        tabIndex={disabled ? -1 : 0}
                        onClick={() => toggle(row.id, col.id)}
                        onKeyDown={(e) => {
                          if ((e.key === "Enter" || e.key === " ") && !disabled) {
                            e.preventDefault();
                            toggle(row.id, col.id);
                          }
                        }}
                      >
                        {checked && <div data-bl-matrix-cell-inner />}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
