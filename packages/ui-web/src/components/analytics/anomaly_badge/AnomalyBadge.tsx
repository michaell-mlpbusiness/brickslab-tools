import React from "react";
import type { AnomalyBadgeProps } from "./AnomalyBadge.type";
import type { AnomalyLevel } from "../analytics.types";

const styles = `
[data-bl-anomaly-badge] {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 12px;
  border-radius: var(--radius-sm);
  font-size: var(--fontsize-xs);
  font-weight: 600;
  border: 1.5px solid;
  cursor: default;
  transition: opacity 0.15s ease;
  user-select: none;
}
[data-bl-anomaly-badge][data-clickable] {
  cursor: pointer;
}
[data-bl-anomaly-badge][data-clickable]:hover {
  opacity: 0.8;
}
[data-bl-anomaly-badge][data-level="info"] {
  color: var(--color-brand);
  background: var(--c-brand-subtle);
  border-color: var(--c-brand-border);
}
[data-bl-anomaly-badge][data-level="warn"] {
  color: #F59E0B;
  background: color-mix(in srgb, #F59E0B 10%, transparent);
  border-color: color-mix(in srgb, #F59E0B 35%, transparent);
}
[data-bl-anomaly-badge][data-level="critical"] {
  color: #CC4A48;
  background: color-mix(in srgb, #CC4A48 10%, transparent);
  border-color: color-mix(in srgb, #CC4A48 35%, transparent);
}
[data-bl-ab-dot] {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  animation: bl-ab-pulse 2s ease-in-out infinite;
}
[data-bl-anomaly-badge][data-level="info"] [data-bl-ab-dot] { background: var(--color-brand); }
[data-bl-anomaly-badge][data-level="warn"] [data-bl-ab-dot] { background: #F59E0B; }
[data-bl-anomaly-badge][data-level="critical"] [data-bl-ab-dot] { background: #CC4A48; }
@keyframes bl-ab-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.7); }
}
[data-bl-ab-confidence] {
  font-weight: 400;
  opacity: 0.75;
  margin-left: 2px;
}
`;

export function AnomalyBadge({ level = "info", message, confidence, onClick }: AnomalyBadgeProps) {
  return (
    <>
      <style>{styles}</style>
      <div
        data-bl-anomaly-badge
        data-level={level}
        data-clickable={onClick ? "" : undefined}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        onClick={onClick}
        onKeyDown={(e) => {
          if (onClick && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); onClick(); }
        }}
      >
        <div data-bl-ab-dot />
        {message}
        {confidence !== undefined && (
          <span data-bl-ab-confidence>{Math.round(confidence * 100)}%</span>
        )}
      </div>
    </>
  );
}
