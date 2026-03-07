import React from "react";
import type { HeatmapMatrixProps } from "./HeatmapMatrix.type";

const styles = `
[data-bl-heatmap] {
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-x: auto;
}
[data-bl-hm-table] {
  border-collapse: separate;
  border-spacing: 3px;
  min-width: max-content;
}
[data-bl-hm-table] th {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-muted);
  padding: 0 6px 6px;
  text-align: center;
  white-space: nowrap;
}
[data-bl-hm-table] th:first-child {
  text-align: right;
  min-width: 100px;
}
[data-bl-hm-table] td {
  padding: 0;
}
[data-bl-hm-row-label] {
  font-size: var(--fontsize-xs);
  color: var(--color-muted);
  padding-right: 10px;
  text-align: right;
  white-space: nowrap;
  min-width: 100px;
}
[data-bl-hm-cell] {
  width: 36px;
  height: 28px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  transition: transform 0.1s ease;
  cursor: default;
}
[data-bl-hm-cell]:hover {
  transform: scale(1.1);
  z-index: 1;
  position: relative;
}
[data-bl-hm-scale] {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  color: var(--color-muted);
}
[data-bl-hm-scale-bar] {
  height: 10px;
  width: 160px;
  border-radius: 5px;
  background: linear-gradient(to right, color-mix(in srgb, var(--color-brand) 10%, var(--c-surface-elevated)), var(--color-brand));
}
`;

function lerp(t: number): string {
  // brand color gradient: light → saturated brand
  const r = Math.round(30 + t * (204 - 30));
  const g = Math.round(30 + t * (74 - 30));
  const b = Math.round(30 + t * (72 - 30));
  const lightness = 1 - t * 0.7;
  const textColor = t > 0.55 ? "#FBFBFB" : "var(--color-fg)";
  return `rgb(${Math.round(204 * t + 240 * (1 - t))}, ${Math.round(74 * t + 240 * (1 - t))}, ${Math.round(72 * t + 240 * (1 - t))})`;
}

function cellColor(value: number, min: number, max: number): { bg: string; fg: string } {
  const t = max > min ? (value - min) / (max - min) : 0;
  // Use brand red gradient
  const r = Math.round(240 + t * (204 - 240));
  const g = Math.round(240 + t * (74 - 240));
  const bCh = Math.round(240 + t * (72 - 240));
  return {
    bg: `rgb(${r},${g},${bCh})`,
    fg: t > 0.55 ? "#FBFBFB" : "var(--color-fg)",
  };
}

export function HeatmapMatrix({ rows, cols, values, min, max, showScale = true }: HeatmapMatrixProps) {
  const allVals = values.flat();
  const minVal = min ?? Math.min(...allVals);
  const maxVal = max ?? Math.max(...allVals);

  return (
    <>
      <style>{styles}</style>
      <div data-bl-heatmap>
        <table data-bl-hm-table>
          <thead>
            <tr>
              <th />
              {cols.map((col) => <th key={col}>{col}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={row}>
                <td data-bl-hm-row-label>{row}</td>
                {cols.map((col, ci) => {
                  const val = values[ri]?.[ci] ?? 0;
                  const { bg, fg } = cellColor(val, minVal, maxVal);
                  return (
                    <td key={col}>
                      <div
                        data-bl-hm-cell
                        style={{ background: bg, color: fg }}
                        title={`${row} × ${col}: ${val}`}
                      >
                        {val}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {showScale && (
          <div data-bl-hm-scale>
            <span>{minVal}</span>
            <div data-bl-hm-scale-bar />
            <span>{maxVal}</span>
          </div>
        )}
      </div>
    </>
  );
}
