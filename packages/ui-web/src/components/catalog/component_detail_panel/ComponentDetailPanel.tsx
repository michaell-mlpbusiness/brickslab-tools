import React from "react";
import { ComponentDetailPanelProps } from "./ComponentDetailPanel.type";

export function ComponentDetailPanel({
  name,
  description,
  preview,
  code,
  badge,
}: ComponentDetailPanelProps) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", flexWrap: "wrap" }}>
        <h1
          style={{
            fontSize: "var(--fontsize-2xl)",
            fontWeight: "var(--fontweight-bold)",
            color: "var(--color-fg)",
            margin: 0,
          }}
        >
          {name}
        </h1>
        {badge && (
          <span
            style={{
              fontSize: "var(--fontsize-xs)",
              fontWeight: "var(--fontweight-medium)",
              color: "var(--color-brand)",
              border: "1px solid var(--c-brand-border)",
              backgroundColor: "var(--c-brand-subtle)",
              borderRadius: "var(--radius-sm)",
              padding: "2px 8px",
            }}
          >
            {badge}
          </span>
        )}
      </div>
      {description && (
        <p
          style={{
            fontSize: "var(--fontsize-medium)",
            color: "var(--color-muted)",
            lineHeight: 1.65,
            maxWidth: 620,
            marginTop: "var(--space-2)",
            marginBottom: 0,
          }}
        >
          {description}
        </p>
      )}
      {preview && (
        <div
          style={{
            padding: "var(--space-6)",
            border: "1px solid var(--c-border)",
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--c-surface)",
            marginTop: "var(--space-6)",
          }}
        >
          {preview}
        </div>
      )}
      {code && (
        <pre
          style={{
            marginTop: "var(--space-6)",
            padding: "var(--space-5)",
            border: "1px solid var(--c-border)",
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--c-surface-elevated)",
            overflowX: "auto",
          }}
        >
          <code
            style={{
              fontFamily: "monospace",
              fontSize: "var(--fontsize-xs)",
              color: "var(--color-fg)",
              whiteSpace: "pre",
            }}
          >
            {code}
          </code>
        </pre>
      )}
    </div>
  );
}
