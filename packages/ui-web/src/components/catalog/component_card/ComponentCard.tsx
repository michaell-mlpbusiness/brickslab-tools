import React from "react";
import { ComponentCardProps } from "./ComponentCard.type";

const componentCardStyles = `
[data-bl-component-card] {
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  background-color: var(--c-surface);
  overflow: hidden;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
}
[data-bl-component-card]:hover {
  border-color: var(--color-brand);
  box-shadow: var(--shadow-2);
  transform: translateY(-2px);
}
[data-bl-component-card-link] {
  text-decoration: none;
  display: block;
}
`;

export function ComponentCard({
  label,
  section,
  description,
  href,
  type = "web",
  preview,
  isNew = false,
}: ComponentCardProps) {
  return (
    <>
      <style>{componentCardStyles}</style>
      <a href={href} data-bl-component-card-link>
        <div data-bl-component-card>
          {preview && (
            <div
              style={{
                padding: "var(--space-4)",
                backgroundColor: "var(--c-surface-elevated)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 112,
                borderBottom: "1px solid var(--c-border)",
              }}
            >
              {preview}
            </div>
          )}
          <div style={{ padding: "var(--space-3) var(--space-4)", flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-2)" }}>
              <span
                style={{
                  fontSize: "var(--fontsize-sm)",
                  fontWeight: "var(--fontweight-semibold)",
                  color: "var(--color-fg)",
                }}
              >
                {label}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1)", flexShrink: 0 }}>
                {isNew && (
                  <span
                    style={{
                      fontSize: "var(--fontsize-2xs)",
                      fontWeight: "var(--fontweight-semibold)",
                      color: "#4ADE80",
                      background: "rgba(74,222,128,0.12)",
                      border: "1px solid rgba(74,222,128,0.35)",
                      borderRadius: "var(--radius-full)",
                      padding: "1px 7px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    New
                  </span>
                )}
                <span
                  style={{
                    fontSize: "var(--fontsize-2xs)",
                    fontWeight: "var(--fontweight-medium)",
                    color: type === "web" ? "var(--color-brand)" : "var(--color-muted)",
                    background: type === "web" ? "var(--c-brand-subtle)" : "var(--c-surface-elevated)",
                    border: `1px solid ${type === "web" ? "var(--c-brand-border)" : "var(--c-border)"}`,
                    borderRadius: "var(--radius-full)",
                    padding: "1px 7px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {type}
                </span>
              </div>
            </div>
            <span
              style={{
                fontSize: "var(--fontsize-xs)",
                color: "var(--color-muted)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {section}
            </span>
            {description && (
              <p
                style={{
                  fontSize: "var(--fontsize-xs)",
                  color: "var(--color-muted)",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {description}
              </p>
            )}
          </div>
        </div>
      </a>
    </>
  );
}
