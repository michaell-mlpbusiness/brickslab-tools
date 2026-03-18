import React from "react";
import { FooterLegalProps } from "./FooterLegal.type";

export function FooterLegal({ copyright, year, links }: FooterLegalProps) {
  const displayYear = year ?? new Date().getFullYear();
  const displayCopyright = copyright ?? "BricksLab";

  return (
    <div
      className="footer-legal"
      style={{
        display: "var(--display-flex)",
        flexWrap: "wrap",
        alignItems: "var(--align-items-center)",
        gap: "var(--space-1-5)",
        fontSize: "var(--fontsize-xs)",
        color: "var(--color-muted)",
        textDecoration: "none",
      }}
    >
      <span>
        {`© ${displayYear} ${displayCopyright}. All rights reserved.`}
      </span>
      {links && links.length > 0 && (
        <span
          className="links"
          style={{
            display: "var(--display-flex)",
            flexWrap: "wrap",
            alignItems: "var(--align-items-center)",
            marginLeft: "var(--space-3)",
            textDecoration: "none",
            color: "var(--color-muted)",
          }}
        >
          {links.map((link, index) => (
            <React.Fragment key={link.href}>
              {index > 0 && <span className="separator">·</span>}
              <a
                href={link.href}
                className="linked"
                style={{ textDecoration: "none" }}
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
