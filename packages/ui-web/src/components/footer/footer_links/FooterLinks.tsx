import React from "react";
import { FooterLinksProps } from "./FooterLinks.type";

export function FooterLinks({ title, links }: FooterLinksProps) {
  return (
    <div>
      {title && (
        <div
          style={{
            fontWeight: 600,
            fontSize: 13,
            color: "var(--color-fg)",
            marginBottom: 12,
          }}
        >
          {title}
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            style={{
              display: "block",
              color: "var(--color-muted)",
              textDecoration: "none",
              fontSize: 13,
              padding: "3px 0",
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
