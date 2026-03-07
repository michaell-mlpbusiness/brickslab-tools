"use client";

import React from "react";
import Link from "next/link";
import { CodeBlock } from "../../catalog/CodeBlock";
import {
  FiBookOpen,
  FiBox,
  FiSliders,
  FiGitBranch,
  FiPlusCircle,
  FiArrowRight,
  FiMoon,
  FiSun,
  FiAlertCircle,
  FiCheckCircle,
  FiEdit3,
} from "react-icons/fi";

// ─────────────────────────────────────────────────────────────────────────────
// Primitives
// ─────────────────────────────────────────────────────────────────────────────

function SectionAnchor({ id, title, icon }: { id: string; title: string; icon: React.ReactNode }) {
  return (
    <div
      id={id}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        margin: "64px 0 28px",
        scrollMarginTop: 80,
      }}
    >
      <span
        style={{
          width: 32,
          height: 32,
          borderRadius: "var(--radius-sm)",
          background: "var(--c-brand-subtle)",
          border: "1px solid var(--c-brand-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-brand)",
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <h2
        style={{
          fontSize: "clamp(18px, 3vw, 24px)",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          margin: 0,
          color: "var(--color-fg)",
        }}
      >
        {title}
      </h2>
      <div style={{ flex: 1, height: 1, background: "var(--c-border)" }} />
    </div>
  );
}

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

function InfoBox({
  variant = "info",
  children,
}: {
  variant?: "info" | "warning";
  children: React.ReactNode;
}) {
  const warn = variant === "warning";
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        padding: "12px 14px",
        borderRadius: "var(--radius-sm)",
        border: `1px solid ${warn ? "rgba(245,158,11,0.35)" : "var(--c-brand-border)"}`,
        background: warn ? "rgba(245,158,11,0.07)" : "var(--c-brand-subtle)",
        fontSize: 13,
        color: "var(--color-fg)",
        lineHeight: 1.6,
      }}
    >
      <span style={{ color: warn ? "#F59E0B" : "var(--color-brand)", flexShrink: 0, paddingTop: 1 }}>
        {warn ? <FiAlertCircle size={15} /> : <FiCheckCircle size={15} />}
      </span>
      <span>{children}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Token Tables
// ─────────────────────────────────────────────────────────────────────────────

function TokenRow({
  name,
  value,
  swatch,
  description,
}: {
  name: string;
  value: string;
  swatch?: string;
  description?: string;
}) {
  return (
    <tr>
      <td style={{ padding: "9px 12px", borderBottom: "1px solid var(--c-border)" }}>
        <code
          style={{
            fontSize: 12,
            fontFamily: "var(--font-mono), ui-monospace, monospace",
            color: "#CC4A48",
          }}
        >
          {name}
        </code>
      </td>
      <td style={{ padding: "9px 12px", borderBottom: "1px solid var(--c-border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {swatch && (
            <span
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
                background: swatch,
                border: "1px solid var(--c-border)",
                flexShrink: 0,
                display: "inline-block",
              }}
            />
          )}
          <code style={{ fontSize: 12, fontFamily: "var(--font-mono), ui-monospace, monospace", color: "var(--color-muted)" }}>
            {value}
          </code>
        </div>
      </td>
      {description !== undefined && (
        <td style={{ padding: "9px 12px", borderBottom: "1px solid var(--c-border)", fontSize: 12, color: "var(--color-muted)" }}>
          {description}
        </td>
      )}
    </tr>
  );
}

function TokenTable({
  title,
  headers,
  children,
}: {
  title: string;
  headers: string[];
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 32 }}>
      <p
        style={{
          margin: "0 0 10px 0",
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--color-muted)",
        }}
      >
        {title}
      </p>
      <div
        style={{
          border: "1px solid var(--c-border)",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--c-surface-elevated)" }}>
              {headers.map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "8px 12px",
                    borderBottom: "1px solid var(--c-border)",
                    textAlign: "left",
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--color-muted)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{ background: "var(--c-surface)" }}>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step (for "Ajouter un composant")
// ─────────────────────────────────────────────────────────────────────────────

function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", gap: 20 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "var(--c-brand-subtle)",
            border: "1px solid var(--c-brand-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 800,
            color: "var(--color-brand)",
            flexShrink: 0,
          }}
        >
          {n}
        </div>
        <div style={{ width: 1, flex: 1, background: "var(--c-border)", marginTop: 4 }} />
      </div>
      <div style={{ paddingBottom: 32, flex: 1 }}>
        <p style={{ margin: "4px 0 12px", fontSize: 14, fontWeight: 700, color: "var(--color-fg)" }}>{title}</p>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

const NAV_CARDS = [
  {
    href: "#tokens",
    icon: <FiSliders size={18} />,
    title: "Design Tokens",
    description: "Référence complète de toutes les variables CSS.",
  },
  {
    href: "#theming",
    icon: <FiMoon size={18} />,
    title: "Theming & Dark mode",
    description: "Personnalisation du thème et gestion du mode sombre.",
  },
  {
    href: "#override-components",
    icon: <FiEdit3 size={18} />,
    title: "Override composants",
    description: "Comment surcharger taille, couleur et style des composants.",
  },
  {
    href: "#architecture",
    icon: <FiGitBranch size={18} />,
    title: "Architecture",
    description: "Structure du monorepo, conventions de code.",
  },
  {
    href: "#add-component",
    icon: <FiPlusCircle size={18} />,
    title: "Ajouter un composant",
    description: "Checklist complète pour créer et publier un nouveau composant.",
  },
];

export default function DocsPage() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px clamp(16px, 4vw, 40px) 96px" }}>
      <style>{`
        .docs-nav-card:hover {
          border-color: var(--c-brand-border) !important;
          background: var(--c-brand-subtle) !important;
        }
        .docs-nav-card:hover .docs-nav-arrow { color: var(--color-brand) !important; }
        .docs-checklist li::marker { color: var(--color-brand); }
      `}</style>

      {/* ── Header ──────────────────────────────────────────────── */}
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
          Documentation
        </h1>

        <p
          style={{
            fontSize: 16,
            color: "var(--color-muted)",
            margin: "0 0 32px 0",
            maxWidth: 560,
            lineHeight: 1.7,
          }}
        >
          Référence technique de <InlineCode>@brickslab./ui-web</InlineCode> — tokens CSS, theming,
          architecture du monorepo et guide de contribution.
        </p>

        {/* Quick links bar */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link href="/getting-started" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600, color: "var(--color-brand)", textDecoration: "none", padding: "5px 12px", border: "1px solid var(--c-brand-border)", borderRadius: "var(--radius-full)", background: "var(--c-brand-subtle)" }}>
            <FiBookOpen size={13} /> Getting Started
          </Link>
          <Link href="/catalog" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600, color: "var(--color-muted)", textDecoration: "none", padding: "5px 12px", border: "1px solid var(--c-border)", borderRadius: "var(--radius-full)", background: "var(--c-surface-elevated)" }}>
            <FiBox size={13} /> Catalogue
          </Link>
        </div>
      </div>

      {/* ── Quick nav cards ──────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 12,
          marginBottom: 16,
        }}
      >
        {NAV_CARDS.map(({ href, icon, title, description }) => (
          <a
            key={href}
            href={href}
            className="docs-nav-card"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              padding: "16px",
              border: "1px solid var(--c-border)",
              borderRadius: "var(--radius-md)",
              background: "var(--c-surface)",
              textDecoration: "none",
              transition: "border-color 0.15s, background 0.15s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ color: "var(--color-brand)" }}>{icon}</span>
              <FiArrowRight size={13} className="docs-nav-arrow" style={{ color: "var(--color-muted)", transition: "color 0.15s" }} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-fg)", marginBottom: 3 }}>{title}</div>
              <div style={{ fontSize: 12, color: "var(--color-muted)", lineHeight: 1.5 }}>{description}</div>
            </div>
          </a>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — DESIGN TOKENS
      ═══════════════════════════════════════════════════════════ */}
      <SectionAnchor id="tokens" title="Design Tokens" icon={<FiSliders size={15} />} />

      <p style={{ margin: "0 0 28px", fontSize: 14, color: "var(--color-muted)", lineHeight: 1.7 }}>
        Tous les composants utilisent exclusivement des variables CSS. Aucune valeur hardcodée (sauf exceptions
        documentées ci-dessous). Ces variables sont définies dans{" "}
        <InlineCode>@brickslab./theme-default/dist/tokens.css</InlineCode>.
      </p>

      {/* Colors: semantic */}
      <TokenTable title="Couleurs — Sémantiques" headers={["Token", "Valeur (light)", "Usage"]}>
        <TokenRow name="--color-bg" value="#ffffff" swatch="#ffffff" description="Fond de page principal" />
        <TokenRow name="--color-fg" value="#0b1220" swatch="#0b1220" description="Texte principal" />
        <TokenRow name="--color-muted" value="#52607a" swatch="#52607a" description="Texte secondaire, labels, métadonnées" />
        <TokenRow name="--color-brand" value="#CC4A48" swatch="#CC4A48" description="Couleur d'accentuation principale" />
        <TokenRow name="--color-brand-dark" value="#8F2834" swatch="#8F2834" description="Variante sombre de la marque (hover)" />
        <TokenRow name="--color-success" value="#4ADE80" swatch="#4ADE80" description="État de succès" />
        <TokenRow name="--color-warning" value="#F59E0B" swatch="#F59E0B" description="État d'avertissement" />
        <TokenRow name="--color-error" value="#CC4A48" swatch="#CC4A48" description="État d'erreur" />
        <TokenRow name="--color-info" value="#3B82F6" swatch="#3B82F6" description="État informatif" />
        <TokenRow name="--color-excellent" value="#22C55E" swatch="#22C55E" description="Score excellent, KPI positif" />
      </TokenTable>

      {/* Colors: surfaces */}
      <TokenTable title="Couleurs — Surfaces" headers={["Token", "Valeur (light)", "Usage"]}>
        <TokenRow name="--c-surface" value="#ffffff" swatch="#ffffff" description="Surface de base (cards, panels)" />
        <TokenRow name="--c-surface-elevated" value="#f7f7f7" swatch="#f7f7f7" description="Surface surélevée (thead, hover rows)" />
        <TokenRow name="--c-surface-secondary" value="#f5f5f5" swatch="#f5f5f5" description="Surface alternative (sidebars)" />
        <TokenRow name="--c-border" value="#e0e0e0" swatch="#e0e0e0" description="Bordures et séparateurs" />
        <TokenRow name="--c-brand-subtle" value="rgba(204,74,72,0.08)" swatch="rgba(204,74,72,0.08)" description="Fond subtil brand (tags, callouts)" />
        <TokenRow name="--c-brand-border" value="rgba(204,74,72,0.3)" swatch="rgba(204,74,72,0.3)" description="Bordure subtile brand" />
      </TokenTable>

      {/* Status */}
      <TokenTable title="Couleurs — Statuts (subtle & borders)" headers={["Token", "Valeur (light)"]}>
        <TokenRow name="--c-success-subtle" value="rgba(74,222,128,0.10)" swatch="rgba(74,222,128,0.10)" />
        <TokenRow name="--c-success-border" value="rgba(74,222,128,0.35)" swatch="rgba(74,222,128,0.35)" />
        <TokenRow name="--c-warning-subtle" value="rgba(245,158,11,0.10)" swatch="rgba(245,158,11,0.10)" />
        <TokenRow name="--c-warning-border" value="rgba(245,158,11,0.35)" swatch="rgba(245,158,11,0.35)" />
        <TokenRow name="--c-info-subtle" value="rgba(59,130,246,0.10)" swatch="rgba(59,130,246,0.10)" />
        <TokenRow name="--c-info-border" value="rgba(59,130,246,0.35)" swatch="rgba(59,130,246,0.35)" />
      </TokenTable>

      {/* Spacing */}
      <TokenTable title="Espacement" headers={["Token", "Valeur"]}>
        {[
          ["--space-1", "2px"], ["--space-1-5", "4px"], ["--space-2", "8px"],
          ["--space-3", "12px"], ["--space-4", "16px"], ["--space-5", "20px"],
          ["--space-6", "24px"], ["--space-7", "28px"], ["--space-8", "32px"],
          ["--space-10", "40px"], ["--space-12", "48px"], ["--space-15", "60px"],
          ["--space-20", "80px"],
        ].map(([name, value]) => (
          <TokenRow key={name} name={name} value={value} />
        ))}
      </TokenTable>

      {/* Typography */}
      <TokenTable title="Typographie — Tailles" headers={["Token", "Valeur"]}>
        {[
          ["--fontsize-2xs", "10px"],
          ["--fontsize-xs", "12px"],
          ["--fontsize-sm", "14px"],
          ["--fontsize-medium", "16px"],
          ["--fontsize-lg", "clamp(18px, 5vw, 48px)"],
          ["--fontsize-xl", "clamp(20px, 5vw, 48px)"],
          ["--fontsize-2xl", "clamp(24px, 5vw, 48px)"],
          ["--fontsize-3xl", "clamp(30px, 5vw, 48px)"],
          ["--fontsize-4xl", "clamp(36px, 5vw, 48px)"],
        ].map(([name, value]) => (
          <TokenRow key={name} name={name} value={value} />
        ))}
      </TokenTable>

      <TokenTable title="Typographie — Graisses" headers={["Token", "Valeur"]}>
        {[
          ["--fontweight-light", "300"],
          ["--fontweight-normal", "400"],
          ["--fontweight-medium", "500"],
          ["--fontweight-semibold", "600"],
          ["--fontweight-bold", "700"],
          ["--fontweight-extrabold", "800"],
          ["--fontweight-black", "900"],
        ].map(([name, value]) => (
          <TokenRow key={name} name={name} value={value} />
        ))}
      </TokenTable>

      {/* Radius + Shadows + Misc */}
      <TokenTable title="Radius" headers={["Token", "Valeur"]}>
        <TokenRow name="--radius-sm" value="6px" />
        <TokenRow name="--radius-md" value="12px" />
        <TokenRow name="--radius-lg" value="16px" />
        <TokenRow name="--radius-full" value="999px" />
      </TokenTable>

      <TokenTable title="Ombres, Z-index & Utilitaires" headers={["Token", "Valeur"]}>
        <TokenRow name="--shadow-1" value="0 1px 2px rgba(0,0,0,0.06)" />
        <TokenRow name="--shadow-2" value="0 10px 30px rgba(0,0,0,0.10)" />
        <TokenRow name="--z-base" value="0" />
        <TokenRow name="--z-drawer" value="50" />
        <TokenRow name="--z-dropdown" value="100" />
        <TokenRow name="--z-modal" value="1000" />
        <TokenRow name="--height-topbar" value="60px" />
        <TokenRow name="--height-input" value="38px" />
        <TokenRow name="--focus-ring" value="0 0 0 3px rgba(204,74,72,0.25)" />
        <TokenRow name="--transition-bg" value="background 0.2s ease" />
        <TokenRow name="--transition-all" value="all 0.2s ease" />
      </TokenTable>

      <InfoBox>
        <strong>Couleurs hardcodées autorisées</strong> — par convention, seules ces valeurs peuvent être
        écrites en dur dans les composants :{" "}
        <InlineCode>#CC4A48</InlineCode> (brand),{" "}
        <InlineCode>#4ADE80</InlineCode> (green),{" "}
        <InlineCode>#FBFBFB</InlineCode> (near-white),{" "}
        <InlineCode>#F59E0B</InlineCode> (amber). Tout le reste doit passer par un token.
      </InfoBox>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — THEMING
      ═══════════════════════════════════════════════════════════ */}
      <SectionAnchor id="theming" title="Theming & Dark mode" icon={<FiMoon size={15} />} />

      <p style={{ margin: "0 0 20px", fontSize: 14, color: "var(--color-muted)", lineHeight: 1.7 }}>
        Le thème supporte deux modes d'activation du dark mode : la{" "}
        <strong>préférence système</strong> (automatique) et le{" "}
        <strong>toggle manuel</strong> via classe CSS.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        {[
          {
            icon: <FiSun size={16} />,
            label: "Light mode",
            desc: "Appliqué par défaut via :root. Activable manuellement avec la classe .light sur <html>.",
            cls: ":root / :root.light",
          },
          {
            icon: <FiMoon size={16} />,
            label: "Dark mode",
            desc: "Activé automatiquement via @media (prefers-color-scheme: dark). Activable manuellement avec .dark sur <html>.",
            cls: ":root.dark",
          },
        ].map(({ icon, label, desc, cls }) => (
          <div
            key={label}
            style={{
              padding: "16px",
              border: "1px solid var(--c-border)",
              borderRadius: "var(--radius-md)",
              background: "var(--c-surface)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ color: "var(--color-brand)" }}>{icon}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--color-fg)" }}>{label}</span>
            </div>
            <p style={{ margin: "0 0 8px", fontSize: 12, color: "var(--color-muted)", lineHeight: 1.5 }}>{desc}</p>
            <InlineCode>{cls}</InlineCode>
          </div>
        ))}
      </div>

      <CodeBlock language="tsx" title="Toggle dark mode (exemple Next.js)">
{`// Basculer le dark mode via classe sur <html>
function toggleDarkMode(enabled: boolean) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(enabled ? "dark" : "light");
}`}
      </CodeBlock>

      <div style={{ marginTop: 20 }}>
        <p style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 600, color: "var(--color-fg)" }}>
          Personnaliser les tokens (override)
        </p>
        <p style={{ margin: "0 0 12px", fontSize: 13, color: "var(--color-muted)", lineHeight: 1.6 }}>
          Importez le fichier de tokens puis surchargez les variables dans votre propre CSS global.
          Seules les variables que vous déclarez seront modifiées.
        </p>
        <CodeBlock language="css" title="globals.css">
{`@import "@brickslab./theme-default/dist/tokens.css";

/* Override : changer la couleur de marque */
:root {
  --color-brand: #6366F1;
  --c-brand-subtle: rgba(99, 102, 241, 0.08);
  --c-brand-border: rgba(99, 102, 241, 0.3);
}

/* Override dark mode */
:root.dark {
  --color-brand: #818CF8;
}`}
        </CodeBlock>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — OVERRIDE COMPOSANTS
      ═══════════════════════════════════════════════════════════ */}
      <SectionAnchor id="override-components" title="Override composants" icon={<FiEdit3 size={15} />} />

      <p style={{ margin: "0 0 14px", fontSize: 14, color: "var(--color-muted)", lineHeight: 1.7 }}>
        L&apos;override se fait à 3 niveaux, du plus précis au plus global :
      </p>

      <ul style={{ margin: "0 0 20px 20px", color: "var(--color-muted)", fontSize: 13, lineHeight: 1.7 }}>
        <li><strong>Props du composant</strong> : prioritaire quand le composant expose une API (`variant`, `tone`, `size`, `align`, etc.).</li>
        <li><strong>Props de style</strong> : `style` / `className` quand disponibles dans l&apos;API.</li>
        <li><strong>Tokens CSS</strong> : override local via variables (`--fontsize-*`, `--color-*`) sur un conteneur parent.</li>
      </ul>

      <InfoBox>
        Dans chaque page composant, la section <strong>Props</strong> affiche maintenant un bloc
        <strong> Override</strong> qui liste les paramètres réellement overrideables pour ce composant.
      </InfoBox>

      <div style={{ marginTop: 16 }}>
        <p style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 600, color: "var(--color-fg)" }}>
          1. Override via props (recommandé)
        </p>
        <CodeBlock language="tsx" title="Exemple — Text">
{`import { Text } from "@brickslab./ui-web";

<Text
  texte="Titre de section"
  variant="body-lg"
  tone="brand"
  align="left"
/>`}
        </CodeBlock>
      </div>

      <div style={{ marginTop: 16 }}>
        <p style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 600, color: "var(--color-fg)" }}>
          2. Override local via tokens CSS (utile pour les composants type SectionHeader)
        </p>
        <CodeBlock language="tsx" title="Exemple — SectionHeader">
{`import { SectionHeader } from "@brickslab./ui-web";

<div
  style={
    {
      "--fontsize-3xl": "2.25rem",
      "--fontsize-xl": "1.125rem",
      "--color-fg": "#111827",
      "--color-muted": "#4B5563",
      "--color-brand": "#CC4A48",
    } as React.CSSProperties
  }
>
  <SectionHeader
    eyebrow="Nouveautés"
    title="Composants UI"
    subtitle="Personnalisation fine des styles"
    align="left"
  />
</div>`}
        </CodeBlock>
      </div>

      <div style={{ marginTop: 16 }}>
        <p style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 600, color: "var(--color-fg)" }}>
          3. Override global (thème applicatif)
        </p>
        <CodeBlock language="css" title="globals.css">
{`:root {
  --color-brand: #6366F1;
  --fontsize-xl: 1.125rem;
  --fontsize-3xl: 2rem;
}`}
        </CodeBlock>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — ARCHITECTURE
      ═══════════════════════════════════════════════════════════ */}
      <SectionAnchor id="architecture" title="Architecture" icon={<FiGitBranch size={15} />} />

      <p style={{ margin: "0 0 20px", fontSize: 14, color: "var(--color-muted)", lineHeight: 1.7 }}>
        Brickslab est un <strong>monorepo pnpm</strong> avec 4 packages et 1 application.
      </p>

      <TokenTable title="Packages & Applications" headers={["Package", "Description"]}>
        {[
          ["packages/ui-web (@brickslab./ui-web)", "Librairie React — source des composants. Publiée sur npm (public)."],
          ["packages/token-contract (@brickslab./token-contract)", "Déclarations CSS des tokens (contrat, sans valeurs)."],
          ["packages/theme-default (@brickslab./theme-default)", "Thème par défaut — implémente token-contract avec des valeurs concrètes."],
          ["apps/brickslab_catalog", "Site de documentation Next.js 16 (App Router)."],
        ].map(([name, desc]) => (
          <TokenRow key={name} name={name} value={desc} />
        ))}
      </TokenTable>

      <p style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 600, color: "var(--color-fg)" }}>
        Conventions — <InlineCode>ui-web</InlineCode>
      </p>

      <div
        style={{
          border: "1px solid var(--c-border)",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          marginBottom: 20,
        }}
      >
        {[
          { rule: "Structure", detail: "Chaque composant = un dossier src/components/<category>/<snake_name>/ contenant <Name>.tsx + <Name>.type.ts" },
          { rule: "Styles", detail: "Inline styles uniquement — pas de fichiers CSS, pas de Tailwind dans ui-web" },
          { rule: "import React", detail: "import React from 'react' obligatoire dans chaque .tsx (JSX transform non configuré)" },
          { rule: "Composants contrôlés", detail: "Tous les composants interactifs reçoivent état + handlers en props — pas d'état interne" },
          { rule: "'use client'", detail: "Interdit sauf pour CodeBlock (clipboard API)" },
          { rule: "Icônes", detail: "react-icons/fi uniquement (react-icons@^5.5.0)" },
          { rule: "Types", detail: "Export depuis le .type.ts, jamais inline dans .tsx" },
        ].map(({ rule, detail }, i, arr) => (
          <div
            key={rule}
            style={{
              display: "grid",
              gridTemplateColumns: "160px 1fr",
              borderBottom: i < arr.length - 1 ? "1px solid var(--c-border)" : "none",
              background: i % 2 === 0 ? "var(--c-surface)" : "var(--c-surface-elevated)",
            }}
          >
            <div
              style={{
                padding: "10px 14px",
                fontSize: 12,
                fontWeight: 700,
                color: "var(--color-fg)",
                borderRight: "1px solid var(--c-border)",
              }}
            >
              {rule}
            </div>
            <div style={{ padding: "10px 14px", fontSize: 12, color: "var(--color-muted)", lineHeight: 1.5 }}>
              {detail}
            </div>
          </div>
        ))}
      </div>

      <p style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 600, color: "var(--color-fg)" }}>
        Commandes principales
      </p>

      <CodeBlock language="bash">
{`# Développement
pnpm dev                    # sync + démarrer le catalogue en watch

# Build
pnpm build                  # audit → sync → build tous les packages
pnpm build:catalog          # build catalogue uniquement

# Qualité
pnpm run audit              # audit 7 axes → logs/audit-results.json
pnpm audit:verbose          # idem + affiche les tests échoués
pnpm typecheck              # typecheck tous les packages
pnpm lint                   # lint tous les packages

# Utilitaires
pnpm sync:components        # components.csv → components.data.ts`}
      </CodeBlock>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — AJOUTER UN COMPOSANT
      ═══════════════════════════════════════════════════════════ */}
      <SectionAnchor id="add-component" title="Ajouter un composant" icon={<FiPlusCircle size={15} />} />

      <p style={{ margin: "0 0 32px", fontSize: 14, color: "var(--color-muted)", lineHeight: 1.7 }}>
        Checklist complète à suivre pour chaque nouveau composant. Tous ces fichiers doivent être
        mis à jour pour que le composant soit correctement intégré dans le système.
      </p>

      <Step n="1" title="Créer les fichiers source dans ui-web">
        <CodeBlock language="bash">
{`# Structure à créer
packages/ui-web/src/components/<category>/<snake_name>/
  ├── <Name>.tsx       # Composant React
  └── <Name>.type.ts  # Types et interface des props`}
        </CodeBlock>
        <div style={{ marginTop: 12 }}>
          <CodeBlock language="tsx" title="MonComposant.tsx">
{`import React from "react"; // obligatoire
import type { MonComposantProps } from "./MonComposant.type";

export function MonComposant({ label, variant = "default" }: MonComposantProps) {
  return (
    <div
      style={{
        color: "var(--color-fg)",
        background: "var(--c-surface)",
        borderRadius: "var(--radius-md)",
        padding: "var(--space-4)",
      }}
    >
      {label}
    </div>
  );
}`}
          </CodeBlock>
        </div>
        <div style={{ marginTop: 12 }}>
          <CodeBlock language="ts" title="MonComposant.type.ts">
{`export interface MonComposantProps {
  label: string;
  variant?: "default" | "brand";
}`}
          </CodeBlock>
        </div>
      </Step>

      <Step n="2" title="Exporter depuis packages/ui-web/src/index.tsx">
        <CodeBlock language="tsx" title="index.tsx (ajouter à la bonne section)">
{`// ── Ma catégorie ──────────────────────────────────────────────────────────────
export * from "./components/<category>/<snake_name>/MonComposant";
export * from "./components/<category>/<snake_name>/MonComposant.type";`}
        </CodeBlock>
      </Step>

      <Step n="3" title="Ajouter les métadonnées dans components.csv">
        <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--color-muted)", lineHeight: 1.6 }}>
          Fichier : <InlineCode>components_docs/components.csv</InlineCode>
        </p>
        <CodeBlock language="csv">
{`label,section,type,description,href,addedAt
MonComposant,Ma Catégorie,ui,Description courte du composant.,/components/moncomposant,2024-01-15`}
        </CodeBlock>
      </Step>

      <Step n="4" title="Ajouter l'entrée dans la sidebar">
        <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--color-muted)", lineHeight: 1.6 }}>
          Fichier : <InlineCode>apps/brickslab_catalog/src/catalog/navigation.data.ts</InlineCode>
        </p>
        <CodeBlock language="ts">
{`{
  section: "Ma Catégorie",
  items: [
    // ...composants existants...
    { label: "MonComposant", href: "/components/moncomposant" },
  ],
},`}
        </CodeBlock>
      </Step>

      <Step n="5" title="Créer la page catalogue">
        <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--color-muted)", lineHeight: 1.6 }}>
          Fichier : <InlineCode>apps/brickslab_catalog/src/app/components/moncomposant/page.tsx</InlineCode>
        </p>
        <CodeBlock language="tsx">
{`"use client";
import { MonComposant } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  { name: "label", type: "string", required: true, description: "Texte affiché." },
  { name: "variant", type: '"default" | "brand"', default: '"default"', description: "Variante visuelle." },
];

export default function MonComposantPage() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px 80px" }}>
      <ComponentHeader name="MonComposant" description="Description du composant." section="Ma Catégorie" />

      <SectionTitle>Démo</SectionTitle>
      <Preview>
        <MonComposant label="Exemple" />
      </Preview>

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx">
        {\`import { MonComposant } from "@brickslab./ui-web";

<MonComposant label="Exemple" />\`}
      </CodeBlock>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />
    </div>
  );
}`}
        </CodeBlock>
      </Step>

      <Step n="6" title="Régénérer components.data.ts et vérifier">
        <CodeBlock language="bash">
{`# Régénérer les métadonnées depuis le CSV
pnpm sync:components

# Vérifier le rendu
pnpm dev:catalog

# Vérifier les types
pnpm --filter @brickslab./ui-web typecheck`}
        </CodeBlock>
        <div style={{ marginTop: 12 }}>
          <InfoBox>
            <strong>Rappel</strong> — si le composant est listé dans{" "}
            <InlineCode>project_docs/we_need_composant.md</InlineCode>, retirez-le après l'avoir créé.
          </InfoBox>
        </div>
      </Step>

      {/* Final check */}
      <div
        style={{
          padding: "20px 20px 20px 20px",
          border: "1px solid var(--c-border)",
          borderRadius: "var(--radius-md)",
          background: "var(--c-surface-elevated)",
        }}
      >
        <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 700, color: "var(--color-fg)" }}>
          Récapitulatif — fichiers à toucher
        </p>
        <ol
          className="docs-checklist"
          style={{
            margin: 0,
            paddingLeft: 20,
            fontSize: 13,
            color: "var(--color-muted)",
            lineHeight: 2,
            listStyleType: "decimal",
          }}
        >
          <li><InlineCode>packages/ui-web/src/components/&lt;category&gt;/&lt;name&gt;/&lt;Name&gt;.tsx</InlineCode> + <InlineCode>.type.ts</InlineCode></li>
          <li><InlineCode>packages/ui-web/src/index.tsx</InlineCode> — export</li>
          <li><InlineCode>components_docs/components.csv</InlineCode> — métadonnées</li>
          <li><InlineCode>apps/brickslab_catalog/src/catalog/navigation.data.ts</InlineCode> — sidebar</li>
          <li><InlineCode>apps/brickslab_catalog/src/app/components/&lt;lowercase&gt;/page.tsx</InlineCode> — page catalog</li>
          <li>Lancer <InlineCode>pnpm sync:components</InlineCode></li>
        </ol>
      </div>
    </div>
  );
}
