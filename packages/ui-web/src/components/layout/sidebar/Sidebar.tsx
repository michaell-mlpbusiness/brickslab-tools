import React from "react";
import type { SidebarProps, SidebarSection } from "./Sidebar.type";

export function Sidebar({
  sections,
  activePath,
  width = 280,
  topOffset = 60,
}: SidebarProps) {
  return (
    <aside
      style={{
        position: "fixed",
        top: topOffset,
        left: 0,
        bottom: 0,
        width,
        backgroundColor: "var(--c-surface)",
        borderRight: "1px solid var(--c-border)",
        overflowY: "auto",
        padding: "28px 0",
        boxSizing: "border-box",
        zIndex: 50,
      }}
    >
      {sections.map(({ title, items }) => (
        <div key={title} style={{ marginBottom: "var(--space-4)" }}>
          <p
            style={{
              padding: "0 20px",
              marginBottom: "var(--space-1)",
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
            {items.map(({ label, href }) => {
              const isActive = activePath === href;
              return (
                <li key={href}>
                  <a
                    href={href}
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
    </aside>
  );
}
