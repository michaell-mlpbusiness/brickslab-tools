import React from "react";
import { FooterBarProps } from "./FooterBar.type";

export function FooterBar({ left, center, right, height }: FooterBarProps) {
  return (
    <footer
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        height: height ?? 60,
        backgroundColor: "var(--c-surface)",
        borderTop: "1px solid var(--c-border)",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>{left}</div>
      <div style={{ display: "flex", alignItems: "center" }}>{center}</div>
      <div style={{ display: "flex", alignItems: "center" }}>{right}</div>
    </footer>
  );
}
