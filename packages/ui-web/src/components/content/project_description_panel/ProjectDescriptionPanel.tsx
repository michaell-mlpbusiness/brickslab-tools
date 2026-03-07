import React from "react";
import { ProjectDescriptionPanelProps } from "./ProjectDescriptionPanel.type";

export function ProjectDescriptionPanel({
  title,
  description,
  tags,
  links,
}: ProjectDescriptionPanelProps) {
  return (
    <div
      style={{
        padding: "var(--padding-sm)",
        border: "1px solid var(--c-border)",
        borderRadius: "var(--radius-md)",
        backgroundColor: "var(--c-surface)",
      }}
    >
      <h3
        style={{
          fontSize: "var(--fontsize-2xl)",
          fontWeight: "var(--fontweight-bold)",
          color: "var(--color-fg)",
          margin: 0,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "var(--fontsize-xl)",
          color: "var(--color-muted)",
          lineHeight: 1.65,
          marginTop: "var(--space-2)",
          marginBottom: 0,
        }}
      >
        {description}
      </p>
      {tags && tags.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-2)",
            marginTop: "var(--space-3)",
          }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                display: "inline-block",
                fontSize: "var(--fontsize-xs)",
                padding: "var(--space-1) var(--space-2)",
                border: "1px solid var(--c-border)",
                borderRadius: "var(--space-1-5)",
                color: "var(--color-muted)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {links && links.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "var(--space-4)",
            marginTop: "var(--space-4)",
          }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: "var(--color-brand)",
                fontSize: "var(--fontsize-xs)",
                fontWeight: "var(--fontweight-medium)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
