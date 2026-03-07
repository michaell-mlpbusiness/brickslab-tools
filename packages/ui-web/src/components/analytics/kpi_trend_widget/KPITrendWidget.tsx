import React from "react";
import type { KPITrendWidgetProps } from "./KPITrendWidget.type";
import type { KPIFormat } from "../analytics.types";

const styles = `
[data-bl-kpi-widget] {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-md);
  background: var(--c-surface);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
[data-bl-kpi-widget]:hover {
  border-color: var(--c-brand-border);
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
[data-bl-kpi-header] {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}
[data-bl-kpi-title] {
  font-size: var(--fontsize-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-muted);
  opacity: 0.75;
}
[data-bl-kpi-timeframe] {
  font-size: 10px;
  color: var(--color-muted);
  opacity: 0.6;
  white-space: nowrap;
}
[data-bl-kpi-body] {
  display: flex;
  align-items: flex-end;
  gap: 12px;
}
[data-bl-kpi-value] {
  font-size: 30px;
  font-weight: 800;
  color: var(--color-fg);
  line-height: 1;
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
}
[data-bl-kpi-sparkline] {
  flex: 1;
  height: 36px;
  overflow: visible;
}
[data-bl-kpi-footer] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
[data-bl-kpi-delta] {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: var(--fontsize-xs);
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 999px;
}
[data-bl-kpi-delta][data-pos] {
  color: #4ADE80;
  background: color-mix(in srgb, #4ADE80 12%, transparent);
}
[data-bl-kpi-delta][data-neg] {
  color: #CC4A48;
  background: color-mix(in srgb, #CC4A48 10%, transparent);
}
[data-bl-kpi-target] {
  font-size: var(--fontsize-xs);
  color: var(--color-muted);
}
[data-bl-kpi-target-bar] {
  width: 100%;
  height: 3px;
  border-radius: 2px;
  background: var(--c-border);
  overflow: hidden;
}
[data-bl-kpi-target-fill] {
  height: 100%;
  border-radius: 2px;
  background: var(--color-brand);
  transition: width 0.3s ease;
}
[data-bl-kpi-skeleton] {
  background: linear-gradient(90deg, var(--c-surface-elevated) 25%, var(--c-border) 50%, var(--c-surface-elevated) 75%);
  background-size: 200% 100%;
  animation: bl-kpi-shimmer 1.5s infinite;
  border-radius: 4px;
}
@keyframes bl-kpi-shimmer { to { background-position: -200% 0; } }
`;

function formatValue(value: number | string, format?: KPIFormat): string {
  if (typeof value === "string") return value;
  switch (format) {
    case "percent": return `${value}%`;
    case "currency": return `$${value.toLocaleString()}`;
    case "time": {
      const m = Math.floor(value / 60);
      const s = value % 60;
      return m > 0 ? `${m}m ${s}s` : `${s}s`;
    }
    default: return value.toLocaleString();
  }
}

function Sparkline({ data }: { data: number[] }) {
  if (data.length < 2) return null;
  const W = 100;
  const H = 36;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / range) * (H - 4) - 2;
    return `${x},${y}`;
  });
  const last = pts[pts.length - 1].split(",");
  const firstVal = data[0];
  const lastVal = data[data.length - 1];
  const color = lastVal >= firstVal ? "#4ADE80" : "#CC4A48";

  return (
    <svg data-bl-kpi-sparkline viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
      <circle cx={last[0]} cy={last[1]} r="2.5" fill={color} />
    </svg>
  );
}

export function KPITrendWidget({
  title,
  value,
  delta,
  target,
  sparkline,
  format,
  timeframe,
  loading = false,
}: KPITrendWidgetProps) {
  const numVal = typeof value === "number" ? value : undefined;
  const targetPct = target && numVal ? Math.min((numVal / target) * 100, 100) : undefined;

  return (
    <>
      <style>{styles}</style>
      <div data-bl-kpi-widget>
        <div data-bl-kpi-header>
          <span data-bl-kpi-title>{title}</span>
          {timeframe && <span data-bl-kpi-timeframe>{timeframe}</span>}
        </div>

        {loading ? (
          <>
            <div data-bl-kpi-skeleton style={{ height: 30, width: "60%" }} />
            <div data-bl-kpi-skeleton style={{ height: 36, width: "100%" }} />
          </>
        ) : (
          <>
            <div data-bl-kpi-body>
              <span data-bl-kpi-value>{formatValue(value, format)}</span>
              {sparkline && sparkline.length > 1 && <Sparkline data={sparkline} />}
            </div>

            <div data-bl-kpi-footer>
              {delta !== undefined && (
                <span data-bl-kpi-delta data-pos={delta >= 0 ? "" : undefined} data-neg={delta < 0 ? "" : undefined}>
                  {delta >= 0 ? "↑" : "↓"} {Math.abs(delta)}%
                </span>
              )}
              {target && numVal !== undefined && (
                <span data-bl-kpi-target>
                  {Math.round((numVal / target) * 100)}% of {formatValue(target, format)} target
                </span>
              )}
            </div>

            {targetPct !== undefined && (
              <div data-bl-kpi-target-bar>
                <div data-bl-kpi-target-fill style={{ width: `${targetPct}%` }} />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
