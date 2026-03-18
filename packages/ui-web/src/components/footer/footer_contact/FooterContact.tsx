import React from "react";
import { FooterContactProps } from "./FooterContact.type";

export function FooterContact({
  email,
  phone,
  address,
  title = "Contact",
}: FooterContactProps) {
  return (
    <div style={{ fontSize: "var(--fontsize-exs)", color: "var(--color-muted)" }}>
      <div
        style={{
          fontWeight: "var(--fontweight-semibold)",
          fontSize: "var(--fontsize-sm)",
          color: "var(--color-fg)",
          marginBottom: "var(--margin-md)",
        }}
      >
        {title}
      </div>
      <div style={{ display: "var(--display-flex)", flexDirection: "column", gap: 4 }}>
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
