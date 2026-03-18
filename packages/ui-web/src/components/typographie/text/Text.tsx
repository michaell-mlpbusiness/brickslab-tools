import React from "react";
import { TextProps } from "./Text.type";

const text_config: Record<
  "body-sm" | "body-md" | "body-lg" | "caption",
  {
    tag: React.ElementType;
    size: string;
    weight: string | number;
  }
> = {
  "body-sm": {
    tag: "p",
    size: "var(--fontsize-exs)",
    weight: "var(--fontweight-medium)",
  },
  "body-md": {
    tag: "p",
    size: "var(--fontsize-medium)",
    weight: "var(--fontweight-medium)",
  },
  "body-lg": {
    tag: "p",
    size: "var(--fontsize-lg)",
    weight: "var(--fontweight-medium)",
  },
  caption: {
    tag: "span",
    size: "var(--fontsize-xs)",
    weight: "var(--fontweight-light)",
  },
};

export function Text({
  texte,
  variant = "body-sm",
  align = "left",
  tone = "default",
  opacity,
  blurPx,
}: TextProps) {
  const { tag: Tag, size, weight } = text_config[variant] || text_config["body-sm"];

  const toneColor =
    tone === "muted"
      ? "var(--color-muted)"
      : tone === "brand"
        ? "var(--color-brand)"
        : "var(--color-fg)";

  const ariaProps =
    (blurPx && blurPx > 0) || (opacity && opacity < 0.3)
      ? { "aria-label": texte } // texte lisible par lecteur d'écran même flou / transparent
      : variant === "caption" && tone === "muted"
        ? { "aria-hidden": true } // décoratif
        : {};
  return (
    <Tag
      style={{
        fontSize: size,
        fontWeight: weight,
        color: toneColor,
        textAlign: align,
        opacity,
        filter: blurPx ? `blur(${blurPx}px)` : undefined,
        margin: 0,
        textWrap: "wrap",
      }}
      {...ariaProps}
    >
      {texte}
    </Tag>
  );
}
