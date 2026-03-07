"use client";

import { FooterContact, FooterLinks, FooterLegal } from "@brickslab./ui-web";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

export function FooterBar() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--c-border)",
        backgroundColor: "var(--c-surface)",
        padding: "40px clamp(16px, 4vw, 48px) 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr auto auto auto auto",
            gap: "clamp(24px, 4vw, 48px)",
            alignItems: "start",
          }}
        >
          <style>{`
            @media (max-width: 640px) {
              .footer-grid { grid-template-columns: 1fr 1fr !important; }
            }
          `}</style>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              fontFamily: "var(--font-brand), Montserrat, sans-serif",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
              <span style={{ color: "var(--color-brand)", fontWeight: 700, fontSize: "1em" }}>Brickslab.</span>
              <span style={{ color: "var(--color-muted)", fontSize: 12, opacity: 0.85 }}>by MLP Business</span>
            </div>
            <span style={{ color: "var(--color-muted)", fontSize: "0.85em" }}>Design System Catalog</span>
          </div>

          <FooterLinks
            title="Resources"
            links={[
              { label: "GitHub", href: "https://github.com/brickslab" },
              { label: "Website", href: "https://brickslablib.it.com/" },
              { label: "Documentation", href: "/docs" },
            ]}
          />

          <FooterLinks
            title="Legal"
            links={[
              { label: "Terms of Service", href: "/terms" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "License", href: "/license" },
            ]}
          />

          <FooterContact title="Contact" email="contact@mlp.business" />

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontWeight: 600, fontSize: 13, color: "var(--color-fg)" }}>Social</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <a
                href="https://github.com/brickslab"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                style={{ display: "flex", color: "var(--color-muted)", transition: "color 0.15s" }}
              >
                <FiGithub size={16} />
              </a>
              <span
                title="bientot"
                aria-label="Twitter bientot"
                style={{ display: "flex", color: "var(--color-muted)", opacity: 0.55, cursor: "not-allowed" }}
              >
                <FiTwitter size={16} />
              </span>
              <span
                title="bientot"
                aria-label="LinkedIn bientot"
                style={{ display: "flex", color: "var(--color-muted)", opacity: 0.55, cursor: "not-allowed" }}
              >
                <FiLinkedin size={16} />
              </span>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--c-border)", paddingTop: 20 }}>
          <FooterLegal
            copyright="Brickslab"
            links={[
              { label: "Privacy", href: "/privacy" },
              { label: "License", href: "/license" },
            ]}
          />
        </div>
      </div>
    </footer>
  );
}
