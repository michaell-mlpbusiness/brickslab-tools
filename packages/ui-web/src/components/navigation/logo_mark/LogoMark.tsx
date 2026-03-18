import React from "react";
import { LogoMarkProps } from "./LogoMark.type";

const sizeMap: Record<NonNullable<LogoMarkProps["size"]>, number> = {
  sm: 20,
  md: 28,
  lg: 36,
};

// --- Sous-composants internes ---

// DefaultIcon — accepte shape
function DefaultIcon({
  fontSize,
  shape = "square",
}: {
  fontSize: number;
  shape?: "square" | "circle";
}) {
  return (
    <div
      role="img"
      aria-label="BricksLab icon"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: fontSize * 1.5,
        height: fontSize * 1.5,
        background: "var(--color-brand)",
        borderRadius: shape === "circle" ? "50%" : "var(--radius-sm)",
        fontFamily: "var(--font-brand), Montserrat, sans-serif",
        fontSize,
        fontWeight: 700,
        color: "#fff",
        lineHeight: 1,
        userSelect: "none",
        flexShrink: 0,
      }}
    >
      B
    </div>
  );
}

// CustomIcon — accepte shape
function CustomIcon({
  imgSrc,
  imgAlt = "Logo",
  fontSize,
  shape = "circle",
}: {
  imgSrc: string;
  imgAlt?: string;
  fontSize: number;
  shape?: "square" | "circle";
}) {
  return (
    <img
      src={imgSrc}
      alt={imgAlt}
      width={fontSize * 1.5}
      height={fontSize * 1.5}
      style={{
        display: "block",
        objectFit: "cover",
        flexShrink: 0,
        borderRadius: shape === "circle" ? "50%" : "var(--radius-sm)",
      }}
    />
  );
}

function DefaultText({ fontSize }: { fontSize: number }) {
  return (
    <div
      role="img"
      aria-label="BricksLab"
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

function CustomText({
  text,
  fontSize,
}: {
  text: string;
  fontSize: number;
}) {
  return (
    <span
      style={{
        fontFamily: "var(--font-brand), Montserrat, sans-serif",
        fontSize,
        fontWeight: 700,
        lineHeight: 1,
        color: "var(--color-brand)",
        userSelect: "none",
      }}
    >
      {text}
    </span>
  );
}

// --- Composant principal ---

export function LogoMark({
  size = "md",
  variant = "full",
  text,
  imgSrc,
  imgAlt,
}: LogoMarkProps) {
  const fontSize = sizeMap[size];

  if (variant === "icon") {
    return imgSrc ? (
      <CustomIcon imgSrc={imgSrc} imgAlt={imgAlt} fontSize={fontSize} />
    ) : (
      <DefaultIcon fontSize={fontSize} />
    );
  }

  if (variant === "full") {
    return text ? (
      <CustomText text={text} fontSize={fontSize} />
    ) : (
      <DefaultText fontSize={fontSize} />
    );
  }

  // variant === "both"
  const iconPart = imgSrc ? (
    <CustomIcon imgSrc={imgSrc} imgAlt={imgAlt} fontSize={fontSize} />
  ) : (
    <DefaultIcon fontSize={fontSize} />
  );

  const textPart = text ? (
    <CustomText text={text} fontSize={fontSize} />
  ) : (
    <DefaultText fontSize={fontSize} />
  );

  return (
    <div
      role="img"
      aria-label={text ?? "BricksLab"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: fontSize * 0.5,
      }}
    >
      {iconPart}
      {textPart}
    </div>
  );
}