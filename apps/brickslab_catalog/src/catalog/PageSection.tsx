"use client";

// ── Shared layout primitives for component documentation pages ───────────────
import React from "react";
import { TagChip, HyperText } from "@brickslab./ui-web";

export function ComponentHeader({
  name,
  description,
  section,
}: {
  name: string;
  description: string;
  section?: string;
}) {
  return (
    <div style={{ marginBottom: "var(--space-6)" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "var(--space-2)",
          marginBottom: "var(--space-3)",
        }}
      >
        <HyperText
          as="h1"
          trigger="auto"
          duration={0.5}
          style={{
            margin: 0,
            fontSize: "var(--fontsize-2xl)",
            fontWeight: "var(--fontweight-black)",
            color: "var(--color-fg)",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}
        >
          {name}
        </HyperText>

        <span
          style={{
            fontSize: "var(--fontsize-2xs)",
            fontWeight: "var(--fontweight-semibold)",
            color: "#CC4A48",
            background: "var(--c-brand-subtle)",
            border: "1px solid var(--c-brand-border)",
            borderRadius: "var(--radius-sm)",
            padding: "2px 8px",
            fontFamily: "var(--font-mono), ui-monospace, monospace",
            whiteSpace: "nowrap",
          }}
        >
          @brickslab./ui-web
        </span>

        {section && (
          <TagChip
            label={section}
            variant="default"
            size="sm"
          />
        )}
      </div>

      <p
        style={{
          margin: 0,
          fontSize: "var(--fontsize-md)",
          color: "var(--color-muted)",
          lineHeight: 1.65,
          maxWidth: 640,
        }}
      >
        {description}
      </p>
    </div>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        margin: "48px 0 20px",
      }}
    >
      <h2
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "var(--color-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </h2>
      <div style={{ flex: 1, height: 1, backgroundColor: "var(--c-border)" }} />
    </div>
  );
}

export function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 12,
        color: "var(--color-muted)",
        marginBottom: 8,
        marginTop: 20,
        fontFamily: "var(--font-mono), ui-monospace, monospace",
        opacity: 0.75,
      }}
    >
      {children}
    </p>
  );
}

export function PropTag({ children }: { children: React.ReactNode }) {
  return <TagChip label={String(children)} variant="brand" size="sm" />;
}

export function Preview({
  children,
  background,
  style,
}: {
  children: React.ReactNode;
  background?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 24,
        alignItems: "flex-start",
        padding: 28,
        borderRadius: 8,
        border: "1px solid var(--c-border)",
        background: background ?? "var(--c-surface)",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
