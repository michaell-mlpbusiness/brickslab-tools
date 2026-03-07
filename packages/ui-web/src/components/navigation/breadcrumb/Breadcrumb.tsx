import React from "react";
import { BreadcrumbProps } from "./Breadcrumb.type";

export function Breadcrumb({ items, separator = "/" }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb">
      <ol
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "6px",
          listStyle: "none",
          margin: 0,
          padding: 0,
          fontSize: "var(--fontsize-xs)",
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={index}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  style={{ color: isLast ? "var(--color-fg)" : "var(--color-muted)" }}
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  style={{
                    color: "var(--color-muted)",
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                </a>
              )}
              {!isLast && (
                <span
                  aria-hidden="true"
                  style={{ color: "var(--color-muted)", userSelect: "none" }}
                >
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
