import React from "react";
import { TopNavProps } from "./TopNav.type";

export function TopNav({ items, activePath }: TopNavProps) {
  return (
    <nav>
      <ul
        style={{
          display: "flex",
          gap: 24,
          listStyle: "none",
          padding: 0,
          margin: 0,
          fontSize: 14,
          alignItems: "center",
        }}
      >
        {items.map((item) => {
          const isActive = item.href === activePath;
          return (
            <li key={item.href}>
              <a
                href={item.href}
                style={{
                  color: isActive ? "var(--color-brand)" : "var(--color-muted)",
                  fontWeight: isActive ? 600 : 400,
                  borderBottom: isActive ? "2px solid var(--color-brand)" : "2px solid transparent",
                  textDecoration: "none",
                  paddingBottom: 2,
                  transition: "color 0.15s",
                }}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
