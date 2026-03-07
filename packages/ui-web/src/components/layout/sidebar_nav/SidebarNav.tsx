import React from "react";
import { SidebarNavProps } from "./SidebarNav.type";

export function SidebarNav({ sections, activePath, width }: SidebarNavProps) {
  return (
    <aside
      style={{
        width: width ?? 232,
        backgroundColor: "var(--c-surface)",
        borderRight: "1px solid var(--c-border)",
        overflowY: "auto",
        padding: "var(--space-7) 0",
        flexShrink: 0,
        boxSizing: "border-box",
      }}
    >
      {sections.map((section) => (
        <div key={section.title} style={{ marginBottom: "var(--space-6)" }}>
          <div
            style={{
              textTransform: "uppercase",
              fontSize: "var(--fontsize-xs)",
              fontWeight: "var(--fontweight-semibold)",
              color: "var(--color-muted)",
              letterSpacing: "0.1em",
              padding: "0 var(--space-5)",
              marginBottom: "var(--space-2)",
            }}
          >
            {section.title}
          </div>
          {section.items.map((item) => {
            const isActive = item.href === activePath;
            return (
              <a
                key={item.href}
                href={item.href}
                style={{
                  display: "block",
                  padding: "var(--space-2) var(--space-5)",
                  fontSize: "var(--fontsize-sm)",
                  fontWeight: isActive ? "var(--fontweight-semibold)" : "var(--fontweight-normal)",
                  color: isActive ? "#FBFBFB" : "var(--color-muted)",
                  borderLeft: isActive
                    ? "2px solid #CC4A48"
                    : "2px solid transparent",
                  backgroundColor: isActive ? "var(--c-brand-subtle)" : "transparent",
                  textDecoration: "none",
                  transition: "background 0.15s, color 0.15s",
                  boxSizing: "border-box",
                }}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
