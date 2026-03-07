import React from "react";
import type { TopbarProps } from "./Topbar.type";

export function Topbar({
  logo,
  title,
  search,
  actions,
  height = 60,
  onBurgerClick,
}: TopbarProps) {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "var(--height-topbar)",
        backgroundColor: "var(--c-surface)",
        borderBottom: "1px solid var(--c-border)",
        display: "flex",
        alignItems: "center",
        padding: "0 clamp(12px, 4vw, 24px)",
        gap: "clamp(8px, 2vw, 16px)",
        zIndex: 100,
        boxSizing: "border-box",
      }}
    >
      {/* Burger menu button */}
      {onBurgerClick && (
        <button
          onClick={onBurgerClick}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Menu"
        >
          <div
            style={{
              width: 24,
              height: 2,
              backgroundColor: "var(--color-brand)",
            }}
          />
          <div
            style={{
              width: 24,
              height: 2,
              backgroundColor: "var(--color-brand)",
            }}
          />
          <div
            style={{
              width: 24,
              height: 2,
              backgroundColor: "var(--color-brand)",
            }}
          />
        </button>
      )}

      {/* Logo */}
      {logo && <div style={{ flexShrink: 0 }}>{logo}</div>}

      {/* Title */}
      {title && (
        <span
          style={{
            fontSize: "var(--fontsize-lg)",
            fontWeight: 700,
            color: "var(--color-fg)",
          }}
        >
          {title}
        </span>
      )}

      {/* Search */}
      {search && <div style={{ flex: 1, minWidth: 0 }}>{search}</div>}

      {/* Actions */}
      {actions && <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>{actions}</div>}
    </header>
  );
}
