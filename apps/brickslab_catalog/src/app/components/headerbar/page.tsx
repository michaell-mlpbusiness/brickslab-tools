"use client";

import { HeaderBar } from "@brickslab./ui-web";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  PropTag,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  {
    name: "logo",
    type: "ReactNode",
    description: "Contenu du slot logo (gauche). Accepte tout noeud React : image, texte, composant.",
  },
  {
    name: "nav",
    type: "ReactNode",
    description: "Contenu du slot navigation (centre). Typiquement un composant TopNav ou des liens.",
  },
  {
    name: "actions",
    type: "ReactNode",
    description: "Contenu du slot actions (droite). Boutons d'action, menu utilisateur, etc.",
  },
  {
    name: "height",
    type: "number",
    default: "60",
    description: "Hauteur en pixels du header. Affecte la hauteur de la barre fixe.",
  },
];

const usageCode = `import { HeaderBar } from "@brickslab./ui-web";

<HeaderBar
  logo={<span style={{ fontWeight: 700, color: "var(--color-brand)" }}>BricksLab</span>}
  nav={
    <nav style={{ display: "flex", gap: 24 }}>
      <a href="/components">Composants</a>
      <a href="/docs">Documentation</a>
      <a href="/about">À propos</a>
    </nav>
  }
  actions={
    <button>Se connecter</button>
  }
  height={60}
/>`;

export default function HeaderBarPage() {
  return (
    <div>
      <style>{`\n        /* Contain fixed HeaderBar inside preview boxes for documentation */\n        .preview-override header {\n          position: absolute !important;\n          top: 0 !important;\n          left: 0 !important;\n          right: 0 !important;\n          z-index: 5 !important;\n        }\n        /* Ensure preview content sits under the header */\n        .preview-override > *:not(header) {\n          position: relative;\n          z-index: 1;\n        }\n      `}</style>
      <ComponentHeader
        name="HeaderBar"
        description="Barre de navigation principale en position fixe. Composée de trois slots (logo, nav, actions) pour une flexibilité maximale. La hauteur est configurable via la prop height."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>HeaderBar complet — logo + nav + actions (conteneur relatif, overflow hidden)</SubLabel>
      <Preview>
        <div className="preview-override" style={{ position: "relative", width: "100%", height: 80, overflow: "hidden", border: "1px dashed var(--color-muted)", borderRadius: "var(--radius-md)" }}>
          <HeaderBar
            logo={
              <span style={{ fontWeight: 700, color: "var(--color-brand)", fontSize: "1.1rem" }}>
                BricksLab
              </span>
            }
            nav={
              <nav style={{ display: "flex", gap: 20, fontSize: "0.9rem" }}>
                <a href="#" style={{ textDecoration: "none" }}>Composants</a>
                <a href="#" style={{ textDecoration: "none" }}>Docs</a>
                <a href="#" style={{ textDecoration: "none" }}>À propos</a>
              </nav>
            }
            actions={
              <button style={{ padding: "6px 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-brand)", color: "var(--color-brand)", background: "transparent", cursor: "pointer", fontSize: "0.85rem" }}>
                Se connecter
              </button>
            }
            height={60}
          />
        </div>
      </Preview>

      <SubLabel>logo seul</SubLabel>
      <Preview>
        <div className="preview-override" style={{ position: "relative", width: "100%", height: 80, overflow: "hidden", border: "1px dashed var(--color-muted)", borderRadius: "var(--radius-md)" }}>
          <HeaderBar
            logo={
              <span style={{ fontWeight: 700, color: "var(--color-brand)" }}>BricksLab</span>
            }
            height={60}
          />
        </div>
      </Preview>

      <SubLabel>hauteur personnalisée (height=80)</SubLabel>
      <Preview>
        <div className="preview-override" style={{ position: "relative", width: "100%", height: 100, overflow: "hidden", border: "1px dashed var(--color-muted)", borderRadius: "var(--radius-md)" }}>
          <HeaderBar
            logo={<span style={{ fontWeight: 700 }}>BricksLab</span>}
            nav={<nav style={{ display: "flex", gap: 16, fontSize: "0.9rem" }}><a href="#">Accueil</a><a href="#">Docs</a></nav>}
            height={80}
          />
        </div>
      </Preview>

      {/* ── Props ──────────────────────────────────────────────────── */}
      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      {/* ── Utilisation ────────────────────────────────────────────── */}
      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} />
    </div>
  );
}
