import React from "react";
import { FiInfo, FiCheckCircle, FiAlertTriangle, FiXCircle, FiX } from "react-icons/fi";
import type { AlertProps, AlertVariant } from "./Alert.type";

const alertStyles = `
[data-bl-alert-dismiss] {
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-1);
  border-radius: var(--radius-sm);
  color: inherit;
  opacity: 0.6;
  display: flex;
  align-items: center;
  transition: opacity 0.15s ease, background-color 0.15s ease;
  flex-shrink: 0;
}
[data-bl-alert-dismiss]:hover {
  opacity: 1;
  background-color: var(--c-border);
}
`;

const variantMap: Record<AlertVariant, { bg: string; border: string; accent: string }> = {
  info: {
    bg: "var(--c-brand-subtle)",
    border: "var(--c-brand-border)",
    accent: "var(--color-brand)",
  },
  success: {
    bg: "var(--c-success-subtle)",
    border: "var(--c-success-border)",
    accent: "var(--color-success)",
  },
  warning: {
    bg: "var(--c-warning-subtle)",
    border: "var(--c-warning-border)",
    accent: "var(--color-warning)",
  },
  error: {
    bg: "var(--c-brand-subtle)",
    border: "var(--c-brand-border)",
    accent: "var(--color-error)",
  },
};

const variantIcons: Record<AlertVariant, React.ElementType> = {
  info: FiInfo,
  success: FiCheckCircle,
  warning: FiAlertTriangle,
  error: FiXCircle,
};

export function Alert({
  variant = "info",
  title,
  children,
  dismissible = false,
  onDismiss,
  icon = true,
  fullWidth = false,
}: AlertProps) {
  const { bg, border, accent } = variantMap[variant];
  const Icon = variantIcons[variant];

  return (
    <>
      <style>{alertStyles}</style>
      <div
        data-bl-alert
        role="alert"
        style={{
          backgroundColor: bg,
          border: `1px solid ${border}`,
          borderRadius: "var(--radius-md)",
          padding: "var(--space-2) var(--space-3)",
          display: "flex",
          gap: "var(--space-3)",
          width: fullWidth ? "100%" : "auto",
          alignItems: "flex-start",
          boxSizing: "border-box",
        }}
      >
        {icon && (
          <Icon size={16} style={{ color: accent, flexShrink: 0, marginTop: 2 }} />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          {title && (
            <p
              style={{
                fontWeight: 600,
                marginBottom: 4,
                marginTop: 0,
                fontSize: "var(--fontsize-sm)",
                color: "var(--color-fg)",
              }}
            >
              {title}
            </p>
          )}
          <div
            style={{
              fontSize: "var(--fontsize-sm)",
              lineHeight: 1.5,
              color: "var(--color-fg)",
            }}
          >
            {children}
          </div>
        </div>
        {dismissible && onDismiss && (
          <button data-bl-alert-dismiss onClick={onDismiss} aria-label="Fermer">
            <FiX size={14} />
          </button>
        )}
      </div>
    </>
  );
}
