import React from "react";
import { ButtonProps, ButtonVariant, ButtonSize } from "./Button.type";

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: "var(--color-brand)",
    color: "#FBFBFB",
    border: "none",
  },
  secondary: {
    backgroundColor: "var(--c-surface-elevated)",
    color: "var(--color-fg)",
    border: "1px solid var(--c-border)",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "var(--color-fg)",
    border: "none",
  },
  danger: {
    backgroundColor: "var(--color-error)",
    color: "#FBFBFB",
    border: "none",
  },
  custom: {},
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: {
    height: "28px",
    paddingLeft: "var(--space-3)",
    paddingRight: "var(--space-3)",
    paddingTop: "var(--space-2)",
    paddingBottom: "var(--space-2)",
    fontSize: "var(--fontsize-xs)",
  },
  md: {
    height: "var(--height-input)",
    paddingLeft: "var(--space-5)",
    paddingRight: "var(--space-5)",
    paddingTop: "var(--space-3)",
    paddingBottom: "var(--space-3)",
    fontSize: "var(--fontsize-sm)",
  },
  lg: {
    height: "44px",
    paddingLeft: "var(--space-6)",
    paddingRight: "var(--space-6)",
    paddingTop: "var(--space-4)",
    paddingBottom: "var(--space-4)",
    fontSize: "var(--fontsize-medium)",
  },
};

const buttonStyles = `
  [data-bl-button]:hover:not(:disabled) { filter: brightness(0.88); }
  [data-bl-button]:focus-visible { outline: var(--focus-ring); outline-offset: 2px; }
  @keyframes bl-spin { to { transform: rotate(360deg); } }
  [data-bl-spinner] { animation: bl-spin 0.7s linear infinite; }
`;

function Spinner() {
  return (
    <svg
      data-bl-spinner
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="2"
      />
      <path
        d="M8 2a6 6 0 0 1 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  onClick,
  type = "button",
  children,
  customBg,
  customColor,
  style: userStyle,
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <>
      <style>{buttonStyles}</style>
      <button
        data-bl-button
        type={type}
        disabled={isDisabled}
        onClick={onClick}
        style={{
          // variant custom gets priority overrides
          ...(variant === "custom"
            ? {
                backgroundColor: customBg || "var(--color-brand)",
                color: customColor || "var(--color-fg)",
              }
            : variantStyles[variant]),
          ...sizeStyles[size],
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--space-2)",
          borderRadius: "var(--radius-sm)",
          fontWeight: "var(--fontweight-semibold)" as React.CSSProperties["fontWeight"],
          transition: "var(--transition-all)",
          cursor: isDisabled ? "not-allowed" : "pointer",
          opacity: isDisabled ? 0.6 : 1,
          width: fullWidth ? "100%" : undefined,
          boxSizing: "border-box",
          lineHeight: 1,
          textDecoration: "none",
          userSelect: "none",
          outline: "none",
          flexShrink: 0,
          ...userStyle,
        }}
      >
        {isLoading ? <Spinner /> : leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    </>
  );
}
