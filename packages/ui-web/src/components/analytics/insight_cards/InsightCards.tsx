import React from "react";
import type { InsightCardsProps, InsightCardItem } from "./InsightCards.type";
import type { KPIFormat } from "../analytics.types";

const styles = `
[data-bl-insight-cards] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}
[data-bl-ic-card] {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px 20px;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-md);
  background: var(--c-surface);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
[data-bl-ic-card]:hover {
  border-color: var(--c-brand-border);
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
[data-bl-ic-card][data-variant="glass"] {
  background: color-mix(in srgb, var(--c-surface) 60%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-color: color-mix(in srgb, var(--c-border) 60%, transparent);
}
[data-bl-ic-label] {
  font-size: var(--fontsize-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-muted);
  opacity: 0.75;
}
[data-bl-ic-value] {
  font-size: 28px;
  font-weight: 800;
  color: var(--color-fg);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
[data-bl-ic-footer] {
  display: flex;
  align-items: center;
  gap: 6px;
}
[data-bl-ic-delta] {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: var(--fontsize-xs);
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 999px;
}
[data-bl-ic-delta][data-trend="up"] {
  color: #4ADE80;
  background: color-mix(in srgb, #4ADE80 12%, transparent);
}
[data-bl-ic-delta][data-trend="down"] {
  color: #CC4A48;
  background: color-mix(in srgb, #CC4A48 10%, transparent);
}
[data-bl-ic-delta][data-trend="flat"] {
  color: var(--color-muted);
  background: var(--c-surface-elevated);
}
`;

function formatValue(value: string | number, format?: KPIFormat): string {
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

function TrendArrow({ trend }: { trend: string }) {
  if (trend === "up") return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M5 8V2M2 5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (trend === "down") return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M5 2v6M2 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return <span>—</span>;
}

export function InsightCards({ items, variant = "solid" }: InsightCardsProps) {
  return (
    <>
      <style>{styles}</style>
      <div data-bl-insight-cards>
        {items.map((item, i) => (
          <div key={i} data-bl-ic-card data-variant={variant}>
            <span data-bl-ic-label>{item.label}</span>
            <span data-bl-ic-value>{formatValue(item.value, item.format)}</span>
            {(item.delta !== undefined || item.trend) && (
              <div data-bl-ic-footer>
                <span data-bl-ic-delta data-trend={item.trend ?? "flat"}>
                  <TrendArrow trend={item.trend ?? "flat"} />
                  {item.delta !== undefined ? `${item.delta > 0 ? "+" : ""}${item.delta}%` : ""}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
