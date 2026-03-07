import React from "react";
import { TextBlockProps } from "./TextBlock.type";

const toneColor: Record<NonNullable<TextBlockProps["tone"]>, string> = {
  default: "var(--color-fg)",
  muted: "var(--color-muted)",
  brand: "var(--color-brand)",
};

export function TextBlock({
  content,
  align = "left",
  tone = "default",
  maxWidth,
}: TextBlockProps) {
  return (
    <p
      style={{
        margin: 0,
        lineHeight: 1.75,
        maxWidth: maxWidth ?? "65ch",
        fontSize: "var(--fontsize-xl)",
        fontWeight: "var(--fontweight-medium)",
        color: toneColor[tone],
        textAlign: align,
      }}
    >
      {content}
    </p>
  );
}
