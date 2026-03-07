import React from "react";
import { FooterLegalProps } from "./FooterLegal.type";

export function FooterLegal({
  copyright,
  year,
  links,
}: FooterLegalProps) {
  const displayYear = year ?? new Date().getFullYear();
  const displayCopyright = copyright ?? "BricksLab";

  return (
    <div style={{ fontSize: 12, color: "var(--color-muted)" }}>
      <span>
        {`© ${displayYear} ${displayCopyright}. All rights reserved.`}
      </span>
      {links && links.length > 0 && (
        <span style={{ marginLeft: 12 }}>
          {links.map((link, index) => (
            <React.Fragment key={link.href}>
              {index > 0 && (
                <span style={{ margin: "0 6px", userSelect: "none" }}>·</span>
              )}
              <a
                href={link.href}
                style={{
                  color: "var(--color-muted)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </a>
            </React.Fragment>
          ))}
        </span>
      )}
    </div>
  );
}
