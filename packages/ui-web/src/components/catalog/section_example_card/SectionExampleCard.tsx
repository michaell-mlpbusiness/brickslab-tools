import React from "react";
import { SectionExampleCardProps } from "./SectionExampleCard.type";

export function SectionExampleCard({
  title,
  description,
  preview,
  href,
}: SectionExampleCardProps) {
  return (
    <div
      style={{
        border: "1px solid var(--c-border)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        backgroundColor: "var(--c-surface)",
      }}
    >
      {preview && (
        <div
          style={{
            padding: 24,
            backgroundColor: "var(--c-surface-elevated)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 120,
          }}
        >
          {preview}
        </div>
      )}
      <div style={{ padding: "16px 20px" }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--color-fg)",
          }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{
              fontSize: 13,
              color: "var(--color-muted)",
              marginTop: 4,
            }}
          >
            {description}
          </div>
        )}
        {href && (
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
            <a
              href={href}
              style={{
                fontSize: 13,
                color: "var(--color-brand)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Voir →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
