import React from "react";
import type { DistributionChartProps } from "./DistributionChart.type";

const styles = `
[data-bl-dist-chart] {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
[data-bl-dc-bars] {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
[data-bl-dc-row] {
  display: flex;
  align-items: center;
  gap: 10px;
}
[data-bl-dc-row-label] {
  font-size: var(--fontsize-xs);
  color: var(--color-muted);
  min-width: 80px;
  text-align: right;
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
[data-bl-dc-track] {
  flex: 1;
  height: 22px;
  background: var(--c-border);
  border-radius: 3px;
  overflow: hidden;
  display: flex;
}
[data-bl-dc-fill] {
  height: 100%;
  border-radius: 3px;
  transition: width 0.4s ease;
  display: flex;
}
[data-bl-dc-segment] {
  height: 100%;
  transition: width 0.4s ease;
}
[data-bl-dc-row-val] {
  font-size: var(--fontsize-xs);
  color: var(--color-fg);
  font-weight: 600;
  min-width: 36px;
  font-variant-numeric: tabular-nums;
}
[data-bl-dc-legend] {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
[data-bl-dc-legend-item] {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: var(--fontsize-xs);
  color: var(--color-muted);
}
[data-bl-dc-legend-dot] {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  flex-shrink: 0;
}
`;

const PALETTE = [
  "var(--color-brand)",
  "#4ADE80",
  "#F59E0B",
  "#60A5FA",
  "#A78BFA",
  "#F472B6",
  "#34D399",
  "#FB923C",
];

export function DistributionChart({ data, type = "bar", normalize = false, showLegend = false }: DistributionChartProps) {
  const seriesKeys = data.length > 0 && data[0].series
    ? Object.keys(data[0].series)
    : [];

  const getTotal = (point: typeof data[0]) => {
    if (point.series) return Object.values(point.series).reduce((a, b) => a + b, 0);
    return point.value;
  };

  const maxTotal = Math.max(...data.map(getTotal), 1);

  return (
    <>
      <style>{styles}</style>
      <div data-bl-dist-chart>
        <div data-bl-dc-bars>
          {data.map((point, i) => {
            const total = getTotal(point);
            const barPct = normalize ? 100 : (total / maxTotal) * 100;

            if (type === "stack" && point.series && seriesKeys.length > 0) {
              const seriesTotal = Object.values(point.series).reduce((a, b) => a + b, 0) || 1;
              return (
                <div key={i} data-bl-dc-row>
                  <span data-bl-dc-row-label title={point.label}>{point.label}</span>
                  <div data-bl-dc-track>
                    <div data-bl-dc-fill style={{ width: `${barPct}%`, display: "flex" }}>
                      {seriesKeys.map((key, ki) => (
                        <div
                          key={key}
                          data-bl-dc-segment
                          style={{
                            width: `${((point.series![key] ?? 0) / seriesTotal) * 100}%`,
                            background: PALETTE[ki % PALETTE.length],
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <span data-bl-dc-row-val>{total.toLocaleString()}</span>
                </div>
              );
            }

            return (
              <div key={i} data-bl-dc-row>
                <span data-bl-dc-row-label title={point.label}>{point.label}</span>
                <div data-bl-dc-track>
                  <div
                    data-bl-dc-fill
                    style={{ width: `${barPct}%`, background: PALETTE[i % PALETTE.length] }}
                  />
                </div>
                <span data-bl-dc-row-val>{point.value.toLocaleString()}</span>
              </div>
            );
          })}
        </div>

        {showLegend && seriesKeys.length > 0 && (
          <div data-bl-dc-legend>
            {seriesKeys.map((key, ki) => (
              <div key={key} data-bl-dc-legend-item>
                <div data-bl-dc-legend-dot style={{ background: PALETTE[ki % PALETTE.length] }} />
                {key}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
