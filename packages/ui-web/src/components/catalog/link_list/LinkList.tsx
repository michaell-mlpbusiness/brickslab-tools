import React from "react";
import { LinkListProps } from "./LinkList.type";

export function LinkList({ links, title }: LinkListProps) {
  return (
    <div>
      {title && (
        <div
          style={{
            fontWeight: 600,
            fontSize: 14,
            color: "var(--color-fg)",
            marginBottom: 8,
          }}
        >
          {title}
        </div>
      )}
      <div>
        {links.map((item, index) => (
          <div
            key={item.href}
            style={{
              borderBottom:
                index < links.length - 1 ? "1px solid var(--c-border)" : "none",
              padding: "8px 0",
            }}
          >
            <a
              href={item.href}
              style={{
                fontWeight: 500,
                color: "var(--color-brand)",
                fontSize: 14,
                textDecoration: "none",
                display: "block",
              }}
            >
              {item.label}
            </a>
            {item.description && (
              <div
                style={{
                  fontSize: 12,
                  color: "var(--color-muted)",
                  marginTop: 2,
                }}
              >
                {item.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
