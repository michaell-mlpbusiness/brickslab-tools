import React from "react";
import { FooterContactProps } from "./FooterContact.type";

export function FooterContact({
  email,
  phone,
  address,
  title = "Contact",
}: FooterContactProps) {
  return (
    <div style={{ fontSize: 13, color: "var(--color-muted)" }}>
      <div
        style={{
          fontWeight: 600,
          fontSize: 13,
          color: "var(--color-fg)",
          marginBottom: 8,
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {email && (
          <a
            href={`mailto:${email}`}
            style={{
              color: "var(--color-muted)",
              textDecoration: "none",
            }}
          >
            {email}
          </a>
        )}
        {phone && <span>{phone}</span>}
        {address && <span>{address}</span>}
      </div>
    </div>
  );
}
