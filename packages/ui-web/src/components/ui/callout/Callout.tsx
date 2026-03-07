import React from "react";
import { FiInfo, FiAlertTriangle, FiCheckCircle, FiAlertOctagon } from "react-icons/fi";
import { CalloutProps, CalloutVariant } from "./Callout.type";

const variantMap: Record<
  CalloutVariant,
  { bg: string; border: string; accent: string; leftBorder: string }
> = {
  info: {
    bg: "var(--c-brand-subtle)",
    border: "var(--c-brand-border)",
    accent: "var(--color-brand)",
    leftBorder: "#CC4A48",
  },
  warning: {
    bg: "var(--c-warning-subtle)",
    border: "var(--c-warning-border)",
    accent: "var(--color-warning)",
    leftBorder: "#F59E0B",
  },
  tip: {
    bg: "var(--c-success-subtle)",
    border: "var(--c-success-border)",
    accent: "var(--color-success)",
    leftBorder: "#4ADE80",
  },
  danger: {
    bg: "var(--c-brand-subtle)",
    border: "var(--c-brand-border)",
    accent: "var(--color-error)",
    leftBorder: "#CC4A48",
  },
};

const variantIcons: Record<CalloutVariant, React.ElementType> = {
  info: FiInfo,
  warning: FiAlertTriangle,
  tip: FiCheckCircle,
  danger: FiAlertOctagon,
};

const variantLabels: Record<CalloutVariant, string> = {
  info: "Info",
  warning: "Attention",
  tip: "Astuce",
  danger: "Danger",
};

export function Callout({ variant = "info", title, children }: CalloutProps) {
  const { bg, border, accent, leftBorder } = variantMap[variant];
  const Icon = variantIcons[variant];
  const defaultTitle = variantLabels[variant];

  return (
    <div
      data-bl-callout
      data-bl-callout-variant={variant}
      style={{
        backgroundColor: bg,
        border: `1px solid ${border}`,
        borderLeft: `3px solid ${leftBorder}`,
        borderRadius: "var(--radius-md)",
        padding: "var(--space-3) var(--space-4)",
        display: "flex",
        gap: "var(--space-3)",
        alignItems: "flex-start",
      }}
    >
      <Icon size={16} style={{ color: accent, flexShrink: 0, marginTop: 2 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            marginBottom: children ? "var(--space-1)" : 0,
            fontSize: "var(--fontsize-sm)",
            fontWeight: "var(--fontweight-semibold)",
            color: accent,
          }}
        >
          {title ?? defaultTitle}
        </p>
        {children && (
          <div
            style={{
              fontSize: "var(--fontsize-sm)",
              color: "var(--color-fg)",
              lineHeight: 1.6,
            }}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
