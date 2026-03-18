import React from "react";
import { FooterLinksProps } from "./FooterLinks.type";
export function FooterLinks({ title, links }: FooterLinksProps) {
  return (
    <div>
      {title && (
        <div
          style={{
            fontWeight: "var(--fontweight-semibold)",
            fontSize: "var(--fontsize-exs)",
            color: "var(--color-fg)",
            marginBottom: "var(--margin-md)",
          }}
        >
          {title}
        </div>
      )}
      <div style={{ display: "var(--display-flex)", flexDirection: "column" }}>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            style={{
              display: "block",
              color: "var(--color-muted)",
              textDecoration: "none",
              fontSize: "var(--fontsize-exs)",
              padding: "var(--space-1) 0",
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
