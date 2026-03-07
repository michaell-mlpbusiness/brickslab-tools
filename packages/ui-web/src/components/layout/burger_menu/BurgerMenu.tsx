import React from "react";
import type { BurgerMenuProps, BurgerMenuSection } from "./BurgerMenu.type";

export function BurgerMenu({
  isOpen,
  onClose,
  sections,
  activePath,
  width = 280,
}: BurgerMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: "var(--z-modal, 1000)",
        }}
      />

      {/* Menu */}
      <nav
        style={{
          position: "fixed",
          top: 60,
          left: 0,
          bottom: 0,
          width,
          backgroundColor: "var(--c-surface)",
          borderRight: "1px solid var(--c-border)",
          overflowY: "auto",
          padding: "28px 0",
          boxSizing: "border-box",
          zIndex: "var(--z-modal, 1001)",
        }}
      >
        {sections.map(({ title, items }) => (
          <div key={title} style={{ marginBottom: 28 }}>
            <p
              style={{
                padding: "0 20px",
                marginBottom: 6,
                marginTop: 0,
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--color-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {title}
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {items.map(({ label, href, onClick }) => {
                const isActive = activePath === href;
                return (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        onClick?.();
                        onClose();
                        window.location.href = href;
                      }}
                      style={{
                        display: "block",
                        padding: "10px 20px",
                        fontSize: "14px",
                        color: isActive ? "var(--color-brand)" : "var(--color-fg)",
                        textDecoration: "none",
                        transition: "background-color 0.2s, color 0.2s",
                        backgroundColor: isActive ? "var(--c-brand-subtle)" : "transparent",
                        borderLeft: `3px solid ${isActive ? "var(--color-brand)" : "transparent"}`,
                        fontWeight: isActive ? 600 : 500,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor =
                          "var(--c-surface-secondary)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = isActive
                          ? "var(--c-brand-subtle)"
                          : "transparent";
                      }}
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </>
  );
}
