import React from "react";
import { HeaderBarProps } from "./HeaderBar.type";

export function HeaderBar({ logo, nav, actions, height }: HeaderBarProps) {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: height ?? 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        backgroundColor: "var(--c-surface)",
        borderBottom: "1px solid var(--c-border)",
        zIndex: 100,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>{logo}</div>
      <div style={{ display: "flex", alignItems: "center" }}>{nav}</div>
      <div style={{ display: "flex", alignItems: "center" }}>{actions}</div>
    </header>
  );
}
