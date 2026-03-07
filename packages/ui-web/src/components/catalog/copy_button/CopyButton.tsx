import React from "react";
import { CopyButtonProps } from "./CopyButton.type";

export function CopyButton({
  onCopy,
  copied = false,
  label = "Copier",
  copiedLabel = "Copié !",
}: CopyButtonProps) {
  return (
    <button
      onClick={onCopy}
      style={{
        padding: "var(--space-1) var(--space-2)",
        fontSize: "var(--fontsize-xs)",
        fontWeight: "var(--fontweight-semibold)",
        fontFamily: "var(--font-brand), Montserrat, sans-serif",
        color: copied ? "#4ADE80" : "var(--color-muted)",
        background: "var(--c-surface)",
        border: "1px solid var(--c-border)",
        borderRadius: "var(--radius-sm)",
        cursor: "pointer",
        transition: "color 0.2s",
      }}
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
