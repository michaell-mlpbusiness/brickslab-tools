import React from "react";
import { FeatureListSectionProps } from "./FeatureListSection.type";

export function FeatureListSection({
  title,
  subtitle,
  features,
  columns,
}: FeatureListSectionProps) {
  return (
    <section style={{ padding: "60px 24px" }}>
      {(title || subtitle) && (
        <div style={{ marginBottom: title ? 48 : 0 }}>
          {title && (
            <h2
              style={{
                fontSize: "var(--fontsize-3xl)",
                fontWeight: "var(--fontweight-bold)",
                color: "var(--color-fg)",
                margin: 0,
              }}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p
              style={{
                color: "var(--color-muted)",
                marginTop: 8,
                marginBottom: 0,
                fontSize: "var(--fontsize-xl)",
                lineHeight: 1.6,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns ?? 3}, 1fr)`,
          gap: 32,
          marginTop: title ? 0 : 0,
        }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            style={{
              padding: 24,
              border: "1px solid var(--c-border)",
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--c-surface)",
            }}
          >
            {feature.icon && (
              <div style={{ width: 32, height: 32 }}>{feature.icon}</div>
            )}
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "var(--color-fg)",
                marginTop: feature.icon ? 12 : 0,
              }}
            >
              {feature.title}
            </div>
            <div
              style={{
                fontSize: 14,
                color: "var(--color-muted)",
                lineHeight: 1.6,
                marginTop: 6,
              }}
            >
              {feature.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
