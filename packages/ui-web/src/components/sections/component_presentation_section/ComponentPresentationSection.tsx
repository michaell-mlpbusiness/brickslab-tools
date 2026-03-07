import React from "react";
import { ComponentPresentationSectionProps } from "./ComponentPresentationSection.type";

export function ComponentPresentationSection({
  name,
  description,
  preview,
  children,
}: ComponentPresentationSectionProps) {
  return (
    <section style={{ marginBottom: "var(--space-20)" }}>
      <h2
        style={{
          fontSize: "var(--fontsize-3xl)",
          fontWeight: "var(--fontweight-bold)",
          color: "var(--color-fg)",
          margin: 0,
        }}
      >
        {name}
      </h2>
      <p
        style={{
          fontSize: "var(--fontsize-medium)",
          color: "var(--color-muted)",
          lineHeight: 1.65,
          maxWidth: 640,
          marginTop: "var(--space-2)",
          marginBottom: 0,
        }}
      >
        {description}
      </p>
      <div
        style={{
          padding: "var(--space-8)",
          border: "1px solid var(--c-border)",
          borderRadius: "var(--radius-md)",
          background: "var(--c-surface)",
          marginTop: "var(--space-6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {preview}
      </div>
      {children && <div style={{ marginTop: "var(--space-6)" }}>{children}</div>}
    </section>
  );
}
