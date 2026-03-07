"use client";

import React from "react";
import Link from "next/link";
import { CodeBlock } from "../../catalog/CodeBlock";
import { FiPackage, FiSettings, FiCode, FiZap, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

// ── Step card ─────────────────────────────────────────────────────────────────
function StepCard({
  number,
  icon,
  title,
  children,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--c-border)",
        overflow: "hidden",
        background: "var(--c-surface)",
      }}
    >
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--c-border)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: "var(--c-surface-elevated)",
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "-0.01em",
            color: "var(--color-brand)",
            background: "var(--c-brand-subtle)",
            border: "1px solid var(--c-brand-border)",
            padding: "2px 9px",
            borderRadius: 12,
          }}
        >
          {number}
        </span>
        <span style={{ color: "var(--color-brand)", display: "flex", alignItems: "center" }}>{icon}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: "var(--color-fg)" }}>{title}</span>
      </div>
      <div style={{ padding: "20px" }}>{children}</div>
    </div>
  );
}

// ── Inline code ───────────────────────────────────────────────────────────────
function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        fontSize: "0.875em",
        fontFamily: "var(--font-mono), ui-monospace, monospace",
        background: "var(--c-surface-elevated)",
        border: "1px solid var(--c-border)",
        borderRadius: 4,
        padding: "1px 6px",
        color: "#CC4A48",
      }}
    >
      {children}
    </code>
  );
}

// ── Callout box ───────────────────────────────────────────────────────────────
function InfoBox({
  variant = "info",
  children,
}: {
  variant?: "info" | "warning";
  children: React.ReactNode;
}) {
  const isWarning = variant === "warning";
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        padding: "12px 14px",
        borderRadius: "var(--radius-sm)",
        border: `1px solid ${isWarning ? "rgba(245,158,11,0.35)" : "var(--c-brand-border)"}`,
        background: isWarning ? "rgba(245,158,11,0.07)" : "var(--c-brand-subtle)",
        fontSize: 13,
        color: "var(--color-fg)",
        lineHeight: 1.6,
      }}
    >
      <span style={{ color: isWarning ? "#F59E0B" : "var(--color-brand)", flexShrink: 0, paddingTop: 1 }}>
        {isWarning ? <FiAlertCircle size={15} /> : <FiCheckCircle size={15} />}
      </span>
      <span>{children}</span>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function GettingStartedPage() {
  return (
    <div
      style={{
        maxWidth: 820,
        margin: "0 auto",
        padding: "48px clamp(16px, 4vw, 40px) 80px",
      }}
    >
      <style>{`
        .gs-token-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
        @media (max-width: 640px) { .gs-token-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 48 }}>
        <div
          style={{
            display: "inline-flex",
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--color-brand)",
            border: "1px solid var(--c-brand-border)",
            background: "var(--c-brand-subtle)",
            padding: "3px 12px",
            borderRadius: 20,
            marginBottom: 16,
          }}
        >
          Documentation
        </div>

        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 44px)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            margin: "0 0 14px 0",
            lineHeight: 1.1,
            color: "var(--color-fg)",
          }}
        >
          Getting Started
        </h1>

        <p
          style={{
            fontSize: 16,
            color: "var(--color-muted)",
            margin: 0,
            maxWidth: 560,
            lineHeight: 1.7,
          }}
        >
          Installez <InlineCode>@brickslab./ui-web</InlineCode> dans votre projet React en quelques minutes.
          La librairie est publiée sur le registre public npm, sous le scope d&apos;organisation{" "}
          <InlineCode>@brickslab.</InlineCode>.
        </p>
      </div>

      {/* ── Steps ───────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

        {/* 01 – Prérequis */}
        <StepCard number="01" icon={<FiCheckCircle size={15} />} title="Prérequis">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{ margin: 0, fontSize: 13, color: "var(--color-muted)", lineHeight: 1.6 }}>
              Assurez-vous d&apos;avoir les éléments suivants dans votre projet avant de continuer.
            </p>
            <div className="gs-token-grid">
              {[
                { label: "React", value: ">= 19" },
                { label: "react-dom", value: ">= 19" },
                { label: "TypeScript", value: "recommandé" },
                { label: "Node.js", value: ">= 18" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 12px",
                    background: "var(--c-surface-elevated)",
                    border: "1px solid var(--c-border)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-fg)", fontFamily: "var(--font-mono), ui-monospace, monospace" }}>{label}</span>
                  <span style={{ fontSize: 12, color: "var(--color-muted)" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </StepCard>

        {/* 02 – Installation */}
        <StepCard number="02" icon={<FiPackage size={15} />} title="Installer les packages">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ margin: 0, fontSize: 13, color: "var(--color-muted)", lineHeight: 1.6 }}>
              Installez la librairie de composants et le thème par défaut (tokens CSS).
              Utilisez npm avec <InlineCode>--legacy-peer-deps</InlineCode> pour éviter les conflits de peers.
            </p>

            <div>
              <p style={{ margin: "0 0 8px 0", fontSize: 11, fontWeight: 600, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>npm (recommandé)</p>
              <CodeBlock language="bash">
{`npm install --legacy-peer-deps
npm install @brickslab./ui-web@2.1.1 @brickslab./theme-default@2.0.0 --legacy-peer-deps`}
              </CodeBlock>
            </div>
          </div>
        </StepCard>

        {/* 03 – Tokens CSS */}
        <StepCard number="03" icon={<FiSettings size={15} />} title="Importer les tokens CSS">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ margin: 0, fontSize: 13, color: "var(--color-muted)", lineHeight: 1.6 }}>
              Les composants utilisent des variables CSS (<InlineCode>--color-fg</InlineCode>,{" "}
              <InlineCode>--c-surface</InlineCode>, <InlineCode>--radius-md</InlineCode>…).
              Importez le fichier de tokens dans votre layout racine ou votre CSS global.
            </p>

            <div>
              <p style={{ margin: "0 0 8px 0", fontSize: 11, fontWeight: 600, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Next.js — app/layout.tsx</p>
              <CodeBlock language="tsx" title="app/layout.tsx">
{`import "@brickslab./theme-default/dist/tokens.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}`}
              </CodeBlock>
            </div>

            <div>
              <p style={{ margin: "0 0 8px 0", fontSize: 11, fontWeight: 600, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Vite / CRA — main.tsx</p>
              <CodeBlock language="tsx" title="main.tsx">
{`import "@brickslab./theme-default/dist/tokens.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);`}
              </CodeBlock>
            </div>

            <div>
              <p style={{ margin: "0 0 8px 0", fontSize: 11, fontWeight: 600, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>CSS global uniquement</p>
              <CodeBlock language="css" title="globals.css">
{`@import "@brickslab./theme-default/dist/tokens.css";`}
              </CodeBlock>
            </div>

            <InfoBox>
              Le thème expose aussi un <strong>mode sombre</strong> via{" "}
              <InlineCode>[data-theme=&quot;dark&quot;]</InlineCode>. Appliquez cet attribut sur{" "}
              <InlineCode>{"<html>"}</InlineCode> pour activer le mode sombre.
            </InfoBox>
          </div>
        </StepCard>

        {/* 04 – Utilisation */}
        <StepCard number="04" icon={<FiCode size={15} />} title="Utiliser un composant">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ margin: 0, fontSize: 13, color: "var(--color-muted)", lineHeight: 1.6 }}>
              Importez n&apos;importe quel composant directement depuis <InlineCode>@brickslab./ui-web</InlineCode>.
              Tous les composants sont tree-shakeable — seuls ceux que vous importez sont inclus dans votre bundle.
            </p>

            <CodeBlock language="tsx" title="MyComponent.tsx">
{`import React from "react";
import { Button, Badge, Callout } from "@brickslab./ui-web";

export function MyComponent() {
  return (
    <div>
      <Callout variant="info" title="Brickslab">
        Design system prêt pour la production.
      </Callout>

      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <Button variant="primary">Commencer</Button>
        <Button variant="secondary">En savoir plus</Button>
      </div>

      <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
        <Badge variant="success">Stable</Badge>
        <Badge variant="info">TypeScript</Badge>
      </div>
    </div>
  );
}`}
            </CodeBlock>
          </div>
        </StepCard>

        {/* 05 – TypeScript */}
        <StepCard number="05" icon={<FiZap size={15} />} title="Autocomplétion TypeScript">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ margin: 0, fontSize: 13, color: "var(--color-muted)", lineHeight: 1.6 }}>
              Tous les composants exportent leurs types. Vous pouvez importer les types manuellement si nécessaire.
            </p>
            <CodeBlock language="tsx">
{`import { Button, type ButtonProps } from "@brickslab./ui-web";

// Les types sont disponibles pour l'autocomplétion
const MyButton = (props: ButtonProps) => <Button {...props} />;`}
            </CodeBlock>
            <InfoBox>
              Aucune configuration TypeScript supplémentaire n&apos;est requise — les types sont inclus dans le package via <InlineCode>dist/index.d.ts</InlineCode>.
            </InfoBox>
          </div>
        </StepCard>

      </div>

      {/* ── Next steps ──────────────────────────────────────────────── */}
      <div
        style={{
          marginTop: 56,
          padding: "28px 24px",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--c-border)",
          background: "var(--c-surface-elevated)",
        }}
      >
        <h2
          style={{
            fontSize: 16,
            fontWeight: 700,
            margin: "0 0 16px 0",
            color: "var(--color-fg)",
          }}
        >
          Prochaines étapes
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { href: "/catalog", label: "Parcourir le catalogue", description: "Tous les composants disponibles avec démos interactives." },
            { href: "/components/themebuilder", label: "Theme Builder", description: "Personnalisez les tokens CSS pour adapter le design à votre identité." },
            { href: "/tests", label: "Résultats d'audit", description: "Scores de qualité par composant sur 8 axes (a11y, API, perf…)." },
          ].map(({ href, label, description }) => (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                background: "var(--c-surface)",
                border: "1px solid var(--c-border)",
                borderRadius: "var(--radius-sm)",
                textDecoration: "none",
                transition: "border-color 0.15s, background 0.15s",
              }}
              className="gs-next-link"
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-fg)", marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 12, color: "var(--color-muted)" }}>{description}</div>
              </div>
              <span style={{ fontSize: 12, color: "var(--color-brand)", fontWeight: 600, whiteSpace: "nowrap", paddingLeft: 12 }}>→</span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .gs-next-link:hover {
          border-color: var(--c-brand-border) !important;
          background: var(--c-brand-subtle) !important;
        }
      `}</style>
    </div>
  );
}
