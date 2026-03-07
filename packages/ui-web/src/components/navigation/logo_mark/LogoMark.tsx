import React from "react";
import { LogoMarkProps } from "./LogoMark.type";

const sizeMap: Record<NonNullable<LogoMarkProps["size"]>, number> = {
  sm: 20,
  md: 28,
  lg: 36,
};

export function LogoMark({ size = "md", variant = "full" }: LogoMarkProps) {
  const fontSize = sizeMap[size];

  if (variant === "icon") {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: fontSize * 1.5,
          height: fontSize * 1.5,
          background: "var(--color-brand)",
          borderRadius: "var(--radius-sm)",
          fontFamily: "var(--font-brand), Montserrat, sans-serif",
          fontSize,
          fontWeight: 700,
          color: "#fff",
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        B
      </div>
    );
  }

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        fontFamily: "var(--font-brand), Montserrat, sans-serif",
        fontSize,
        fontWeight: 700,
        lineHeight: 1,
        userSelect: "none",
        gap: 0,
      }}
    >
      <span style={{ color: "var(--color-brand)" }}>Bricks</span>
      <span style={{ color: "var(--color-muted)" }}>Lab</span>
    </div>
  );
}
