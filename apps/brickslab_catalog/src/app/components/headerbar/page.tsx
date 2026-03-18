"use client";

import React from "react";
import { HeaderBar } from "@brickslab./ui-web";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  {
    name: "logo",
    type: "string | ReactNode",
    description: "Logo optionnel (URL d’image ou ReactNode).",
  },
  {
    name: "title",
    type: "string",
    description: "Titre / brand optionnel.",
  },
  {
    name: "navigation",
    type: "ReactNode",
    description: "Navigation (contenu libre).",
  },
  {
    name: "actions",
    type: "ReactNode",
    description: "Zone d’actions (boutons, icônes...).",
  },
  {
    name: "navPosition",
    type: `"left" | "center" | "right"`,
    default: `"left"`,
    description: "Position de la navigation dans le layout.",
  },
  {
    name: "backgroundColor",
    type: "string",
    description: "Couleur de fond (supporte rgba/transparent).",
  },
  {
    name: "blur",
    type: "boolean",
    default: "false",
    description: "Active l’effet glassmorphism (backdrop blur).",
  },
  {
    name: "withBorder",
    type: "boolean",
    default: "false",
    description: "Affiche une bordure basse optionnelle.",
  },
  {
    name: "className",
    type: "string",
    description: "Classe CSS racine.",
  },
  {
    name: "style",
    type: "React.CSSProperties",
    description: "Styles inline sur la racine.",
  },
];

/* ------------------------------------------------------------------
 * Usage CODE
 * ------------------------------------------------------------------ */
const usageCode = `import { HeaderBar } from "@brickslab./ui-web";

<HeaderBar
  logo="/logo.svg"
  title="BricksLab"
  navPosition="center"
  blur
  withBorder
  backgroundColor="color-mix(in srgb, var(--color-bg) 60%, transparent)"
  navigation={
    <nav style={{ display: "flex", gap: 20 }}>
      <a href="/components">Composants</a>
      <a href="/docs">Docs</a>
      <a href="/about">À propos</a>
    </nav>
  }
  actions={
    <>
      <button>Se connecter</button>
      <button>S’inscrire</button>
    </>
  }
/>
`;

const nav = (
  <nav className="hb-demo-links">
    <a href="#" className="hb-demo-link hb-demo-link--active">
      Accueil
    </a>
    <a href="#docs" className="hb-demo-link">
      Docs
    </a>
    <a href="#about" className="hb-demo-link">
      À propos
    </a>
  </nav>
);

export default function HeaderBarPage() {
  return (
    <div>
      <style>{`
        .preview-override header {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          z-index: 5 !important;
        }
        .preview-override > *:not(header) {
          position: relative;
          z-index: 1;
        }

        .hb-demo-surface {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: var(--radius-lg);
          border: var(--border-xm) solid color-mix(in srgb, var(--color-fg) 10%, transparent);
          box-shadow:
            0 1px 0 color-mix(in srgb, var(--color-fg) 4%, transparent),
            0 18px 60px color-mix(in srgb, var(--color-fg) 12%, transparent);
          background: color-mix(in srgb, var(--color-bg) 90%, transparent);
        }

        .hb-demo-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(60% 60% at 20% 20%, rgba(99,102,241,0.36), transparent 60%),
            radial-gradient(60% 60% at 80% 30%, rgba(16,185,129,0.26), transparent 55%),
            radial-gradient(50% 55% at 55% 85%, rgba(236,72,153,0.20), transparent 60%),
            linear-gradient(180deg, rgba(15,23,42,0.08), rgba(15,23,42,0.02));
          transform: scale(1.05);
        }

        .hb-demo-links {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .hb-demo-link {
          color: inherit;
          text-decoration: none;
          font-size: 0.92rem;
          font-weight: 650;
          opacity: 0.82;
          padding: 8px 10px;
          border-radius: var(--radius-md);
          transition: transform 180ms ease, opacity 180ms ease, background 180ms ease;
          will-change: transform;
        }

        .hb-demo-link:hover {
          opacity: 1;
          background: color-mix(in srgb, var(--color-bg) 55%, transparent);
          transform: translateY(-1px);
        }

        .hb-demo-link--active {
          opacity: 1;
          background: color-mix(in srgb, var(--color-bg) 65%, transparent);
          box-shadow: 0 1px 0 color-mix(in srgb, var(--color-fg) 6%, transparent);
        }

        .hb-demo-btn {
          appearance: none;
          border: var(--border-xm) solid color-mix(in srgb, var(--color-fg) 14%, transparent);
          background: color-mix(in srgb, var(--color-bg) 90%, transparent);
          color: color-mix(in srgb, var(--color-fg) 92%, transparent);
          padding: 8px 14px;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
          will-change: transform;
        }

        .hb-demo-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 30px color-mix(in srgb, var(--color-fg) 10%, transparent);
          background: color-mix(in srgb, var(--color-bg) 96%, transparent);
        }

        .hb-demo-btn:active {
          transform: translateY(0px) scale(0.99);
        }

        .hb-demo-btn--primary {
          border-color: rgba(99, 102, 241, 0.38);
          background: linear-gradient(180deg, rgba(99,102,241,0.96), rgba(79,70,229,0.96));
          color: white;
          box-shadow: 0 12px 34px rgba(99, 102, 241, 0.22);
        }

        .hb-demo-btn--primary:hover {
          box-shadow: 0 16px 44px rgba(99, 102, 241, 0.28);
        }

        .hb-demo-btn--ghost {
          background: color-mix(in srgb, var(--color-bg) 55%, transparent);
        }

        .hb-demo-dark .hb-demo-link:hover {
          background: color-mix(in srgb, var(--color-fg) 32%, transparent);
        }
        .hb-demo-dark .hb-demo-link--active {
          background: color-mix(in srgb, var(--color-fg) 36%, transparent);
        }
        .hb-demo-dark .hb-demo-btn {
          background: color-mix(in srgb, var(--color-fg) 30%, transparent);
          border-color: color-mix(in srgb, var(--color-bg) 16%, transparent);
          color: color-mix(in srgb, var(--color-bg) 92%, transparent);
        }
        .hb-demo-dark .hb-demo-btn--primary {
          background: linear-gradient(180deg, rgba(16,185,129,0.95), rgba(5,150,105,0.95));
          border-color: rgba(16,185,129,0.35);
          box-shadow: 0 16px 46px rgba(16, 185, 129, 0.20);
        }
      `}</style>

      <ComponentHeader
        name="HeaderBar"
        description="HeaderBar flexible (logo, title, navigation, actions) avec positionnement dynamique de la navigation et support glassmorphism."
      />

      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>Navigation centrée + blur</SubLabel>
      <Preview>
        <div
          className="preview-override hb-demo-surface"
          style={{
            position: "relative",
            height: 140,
          }}
        >
          <div aria-hidden className="hb-demo-bg" />
          <HeaderBar
            logo={<img src="/logo.svg" alt="Logo" style={{ height: 70 }} />}
            title="BricksLab"
            navigation={nav}
            navPosition="center"
            blur
            withBorder
            backgroundColor="color-mix(in srgb, var(--color-bg) 60%, transparent)"
            actions={
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                <button className="hb-demo-btn hb-demo-btn--ghost">
                  Se connecter
                </button>
                <button className="hb-demo-btn hb-demo-btn--primary">
                  S’inscrire
                </button>
              </div>
            }
          />
        </div>
      </Preview>

      <SubLabel>Brand uniquement</SubLabel>
      <Preview>
        <div
          className="preview-override hb-demo-surface hb-demo-dark"
          style={{ position: "relative", height: 120 }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(70% 70% at 20% 20%, rgba(16,185,129,0.25), transparent 60%), radial-gradient(70% 70% at 80% 30%, rgba(59,130,246,0.20), transparent 55%), linear-gradient(180deg, rgba(2,6,23,0.92), rgba(2,6,23,0.72))",
            }}
          />
          <HeaderBar
            logo={<img src="/logo.svg" alt="Logo" style={{ height: 70 }} />}
            title="Store"
            blur
            withBorder
            backgroundColor="color-mix(in srgb, var(--color-fg) 35%, transparent)"
            style={{
              color: "color-mix(in srgb, var(--color-bg) 92%, transparent)",
              borderBottom: "var(--border-xm) solid color-mix(in srgb, var(--color-bg) 14%, transparent)",
            }}
            navPosition="left"
            navigation={
              <nav className="hb-demo-links">
                <a href="#" className="hb-demo-link hb-demo-link--active">
                  Home
                </a>
                <a href="#shop" className="hb-demo-link">
                  Shop
                </a>
                <a href="#about" className="hb-demo-link">
                  About
                </a>
                <a href="#contact" className="hb-demo-link">
                  Contact
                </a>
              </nav>
            }
            actions={
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                <button className="hb-demo-btn">Sign in</button>
                <button className="hb-demo-btn hb-demo-btn--primary">Get started</button>
              </div>
            }
          />
        </div>
      </Preview>

      <SubLabel>Navigation à droite</SubLabel>
      <Preview>
        <div className="preview-override hb-demo-surface" style={{ position: "relative", height: 120 }}>
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(70% 70% at 10% 10%, rgba(59,130,246,0.12), transparent 55%), radial-gradient(70% 70% at 90% 40%, rgba(99,102,241,0.12), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.86))",
            }}
          />
          <HeaderBar
            logo={<img src="/logo.svg" alt="Logo" style={{ height: 70 }} />}
            title="Catalog"
            navigation={
              <nav className="hb-demo-links">
                <a href="#" className="hb-demo-link hb-demo-link--active">
                  Accueil
                </a>
                <a href="#docs" className="hb-demo-link">
                  Docs
                </a>
                <a href="#pricing" className="hb-demo-link">
                  Pricing
                </a>
              </nav>
            }
            navPosition="right"
            withBorder
            backgroundColor="var(--color-bg)"
            actions={
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                <button className="hb-demo-btn">Sign in</button>
                <button className="hb-demo-btn hb-demo-btn--primary">Request demo</button>
              </div>
            }
          />
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <SubLabel>API</SubLabel>
      <CodeBlock code={usageCode} />
      
    </div>
  );
}
