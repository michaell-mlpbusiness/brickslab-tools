"use client";

import React, { useState } from "react";
import {
  TopNav,
  HeroCtaSection,
  SectionHeader,
  FeatureListSection,
  FooterBar,
  BrandSlogan,
  AppShell,
  HeaderBar,
  SidebarNav,
  LogoMark,
  KpiCard,
  LatestComponentsList,
  ComponentsCountCard,
  Badge,
  Breadcrumb,
  StatusLabel,
  Button,
  TagChip,
  FooterLinks,
  SocialLinks,
  ProjectDescriptionPanel,
  PageHero,
} from "@brickslab./ui-web";
import {
  FiZap, FiLayers, FiShield, FiDownload, FiEye, FiX,
  FiTrendingUp, FiUsers, FiBox, FiActivity,
  FiBell, FiSettings, FiHome, FiPieChart, FiFileText, FiGrid,
  FiShoppingCart, FiTruck, FiRefreshCw, FiLock, FiHeadphones,
  FiSearch, FiHeart, FiStar,
  FiCode, FiMonitor, FiSmartphone, FiDatabase, FiAward, FiGithub, FiExternalLink,
} from "react-icons/fi";

// ── ZIP generator (browser-native, no deps) ───────────────────────────────────

function makeCRC32Table(): number[] {
  const t: number[] = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    t[i] = c;
  }
  return t;
}
const CRC_TABLE = makeCRC32Table();

function crc32(data: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i++)
    crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ data[i]) & 0xff];
  return (crc ^ 0xffffffff) >>> 0;
}

function buildZip(files: { name: string; content: string }[]): Uint8Array {
  const enc = new TextEncoder();
  const entries = files.map((f) => ({
    name: enc.encode(f.name),
    data: enc.encode(f.content),
    crc: 0,
    offset: 0,
  }));
  entries.forEach((e) => { e.crc = crc32(e.data); });

  // Pass 1: compute offsets
  let pos = 0;
  entries.forEach((e) => { e.offset = pos; pos += 30 + e.name.length + e.data.length; });

  const cdStart = pos;
  const cdSize = entries.reduce((s, e) => s + 46 + e.name.length, 0);
  const totalSize = cdStart + cdSize + 22;
  const buf = new Uint8Array(totalSize);
  let p = 0;

  const w8  = (v: number) => { buf[p++] = v & 0xff; };
  const w16 = (v: number) => { buf[p++] = v & 0xff; buf[p++] = (v >> 8) & 0xff; };
  const w32 = (v: number) => { w16(v & 0xffff); w16((v >>> 16) & 0xffff); };
  const wb  = (arr: Uint8Array) => { buf.set(arr, p); p += arr.length; };

  // Local file headers + data
  for (const e of entries) {
    w8(0x50); w8(0x4b); w8(0x03); w8(0x04); // signature
    w16(20); w16(0); w16(0);                 // version, flags, method (STORED)
    w32(0);                                  // mod time/date
    w32(e.crc); w32(e.data.length); w32(e.data.length);
    w16(e.name.length); w16(0);             // name len, extra len
    wb(e.name); wb(e.data);
  }

  // Central directory
  for (const e of entries) {
    w8(0x50); w8(0x4b); w8(0x01); w8(0x02);
    w16(20); w16(20); w16(0); w16(0);
    w32(0);
    w32(e.crc); w32(e.data.length); w32(e.data.length);
    w16(e.name.length); w16(0); w16(0); w16(0); w16(0);
    w32(0); w32(e.offset);
    wb(e.name);
  }

  // End of central directory
  w8(0x50); w8(0x4b); w8(0x05); w8(0x06);
  w16(0); w16(0);
  w16(entries.length); w16(entries.length);
  w32(cdSize); w32(cdStart);
  w16(0);

  return buf;
}

function downloadZip(filename: string, files: { name: string; content: string }[]) {
  const bytes = buildZip(files);
  const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/zip" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// ── Landing page template ─────────────────────────────────────────────────────

function LandingPageTemplate() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      <TopNav
        items={[
          { label: "Produit", href: "/" },
          { label: "Fonctionnalités", href: "#features" },
          { label: "Tarifs", href: "#pricing" },
          { label: "Contact", href: "#contact" },
        ]}
        activePath="/"
      />
      <HeroCtaSection
        title="Construisez plus vite."
        subtitle="Un design system complet pour lancer vos projets React avec cohérence et élégance."
        ctaLabel="Démarrer gratuitement"
        secondaryLabel="Voir la démo"
        align="center"
      />
      <div id="features" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <SectionHeader
          eyebrow="Fonctionnalités"
          title="Tout ce dont vous avez besoin"
          subtitle="Des composants pensés pour la vitesse et la clarté, avec des tokens CSS entièrement personnalisables."
          align="center"
        />
        <FeatureListSection
          features={[
            {
              title: "Design tokens",
              description: "Variables CSS cohérentes sur tout votre projet. Personnalisables via le Theme Builder.",
              icon: <FiLayers size={24} />,
            },
            {
              title: "Performance",
              description: "Composants optimisés, zéro dépendance superflue. Léger en production.",
              icon: <FiZap size={24} />,
            },
            {
              title: "Accessibilité",
              description: "Respect des standards WCAG. Focus ring, rôles ARIA et navigation clavier inclus.",
              icon: <FiShield size={24} />,
            },
          ]}
          columns={3}
        />
      </div>
      <FooterBar center={<BrandSlogan />} />
    </div>
  );
}

// ── ZIP file contents ─────────────────────────────────────────────────────────

const LANDING_PAGE_TSX = `"use client";

import React from "react";
import {
  TopNav,
  HeroCtaSection,
  SectionHeader,
  FeatureListSection,
  FooterBar,
  BrandSlogan,
} from "@brickslab./ui-web";
import { FiZap, FiLayers, FiShield } from "react-icons/fi";

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      <TopNav
        items={[
          { label: "Produit", href: "/" },
          { label: "Fonctionnalités", href: "#features" },
          { label: "Tarifs", href: "#pricing" },
          { label: "Contact", href: "#contact" },
        ]}
        activePath="/"
      />

      <HeroCtaSection
        title="Construisez plus vite."
        subtitle="Un design system complet pour lancer vos projets React avec cohérence et élégance."
        ctaLabel="Démarrer gratuitement"
        secondaryLabel="Voir la démo"
        align="center"
      />

      <div id="features" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <SectionHeader
          eyebrow="Fonctionnalités"
          title="Tout ce dont vous avez besoin"
          subtitle="Des composants pensés pour la vitesse et la clarté, avec des tokens CSS entièrement personnalisables."
          align="center"
        />
        <FeatureListSection
          features={[
            {
              title: "Design tokens",
              description: "Variables CSS cohérentes sur tout votre projet. Personnalisables via le Theme Builder.",
              icon: <FiLayers size={24} />,
            },
            {
              title: "Performance",
              description: "Composants optimisés, zéro dépendance superflue. Léger en production.",
              icon: <FiZap size={24} />,
            },
            {
              title: "Accessibilité",
              description: "Respect des standards WCAG. Focus ring, rôles ARIA et navigation clavier inclus.",
              icon: <FiShield size={24} />,
            },
          ]}
          columns={3}
        />
      </div>

      <FooterBar center={<BrandSlogan />} />
    </div>
  );
}
`;

const PACKAGE_JSON = `{
  "name": "my-brickslab-project",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@brickslab./ui-web": "2.1.1",
    "@brickslab./theme-default": "2.0.0",
    "next": "^16.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-icons": "^5.5.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5"
  }
}
`;

const GLOBALS_CSS = `/* app/globals.css */
@import '../tokens.css';

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  min-height: 100%;
}

body {
  font-family: "Sora", "Manrope", "Avenir Next", "Segoe UI", sans-serif;
  background:
    radial-gradient(1200px 700px at -10% -20%, rgba(204, 74, 72, 0.14), transparent 55%),
    radial-gradient(900px 520px at 110% 0%, rgba(59, 130, 246, 0.12), transparent 58%),
    linear-gradient(180deg, var(--c-surface-elevated) 0%, var(--color-bg) 100%);
  color: var(--color-fg);
  line-height: 1.45;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: inherit;
  text-decoration: none;
}

button, input, select, textarea {
  font: inherit;
  color: inherit;
}

img, svg, video, canvas {
  display: block;
  max-width: 100%;
}

@media (prefers-color-scheme: dark) {
  body {
    background:
      radial-gradient(1200px 700px at -10% -20%, rgba(224, 106, 103, 0.18), transparent 58%),
      radial-gradient(900px 520px at 110% 0%, rgba(96, 165, 250, 0.16), transparent 60%),
      linear-gradient(180deg, var(--c-surface-elevated) 0%, var(--color-bg) 100%);
  }
}
`;

const LAYOUT_TSX = `import React from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mon application",
  description: "Construit avec @brickslab./ui-web",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
`;

const TSCONFIG_JSON = `{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
`;

const NEXT_CONFIG_TS = `import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
`;

const TOKENS_CSS = `:root {
  /* Semantic colors */
  --color-bg: #eef2f7;
  --color-fg: #101828;
  --color-muted: #52607a;
  --color-brand: #CC4A48;
  --color-success: #4ADE80;
  --color-warning: #F59E0B;
  --color-error: #CC4A48;
  --color-info: #3B82F6;
  --color-transparent: transparent;

  /* Surfaces and borders */
  --c-surface: #ffffff;
  --c-surface-elevated: #f9fbff;
  --c-border: #dbe4ef;
  --c-brand-subtle: #fff2f1;
  --c-brand-border: #f3b7b5;

  /* Typography scale */
  --fontsize-2xs: 10px;
  --fontsize-xs: 12px;
  --fontsize-sm: 14px;
  --fontsize-md: 16px;
  --fontsize-medium: 16px;
  --fontsize-lg: clamp(18px, 1.7vw, 22px);
  --fontsize-xl: clamp(22px, 2.2vw, 30px);
  --fontsize-2xl: clamp(28px, 3.3vw, 40px);
  --fontsize-3xl: clamp(36px, 4.5vw, 52px);
  --fontsize-4xl: clamp(44px, 5.4vw, 64px);
  --fontsize-5xl: clamp(54px, 6.2vw, 80px);

  /* Font weights */
  --fontweight-thin: 100;
  --fontweight-extralight: 200;
  --fontweight-light: 300;
  --fontweight-normal: 400;
  --fontweight-medium: 500;
  --fontweight-semibold: 600;
  --fontweight-bold: 700;
  --fontweight-extrabold: 800;
  --fontweight-black: 900;

  /* Space scale */
  --space-1: 2px;
  --space-1-5: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-7: 28px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-15: 60px;
  --space-20: 80px;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --radius-full: 999px;

  /* Shadows */
  --shadow-1: 0 2px 6px rgba(16, 24, 40, 0.08);
  --shadow-2: 0 16px 44px rgba(16, 24, 40, 0.14);
  --shadow-3: 0 28px 70px rgba(16, 24, 40, 0.22);

  /* Motion and focus */
  --transition-bg: background 0.2s ease;
  --transition-all: all 0.2s ease;
  --focus-ring: 0 0 0 3px rgba(204, 74, 72, 0.25);

  /* Layering */
  --z-base: 0;
  --z-dropdown: 100;
  --z-modal: 1000;
  --z-drawer: 50;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0f1724;
    --color-fg: #e7edf6;
    --color-muted: #9fb0c6;
    --color-brand: #e06a67;
    --color-success: #4ADE80;
    --color-warning: #F59E0B;
    --color-error: #e06a67;
    --color-info: #60a5fa;

    --c-surface: #182334;
    --c-surface-elevated: #1e2b40;
    --c-border: #2d3b55;
    --c-brand-subtle: rgba(224, 106, 103, 0.14);
    --c-brand-border: rgba(224, 106, 103, 0.38);

    --shadow-1: 0 2px 8px rgba(0, 0, 0, 0.45);
    --shadow-2: 0 14px 40px rgba(0, 0, 0, 0.5);
    --shadow-3: 0 24px 64px rgba(0, 0, 0, 0.58);
    --focus-ring: 0 0 0 3px rgba(224, 106, 103, 0.33);
  }
}

[data-theme="dark"] {
  --color-bg: #0f1724;
  --color-fg: #e7edf6;
  --color-muted: #9fb0c6;
  --color-brand: #e06a67;
  --color-success: #4ADE80;
  --color-warning: #F59E0B;
  --color-error: #e06a67;
  --color-info: #60a5fa;

  --c-surface: #182334;
  --c-surface-elevated: #1e2b40;
  --c-border: #2d3b55;
  --c-brand-subtle: rgba(224, 106, 103, 0.14);
  --c-brand-border: rgba(224, 106, 103, 0.38);

  --shadow-1: 0 2px 8px rgba(0, 0, 0, 0.45);
  --shadow-2: 0 14px 40px rgba(0, 0, 0, 0.5);
  --shadow-3: 0 24px 64px rgba(0, 0, 0, 0.58);
  --focus-ring: 0 0 0 3px rgba(224, 106, 103, 0.33);
}
`;

const README_MD = `# Landing Page — Brickslab Template

Template de landing page prête à l'emploi, construite avec \`@brickslab./ui-web\`.

## Structure du ZIP

\`\`\`
my-project/
├── app/
│   ├── page.tsx        ← composant principal
│   ├── layout.tsx      ← layout App Router (fourni)
│   └── globals.css     ← imports tokens (fourni)
├── tokens.css          ← variables CSS Brickslab
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
\`\`\`

## Démarrage

1. Extrayez le ZIP dans un dossier vide
2. Installez les dépendances :
\`\`\`bash
npm install --legacy-peer-deps
\`\`\`
3. Lancez le serveur de développement :
\`\`\`bash
npm run dev
\`\`\`

## Personnalisation des tokens

Pour surcharger les tokens, éditez \`tokens.css\` ou utilisez le **Theme Builder**
du catalogue Brickslab pour générer vos propres valeurs.

Si vous avez déjà \`@brickslab./theme-default\`, remplacez \`tokens.css\` par :

\`\`\`css
@import '@brickslab./token-contract/dist/contract.css';
@import '@brickslab./theme-default/dist/tokens.css';
/* vos surcharges ici */
\`\`\`

## Composants utilisés

- \`TopNav\` — navigation principale
- \`HeroCtaSection\` — section hero avec call-to-action
- \`SectionHeader\` — en-tête de section avec eyebrow
- \`FeatureListSection\` — grille de fonctionnalités
- \`FooterBar\` — barre de pied de page
- \`BrandSlogan\` — slogan de marque
`;

// ── Dashboard template ────────────────────────────────────────────────────────

const DASHBOARD_NAV_SECTIONS = [
  {
    title: "Principal",
    items: [
      { label: "Vue d'ensemble", href: "/dashboard" },
      { label: "Analytiques", href: "/dashboard/analytics" },
      { label: "Projets", href: "/dashboard/projects" },
      { label: "Rapports", href: "/dashboard/reports" },
    ],
  },
  {
    title: "Gestion",
    items: [
      { label: "Utilisateurs", href: "/dashboard/users" },
      { label: "Composants", href: "/dashboard/components" },
      { label: "Paramètres", href: "/dashboard/settings" },
    ],
  },
];

const DASHBOARD_KPI_ITEMS = [
  { label: "Chiffre d'affaires", value: "€ 48 290", helper: "+12% ce mois" },
  { label: "Utilisateurs actifs", value: "3 847", helper: "+5% vs semaine passée" },
  { label: "Taux de conversion", value: "4.6 %", helper: "-0.3% vs mois dernier" },
  { label: "Tickets ouverts", value: "27", helper: "8 urgents" },
];

const DASHBOARD_LATEST_ITEMS = [
  { label: "Button", version: "1.4.2", date: "2024-03-10", status: "stable" as const },
  { label: "Modal", version: "2.1.0", date: "2024-03-08", status: "stable" as const },
  { label: "DataTable", version: "0.9.0", date: "2024-03-05", status: "beta" as const },
  { label: "DatePicker", version: "1.0.1", date: "2024-03-01", status: "stable" as const },
];

function DashboardTemplate() {
  return (
    <AppShell
      headerHeight={60}
      sidebarWidth={220}
      header={
        <HeaderBar
          logo={<LogoMark size="sm" variant="full" />}
          actions={
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Badge variant="error" dot size="sm"><FiBell size={16} /></Badge>
              <Badge variant="default" size="sm"><FiSettings size={16} /></Badge>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                backgroundColor: "#CC4A48", color: "#FBFBFB",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700,
              }}>
                ML
              </div>
            </div>
          }
        />
      }
      sidebar={
        <SidebarNav
          sections={DASHBOARD_NAV_SECTIONS}
          activePath="/dashboard"
          width={220}
        />
      }
    >
      <div style={{ padding: "28px 32px", maxWidth: 1100 }}>
        {/* Breadcrumb + titre */}
        <div style={{ marginBottom: 24 }}>
          <Breadcrumb items={[
            { label: "Accueil", href: "/dashboard" },
            { label: "Vue d'ensemble" },
          ]} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--color-fg)" }}>
              Vue d'ensemble
            </h1>
            <StatusLabel status="active" label="Système opérationnel" />
          </div>
        </div>

        {/* KPI grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginBottom: 28,
        }}>
          {DASHBOARD_KPI_ITEMS.map((kpi) => (
            <KpiCard key={kpi.label} label={kpi.label} value={kpi.value} helper={kpi.helper} />
          ))}
        </div>

        {/* Main content row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>
          <LatestComponentsList
            items={DASHBOARD_LATEST_ITEMS}
            title="Activité récente"
            ctaLabel="Voir tout"
            ctaHref="/dashboard/components"
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <ComponentsCountCard count={47} subtitle="composants disponibles" />
            <div style={{
              background: "var(--c-surface)", border: "1px solid var(--c-border)",
              borderRadius: 12, padding: "16px 18px",
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
                Accès rapide
              </div>
              {[
                { icon: <FiHome size={14} />, label: "Tableau de bord" },
                { icon: <FiPieChart size={14} />, label: "Analytiques" },
                { icon: <FiFileText size={14} />, label: "Rapports" },
                { icon: <FiGrid size={14} />, label: "Composants" },
              ].map(({ icon, label }) => (
                <div key={label} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "8px 0", borderBottom: "1px solid var(--c-border)",
                  fontSize: 13, color: "var(--color-muted)", cursor: "pointer",
                }}>
                  <span style={{ color: "var(--color-brand)" }}>{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

const DASHBOARD_TSX = `"use client";

import React from "react";
import {
  AppShell,
  HeaderBar,
  SidebarNav,
  LogoMark,
  KpiCard,
  LatestComponentsList,
  ComponentsCountCard,
  Badge,
  Breadcrumb,
  StatusLabel,
} from "@brickslab./ui-web";
import { FiBell, FiSettings, FiHome, FiPieChart, FiFileText, FiGrid } from "react-icons/fi";

const NAV_SECTIONS = [
  {
    title: "Principal",
    items: [
      { label: "Vue d'ensemble", href: "/dashboard" },
      { label: "Analytiques", href: "/dashboard/analytics" },
      { label: "Projets", href: "/dashboard/projects" },
      { label: "Rapports", href: "/dashboard/reports" },
    ],
  },
  {
    title: "Gestion",
    items: [
      { label: "Utilisateurs", href: "/dashboard/users" },
      { label: "Composants", href: "/dashboard/components" },
      { label: "Paramètres", href: "/dashboard/settings" },
    ],
  },
];

export default function DashboardPage() {
  return (
    <AppShell
      headerHeight={60}
      sidebarWidth={220}
      header={
        <HeaderBar
          logo={<LogoMark size="sm" variant="full" />}
          actions={
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Badge variant="error" dot size="sm"><FiBell size={16} /></Badge>
              <Badge variant="default" size="sm"><FiSettings size={16} /></Badge>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                backgroundColor: "var(--color-brand)", color: "#FBFBFB",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700,
              }}>
                AB
              </div>
            </div>
          }
        />
      }
      sidebar={
        <SidebarNav
          sections={NAV_SECTIONS}
          activePath="/dashboard"
          width={220}
        />
      }
    >
      <div style={{ padding: "28px 32px", maxWidth: 1100 }}>
        {/* Breadcrumb + titre */}
        <div style={{ marginBottom: 24 }}>
          <Breadcrumb items={[
            { label: "Accueil", href: "/dashboard" },
            { label: "Vue d\\'ensemble" },
          ]} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--color-fg)" }}>
              Vue d\\'ensemble
            </h1>
            <StatusLabel status="active" label="Système opérationnel" />
          </div>
        </div>

        {/* KPI grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
          <KpiCard label="Chiffre d\\'affaires" value="€ 48 290" helper="+12% ce mois" />
          <KpiCard label="Utilisateurs actifs" value="3 847" helper="+5% vs semaine passée" />
          <KpiCard label="Taux de conversion" value="4.6 %" helper="-0.3% vs mois dernier" />
          <KpiCard label="Tickets ouverts" value="27" helper="8 urgents" />
        </div>

        {/* Main content row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>
          <LatestComponentsList
            items={[
              { label: "Button", version: "1.4.2", date: "2024-03-10", status: "stable" },
              { label: "Modal", version: "2.1.0", date: "2024-03-08", status: "stable" },
              { label: "DataTable", version: "0.9.0", date: "2024-03-05", status: "beta" },
              { label: "DatePicker", version: "1.0.1", date: "2024-03-01", status: "stable" },
            ]}
            title="Activité récente"
            ctaLabel="Voir tout"
            ctaHref="/dashboard/components"
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <ComponentsCountCard count={47} subtitle="composants disponibles" />
            <div style={{
              background: "var(--c-surface)", border: "1px solid var(--c-border)",
              borderRadius: 12, padding: "16px 18px",
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
                Accès rapide
              </div>
              {[
                { icon: <FiHome size={14} />, label: "Tableau de bord" },
                { icon: <FiPieChart size={14} />, label: "Analytiques" },
                { icon: <FiFileText size={14} />, label: "Rapports" },
                { icon: <FiGrid size={14} />, label: "Composants" },
              ].map(({ icon, label }) => (
                <div key={label} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "8px 0", borderBottom: "1px solid var(--c-border)",
                  fontSize: 13, color: "var(--color-muted)", cursor: "pointer",
                }}>
                  <span style={{ color: "var(--color-brand)" }}>{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
`;

const DASHBOARD_README = `# Dashboard — Brickslab Template

Template de tableau de bord prête à l'emploi, construite avec \`@brickslab./ui-web\`.

## Structure du ZIP

\`\`\`
my-project/
├── app/
│   ├── page.tsx        ← composant principal (dashboard)
│   ├── layout.tsx      ← layout App Router (fourni)
│   └── globals.css     ← imports tokens (fourni)
├── tokens.css          ← variables CSS Brickslab
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
\`\`\`

## Démarrage

1. Extrayez le ZIP dans un dossier vide
2. Installez les dépendances :
\`\`\`bash
npm install --legacy-peer-deps
\`\`\`
3. Lancez le serveur de développement :
\`\`\`bash
npm run dev
\`\`\`

## Architecture du composant

\`\`\`
AppShell
├── HeaderBar (logo + notifications + settings + avatar)
├── SidebarNav (2 sections : Principal + Gestion)
└── Contenu principal
    ├── Breadcrumb + titre de page
    ├── KpiCard × 4 (métriques en grille)
    ├── LatestComponentsList (activité récente)
    └── Colonne latérale
        ├── ComponentsCountCard
        └── Accès rapide (liens)
\`\`\`

## Composants utilisés

- \`AppShell\` — structure de layout principal
- \`HeaderBar\` — barre de navigation supérieure
- \`SidebarNav\` — navigation latérale avec sections
- \`LogoMark\` — logo de marque
- \`KpiCard\` — cartes de métriques clés
- \`LatestComponentsList\` — liste d'activité récente
- \`ComponentsCountCard\` — compteur de composants
- \`Badge\` — indicateurs de statut
- \`Breadcrumb\` — fil d'Ariane
- \`StatusLabel\` — label de statut système
`;

// ── E-commerce template ───────────────────────────────────────────────────────

const ECOM_CATEGORIES = ["Tout", "Vêtements", "Chaussures", "Accessoires", "Montres"];

const ECOM_PRODUCTS = [
  { id: 1, name: "T-shirt Premium", price: "€ 39", oldPrice: null,    badge: "NOUVEAU", bg: "#e8f4fb" },
  { id: 2, name: "Sneakers Sport",  price: "€ 89", oldPrice: "€ 120", badge: "PROMO",   bg: "#fdf3e8" },
  { id: 3, name: "Sac Cuir",        price: "€ 149", oldPrice: null,   badge: null,      bg: "#edf8ee" },
  { id: 4, name: "Montre Classique",price: "€ 199", oldPrice: null,   badge: "NOUVEAU", bg: "#f8eaf4" },
  { id: 5, name: "Casquette Logo",  price: "€ 29",  oldPrice: "€ 45", badge: "PROMO",   bg: "#eeeaf8" },
  { id: 6, name: "Veste Légère",    price: "€ 79",  oldPrice: null,   badge: null,      bg: "#f8f7ea" },
  { id: 7, name: "Lunettes Soleil", price: "€ 59",  oldPrice: null,   badge: "NOUVEAU", bg: "#f3eaf8" },
  { id: 8, name: "Ceinture Cuir",   price: "€ 45",  oldPrice: "€ 65", badge: "PROMO",   bg: "#eaf8f3" },
];

function ProductCard({ product }: { product: typeof ECOM_PRODUCTS[number] }) {
  const [wished, setWished] = React.useState(false);
  return (
    <div style={{
      background: "var(--c-surface)", border: "1px solid var(--c-border)",
      borderRadius: 12, overflow: "hidden",
      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
    }}>
      {/* Image placeholder */}
      <div style={{
        height: 180, backgroundColor: product.bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
      }}>
        <FiBox size={40} style={{ color: "rgba(0,0,0,0.15)" }} />
        {/* Badge */}
        {product.badge && (
          <div style={{ position: "absolute", top: 10, left: 10 }}>
            <Badge variant={product.badge === "PROMO" ? "error" : "success"} size="sm">
              {product.badge}
            </Badge>
          </div>
        )}
        {/* Wishlist */}
        <button
          onClick={() => setWished((w) => !w)}
          style={{
            position: "absolute", top: 10, right: 10,
            width: 32, height: 32, borderRadius: "50%",
            background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <FiHeart size={14} style={{ color: wished ? "#CC4A48" : "#52607a", fill: wished ? "#CC4A48" : "none" }} />
        </button>
      </div>
      {/* Body */}
      <div style={{ padding: "12px 14px 16px" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-fg)", marginBottom: 4 }}>
          {product.name}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "var(--color-fg)" }}>{product.price}</span>
          {product.oldPrice && (
            <span style={{ fontSize: 12, color: "var(--color-muted)", textDecoration: "line-through" }}>
              {product.oldPrice}
            </span>
          )}
        </div>
        <Button variant="primary" size="sm" fullWidth leftIcon={<FiShoppingCart size={13} />}>
          Ajouter au panier
        </Button>
      </div>
    </div>
  );
}

function EcommerceTemplate() {
  const [activeCategory, setActiveCategory] = React.useState("Tout");
  const [cartCount] = React.useState(3);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      {/* Nav */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px", height: 64,
        backgroundColor: "var(--c-surface)", borderBottom: "1px solid var(--c-border)",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <LogoMark size="sm" variant="full" />
        <TopNav items={[
          { label: "Nouveautés", href: "/" },
          { label: "Femme", href: "/femme" },
          { label: "Homme", href: "/homme" },
          { label: "Accessoires", href: "/accessoires" },
          { label: "Soldes", href: "/soldes" },
        ]} activePath="/" />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)" }}>
            <FiSearch size={18} />
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", position: "relative", color: "var(--color-muted)" }}>
            <FiShoppingCart size={18} />
            <span style={{
              position: "absolute", top: -6, right: -6,
              width: 16, height: 16, borderRadius: "50%",
              backgroundColor: "#CC4A48", color: "#FBFBFB",
              fontSize: 9, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>{cartCount}</span>
          </button>
        </div>
      </div>

      {/* Hero promo */}
      <HeroCtaSection
        title="Soldes d'été — jusqu'à -50%"
        subtitle="Profitez de nos meilleures offres sur toute la collection été. Livraison gratuite dès 60€."
        ctaLabel="Découvrir les offres"
        secondaryLabel="Nos nouveautés"
        align="center"
      />

      {/* Produits */}
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "56px 24px" }}>
        <SectionHeader
          eyebrow="Catalogue"
          title="Nos produits"
          subtitle="Découvrez notre sélection de pièces incontournables."
          align="center"
        />

        {/* Filtres catégories */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
          {ECOM_CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              <TagChip
                label={cat}
                variant={activeCategory === cat ? "brand" : "muted"}
                size="md"
              />
            </button>
          ))}
        </div>

        {/* Grille produits */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, marginBottom: 56 }}>
          {ECOM_PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>

        {/* Load more */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="secondary" size="lg">Charger plus de produits</Button>
        </div>
      </div>

      {/* Avis clients */}
      <div style={{ backgroundColor: "var(--c-surface-elevated)", padding: "48px 0" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader eyebrow="Avis clients" title="Ils nous font confiance" align="center" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 8 }}>
            {[
              { name: "Sophie M.", note: "Qualité excellente, livraison rapide. Je recommande !", stars: 5 },
              { name: "Thomas L.", note: "Très bonne expérience d'achat. Les produits sont conformes.", stars: 5 },
              { name: "Claire D.", note: "Le service client est réactif. Retour sans problème.", stars: 4 },
            ].map(({ name, note, stars }) => (
              <div key={name} style={{
                background: "var(--c-surface)", border: "1px solid var(--c-border)",
                borderRadius: 12, padding: "18px 20px",
              }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
                  {Array.from({ length: stars }).map((_, i) => (
                    <FiStar key={i} size={13} style={{ color: "#F59E0B", fill: "#F59E0B" }} />
                  ))}
                </div>
                <p style={{ fontSize: 13, color: "var(--color-muted)", lineHeight: 1.6, marginBottom: 10 }}>{note}</p>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-fg)" }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Garanties */}
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
        <FeatureListSection
          features={[
            { title: "Livraison gratuite", description: "Dès 60€ d'achat, livraison offerte en France métropolitaine.", icon: <FiTruck size={22} /> },
            { title: "Retours 30 jours", description: "Pas satisfait ? Retournez votre commande sous 30 jours.", icon: <FiRefreshCw size={22} /> },
            { title: "Paiement sécurisé", description: "Transactions chiffrées SSL. Visa, Mastercard, PayPal.", icon: <FiLock size={22} /> },
            { title: "SAV 7j/7", description: "Notre équipe est disponible tous les jours de 9h à 20h.", icon: <FiHeadphones size={22} /> },
          ]}
          columns={4}
        />
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 48, borderTop: "1px solid var(--c-border)",
        backgroundColor: "var(--c-surface)",
      }}>
        <div style={{
          maxWidth: 1140, margin: "0 auto", padding: "40px 24px 24px",
          display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 32,
        }}>
          <div>
            <LogoMark size="sm" variant="full" />
            <p style={{ fontSize: 13, color: "var(--color-muted)", lineHeight: 1.65, marginTop: 12, maxWidth: 280 }}>
              Mode et accessoires de qualité, livrés directement chez vous. Des pièces pensées pour durer.
            </p>
            <div style={{ marginTop: 16 }}>
              <SocialLinks links={[
                { platform: "instagram", href: "#" },
                { platform: "twitter", href: "#" },
                { platform: "linkedin", href: "#" },
              ]} size="sm" />
            </div>
          </div>
          <FooterLinks title="Boutique" links={[
            { label: "Nouveautés", href: "#" },
            { label: "Femme", href: "#" },
            { label: "Homme", href: "#" },
            { label: "Accessoires", href: "#" },
            { label: "Soldes", href: "#" },
          ]} />
          <FooterLinks title="Aide" links={[
            { label: "Mon compte", href: "#" },
            { label: "Suivi commande", href: "#" },
            { label: "Livraison & retours", href: "#" },
            { label: "FAQ", href: "#" },
            { label: "Contact", href: "#" },
          ]} />
          <FooterLinks title="Entreprise" links={[
            { label: "À propos", href: "#" },
            { label: "Carrières", href: "#" },
            { label: "Presse", href: "#" },
            { label: "Partenaires", href: "#" },
          ]} />
        </div>
        <FooterBar center={<BrandSlogan />} />
      </div>
    </div>
  );
}

const ECOMMERCE_TSX = `"use client";

import React, { useState } from "react";
import {
  TopNav,
  HeroCtaSection,
  SectionHeader,
  FeatureListSection,
  FooterBar,
  FooterLinks,
  SocialLinks,
  BrandSlogan,
  LogoMark,
  Badge,
  Button,
  TagChip,
} from "@brickslab./ui-web";
import {
  FiShoppingCart, FiSearch, FiHeart, FiStar,
  FiTruck, FiRefreshCw, FiLock, FiHeadphones, FiBox,
} from "react-icons/fi";

const CATEGORIES = ["Tout", "Vêtements", "Chaussures", "Accessoires", "Montres"];

const PRODUCTS = [
  { id: 1, name: "T-shirt Premium",   price: "€ 39",  oldPrice: null,    badge: "NOUVEAU", bg: "#e8f4fb" },
  { id: 2, name: "Sneakers Sport",    price: "€ 89",  oldPrice: "€ 120", badge: "PROMO",   bg: "#fdf3e8" },
  { id: 3, name: "Sac Cuir",          price: "€ 149", oldPrice: null,    badge: null,      bg: "#edf8ee" },
  { id: 4, name: "Montre Classique",  price: "€ 199", oldPrice: null,    badge: "NOUVEAU", bg: "#f8eaf4" },
  { id: 5, name: "Casquette Logo",    price: "€ 29",  oldPrice: "€ 45",  badge: "PROMO",   bg: "#eeeaf8" },
  { id: 6, name: "Veste Légère",      price: "€ 79",  oldPrice: null,    badge: null,      bg: "#f8f7ea" },
  { id: 7, name: "Lunettes Soleil",   price: "€ 59",  oldPrice: null,    badge: "NOUVEAU", bg: "#f3eaf8" },
  { id: 8, name: "Ceinture Cuir",     price: "€ 45",  oldPrice: "€ 65",  badge: "PROMO",   bg: "#eaf8f3" },
];

function ProductCard({ product }: { product: typeof PRODUCTS[number] }) {
  const [wished, setWished] = useState(false);
  return (
    <div style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
      <div style={{ height: 180, backgroundColor: product.bg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <FiBox size={40} style={{ color: "rgba(0,0,0,0.15)" }} />
        {product.badge && (
          <div style={{ position: "absolute", top: 10, left: 10 }}>
            <Badge variant={product.badge === "PROMO" ? "error" : "success"} size="sm">{product.badge}</Badge>
          </div>
        )}
        <button onClick={() => setWished(w => !w)} style={{ position: "absolute", top: 10, right: 10, width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <FiHeart size={14} style={{ color: wished ? "#CC4A48" : "#52607a", fill: wished ? "#CC4A48" : "none" }} />
        </button>
      </div>
      <div style={{ padding: "12px 14px 16px" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-fg)", marginBottom: 4 }}>{product.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "var(--color-fg)" }}>{product.price}</span>
          {product.oldPrice && <span style={{ fontSize: 12, color: "var(--color-muted)", textDecoration: "line-through" }}>{product.oldPrice}</span>}
        </div>
        <Button variant="primary" size="sm" fullWidth leftIcon={<FiShoppingCart size={13} />}>
          Ajouter au panier
        </Button>
      </div>
    </div>
  );
}

export default function EcommercePage() {
  const [activeCategory, setActiveCategory] = useState("Tout");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      {/* Nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: 64, backgroundColor: "var(--c-surface)", borderBottom: "1px solid var(--c-border)", position: "sticky", top: 0, zIndex: 100 }}>
        <LogoMark size="sm" variant="full" />
        <TopNav items={[{ label: "Nouveautés", href: "/" }, { label: "Femme", href: "/femme" }, { label: "Homme", href: "/homme" }, { label: "Accessoires", href: "/accessoires" }, { label: "Soldes", href: "/soldes" }]} activePath="/" />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)" }}><FiSearch size={18} /></button>
          <button style={{ background: "none", border: "none", cursor: "pointer", position: "relative", color: "var(--color-muted)" }}>
            <FiShoppingCart size={18} />
            <span style={{ position: "absolute", top: -6, right: -6, width: 16, height: 16, borderRadius: "50%", backgroundColor: "#CC4A48", color: "#FBFBFB", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>3</span>
          </button>
        </div>
      </div>

      <HeroCtaSection title="Soldes d\\'été — jusqu\\'à -50%" subtitle="Profitez de nos meilleures offres sur toute la collection été. Livraison gratuite dès 60€." ctaLabel="Découvrir les offres" secondaryLabel="Nos nouveautés" align="center" />

      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "56px 24px" }}>
        <SectionHeader eyebrow="Catalogue" title="Nos produits" subtitle="Découvrez notre sélection de pièces incontournables." align="center" />
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              <TagChip label={cat} variant={activeCategory === cat ? "brand" : "muted"} size="md" />
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, marginBottom: 40 }}>
          {PRODUCTS.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="secondary" size="lg">Charger plus de produits</Button>
        </div>
      </div>

      <div style={{ backgroundColor: "var(--c-surface-elevated)", padding: "48px 0" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader eyebrow="Avis clients" title="Ils nous font confiance" align="center" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 8 }}>
            {[
              { name: "Sophie M.", note: "Qualité excellente, livraison rapide. Je recommande !", stars: 5 },
              { name: "Thomas L.", note: "Très bonne expérience d\\'achat. Les produits sont conformes.", stars: 5 },
              { name: "Claire D.", note: "Le service client est réactif. Retour sans problème.", stars: 4 },
            ].map(({ name, note, stars }) => (
              <div key={name} style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: 12, padding: "18px 20px" }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
                  {Array.from({ length: stars }).map((_, i) => <FiStar key={i} size={13} style={{ color: "#F59E0B", fill: "#F59E0B" }} />)}
                </div>
                <p style={{ fontSize: 13, color: "var(--color-muted)", lineHeight: 1.6, marginBottom: 10 }}>{note}</p>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-fg)" }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
        <FeatureListSection
          features={[
            { title: "Livraison gratuite", description: "Dès 60€ d\\'achat, livraison offerte en France.", icon: <FiTruck size={22} /> },
            { title: "Retours 30 jours", description: "Retournez votre commande sous 30 jours.", icon: <FiRefreshCw size={22} /> },
            { title: "Paiement sécurisé", description: "Transactions SSL. Visa, Mastercard, PayPal.", icon: <FiLock size={22} /> },
            { title: "SAV 7j/7", description: "Notre équipe disponible tous les jours 9h-20h.", icon: <FiHeadphones size={22} /> },
          ]}
          columns={4}
        />
      </div>

      <div style={{ marginTop: 48, borderTop: "1px solid var(--c-border)", backgroundColor: "var(--c-surface)" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "40px 24px 24px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 32 }}>
          <div>
            <LogoMark size="sm" variant="full" />
            <p style={{ fontSize: 13, color: "var(--color-muted)", lineHeight: 1.65, marginTop: 12 }}>Mode et accessoires de qualité, livrés directement chez vous.</p>
            <div style={{ marginTop: 16 }}><SocialLinks links={[{ platform: "instagram", href: "#" }, { platform: "twitter", href: "#" }, { platform: "linkedin", href: "#" }]} size="sm" /></div>
          </div>
          <FooterLinks title="Boutique" links={[{ label: "Nouveautés", href: "#" }, { label: "Femme", href: "#" }, { label: "Homme", href: "#" }, { label: "Accessoires", href: "#" }, { label: "Soldes", href: "#" }]} />
          <FooterLinks title="Aide" links={[{ label: "Mon compte", href: "#" }, { label: "Suivi commande", href: "#" }, { label: "Livraison & retours", href: "#" }, { label: "FAQ", href: "#" }, { label: "Contact", href: "#" }]} />
          <FooterLinks title="Entreprise" links={[{ label: "À propos", href: "#" }, { label: "Carrières", href: "#" }, { label: "Presse", href: "#" }, { label: "Partenaires", href: "#" }]} />
        </div>
        <FooterBar center={<BrandSlogan />} />
      </div>
    </div>
  );
}
`;

const ECOMMERCE_README = `# E-commerce — Brickslab Template

Template de boutique en ligne prête à l'emploi, construite avec \`@brickslab./ui-web\`.

## Structure du ZIP

\`\`\`
my-project/
├── app/
│   ├── page.tsx        ← composant principal (boutique)
│   ├── layout.tsx      ← layout App Router (fourni)
│   └── globals.css     ← imports tokens (fourni)
├── tokens.css          ← variables CSS Brickslab
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
\`\`\`

## Démarrage

1. Extrayez le ZIP dans un dossier vide
2. Installez les dépendances :
\`\`\`bash
npm install --legacy-peer-deps
\`\`\`
3. Lancez le serveur de développement :
\`\`\`bash
npm run dev
\`\`\`

## Architecture du composant

\`\`\`
EcommercePage
├── Nav sticky (LogoMark + TopNav + Search + Cart)
├── HeroCtaSection (bannière promotionnelle)
├── Catalogue
│   ├── SectionHeader
│   ├── TagChip × 5 (filtres catégories)
│   └── Grille produits (8 ProductCard)
│       └── Badge (NOUVEAU / PROMO) + wishlist + Button
├── Avis clients (3 cartes étoiles)
├── FeatureListSection × 4 (livraison, retours, paiement, SAV)
└── Footer
    ├── LogoMark + description + SocialLinks
    ├── FooterLinks × 3 (Boutique, Aide, Entreprise)
    └── FooterBar + BrandSlogan
\`\`\`

## Composants utilisés

- \`TopNav\`, \`LogoMark\` — navigation
- \`HeroCtaSection\` — bannière promo
- \`SectionHeader\` — titres de sections
- \`TagChip\` — filtres de catégories
- \`Badge\` — labels NOUVEAU / PROMO
- \`Button\` — ajouter au panier
- \`FeatureListSection\` — garanties (livraison, retours…)
- \`FooterBar\`, \`FooterLinks\`, \`SocialLinks\`, \`BrandSlogan\` — footer complet
`;

// ── Portfolio template ────────────────────────────────────────────────────────

const PORTFOLIO_PROJECTS = [
  {
    title: "Plateforme SaaS Analytics",
    description: "Application web de visualisation de données en temps réel. Dashboard interactif, graphiques dynamiques et export multi-formats pour équipes data.",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    links: [
      { label: "Voir le projet", href: "#" },
      { label: "Code source", href: "#" },
    ],
    bg: "#e8f4fb",
  },
  {
    title: "App Mobile E-commerce",
    description: "Application React Native pour une boutique de mode. Navigation fluide, panier persistant, paiement Stripe intégré et notifications push.",
    tags: ["React Native", "Redux", "Stripe", "Firebase"],
    links: [
      { label: "Voir le projet", href: "#" },
      { label: "App Store", href: "#" },
    ],
    bg: "#edf8ee",
  },
  {
    title: "Design System Open Source",
    description: "Bibliothèque de composants React accessible et personnalisable via des tokens CSS. Documentation interactive, tests automatisés et publication npm.",
    tags: ["React", "TypeScript", "CSS Tokens", "Storybook"],
    links: [
      { label: "Documentation", href: "#" },
      { label: "GitHub", href: "#" },
    ],
    bg: "#f8eaf4",
  },
];

function PortfolioTemplate() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      {/* Nav */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px", height: 64,
        backgroundColor: "var(--c-surface)", borderBottom: "1px solid var(--c-border)",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <LogoMark size="sm" variant="full" />
        <TopNav items={[
          { label: "Accueil", href: "/" },
          { label: "Projets", href: "#projects" },
          { label: "Compétences", href: "#skills" },
          { label: "Contact", href: "#contact" },
        ]} activePath="/" />
        <Button variant="primary" size="sm">Me contacter</Button>
      </div>

      {/* Hero */}
      <div style={{
        textAlign: "center", padding: "100px 24px 80px",
        maxWidth: 760, margin: "0 auto",
      }}>
        <div style={{
          width: 88, height: 88, borderRadius: "50%",
          background: "linear-gradient(135deg, #CC4A48 0%, #f87171 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#FBFBFB", fontSize: 28, fontWeight: 800,
          margin: "0 auto 28px",
        }}>
          JD
        </div>
        <h1 style={{
          fontSize: 48, fontWeight: 800, color: "var(--color-fg)",
          letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.1,
        }}>
          Julien Dupont
        </h1>
        <p style={{
          fontSize: 20, color: "#CC4A48", fontWeight: 600, marginBottom: 16,
        }}>
          Développeur Full-Stack & Designer UI
        </p>
        <p style={{
          fontSize: 15, color: "var(--color-muted)", lineHeight: 1.75,
          marginBottom: 36, maxWidth: 560, margin: "0 auto 36px",
        }}>
          Je conçois et développe des applications web modernes, performantes et accessibles.
          Passionné par l'expérience utilisateur et les systèmes de design.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Button variant="primary" size="lg">Voir mes projets</Button>
          <Button variant="secondary" size="lg" leftIcon={<FiGithub size={16} />}>GitHub</Button>
        </div>
        {/* Social row */}
        <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
          <SocialLinks
            links={[
              { platform: "github", href: "#" },
              { platform: "linkedin", href: "#" },
              { platform: "twitter", href: "#" },
            ]}
            size="md"
          />
        </div>
      </div>

      {/* Projects */}
      <div id="projects" style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px" }}>
        <SectionHeader
          eyebrow="Portfolio"
          title="Mes projets récents"
          subtitle="Une sélection de réalisations mettant en avant mes compétences techniques et créatives."
          align="center"
        />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24, marginTop: 12,
        }}>
          {PORTFOLIO_PROJECTS.map((project) => (
            <div key={project.title}>
              {/* Visual placeholder */}
              <div style={{
                height: 160, backgroundColor: project.bg,
                borderRadius: "12px 12px 0 0",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid var(--c-border)", borderBottom: "none",
              }}>
                <FiMonitor size={36} style={{ color: "rgba(0,0,0,0.15)" }} />
              </div>
              <ProjectDescriptionPanel
                title={project.title}
                description={project.description}
                tags={project.tags}
                links={project.links}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div id="skills" style={{ backgroundColor: "var(--c-surface-elevated)", padding: "64px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader
            eyebrow="Compétences"
            title="Ce que je fais"
            subtitle="Des expertises complémentaires pour couvrir l'ensemble du cycle de développement produit."
            align="center"
          />
          <FeatureListSection
            features={[
              {
                title: "Développement Front-end",
                description: "React, TypeScript, CSS moderne. Interfaces performantes, accessibles et responsive.",
                icon: <FiCode size={24} />,
              },
              {
                title: "Développement Back-end",
                description: "Node.js, APIs REST & GraphQL, bases de données SQL et NoSQL.",
                icon: <FiDatabase size={24} />,
              },
              {
                title: "Design UI / UX",
                description: "Wireframes, prototypes Figma, design systems et tokens CSS.",
                icon: <FiAward size={24} />,
              },
              {
                title: "Applications mobiles",
                description: "React Native pour iOS et Android. Expériences fluides sur tous les appareils.",
                icon: <FiSmartphone size={24} />,
              },
            ]}
            columns={4}
          />
        </div>
      </div>

      {/* Contact CTA */}
      <div id="contact" style={{ maxWidth: 680, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <SectionHeader
          eyebrow="Contact"
          title="Travaillons ensemble"
          subtitle="Un projet en tête ? Je suis disponible pour des missions freelance ou des opportunités à temps plein."
          align="center"
        />
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 8 }}>
          <Button variant="primary" size="lg" leftIcon={<FiExternalLink size={16} />}>
            Envoyer un message
          </Button>
          <Button variant="secondary" size="lg">
            Télécharger le CV
          </Button>
        </div>
      </div>

      {/* Footer */}
      <FooterBar center={<BrandSlogan />} />
    </div>
  );
}

const PORTFOLIO_TSX = `"use client";

import React from "react";
import {
  TopNav,
  HeroCtaSection,
  SectionHeader,
  FeatureListSection,
  FooterBar,
  BrandSlogan,
  LogoMark,
  Button,
  SocialLinks,
  ProjectDescriptionPanel,
} from "@brickslab./ui-web";
import {
  FiGithub, FiCode, FiDatabase, FiAward, FiSmartphone,
  FiMonitor, FiExternalLink,
} from "react-icons/fi";

const PROJECTS = [
  {
    title: "Plateforme SaaS Analytics",
    description: "Application web de visualisation de données en temps réel. Dashboard interactif, graphiques dynamiques et export multi-formats.",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    links: [{ label: "Voir le projet", href: "#" }, { label: "Code source", href: "#" }],
    bg: "#e8f4fb",
  },
  {
    title: "App Mobile E-commerce",
    description: "Application React Native pour une boutique de mode. Navigation fluide, panier persistant, paiement Stripe intégré.",
    tags: ["React Native", "Redux", "Stripe", "Firebase"],
    links: [{ label: "Voir le projet", href: "#" }, { label: "App Store", href: "#" }],
    bg: "#edf8ee",
  },
  {
    title: "Design System Open Source",
    description: "Bibliothèque de composants React accessible et personnalisable via des tokens CSS. Documentation interactive et publication npm.",
    tags: ["React", "TypeScript", "CSS Tokens", "Storybook"],
    links: [{ label: "Documentation", href: "#" }, { label: "GitHub", href: "#" }],
    bg: "#f8eaf4",
  },
];

export default function PortfolioPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      {/* Nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", height: 64, backgroundColor: "var(--c-surface)", borderBottom: "1px solid var(--c-border)", position: "sticky", top: 0, zIndex: 100 }}>
        <LogoMark size="sm" variant="full" />
        <TopNav items={[{ label: "Accueil", href: "/" }, { label: "Projets", href: "#projects" }, { label: "Compétences", href: "#skills" }, { label: "Contact", href: "#contact" }]} activePath="/" />
        <Button variant="primary" size="sm">Me contacter</Button>
      </div>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "100px 24px 80px", maxWidth: 760, margin: "0 auto" }}>
        <div style={{ width: 88, height: 88, borderRadius: "50%", background: "linear-gradient(135deg, var(--color-brand) 0%, #f87171 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FBFBFB", fontSize: 28, fontWeight: 800, margin: "0 auto 28px" }}>
          JD
        </div>
        <h1 style={{ fontSize: 48, fontWeight: 800, color: "var(--color-fg)", letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.1 }}>
          Julien Dupont
        </h1>
        <p style={{ fontSize: 20, color: "var(--color-brand)", fontWeight: 600, marginBottom: 16 }}>
          Développeur Full-Stack & Designer UI
        </p>
        <p style={{ fontSize: 15, color: "var(--color-muted)", lineHeight: 1.75, marginBottom: 36, maxWidth: 560, margin: "0 auto 36px" }}>
          Je conçois et développe des applications web modernes, performantes et accessibles.
          Passionné par l\\'expérience utilisateur et les systèmes de design.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Button variant="primary" size="lg">Voir mes projets</Button>
          <Button variant="secondary" size="lg" leftIcon={<FiGithub size={16} />}>GitHub</Button>
        </div>
        <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
          <SocialLinks links={[{ platform: "github", href: "#" }, { platform: "linkedin", href: "#" }, { platform: "twitter", href: "#" }]} size="md" />
        </div>
      </div>

      {/* Projects */}
      <div id="projects" style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px" }}>
        <SectionHeader eyebrow="Portfolio" title="Mes projets récents" subtitle="Une sélection de réalisations mettant en avant mes compétences techniques et créatives." align="center" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 12 }}>
          {PROJECTS.map(project => (
            <div key={project.title}>
              <div style={{ height: 160, backgroundColor: project.bg, borderRadius: "12px 12px 0 0", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--c-border)", borderBottom: "none" }}>
                <FiMonitor size={36} style={{ color: "rgba(0,0,0,0.15)" }} />
              </div>
              <ProjectDescriptionPanel title={project.title} description={project.description} tags={project.tags} links={project.links} />
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div id="skills" style={{ backgroundColor: "var(--c-surface-elevated)", padding: "64px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader eyebrow="Compétences" title="Ce que je fais" subtitle="Des expertises complémentaires pour couvrir l\\'ensemble du cycle de développement produit." align="center" />
          <FeatureListSection
            features={[
              { title: "Développement Front-end", description: "React, TypeScript, CSS moderne. Interfaces performantes, accessibles et responsive.", icon: <FiCode size={24} /> },
              { title: "Développement Back-end", description: "Node.js, APIs REST & GraphQL, bases de données SQL et NoSQL.", icon: <FiDatabase size={24} /> },
              { title: "Design UI / UX", description: "Wireframes, prototypes Figma, design systems et tokens CSS.", icon: <FiAward size={24} /> },
              { title: "Applications mobiles", description: "React Native pour iOS et Android. Expériences fluides sur tous les appareils.", icon: <FiSmartphone size={24} /> },
            ]}
            columns={4}
          />
        </div>
      </div>

      {/* Contact CTA */}
      <div id="contact" style={{ maxWidth: 680, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <SectionHeader eyebrow="Contact" title="Travaillons ensemble" subtitle="Un projet en tête ? Je suis disponible pour des missions freelance ou des opportunités à temps plein." align="center" />
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 8 }}>
          <Button variant="primary" size="lg" leftIcon={<FiExternalLink size={16} />}>Envoyer un message</Button>
          <Button variant="secondary" size="lg">Télécharger le CV</Button>
        </div>
      </div>

      <FooterBar center={<BrandSlogan />} />
    </div>
  );
}
`;

const PORTFOLIO_README = `# Portfolio — Brickslab Template

Template de portfolio personnel pour développeur ou designer, construite avec \`@brickslab./ui-web\`.

## Structure du ZIP

\`\`\`
my-project/
├── app/
│   ├── page.tsx        ← composant principal (portfolio)
│   ├── layout.tsx      ← layout App Router (fourni)
│   └── globals.css     ← imports tokens (fourni)
├── tokens.css          ← variables CSS Brickslab
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
\`\`\`

## Démarrage

1. Extrayez le ZIP dans un dossier vide
2. Installez les dépendances :
\`\`\`bash
npm install --legacy-peer-deps
\`\`\`
3. Lancez le serveur de développement :
\`\`\`bash
npm run dev
\`\`\`

## Architecture du composant

\`\`\`
PortfolioPage
├── Nav sticky (LogoMark + TopNav + Button contact)
├── Hero (avatar initiales, nom, titre, CTA, SocialLinks)
├── Section Projets
│   └── ProjectDescriptionPanel × 3 (titre, description, tags, liens)
├── Section Compétences
│   └── FeatureListSection × 4 (Front-end, Back-end, Design, Mobile)
├── Section Contact (SectionHeader + 2 Button)
└── FooterBar + BrandSlogan
\`\`\`

## Personnalisation

- Remplacez les initiales "JD" et le nom par les vôtres
- Mettez à jour les projets dans le tableau \`PROJECTS\`
- Ajustez les compétences dans \`FeatureListSection\`
- Utilisez le **Theme Builder** pour générer un \`tokens.css\` personnalisé

## Composants utilisés

- \`TopNav\`, \`LogoMark\` — navigation
- \`Button\` — CTA et actions
- \`SocialLinks\` — liens réseaux sociaux
- \`SectionHeader\` — titres de sections avec eyebrow
- \`ProjectDescriptionPanel\` — cartes de projets avec tags et liens
- \`FeatureListSection\` — grille de compétences
- \`FooterBar\`, \`BrandSlogan\` — pied de page
`;

// ── SaaS Pricing template ────────────────────────────────────────────────────

const PRICING_PLANS = [
  {
    name: "Starter",
    price: "29€",
    period: "/mois",
    description: "Pour les petites équipes qui veulent démarrer vite.",
    cta: "Démarrer",
    highlight: false,
    features: ["3 projets actifs", "10 000 événements/mois", "Support e-mail"],
  },
  {
    name: "Growth",
    price: "99€",
    period: "/mois",
    description: "Le plan le plus populaire pour accélérer la croissance.",
    cta: "Choisir Growth",
    highlight: true,
    features: ["Projets illimités", "200 000 événements/mois", "Support prioritaire"],
  },
  {
    name: "Scale",
    price: "249€",
    period: "/mois",
    description: "Pour les structures exigeantes avec SLA avancé.",
    cta: "Contacter l'équipe",
    highlight: false,
    features: ["SLA 99.9%", "SSO + audit logs", "Success manager dédié"],
  },
];

function PricingTemplate() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px", height: 64,
        backgroundColor: "var(--c-surface)", borderBottom: "1px solid var(--c-border)",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <LogoMark size="sm" variant="full" />
        <TopNav items={[
          { label: "Produit", href: "/" },
          { label: "Tarifs", href: "#pricing" },
          { label: "FAQ", href: "#faq" },
          { label: "Contact", href: "#contact" },
        ]} activePath="/" />
        <Button variant="primary" size="sm">Essai gratuit</Button>
      </div>

      <HeroCtaSection
        title="Tarification simple et transparente"
        subtitle="Un plan adapté à chaque étape de votre produit. Sans frais cachés, sans engagement."
        ctaLabel="Commencer gratuitement"
        secondaryLabel="Comparer les plans"
        align="center"
      />

      <div id="pricing" style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 24px 64px" }}>
        <SectionHeader
          eyebrow="Pricing"
          title="Choisissez votre plan"
          subtitle="Passez à l'échelle avec les bons outils au bon moment."
          align="center"
        />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 18,
          marginTop: 10,
        }}>
          {PRICING_PLANS.map((plan) => (
            <div key={plan.name} style={{
              background: "var(--c-surface)",
              border: `1px solid ${plan.highlight ? "var(--c-brand-border)" : "var(--c-border)"}`,
              borderRadius: 14,
              padding: "20px 18px",
              boxShadow: plan.highlight ? "0 12px 30px rgba(204,74,72,0.16)" : "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--color-fg)" }}>{plan.name}</h3>
                {plan.highlight && <Badge variant="error" size="sm">Populaire</Badge>}
              </div>
              <div style={{ marginBottom: 6 }}>
                <span style={{ fontSize: 28, fontWeight: 800, color: "var(--color-fg)" }}>{plan.price}</span>
                <span style={{ fontSize: 13, color: "var(--color-muted)", marginLeft: 4 }}>{plan.period}</span>
              </div>
              <p style={{ fontSize: 13, color: "var(--color-muted)", lineHeight: 1.55, marginBottom: 16 }}>
                {plan.description}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
                {plan.features.map((feature) => (
                  <div key={feature} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--color-muted)" }}>
                    <FiActivity size={14} style={{ color: "var(--color-brand)" }} />
                    {feature}
                  </div>
                ))}
              </div>
              <Button variant={plan.highlight ? "primary" : "secondary"} size="md" fullWidth>
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div id="faq" style={{ backgroundColor: "var(--c-surface-elevated)", padding: "56px 0" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px" }}>
          <FeatureListSection
            features={[
              {
                title: "Adoption accélérée",
                description: "Déployez vos parcours plus vite avec des composants prêts à l'emploi.",
                icon: <FiTrendingUp size={22} />,
              },
              {
                title: "Collaboration fluide",
                description: "Un espace partagé pour PM, designers et développeurs.",
                icon: <FiUsers size={22} />,
              },
              {
                title: "Sécurité native",
                description: "Permissions granulaires, historique d'audit et pratiques sécurisées.",
                icon: <FiShield size={22} />,
              },
            ]}
            columns={3}
          />
        </div>
      </div>

      <FooterBar center={<BrandSlogan />} />
    </div>
  );
}

const PRICING_TSX = `"use client";

import React from "react";
import {
  TopNav,
  HeroCtaSection,
  SectionHeader,
  FeatureListSection,
  FooterBar,
  BrandSlogan,
  LogoMark,
  Button,
  Badge,
} from "@brickslab./ui-web";
import { FiActivity, FiTrendingUp, FiUsers, FiShield } from "react-icons/fi";

const PLANS = [
  {
    name: "Starter",
    price: "29€",
    period: "/mois",
    description: "Pour les petites équipes qui veulent démarrer vite.",
    cta: "Démarrer",
    highlight: false,
    features: ["3 projets actifs", "10 000 événements/mois", "Support e-mail"],
  },
  {
    name: "Growth",
    price: "99€",
    period: "/mois",
    description: "Le plan le plus populaire pour accélérer la croissance.",
    cta: "Choisir Growth",
    highlight: true,
    features: ["Projets illimités", "200 000 événements/mois", "Support prioritaire"],
  },
  {
    name: "Scale",
    price: "249€",
    period: "/mois",
    description: "Pour les structures exigeantes avec SLA avancé.",
    cta: "Contacter l'équipe",
    highlight: false,
    features: ["SLA 99.9%", "SSO + audit logs", "Success manager dédié"],
  },
];

export default function PricingPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: 64, backgroundColor: "var(--c-surface)", borderBottom: "1px solid var(--c-border)", position: "sticky", top: 0, zIndex: 100 }}>
        <LogoMark size="sm" variant="full" />
        <TopNav items={[{ label: "Produit", href: "/" }, { label: "Tarifs", href: "#pricing" }, { label: "FAQ", href: "#faq" }, { label: "Contact", href: "#contact" }]} activePath="/" />
        <Button variant="primary" size="sm">Essai gratuit</Button>
      </div>

      <HeroCtaSection title="Tarification simple et transparente" subtitle="Un plan adapté à chaque étape de votre produit. Sans frais cachés, sans engagement." ctaLabel="Commencer gratuitement" secondaryLabel="Comparer les plans" align="center" />

      <div id="pricing" style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 24px 64px" }}>
        <SectionHeader eyebrow="Pricing" title="Choisissez votre plan" subtitle="Passez à l'échelle avec les bons outils au bon moment." align="center" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginTop: 10 }}>
          {PLANS.map((plan) => (
            <div key={plan.name} style={{ background: "var(--c-surface)", border: \`1px solid \${plan.highlight ? "var(--c-brand-border)" : "var(--c-border)"}\`, borderRadius: 14, padding: "20px 18px", boxShadow: plan.highlight ? "0 12px 30px rgba(204,74,72,0.16)" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--color-fg)" }}>{plan.name}</h3>
                {plan.highlight && <Badge variant="error" size="sm">Populaire</Badge>}
              </div>
              <div style={{ marginBottom: 6 }}>
                <span style={{ fontSize: 28, fontWeight: 800, color: "var(--color-fg)" }}>{plan.price}</span>
                <span style={{ fontSize: 13, color: "var(--color-muted)", marginLeft: 4 }}>{plan.period}</span>
              </div>
              <p style={{ fontSize: 13, color: "var(--color-muted)", lineHeight: 1.55, marginBottom: 16 }}>{plan.description}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
                {plan.features.map((feature) => (
                  <div key={feature} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--color-muted)" }}>
                    <FiActivity size={14} style={{ color: "var(--color-brand)" }} />
                    {feature}
                  </div>
                ))}
              </div>
              <Button variant={plan.highlight ? "primary" : "secondary"} size="md" fullWidth>{plan.cta}</Button>
            </div>
          ))}
        </div>
      </div>

      <div id="faq" style={{ backgroundColor: "var(--c-surface-elevated)", padding: "56px 0" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px" }}>
          <FeatureListSection
            features={[
              { title: "Adoption accélérée", description: "Déployez vos parcours plus vite avec des composants prêts à l'emploi.", icon: <FiTrendingUp size={22} /> },
              { title: "Collaboration fluide", description: "Un espace partagé pour PM, designers et développeurs.", icon: <FiUsers size={22} /> },
              { title: "Sécurité native", description: "Permissions granulaires, historique d'audit et pratiques sécurisées.", icon: <FiShield size={22} /> },
            ]}
            columns={3}
          />
        </div>
      </div>

      <FooterBar center={<BrandSlogan />} />
    </div>
  );
}
`;

const PRICING_README = `# Pricing SaaS — Brickslab Template

Template de page de tarification SaaS avec navigation sticky, grille de plans et section bénéfices.

## Structure du ZIP

\`\`\`
my-project/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── tokens.css
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
\`\`\`

## Démarrage

1. Extrayez le ZIP dans un dossier vide
2. Installez les dépendances :
\`\`\`bash
npm install --legacy-peer-deps
\`\`\`
3. Lancez le serveur de développement :
\`\`\`bash
npm run dev
\`\`\`
`;

// ── Help Center template ─────────────────────────────────────────────────────

const HELP_CATEGORIES = [
  { label: "Compte & accès", description: "Connexion, sécurité, gestion des rôles." },
  { label: "Facturation", description: "Abonnements, paiements, factures et TVA." },
  { label: "Intégrations", description: "API, webhooks, CI/CD et synchronisations." },
  { label: "Performances", description: "Monitoring, diagnostics et bonnes pratiques." },
];

function HelpCenterTemplate() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      <TopNav
        items={[
          { label: "Aide", href: "/" },
          { label: "Guides", href: "#guides" },
          { label: "Statut", href: "#status" },
          { label: "Contact", href: "#contact" },
        ]}
        activePath="/"
      />

      <HeroCtaSection
        title="Centre d'aide produit"
        subtitle="Toutes les réponses pour configurer, déployer et maintenir votre application plus sereinement."
        ctaLabel="Ouvrir un ticket"
        secondaryLabel="Voir la documentation"
        align="center"
      />

      <div id="guides" style={{ maxWidth: 1120, margin: "0 auto", padding: "56px 24px" }}>
        <SectionHeader
          eyebrow="Guides"
          title="Parcourir par catégorie"
          subtitle="Accédez rapidement aux sujets les plus consultés."
          align="center"
        />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 16,
          marginTop: 12,
        }}>
          {HELP_CATEGORIES.map((category) => (
            <div key={category.label} style={{
              background: "var(--c-surface)",
              border: "1px solid var(--c-border)",
              borderRadius: 12,
              padding: "16px 18px",
            }}>
              <div style={{ marginBottom: 10 }}>
                <TagChip label={category.label} variant="brand" size="sm" />
              </div>
              <p style={{ fontSize: 13, color: "var(--color-muted)", lineHeight: 1.55 }}>
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div id="status" style={{ backgroundColor: "var(--c-surface-elevated)", padding: "56px 0" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader
            eyebrow="Support"
            title="Indicateurs de service"
            subtitle="Suivi rapide de la charge et de la qualité de support."
            align="center"
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 8 }}>
            <KpiCard label="Tickets traités" value="1 248" helper="ce mois" />
            <KpiCard label="Temps moyen" value="2h14" helper="première réponse" />
            <KpiCard label="Satisfaction" value="97%" helper="sur 30 jours" />
          </div>
          <div style={{ marginTop: 18 }}>
            <LatestComponentsList
              title="Articles mis à jour"
              ctaLabel="Tout voir"
              ctaHref="#"
              items={[
                { label: "Configurer SSO", section: "Guide d'authentification", type: "web", href: "#" },
                { label: "Gérer les rôles", section: "Tutoriel permissions", type: "web", href: "#" },
                { label: "Webhooks sortants", section: "Référence API", type: "web", href: "#" },
                { label: "Plan de reprise", section: "Runbook incidents", type: "web", href: "#" },
              ]}
            />
          </div>
        </div>
      </div>

      <div id="contact" style={{ maxWidth: 720, margin: "0 auto", padding: "56px 24px", textAlign: "center" }}>
        <SectionHeader
          eyebrow="Contact"
          title="Besoin d'une aide avancée ?"
          subtitle="Notre équipe support peut vous accompagner sur les incidents critiques."
          align="center"
        />
        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          <Button variant="primary" size="lg">Contacter le support</Button>
          <Button variant="secondary" size="lg">Voir le statut système</Button>
        </div>
      </div>

      <FooterBar center={<BrandSlogan />} />
    </div>
  );
}

const HELP_CENTER_TSX = `"use client";

import React from "react";
import {
  TopNav,
  HeroCtaSection,
  SectionHeader,
  KpiCard,
  LatestComponentsList,
  TagChip,
  Button,
  FooterBar,
  BrandSlogan,
} from "@brickslab./ui-web";

const CATEGORIES = [
  { label: "Compte & accès", description: "Connexion, sécurité, gestion des rôles." },
  { label: "Facturation", description: "Abonnements, paiements, factures et TVA." },
  { label: "Intégrations", description: "API, webhooks, CI/CD et synchronisations." },
  { label: "Performances", description: "Monitoring, diagnostics et bonnes pratiques." },
];

export default function HelpCenterPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      <TopNav items={[{ label: "Aide", href: "/" }, { label: "Guides", href: "#guides" }, { label: "Statut", href: "#status" }, { label: "Contact", href: "#contact" }]} activePath="/" />

      <HeroCtaSection title="Centre d'aide produit" subtitle="Toutes les réponses pour configurer, déployer et maintenir votre application plus sereinement." ctaLabel="Ouvrir un ticket" secondaryLabel="Voir la documentation" align="center" />

      <div id="guides" style={{ maxWidth: 1120, margin: "0 auto", padding: "56px 24px" }}>
        <SectionHeader eyebrow="Guides" title="Parcourir par catégorie" subtitle="Accédez rapidement aux sujets les plus consultés." align="center" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16, marginTop: 12 }}>
          {CATEGORIES.map((category) => (
            <div key={category.label} style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: 12, padding: "16px 18px" }}>
              <div style={{ marginBottom: 10 }}>
                <TagChip label={category.label} variant="brand" size="sm" />
              </div>
              <p style={{ fontSize: 13, color: "var(--color-muted)", lineHeight: 1.55 }}>{category.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div id="status" style={{ backgroundColor: "var(--c-surface-elevated)", padding: "56px 0" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader eyebrow="Support" title="Indicateurs de service" subtitle="Suivi rapide de la charge et de la qualité de support." align="center" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 8 }}>
            <KpiCard label="Tickets traités" value="1 248" helper="ce mois" />
            <KpiCard label="Temps moyen" value="2h14" helper="première réponse" />
            <KpiCard label="Satisfaction" value="97%" helper="sur 30 jours" />
          </div>
          <div style={{ marginTop: 18 }}>
            <LatestComponentsList
              title="Articles mis à jour"
              ctaLabel="Tout voir"
              ctaHref="#"
              items={[
                { label: "Configurer SSO", section: "Guide d'authentification", type: "web", href: "#" },
                { label: "Gérer les rôles", section: "Tutoriel permissions", type: "web", href: "#" },
                { label: "Webhooks sortants", section: "Référence API", type: "web", href: "#" },
                { label: "Plan de reprise", section: "Runbook incidents", type: "web", href: "#" },
              ]}
            />
          </div>
        </div>
      </div>

      <div id="contact" style={{ maxWidth: 720, margin: "0 auto", padding: "56px 24px", textAlign: "center" }}>
        <SectionHeader eyebrow="Contact" title="Besoin d'une aide avancée ?" subtitle="Notre équipe support peut vous accompagner sur les incidents critiques." align="center" />
        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          <Button variant="primary" size="lg">Contacter le support</Button>
          <Button variant="secondary" size="lg">Voir le statut système</Button>
        </div>
      </div>

      <FooterBar center={<BrandSlogan />} />
    </div>
  );
}
`;

const HELP_CENTER_README = `# Help Center — Brickslab Template

Template de centre d'aide avec catégories, indicateurs de service et liste d'articles mis à jour.

## Structure du ZIP

\`\`\`
my-project/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── tokens.css
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
\`\`\`

## Démarrage

1. Extrayez le ZIP dans un dossier vide
2. Installez les dépendances :
\`\`\`bash
npm install --legacy-peer-deps
\`\`\`
3. Lancez le serveur de développement :
\`\`\`bash
npm run dev
\`\`\`
`;

// ── E-commerce Suite template (multi-pages) ──────────────────────────────────

const ECOM_SUITE_PAGES = [
  { label: "Accueil", route: "/", description: "Hero + catégories + promos." },
  { label: "Boutique", route: "/boutique", description: "Catalogue produits avec filtres." },
  { label: "Produit", route: "/produit", description: "Fiche produit détaillée." },
  { label: "Panier", route: "/panier", description: "Récapitulatif + paiement." },
];

function EcommerceSuiteTemplate() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px", height: 64,
        backgroundColor: "var(--c-surface)", borderBottom: "1px solid var(--c-border)",
      }}>
        <LogoMark size="sm" variant="full" />
        <TopNav items={[
          { label: "Accueil", href: "/" },
          { label: "Boutique", href: "/boutique" },
          { label: "Produit", href: "/produit" },
          { label: "Panier", href: "/panier" },
        ]} activePath="/" />
        <Button variant="primary" size="sm" leftIcon={<FiShoppingCart size={14} />}>Commander</Button>
      </div>

      <HeroCtaSection
        title="E-commerce prêt pour la production"
        subtitle="Un template multi-pages pour couvrir tout le parcours d'achat, de la découverte au panier."
        ctaLabel="Voir la boutique"
        secondaryLabel="Voir les pages"
        align="center"
      />

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "44px 24px 56px" }}>
        <SectionHeader
          eyebrow="Parcours"
          title="Pages incluses"
          subtitle="Chaque page est prête à être branchée à vos APIs et vos données produits."
          align="center"
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 10 }}>
          {ECOM_SUITE_PAGES.map((page) => (
            <div key={page.route} style={{
              background: "var(--c-surface)",
              border: "1px solid var(--c-border)",
              borderRadius: 12,
              padding: "14px 14px 16px",
            }}>
              <TagChip label={page.route} variant="brand" size="sm" />
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--color-fg)", marginTop: 10, marginBottom: 6 }}>
                {page.label}
              </h3>
              <p style={{ fontSize: 12, color: "var(--color-muted)", lineHeight: 1.5 }}>
                {page.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <FooterBar center={<BrandSlogan />} />
    </div>
  );
}

const ECOM_SUITE_HOME_TSX = `import React from "react";
import { TopNav, HeroCtaSection, SectionHeader, TagChip, FooterBar, BrandSlogan, LogoMark, Button } from "@brickslab./ui-web";
import { FiShoppingCart } from "react-icons/fi";

const PAGES = [
  { label: "Boutique", href: "/boutique", description: "Catalogue produits avec filtres et recherche." },
  { label: "Produit", href: "/produit", description: "Page produit avec visuels, prix et CTA." },
  { label: "Panier", href: "/panier", description: "Récapitulatif commande et paiement." },
];

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: 64, backgroundColor: "var(--c-surface)", borderBottom: "1px solid var(--c-border)" }}>
        <LogoMark size="sm" variant="full" />
        <TopNav items={[{ label: "Accueil", href: "/" }, { label: "Boutique", href: "/boutique" }, { label: "Produit", href: "/produit" }, { label: "Panier", href: "/panier" }]} activePath="/" />
        <Button variant="primary" size="sm" leftIcon={<FiShoppingCart size={14} />}>Commander</Button>
      </div>
      <HeroCtaSection title="Template e-commerce multi-pages" subtitle="Parcours complet: accueil, boutique, produit, panier." ctaLabel="Ouvrir la boutique" secondaryLabel="Voir le panier" align="center" />
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 24px 56px" }}>
        <SectionHeader eyebrow="Pages" title="Structure incluse" subtitle="Des routes claires pour démarrer rapidement." align="center" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 10 }}>
          {PAGES.map((p) => (
            <div key={p.href} style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: 12, padding: "14px 14px 16px" }}>
              <TagChip label={p.href} variant="brand" size="sm" />
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--color-fg)", marginTop: 10, marginBottom: 6 }}>{p.label}</h3>
              <p style={{ fontSize: 12, color: "var(--color-muted)", lineHeight: 1.5 }}>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
      <FooterBar center={<BrandSlogan />} />
    </div>
  );
}
`;

const ECOM_SUITE_SHOP_TSX = `import React from "react";
import { TopNav, SectionHeader, TagChip, Button, LogoMark } from "@brickslab./ui-web";
import { FiShoppingCart, FiBox } from "react-icons/fi";

const PRODUCTS = [
  { name: "Sneakers Flow", price: "89€", badge: "Nouveau", bg: "#f0f6ff" },
  { name: "Veste Canyon", price: "129€", badge: "Best seller", bg: "#f8f4ea" },
  { name: "Sac Metro", price: "74€", badge: "Promo", bg: "#edf8ee" },
  { name: "Casquette Core", price: "29€", badge: "Nouveau", bg: "#f8eaf4" },
];

export default function BoutiquePage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: 64, backgroundColor: "var(--c-surface)", borderBottom: "1px solid var(--c-border)" }}>
        <LogoMark size="sm" variant="full" />
        <TopNav items={[{ label: "Accueil", href: "/" }, { label: "Boutique", href: "/boutique" }, { label: "Produit", href: "/produit" }, { label: "Panier", href: "/panier" }]} activePath="/boutique" />
        <Button variant="secondary" size="sm" leftIcon={<FiShoppingCart size={14} />}>Panier</Button>
      </div>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "44px 24px 56px" }}>
        <SectionHeader eyebrow="Catalogue" title="Boutique" subtitle="Une grille simple à brancher à votre backend e-commerce." align="center" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 12 }}>
          {PRODUCTS.map((p) => (
            <div key={p.name} style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ height: 120, backgroundColor: p.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FiBox size={28} style={{ color: "rgba(0,0,0,0.2)" }} />
              </div>
              <div style={{ padding: "12px 12px 14px" }}>
                <TagChip label={p.badge} variant="muted" size="sm" />
                <h3 style={{ fontSize: 14, color: "var(--color-fg)", margin: "8px 0 4px", fontWeight: 700 }}>{p.name}</h3>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-fg)", marginBottom: 10 }}>{p.price}</div>
                <Button variant="primary" size="sm" fullWidth>Voir le produit</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`;

const ECOM_SUITE_PRODUCT_TSX = `import React from "react";
import { TopNav, SectionHeader, Button, Badge, LogoMark } from "@brickslab./ui-web";
import { FiShoppingCart, FiTruck, FiRefreshCw } from "react-icons/fi";

export default function ProduitPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: 64, backgroundColor: "var(--c-surface)", borderBottom: "1px solid var(--c-border)" }}>
        <LogoMark size="sm" variant="full" />
        <TopNav items={[{ label: "Accueil", href: "/" }, { label: "Boutique", href: "/boutique" }, { label: "Produit", href: "/produit" }, { label: "Panier", href: "/panier" }]} activePath="/produit" />
        <Button variant="secondary" size="sm">Retour boutique</Button>
      </div>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "44px 24px 56px" }}>
        <SectionHeader eyebrow="Produit" title="Sneakers Flow" subtitle="Fiche produit avec visuel principal, description, prix et options de livraison." />
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 18 }}>
          <div style={{ border: "1px solid var(--c-border)", borderRadius: 12, height: 320, backgroundColor: "#f0f6ff" }} />
          <div style={{ border: "1px solid var(--c-border)", borderRadius: 12, background: "var(--c-surface)", padding: "18px 18px 20px" }}>
            <div style={{ marginBottom: 10 }}><Badge variant="success" size="sm">En stock</Badge></div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "var(--color-fg)", marginBottom: 8 }}>89€</div>
            <p style={{ fontSize: 13, color: "var(--color-muted)", lineHeight: 1.6, marginBottom: 14 }}>
              Modèle léger et respirant, semelle amortissante, parfait pour un usage quotidien.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--color-muted)" }}><FiTruck size={14} /> Livraison 48h offerte</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--color-muted)" }}><FiRefreshCw size={14} /> Retour gratuit 30 jours</div>
            </div>
            <Button variant="primary" size="md" fullWidth leftIcon={<FiShoppingCart size={14} />}>Ajouter au panier</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

const ECOM_SUITE_CART_TSX = `import React from "react";
import { TopNav, SectionHeader, Button, LogoMark } from "@brickslab./ui-web";

const ITEMS = [
  { name: "Sneakers Flow", qty: 1, price: "89€" },
  { name: "Casquette Core", qty: 2, price: "58€" },
];

export default function PanierPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: 64, backgroundColor: "var(--c-surface)", borderBottom: "1px solid var(--c-border)" }}>
        <LogoMark size="sm" variant="full" />
        <TopNav items={[{ label: "Accueil", href: "/" }, { label: "Boutique", href: "/boutique" }, { label: "Produit", href: "/produit" }, { label: "Panier", href: "/panier" }]} activePath="/panier" />
        <Button variant="secondary" size="sm">Continuer les achats</Button>
      </div>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "44px 24px 56px" }}>
        <SectionHeader eyebrow="Checkout" title="Panier" subtitle="Récapitulatif des lignes produits et bloc de paiement." />
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18 }}>
          <div style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: 12, padding: "14px 16px" }}>
            {ITEMS.map((item) => (
              <div key={item.name} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--c-border)" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-fg)" }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: "var(--color-muted)" }}>Quantité: {item.qty}</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-fg)" }}>{item.price}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: 12, padding: "16px 16px 18px" }}>
            <div style={{ fontSize: 14, color: "var(--color-muted)", marginBottom: 6 }}>Sous-total</div>
            <div style={{ fontSize: 26, color: "var(--color-fg)", fontWeight: 800, marginBottom: 16 }}>147€</div>
            <Button variant="primary" size="md" fullWidth>Payer maintenant</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

const ECOM_SUITE_README = `# E-commerce Suite — Brickslab Template

Template multi-pages pour un parcours e-commerce complet.

## Pages incluses

- \`/\` : page d'accueil
- \`/boutique\` : listing produits
- \`/produit\` : fiche produit
- \`/panier\` : récapitulatif commande

## Démarrage

1. Extrayez le ZIP
2. Installez les dépendances: \`npm install --legacy-peer-deps\`
3. Lancez: \`npm run dev\`
`;

// ── Forms Workspace template ─────────────────────────────────────────────────

const FORM_TABS = ["Inscription", "Contact", "Lead"];

function FormsWorkspaceTemplate() {
  const [activeTab, setActiveTab] = React.useState("Inscription");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      <TopNav
        items={[
          { label: "Formulaires", href: "/" },
          { label: "Modèles", href: "#templates" },
          { label: "Aide", href: "#help" },
          { label: "Contact", href: "#contact" },
        ]}
        activePath="/"
      />

      <HeroCtaSection
        title="Workspace de formulaires"
        subtitle="Une base prête pour les formulaires d'inscription, de lead generation et de support."
        ctaLabel="Utiliser ce template"
        secondaryLabel="Voir les pages"
        align="center"
      />

      <div id="templates" style={{ maxWidth: 980, margin: "0 auto", padding: "36px 24px 56px" }}>
        <SectionHeader
          eyebrow="Templates"
          title="Exemples de formulaires"
          subtitle="Structure claire, responsive, et facile à connecter à vos endpoints."
          align="center"
        />

        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 8, marginBottom: 18 }}>
          {FORM_TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
              <TagChip label={tab} variant={activeTab === tab ? "brand" : "muted"} size="md" />
            </button>
          ))}
        </div>

        <div style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: 12, padding: "18px 18px 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-muted)" }}>Nom complet</span>
              <input placeholder="Jane Doe" style={{ height: 38, border: "1px solid var(--c-border)", borderRadius: 8, padding: "0 10px", fontSize: 13 }} />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-muted)" }}>Email</span>
              <input placeholder="jane@company.com" style={{ height: 38, border: "1px solid var(--c-border)", borderRadius: 8, padding: "0 10px", fontSize: 13 }} />
            </label>
          </div>
          <label style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-muted)" }}>Message</span>
            <textarea rows={4} placeholder="Décrivez votre besoin..." style={{ border: "1px solid var(--c-border)", borderRadius: 8, padding: 10, fontSize: 13, resize: "vertical" }} />
          </label>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
            <Badge variant="default" size="sm">Mode: {activeTab}</Badge>
            <Button variant="primary" size="sm">Envoyer</Button>
          </div>
        </div>
      </div>

      <FooterBar center={<BrandSlogan />} />
    </div>
  );
}

const FORMS_HOME_TSX = `import React from "react";
import { TopNav, HeroCtaSection, SectionHeader, TagChip, FooterBar, BrandSlogan } from "@brickslab./ui-web";

const PAGES = [
  { label: "Inscription", href: "/inscription" },
  { label: "Contact", href: "/contact" },
  { label: "Lead", href: "/lead" },
];

export default function FormsHomePage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      <TopNav items={[{ label: "Formulaires", href: "/" }, { label: "Inscription", href: "/inscription" }, { label: "Contact", href: "/contact" }, { label: "Lead", href: "/lead" }]} activePath="/" />
      <HeroCtaSection title="Template formulaires multi-pages" subtitle="Trois routes dédiées à des usages business différents." ctaLabel="Formulaire inscription" secondaryLabel="Formulaire contact" align="center" />
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "36px 24px 56px" }}>
        <SectionHeader eyebrow="Routes" title="Pages incluses" subtitle="Naviguez entre les versions de formulaires." align="center" />
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 8 }}>
          {PAGES.map((p) => <TagChip key={p.href} label={p.href} variant="brand" size="md" />)}
        </div>
      </div>
      <FooterBar center={<BrandSlogan />} />
    </div>
  );
}
`;

const FORMS_SIGNUP_TSX = `import React from "react";
import { SectionHeader, Button } from "@brickslab./ui-web";

export default function InscriptionPage() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "44px 24px 56px" }}>
      <SectionHeader eyebrow="Inscription" title="Créer un compte" subtitle="Formulaire d'onboarding client." />
      <div style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: 12, padding: "18px 18px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <input placeholder="Prénom" style={{ height: 38, border: "1px solid var(--c-border)", borderRadius: 8, padding: "0 10px" }} />
          <input placeholder="Nom" style={{ height: 38, border: "1px solid var(--c-border)", borderRadius: 8, padding: "0 10px" }} />
        </div>
        <input placeholder="Email professionnel" style={{ width: "100%", marginTop: 12, height: 38, border: "1px solid var(--c-border)", borderRadius: 8, padding: "0 10px" }} />
        <input placeholder="Mot de passe" type="password" style={{ width: "100%", marginTop: 12, height: 38, border: "1px solid var(--c-border)", borderRadius: 8, padding: "0 10px" }} />
        <div style={{ marginTop: 14 }}>
          <Button variant="primary" size="sm">Créer mon compte</Button>
        </div>
      </div>
    </div>
  );
}
`;

const FORMS_CONTACT_TSX = `import React from "react";
import { SectionHeader, Button } from "@brickslab./ui-web";

export default function ContactPage() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "44px 24px 56px" }}>
      <SectionHeader eyebrow="Contact" title="Parler à un conseiller" subtitle="Formulaire de contact commercial." />
      <div style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: 12, padding: "18px 18px 20px" }}>
        <input placeholder="Entreprise" style={{ width: "100%", marginBottom: 12, height: 38, border: "1px solid var(--c-border)", borderRadius: 8, padding: "0 10px" }} />
        <input placeholder="Téléphone" style={{ width: "100%", marginBottom: 12, height: 38, border: "1px solid var(--c-border)", borderRadius: 8, padding: "0 10px" }} />
        <textarea rows={5} placeholder="Votre besoin..." style={{ width: "100%", border: "1px solid var(--c-border)", borderRadius: 8, padding: 10, resize: "vertical" }} />
        <div style={{ marginTop: 14 }}>
          <Button variant="primary" size="sm">Envoyer</Button>
        </div>
      </div>
    </div>
  );
}
`;

const FORMS_LEAD_TSX = `import React from "react";
import { SectionHeader, Button, TagChip } from "@brickslab./ui-web";

export default function LeadPage() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "44px 24px 56px" }}>
      <SectionHeader eyebrow="Lead" title="Demander une démo" subtitle="Formulaire rapide orienté conversion." />
      <div style={{ marginBottom: 10, display: "flex", gap: 8 }}>
        <TagChip label="B2B" variant="brand" size="sm" />
        <TagChip label="SaaS" variant="muted" size="sm" />
      </div>
      <div style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: 12, padding: "18px 18px 20px" }}>
        <input placeholder="Email" style={{ width: "100%", marginBottom: 12, height: 38, border: "1px solid var(--c-border)", borderRadius: 8, padding: "0 10px" }} />
        <input placeholder="Taille de l'équipe" style={{ width: "100%", marginBottom: 12, height: 38, border: "1px solid var(--c-border)", borderRadius: 8, padding: "0 10px" }} />
        <div style={{ marginTop: 14 }}>
          <Button variant="primary" size="sm">Réserver la démo</Button>
        </div>
      </div>
    </div>
  );
}
`;

const FORMS_README = `# Forms Workspace — Brickslab Template

Template formulaires multi-pages.

## Pages incluses

- \`/\` : hub formulaires
- \`/inscription\` : onboarding utilisateur
- \`/contact\` : prise de contact
- \`/lead\` : demande de démo
`;

// ── QCM Assessment template ──────────────────────────────────────────────────

const QCM_QUESTIONS = [
  {
    title: "Quel composant convient pour afficher un titre + sous-titre de section ?",
    options: ["TopNav", "SectionHeader", "FooterBar", "Badge"],
    answer: 1,
  },
  {
    title: "Quel composant utiliser pour une action principale ?",
    options: ["Button", "TagChip", "StatusLabel", "Breadcrumb"],
    answer: 0,
  },
  {
    title: "Quel composant est adapté à une navigation horizontale de site ?",
    options: ["TopNav", "KpiCard", "ProjectDescriptionPanel", "LatestComponentsList"],
    answer: 0,
  },
];

function QcmAssessmentTemplate() {
  const [index, setIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [score, setScore] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const current = QCM_QUESTIONS[index];

  function nextQuestion() {
    if (selected === null) return;
    const isCorrect = selected === current.answer;
    const nextScore = isCorrect ? score + 1 : score;
    if (index === QCM_QUESTIONS.length - 1) {
      setScore(nextScore);
      setDone(true);
      return;
    }
    setScore(nextScore);
    setIndex((i) => i + 1);
    setSelected(null);
  }

  function resetQuiz() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      <TopNav
        items={[
          { label: "QCM", href: "/" },
          { label: "Examens", href: "#examens" },
          { label: "Résultats", href: "#resultats" },
          { label: "Aide", href: "#help" },
        ]}
        activePath="/"
      />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 56px" }}>
        <SectionHeader
          eyebrow="Assessment"
          title="Template QCM interactif"
          subtitle="Parfait pour les questionnaires de validation, d'onboarding ou de certification interne."
          align="center"
        />

        <div style={{ margin: "0 auto", maxWidth: 740, background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: 12, padding: "18px 18px 20px" }}>
          {!done ? (
            <>
              <div style={{ marginBottom: 12 }}>
                <Badge variant="default" size="sm">Question {index + 1}/{QCM_QUESTIONS.length}</Badge>
              </div>
              <h3 style={{ fontSize: 18, color: "var(--color-fg)", marginBottom: 14 }}>{current.title}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {current.options.map((option, optionIndex) => (
                  <button
                    key={option}
                    onClick={() => setSelected(optionIndex)}
                    style={{
                      textAlign: "left",
                      padding: "10px 12px",
                      borderRadius: 8,
                      border: `1px solid ${selected === optionIndex ? "var(--c-brand-border)" : "var(--c-border)"}`,
                      backgroundColor: selected === optionIndex ? "var(--c-brand-subtle)" : "var(--c-surface)",
                      color: "var(--color-fg)",
                      cursor: "pointer",
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
                <Button variant="secondary" size="sm" onClick={resetQuiz}>Réinitialiser</Button>
                <Button variant="primary" size="sm" onClick={nextQuestion}>Valider</Button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "10px 0 4px" }}>
              <h3 style={{ fontSize: 22, color: "var(--color-fg)", marginBottom: 8 }}>Score final</h3>
              <p style={{ fontSize: 15, color: "var(--color-muted)", marginBottom: 14 }}>
                Vous avez obtenu {score}/{QCM_QUESTIONS.length}.
              </p>
              <Button variant="primary" size="sm" onClick={resetQuiz}>Recommencer</Button>
            </div>
          )}
        </div>
      </div>
      <FooterBar center={<BrandSlogan />} />
    </div>
  );
}

const QCM_HOME_TSX = `"use client";

import React from "react";
import { TopNav, SectionHeader, Button, Badge, FooterBar, BrandSlogan } from "@brickslab./ui-web";

const QUESTIONS = [
  { title: "Quel composant pour une CTA ?", options: ["Button", "TagChip", "Breadcrumb"], answer: 0 },
  { title: "Quel composant pour une en-tête de section ?", options: ["FooterBar", "SectionHeader", "Badge"], answer: 1 },
];

export default function QcmPage() {
  const [index, setIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [score, setScore] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const current = QUESTIONS[index];

  function nextQuestion() {
    if (selected === null) return;
    const nextScore = selected === current.answer ? score + 1 : score;
    if (index === QUESTIONS.length - 1) {
      setScore(nextScore);
      setDone(true);
      return;
    }
    setScore(nextScore);
    setIndex((i) => i + 1);
    setSelected(null);
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      <TopNav items={[{ label: "QCM", href: "/" }, { label: "Examens", href: "/examens" }, { label: "Résultat", href: "/resultat" }]} activePath="/" />
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "44px 24px 56px" }}>
        <SectionHeader eyebrow="QCM" title="Questionnaire interactif" subtitle="Template prêt pour vos validations de connaissances." align="center" />
        <div style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: 12, padding: "18px 18px 20px" }}>
          {!done ? (
            <>
              <div style={{ marginBottom: 10 }}><Badge variant="default" size="sm">Question {index + 1}/{QUESTIONS.length}</Badge></div>
              <h3 style={{ fontSize: 18, marginBottom: 12, color: "var(--color-fg)" }}>{current.title}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {current.options.map((opt, i) => (
                  <button key={opt} onClick={() => setSelected(i)} style={{ textAlign: "left", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--c-border)", backgroundColor: selected === i ? "var(--c-brand-subtle)" : "var(--c-surface)", cursor: "pointer" }}>
                    {opt}
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 14 }}><Button variant="primary" size="sm" onClick={nextQuestion}>Valider</Button></div>
            </>
          ) : (
            <div style={{ textAlign: "center" }}>
              <h3 style={{ fontSize: 22, marginBottom: 8 }}>Score: {score}/{QUESTIONS.length}</h3>
              <Button variant="secondary" size="sm" onClick={() => { setIndex(0); setSelected(null); setScore(0); setDone(false); }}>Recommencer</Button>
            </div>
          )}
        </div>
      </div>
      <FooterBar center={<BrandSlogan />} />
    </div>
  );
}
`;

const QCM_EXAMS_TSX = `import React from "react";
import { SectionHeader, TagChip, Button } from "@brickslab./ui-web";

const EXAMS = [
  { label: "Niveau Débutant", questions: 10, duration: "10 min" },
  { label: "Niveau Intermédiaire", questions: 20, duration: "20 min" },
  { label: "Niveau Expert", questions: 30, duration: "30 min" },
];

export default function ExamensPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "44px 24px 56px" }}>
      <SectionHeader eyebrow="Examens" title="Catalogue QCM" subtitle="Liste des évaluations disponibles." />
      <div style={{ display: "grid", gap: 10 }}>
        {EXAMS.map((exam) => (
          <div key={exam.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: 12, padding: "12px 14px" }}>
            <div>
              <div style={{ fontSize: 14, color: "var(--color-fg)", fontWeight: 700 }}>{exam.label}</div>
              <div style={{ fontSize: 12, color: "var(--color-muted)" }}>{exam.questions} questions · {exam.duration}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <TagChip label={exam.duration} variant="muted" size="sm" />
              <Button variant="primary" size="sm">Lancer</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`;

const QCM_RESULT_TSX = `import React from "react";
import { SectionHeader, KpiCard } from "@brickslab./ui-web";

export default function ResultatPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "44px 24px 56px" }}>
      <SectionHeader eyebrow="Résultats" title="Tableau de résultats" subtitle="Vue rapide des performances d'un apprenant." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        <KpiCard label="Score global" value="84%" helper="niveau intermédiaire" />
        <KpiCard label="Temps moyen" value="11m32" helper="sur 3 examens" />
        <KpiCard label="Progression" value="+12%" helper="vs mois dernier" />
      </div>
    </div>
  );
}
`;

const QCM_README = `# QCM Assessment — Brickslab Template

Template QCM avec mode interactif, liste d'examens et page résultats.

## Pages incluses

- \`/\` : questionnaire interactif
- \`/examens\` : catalogue des examens
- \`/resultat\` : synthèse des scores
`;

// ── E-learning Platform template ─────────────────────────────────────────────

const ELEARNING_NAV = [
  {
    title: "Parcours",
    items: [
      { label: "Catalogue", href: "/academy" },
      { label: "Cours actif", href: "/academy/cours" },
      { label: "Évaluations", href: "/academy/evaluations" },
    ],
  },
];

function ElearningPlatformTemplate() {
  return (
    <AppShell
      headerHeight={60}
      sidebarWidth={220}
      header={
        <HeaderBar
          logo={<LogoMark size="sm" variant="full" />}
          actions={
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Badge variant="success" size="sm">Apprenant actif</Badge>
              <Button variant="secondary" size="sm">Mon profil</Button>
            </div>
          }
        />
      }
      sidebar={<SidebarNav sections={ELEARNING_NAV} activePath="/academy" width={220} />}
    >
      <div style={{ padding: "28px 32px", maxWidth: 1100 }}>
        <div style={{ marginBottom: 20 }}>
          <Breadcrumb items={[{ label: "Academy", href: "/academy" }, { label: "Catalogue" }]} />
          <h1 style={{ fontSize: 22, color: "var(--color-fg)", fontWeight: 700, marginTop: 10 }}>E-learning Platform</h1>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 18 }}>
          <KpiCard label="Cours disponibles" value="42" helper="8 nouveaux ce mois" />
          <KpiCard label="Temps appris" value="18h" helper="sur 30 jours" />
          <KpiCard label="Taux complétion" value="76%" helper="+9% vs précédent" />
        </div>
        <LatestComponentsList
          title="Cours récemment publiés"
          ctaLabel="Voir le catalogue"
          ctaHref="#"
          items={[
            { label: "React avancé", section: "Frontend", type: "web", href: "#" },
            { label: "TypeScript pro", section: "Engineering", type: "web", href: "#" },
            { label: "UX writing", section: "Product", type: "web", href: "#" },
            { label: "API design", section: "Backend", type: "web", href: "#" },
          ]}
        />
      </div>
    </AppShell>
  );
}

const ELEARNING_HOME_TSX = `import React from "react";
import { AppShell, HeaderBar, SidebarNav, LogoMark, Badge, Button, Breadcrumb, KpiCard, LatestComponentsList } from "@brickslab./ui-web";

const NAV = [
  {
    title: "Parcours",
    items: [
      { label: "Catalogue", href: "/academy" },
      { label: "Cours actif", href: "/academy/cours" },
      { label: "Évaluations", href: "/academy/evaluations" },
    ],
  },
];

export default function AcademyHomePage() {
  return (
    <AppShell
      headerHeight={60}
      sidebarWidth={220}
      header={
        <HeaderBar
          logo={<LogoMark size="sm" variant="full" />}
          actions={<div style={{ display: "flex", alignItems: "center", gap: 10 }}><Badge variant="success" size="sm">Apprenant actif</Badge><Button variant="secondary" size="sm">Mon profil</Button></div>}
        />
      }
      sidebar={<SidebarNav sections={NAV} activePath="/academy" width={220} />}
    >
      <div style={{ padding: "28px 32px", maxWidth: 1100 }}>
        <div style={{ marginBottom: 20 }}>
          <Breadcrumb items={[{ label: "Academy", href: "/academy" }, { label: "Catalogue" }]} />
          <h1 style={{ fontSize: 22, color: "var(--color-fg)", fontWeight: 700, marginTop: 10 }}>Catalogue des cours</h1>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 18 }}>
          <KpiCard label="Cours disponibles" value="42" helper="8 nouveaux ce mois" />
          <KpiCard label="Temps appris" value="18h" helper="sur 30 jours" />
          <KpiCard label="Taux complétion" value="76%" helper="+9% vs précédent" />
        </div>
        <LatestComponentsList title="Cours récemment publiés" ctaLabel="Tout voir" ctaHref="#" items={[{ label: "React avancé", section: "Frontend", type: "web", href: "#" }, { label: "TypeScript pro", section: "Engineering", type: "web", href: "#" }, { label: "UX writing", section: "Product", type: "web", href: "#" }, { label: "API design", section: "Backend", type: "web", href: "#" }]} />
      </div>
    </AppShell>
  );
}
`;

const ELEARNING_COURSE_TSX = `import React from "react";
import { SectionHeader, Button, TagChip } from "@brickslab./ui-web";
import { FiMonitor, FiFileText, FiActivity } from "react-icons/fi";

const MODULES = [
  { title: "Module 1 · Fondations", icon: <FiMonitor size={14} /> },
  { title: "Module 2 · Cas pratiques", icon: <FiFileText size={14} /> },
  { title: "Module 3 · Projet final", icon: <FiActivity size={14} /> },
];

export default function CoursPage() {
  return (
    <div style={{ maxWidth: 920, margin: "0 auto", padding: "44px 24px 56px" }}>
      <SectionHeader eyebrow="Cours" title="React avancé" subtitle="Une page de cours avec modules, progression et CTA." />
      <div style={{ marginBottom: 10, display: "flex", gap: 8 }}>
        <TagChip label="Niveau intermédiaire" variant="muted" size="sm" />
        <TagChip label="6h de contenu" variant="brand" size="sm" />
      </div>
      <div style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: 12, padding: "14px 14px 16px" }}>
        {MODULES.map((module) => (
          <div key={module.title} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 0", borderBottom: "1px solid var(--c-border)", fontSize: 14, color: "var(--color-fg)" }}>
            {module.icon}
            {module.title}
          </div>
        ))}
        <div style={{ marginTop: 14 }}>
          <Button variant="primary" size="sm">Reprendre le cours</Button>
        </div>
      </div>
    </div>
  );
}
`;

const ELEARNING_EVAL_TSX = `import React from "react";
import { SectionHeader, KpiCard, Button } from "@brickslab./ui-web";

export default function EvaluationsPage() {
  return (
    <div style={{ maxWidth: 920, margin: "0 auto", padding: "44px 24px 56px" }}>
      <SectionHeader eyebrow="Évaluations" title="Suivi des évaluations" subtitle="Pilotez la réussite des apprenants avec des indicateurs clairs." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 14 }}>
        <KpiCard label="Examens passés" value="14" helper="sur 30 jours" />
        <KpiCard label="Score moyen" value="82%" helper="niveau global" />
        <KpiCard label="Certifications" value="4" helper="obtenues ce trimestre" />
      </div>
      <Button variant="primary" size="sm">Créer une nouvelle évaluation</Button>
    </div>
  );
}
`;

const ELEARNING_README = `# E-learning Platform — Brickslab Template

Template e-learning multi-pages pour catalogue, lecture de cours et évaluations.

## Pages incluses

- \`/academy\` : vue catalogue et KPIs
- \`/academy/cours\` : détail d'un cours
- \`/academy/evaluations\` : suivi des scores
`;

// ── Blog template ────────────────────────────────────────────────────────────

const BLOG_POSTS = [
  {
    title: "Comment structurer un design system à l'échelle",
    description: "Méthode pragmatique pour maintenir cohérence, vélocité et qualité produit.",
    tags: ["Design System", "Produit", "Ops"],
  },
  {
    title: "Réduire le time-to-market avec des templates",
    description: "Des patterns UI réutilisables pour livrer plus vite sans dette visuelle.",
    tags: ["Velocity", "UX", "React"],
  },
  {
    title: "Checklist accessibilité avant mise en production",
    description: "Un cadrage simple pour sécuriser le niveau WCAG de vos interfaces.",
    tags: ["A11y", "QA", "Frontend"],
  },
];

function BlogTemplate() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      <TopNav
        items={[
          { label: "Blog", href: "/" },
          { label: "Articles", href: "#articles" },
          { label: "Catégories", href: "#categories" },
          { label: "Newsletter", href: "#newsletter" },
        ]}
        activePath="/"
      />

      <HeroCtaSection
        title="Blog produit & engineering"
        subtitle="Un template éditorial pour publier des articles techniques, guides pratiques et retours d'expérience."
        ctaLabel="Lire les articles"
        secondaryLabel="S'abonner"
        align="center"
      />

      <div id="articles" style={{ maxWidth: 1120, margin: "0 auto", padding: "44px 24px 56px" }}>
        <SectionHeader
          eyebrow="Articles"
          title="Dernières publications"
          subtitle="Structure prête pour brancher vos données CMS ou Markdown."
          align="center"
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 10 }}>
          {BLOG_POSTS.map((post) => (
            <ProjectDescriptionPanel
              key={post.title}
              title={post.title}
              description={post.description}
              tags={post.tags}
              links={[{ label: "Lire l'article", href: "#" }]}
            />
          ))}
        </div>
      </div>

      <FooterBar center={<BrandSlogan />} />
    </div>
  );
}

const BLOG_HOME_TSX = `import React from "react";
import { TopNav, HeroCtaSection, SectionHeader, ProjectDescriptionPanel, FooterBar, BrandSlogan } from "@brickslab./ui-web";

const POSTS = [
  {
    title: "Comment structurer un design system à l'échelle",
    description: "Méthode pragmatique pour maintenir cohérence, vélocité et qualité produit.",
    tags: ["Design System", "Produit", "Ops"],
  },
  {
    title: "Réduire le time-to-market avec des templates",
    description: "Des patterns UI réutilisables pour livrer plus vite sans dette visuelle.",
    tags: ["Velocity", "UX", "React"],
  },
  {
    title: "Checklist accessibilité avant mise en production",
    description: "Un cadrage simple pour sécuriser le niveau WCAG de vos interfaces.",
    tags: ["A11y", "QA", "Frontend"],
  },
];

export default function BlogPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      <TopNav items={[{ label: "Blog", href: "/" }, { label: "Articles", href: "#articles" }, { label: "Catégories", href: "#categories" }, { label: "Newsletter", href: "#newsletter" }]} activePath="/" />
      <HeroCtaSection title="Blog produit & engineering" subtitle="Template éditorial prêt à brancher à un CMS ou des fichiers Markdown." ctaLabel="Lire les articles" secondaryLabel="S'abonner" align="center" />
      <div id="articles" style={{ maxWidth: 1120, margin: "0 auto", padding: "44px 24px 56px" }}>
        <SectionHeader eyebrow="Articles" title="Dernières publications" subtitle="Une base simple pour contenu long-form." align="center" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 10 }}>
          {POSTS.map((post) => (
            <ProjectDescriptionPanel key={post.title} title={post.title} description={post.description} tags={post.tags} links={[{ label: "Lire l'article", href: "/article" }]} />
          ))}
        </div>
      </div>
      <FooterBar center={<BrandSlogan />} />
    </div>
  );
}
`;

const BLOG_ARTICLE_TSX = `import React from "react";
import { SectionHeader, TagChip, Button } from "@brickslab./ui-web";

export default function ArticlePage() {
  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "44px 24px 64px" }}>
      <SectionHeader eyebrow="Article" title="Comment structurer un design system à l'échelle" subtitle="Exemple de gabarit d'article long format." />
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <TagChip label="Design System" variant="brand" size="sm" />
        <TagChip label="Engineering" variant="muted" size="sm" />
      </div>
      <div style={{ color: "var(--color-muted)", lineHeight: 1.75, fontSize: 14 }}>
        <p>Ce template sert de base pour vos pages d'articles. Remplacez ce contenu par votre texte et connectez une source de données.</p>
        <p>Ajoutez des sections, des encadrés et des call-to-action selon votre ligne éditoriale.</p>
      </div>
      <div style={{ marginTop: 16 }}>
        <Button variant="secondary" size="sm">Retour au blog</Button>
      </div>
    </div>
  );
}
`;

const BLOG_README = `# Blog — Brickslab Template

Template blog avec listing d'articles et page article.

## Pages incluses

- \`/\` : accueil éditorial
- \`/article\` : gabarit article
`;

// ── Documentation template ───────────────────────────────────────────────────

const DOCS_SECTIONS = [
  {
    title: "Documentation",
    items: [
      { label: "Getting Started", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Theming", href: "/docs/theming" },
      { label: "Composants", href: "/docs/components" },
    ],
  },
];

function DocumentationTemplate() {
  return (
    <AppShell
      headerHeight={60}
      sidebarWidth={220}
      header={
        <HeaderBar
          logo={<LogoMark size="sm" variant="full" />}
          actions={
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Badge variant="default" size="sm">v2.1.1</Badge>
              <Button variant="secondary" size="sm">API Reference</Button>
            </div>
          }
        />
      }
      sidebar={<SidebarNav sections={DOCS_SECTIONS} activePath="/docs" width={220} />}
    >
      <div style={{ padding: "28px 32px", maxWidth: 1000 }}>
        <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "Getting Started" }]} />
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--color-fg)", marginTop: 12, marginBottom: 12 }}>
          Documentation produit
        </h1>
        <p style={{ color: "var(--color-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 18 }}>
          Template orienté documentation technique avec navigation latérale, contenus structurés et liens rapides.
        </p>
        <LatestComponentsList
          title="Guides populaires"
          ctaLabel="Voir tous les guides"
          ctaHref="#"
          items={[
            { label: "Installer le package", section: "Setup", type: "web", href: "#" },
            { label: "Configurer les tokens", section: "Theming", type: "web", href: "#" },
            { label: "Créer une page composant", section: "Catalog", type: "web", href: "#" },
            { label: "Déployer en production", section: "Release", type: "web", href: "#" },
          ]}
        />
      </div>
    </AppShell>
  );
}

const DOCS_HOME_TSX = `import React from "react";
import { AppShell, HeaderBar, SidebarNav, LogoMark, Badge, Button, Breadcrumb, LatestComponentsList } from "@brickslab./ui-web";

const DOCS_NAV = [
  {
    title: "Documentation",
    items: [
      { label: "Getting Started", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Theming", href: "/docs/theming" },
      { label: "Composants", href: "/docs/components" },
    ],
  },
];

export default function DocsHomePage() {
  return (
    <AppShell
      headerHeight={60}
      sidebarWidth={220}
      header={<HeaderBar logo={<LogoMark size="sm" variant="full" />} actions={<div style={{ display: "flex", alignItems: "center", gap: 10 }}><Badge variant="default" size="sm">v2.1.1</Badge><Button variant="secondary" size="sm">API Reference</Button></div>} />}
      sidebar={<SidebarNav sections={DOCS_NAV} activePath="/docs" width={220} />}
    >
      <div style={{ padding: "28px 32px", maxWidth: 1000 }}>
        <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "Getting Started" }]} />
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--color-fg)", marginTop: 12, marginBottom: 12 }}>Documentation produit</h1>
        <p style={{ color: "var(--color-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 18 }}>Template orienté documentation technique avec navigation latérale.</p>
        <LatestComponentsList title="Guides populaires" ctaLabel="Voir tous les guides" ctaHref="#" items={[{ label: "Installer le package", section: "Setup", type: "web", href: "#" }, { label: "Configurer les tokens", section: "Theming", type: "web", href: "#" }, { label: "Créer une page composant", section: "Catalog", type: "web", href: "#" }, { label: "Déployer en production", section: "Release", type: "web", href: "#" }]} />
      </div>
    </AppShell>
  );
}
`;

const DOCS_INSTALL_TSX = `import React from "react";
import { SectionHeader, Button, TagChip } from "@brickslab./ui-web";

export default function InstallationPage() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "44px 24px 64px" }}>
      <SectionHeader eyebrow="Installation" title="Installer rapidement le design system" subtitle="Page documentation exemple avec commandes et étapes." />
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <TagChip label="npm" variant="brand" size="sm" />
        <TagChip label="Next.js" variant="muted" size="sm" />
      </div>
      <div style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: 12, padding: "14px 16px", fontFamily: "ui-monospace, monospace", fontSize: 13, color: "var(--color-fg)" }}>
        npm install @brickslab./ui-web@2.1.1 @brickslab./theme-default@2.0.0 --legacy-peer-deps
      </div>
      <div style={{ marginTop: 14 }}>
        <Button variant="secondary" size="sm">Voir la suite</Button>
      </div>
    </div>
  );
}
`;

const DOCS_README = `# Documentation — Brickslab Template

Template documentation avec sidebar + pages de guides.

## Pages incluses

- \`/docs\` : landing documentation
- \`/docs/installation\` : guide installation
`;

// ── Agency template ──────────────────────────────────────────────────────────

function AgencyTemplate() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      <TopNav
        items={[
          { label: "Agence", href: "/" },
          { label: "Services", href: "#services" },
          { label: "Projets", href: "#projects" },
          { label: "Contact", href: "#contact" },
        ]}
        activePath="/"
      />
      <HeroCtaSection
        title="Agence digitale orientée impact"
        subtitle="Nous concevons des produits web performants, cohérents et prêts à scaler."
        ctaLabel="Démarrer un projet"
        secondaryLabel="Voir nos réalisations"
        align="center"
      />
      <div id="services" style={{ maxWidth: 1120, margin: "0 auto", padding: "48px 24px 44px" }}>
        <SectionHeader
          eyebrow="Services"
          title="Ce que nous livrons"
          subtitle="De la stratégie au delivery, un cadre unifié pour designer et développer."
          align="center"
        />
        <FeatureListSection
          features={[
            { title: "Product Discovery", description: "Ateliers cadrage, priorisation, roadmap et KPIs.", icon: <FiTrendingUp size={22} /> },
            { title: "UI Engineering", description: "Interfaces React robustes, accessibles et maintenables.", icon: <FiCode size={22} /> },
            { title: "Brand Experience", description: "Direction artistique et systèmes visuels cohérents.", icon: <FiAward size={22} /> },
          ]}
          columns={3}
        />
      </div>
      <div id="projects" style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px 56px" }}>
        <SectionHeader eyebrow="Projets" title="Références récentes" subtitle="Exemples d'interventions transverses produit + technique." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          <ProjectDescriptionPanel
            title="Refonte portail client"
            description="Refonte complète du parcours client avec hausse du taux de conversion."
            tags={["SaaS", "UX", "Frontend"]}
            links={[{ label: "Voir le cas", href: "#" }]}
          />
          <ProjectDescriptionPanel
            title="Design system enterprise"
            description="Mise en place d'un design system cross-teams avec gouvernance claire."
            tags={["Design System", "Ops", "Scale"]}
            links={[{ label: "Voir le cas", href: "#" }]}
          />
          <ProjectDescriptionPanel
            title="Plateforme e-learning"
            description="Architecture modulaire et livraison rapide d'un produit de formation."
            tags={["EdTech", "Next.js", "API"]}
            links={[{ label: "Voir le cas", href: "#" }]}
          />
        </div>
      </div>
      <FooterBar center={<BrandSlogan />} />
    </div>
  );
}

const AGENCY_HOME_TSX = `import React from "react";
import { TopNav, HeroCtaSection, SectionHeader, FeatureListSection, ProjectDescriptionPanel, FooterBar, BrandSlogan } from "@brickslab./ui-web";
import { FiTrendingUp, FiCode, FiAward } from "react-icons/fi";

export default function AgencyPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      <TopNav items={[{ label: "Agence", href: "/" }, { label: "Services", href: "#services" }, { label: "Projets", href: "#projects" }, { label: "Contact", href: "#contact" }]} activePath="/" />
      <HeroCtaSection title="Agence digitale orientée impact" subtitle="Nous concevons des produits web performants, cohérents et prêts à scaler." ctaLabel="Démarrer un projet" secondaryLabel="Voir nos réalisations" align="center" />
      <div id="services" style={{ maxWidth: 1120, margin: "0 auto", padding: "48px 24px 44px" }}>
        <SectionHeader eyebrow="Services" title="Ce que nous livrons" subtitle="Stratégie, design et delivery dans un cadre unifié." align="center" />
        <FeatureListSection
          features={[
            { title: "Product Discovery", description: "Ateliers cadrage, priorisation et roadmap.", icon: <FiTrendingUp size={22} /> },
            { title: "UI Engineering", description: "Interfaces React robustes et accessibles.", icon: <FiCode size={22} /> },
            { title: "Brand Experience", description: "Direction artistique et systèmes visuels.", icon: <FiAward size={22} /> },
          ]}
          columns={3}
        />
      </div>
      <div id="projects" style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px 56px" }}>
        <SectionHeader eyebrow="Projets" title="Références récentes" subtitle="Exemples d'interventions transverses produit + technique." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          <ProjectDescriptionPanel title="Refonte portail client" description="Refonte complète du parcours client avec hausse du taux de conversion." tags={["SaaS", "UX", "Frontend"]} links={[{ label: "Voir le cas", href: "#" }]} />
          <ProjectDescriptionPanel title="Design system enterprise" description="Design system cross-teams avec gouvernance claire." tags={["Design System", "Ops", "Scale"]} links={[{ label: "Voir le cas", href: "#" }]} />
          <ProjectDescriptionPanel title="Plateforme e-learning" description="Architecture modulaire et livraison rapide." tags={["EdTech", "Next.js", "API"]} links={[{ label: "Voir le cas", href: "#" }]} />
        </div>
      </div>
      <FooterBar center={<BrandSlogan />} />
    </div>
  );
}
`;

const AGENCY_README = `# Agency — Brickslab Template

Template vitrine d'agence avec hero, services et études de cas.
`;

// ── Template definitions ──────────────────────────────────────────────────────

type Template = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  components: string[];
  component: React.FC;
  zipFiles: { name: string; content: string }[];
  zipName: string;
};

const TEMPLATES: Template[] = [
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "Boutique en ligne complète avec nav sticky, grille produits filtrée, avis clients, garanties et footer multi-colonnes.",
    tags: ["E-commerce", "Boutique", "Retail"],
    components: ["TopNav", "LogoMark", "HeroCtaSection", "SectionHeader", "TagChip", "Badge", "Button", "FeatureListSection", "FooterLinks", "SocialLinks", "FooterBar"],
    component: EcommerceTemplate,
    zipName: "brickslab-ecommerce.zip",
    zipFiles: [
      { name: "app/page.tsx", content: ECOMMERCE_TSX },
      { name: "app/layout.tsx", content: LAYOUT_TSX },
      { name: "app/globals.css", content: GLOBALS_CSS },
      { name: "tokens.css", content: TOKENS_CSS },
      { name: "package.json", content: PACKAGE_JSON },
      { name: "tsconfig.json", content: TSCONFIG_JSON },
      { name: "next.config.ts", content: NEXT_CONFIG_TS },
      { name: "README.md", content: ECOMMERCE_README },
    ],
  },
  {
    id: "dashboard",
    name: "Dashboard",
    description: "Tableau de bord applicatif avec layout AppShell, sidebar de navigation, métriques KPI, activité récente et accès rapide.",
    tags: ["App", "SaaS", "Admin"],
    components: ["AppShell", "HeaderBar", "SidebarNav", "LogoMark", "KpiCard", "LatestComponentsList", "ComponentsCountCard", "Badge", "Breadcrumb", "StatusLabel"],
    component: DashboardTemplate,
    zipName: "brickslab-dashboard.zip",
    zipFiles: [
      { name: "app/page.tsx", content: DASHBOARD_TSX },
      { name: "app/layout.tsx", content: LAYOUT_TSX },
      { name: "app/globals.css", content: GLOBALS_CSS },
      { name: "tokens.css", content: TOKENS_CSS },
      { name: "package.json", content: PACKAGE_JSON },
      { name: "tsconfig.json", content: TSCONFIG_JSON },
      { name: "next.config.ts", content: NEXT_CONFIG_TS },
      { name: "README.md", content: DASHBOARD_README },
    ],
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Portfolio personnel pour développeur ou designer avec hero, projets en grille, compétences et section contact.",
    tags: ["Portfolio", "Créatif", "Freelance"],
    components: ["TopNav", "LogoMark", "Button", "SocialLinks", "SectionHeader", "ProjectDescriptionPanel", "FeatureListSection", "FooterBar", "BrandSlogan"],
    component: PortfolioTemplate,
    zipName: "brickslab-portfolio.zip",
    zipFiles: [
      { name: "app/page.tsx", content: PORTFOLIO_TSX },
      { name: "app/layout.tsx", content: LAYOUT_TSX },
      { name: "app/globals.css", content: GLOBALS_CSS },
      { name: "tokens.css", content: TOKENS_CSS },
      { name: "package.json", content: PACKAGE_JSON },
      { name: "tsconfig.json", content: TSCONFIG_JSON },
      { name: "next.config.ts", content: NEXT_CONFIG_TS },
      { name: "README.md", content: PORTFOLIO_README },
    ],
  },
  {
    id: "pricing",
    name: "Pricing SaaS",
    description: "Page de tarification avec plans comparatifs, plan populaire mis en avant et bénéfices orientés croissance.",
    tags: ["SaaS", "Pricing", "Conversion"],
    components: ["TopNav", "HeroCtaSection", "SectionHeader", "Badge", "Button", "FeatureListSection", "FooterBar", "BrandSlogan"],
    component: PricingTemplate,
    zipName: "brickslab-pricing-saas.zip",
    zipFiles: [
      { name: "app/page.tsx", content: PRICING_TSX },
      { name: "app/layout.tsx", content: LAYOUT_TSX },
      { name: "app/globals.css", content: GLOBALS_CSS },
      { name: "tokens.css", content: TOKENS_CSS },
      { name: "package.json", content: PACKAGE_JSON },
      { name: "tsconfig.json", content: TSCONFIG_JSON },
      { name: "next.config.ts", content: NEXT_CONFIG_TS },
      { name: "README.md", content: PRICING_README },
    ],
  },
  {
    id: "helpcenter",
    name: "Help Center",
    description: "Centre d'aide avec catégories de guides, KPIs de support, articles récents et CTA de contact.",
    tags: ["Support", "Documentation", "B2B"],
    components: ["TopNav", "HeroCtaSection", "SectionHeader", "TagChip", "KpiCard", "LatestComponentsList", "Button", "FooterBar", "BrandSlogan"],
    component: HelpCenterTemplate,
    zipName: "brickslab-help-center.zip",
    zipFiles: [
      { name: "app/page.tsx", content: HELP_CENTER_TSX },
      { name: "app/layout.tsx", content: LAYOUT_TSX },
      { name: "app/globals.css", content: GLOBALS_CSS },
      { name: "tokens.css", content: TOKENS_CSS },
      { name: "package.json", content: PACKAGE_JSON },
      { name: "tsconfig.json", content: TSCONFIG_JSON },
      { name: "next.config.ts", content: NEXT_CONFIG_TS },
      { name: "README.md", content: HELP_CENTER_README },
    ],
  },
  {
    id: "ecommerce-suite",
    name: "E-commerce Suite",
    description: "Version multi-pages avec accueil, boutique, fiche produit et panier pour couvrir tout le funnel e-commerce.",
    tags: ["E-commerce", "Multi-pages", "Checkout"],
    components: ["TopNav", "HeroCtaSection", "SectionHeader", "TagChip", "Badge", "Button", "FooterBar", "BrandSlogan"],
    component: EcommerceSuiteTemplate,
    zipName: "brickslab-ecommerce-suite.zip",
    zipFiles: [
      { name: "app/page.tsx", content: ECOM_SUITE_HOME_TSX },
      { name: "app/boutique/page.tsx", content: ECOM_SUITE_SHOP_TSX },
      { name: "app/produit/page.tsx", content: ECOM_SUITE_PRODUCT_TSX },
      { name: "app/panier/page.tsx", content: ECOM_SUITE_CART_TSX },
      { name: "app/layout.tsx", content: LAYOUT_TSX },
      { name: "app/globals.css", content: GLOBALS_CSS },
      { name: "tokens.css", content: TOKENS_CSS },
      { name: "package.json", content: PACKAGE_JSON },
      { name: "tsconfig.json", content: TSCONFIG_JSON },
      { name: "next.config.ts", content: NEXT_CONFIG_TS },
      { name: "README.md", content: ECOM_SUITE_README },
    ],
  },
  {
    id: "forms-workspace",
    name: "Forms Workspace",
    description: "Template formulaires multi-pages: inscription, contact, lead generation, avec base UI prête à connecter.",
    tags: ["Formulaires", "Lead", "CRM"],
    components: ["TopNav", "HeroCtaSection", "SectionHeader", "TagChip", "Badge", "Button", "FooterBar", "BrandSlogan"],
    component: FormsWorkspaceTemplate,
    zipName: "brickslab-forms-workspace.zip",
    zipFiles: [
      { name: "app/page.tsx", content: FORMS_HOME_TSX },
      { name: "app/inscription/page.tsx", content: FORMS_SIGNUP_TSX },
      { name: "app/contact/page.tsx", content: FORMS_CONTACT_TSX },
      { name: "app/lead/page.tsx", content: FORMS_LEAD_TSX },
      { name: "app/layout.tsx", content: LAYOUT_TSX },
      { name: "app/globals.css", content: GLOBALS_CSS },
      { name: "tokens.css", content: TOKENS_CSS },
      { name: "package.json", content: PACKAGE_JSON },
      { name: "tsconfig.json", content: TSCONFIG_JSON },
      { name: "next.config.ts", content: NEXT_CONFIG_TS },
      { name: "README.md", content: FORMS_README },
    ],
  },
  {
    id: "qcm-assessment",
    name: "QCM Assessment",
    description: "Template de quiz/QCM avec questionnaire interactif, catalogue d'examens et tableau de résultats.",
    tags: ["QCM", "Quiz", "Assessment"],
    components: ["TopNav", "SectionHeader", "Badge", "Button", "TagChip", "KpiCard", "FooterBar", "BrandSlogan"],
    component: QcmAssessmentTemplate,
    zipName: "brickslab-qcm-assessment.zip",
    zipFiles: [
      { name: "app/page.tsx", content: QCM_HOME_TSX },
      { name: "app/examens/page.tsx", content: QCM_EXAMS_TSX },
      { name: "app/resultat/page.tsx", content: QCM_RESULT_TSX },
      { name: "app/layout.tsx", content: LAYOUT_TSX },
      { name: "app/globals.css", content: GLOBALS_CSS },
      { name: "tokens.css", content: TOKENS_CSS },
      { name: "package.json", content: PACKAGE_JSON },
      { name: "tsconfig.json", content: TSCONFIG_JSON },
      { name: "next.config.ts", content: NEXT_CONFIG_TS },
      { name: "README.md", content: QCM_README },
    ],
  },
  {
    id: "elearning-platform",
    name: "E-learning Platform",
    description: "Template e-learning en plusieurs pages avec catalogue, cours actif et suivi des évaluations.",
    tags: ["E-learning", "Academy", "Training"],
    components: ["AppShell", "HeaderBar", "SidebarNav", "LogoMark", "Badge", "Button", "Breadcrumb", "KpiCard", "LatestComponentsList"],
    component: ElearningPlatformTemplate,
    zipName: "brickslab-elearning-platform.zip",
    zipFiles: [
      { name: "app/academy/page.tsx", content: ELEARNING_HOME_TSX },
      { name: "app/academy/cours/page.tsx", content: ELEARNING_COURSE_TSX },
      { name: "app/academy/evaluations/page.tsx", content: ELEARNING_EVAL_TSX },
      { name: "app/layout.tsx", content: LAYOUT_TSX },
      { name: "app/globals.css", content: GLOBALS_CSS },
      { name: "tokens.css", content: TOKENS_CSS },
      { name: "package.json", content: PACKAGE_JSON },
      { name: "tsconfig.json", content: TSCONFIG_JSON },
      { name: "next.config.ts", content: NEXT_CONFIG_TS },
      { name: "README.md", content: ELEARNING_README },
    ],
  },
  {
    id: "blog",
    name: "Blog",
    description: "Template éditorial avec listing d'articles, navigation de catégories et page article dédiée.",
    tags: ["Blog", "Contenu", "SEO"],
    components: ["TopNav", "HeroCtaSection", "SectionHeader", "ProjectDescriptionPanel", "FooterBar", "BrandSlogan"],
    component: BlogTemplate,
    zipName: "brickslab-blog.zip",
    zipFiles: [
      { name: "app/page.tsx", content: BLOG_HOME_TSX },
      { name: "app/article/page.tsx", content: BLOG_ARTICLE_TSX },
      { name: "app/layout.tsx", content: LAYOUT_TSX },
      { name: "app/globals.css", content: GLOBALS_CSS },
      { name: "tokens.css", content: TOKENS_CSS },
      { name: "package.json", content: PACKAGE_JSON },
      { name: "tsconfig.json", content: TSCONFIG_JSON },
      { name: "next.config.ts", content: NEXT_CONFIG_TS },
      { name: "README.md", content: BLOG_README },
    ],
  },
  {
    id: "documentation",
    name: "Documentation",
    description: "Template docs avec AppShell, sidebar, guides populaires et page d'installation prête à adapter.",
    tags: ["Docs", "Guide", "Developer"],
    components: ["AppShell", "HeaderBar", "SidebarNav", "LogoMark", "Badge", "Button", "Breadcrumb", "LatestComponentsList"],
    component: DocumentationTemplate,
    zipName: "brickslab-documentation.zip",
    zipFiles: [
      { name: "app/page.tsx", content: DOCS_HOME_TSX },
      { name: "app/installation/page.tsx", content: DOCS_INSTALL_TSX },
      { name: "app/layout.tsx", content: LAYOUT_TSX },
      { name: "app/globals.css", content: GLOBALS_CSS },
      { name: "tokens.css", content: TOKENS_CSS },
      { name: "package.json", content: PACKAGE_JSON },
      { name: "tsconfig.json", content: TSCONFIG_JSON },
      { name: "next.config.ts", content: NEXT_CONFIG_TS },
      { name: "README.md", content: DOCS_README },
    ],
  },
  {
    id: "agency",
    name: "Agence",
    description: "Template vitrine d'agence digitale avec hero, services, études de cas et section contact.",
    tags: ["Agence", "Vitrine", "Business"],
    components: ["TopNav", "HeroCtaSection", "SectionHeader", "FeatureListSection", "ProjectDescriptionPanel", "FooterBar", "BrandSlogan"],
    component: AgencyTemplate,
    zipName: "brickslab-agency.zip",
    zipFiles: [
      { name: "app/page.tsx", content: AGENCY_HOME_TSX },
      { name: "app/layout.tsx", content: LAYOUT_TSX },
      { name: "app/globals.css", content: GLOBALS_CSS },
      { name: "tokens.css", content: TOKENS_CSS },
      { name: "package.json", content: PACKAGE_JSON },
      { name: "tsconfig.json", content: TSCONFIG_JSON },
      { name: "next.config.ts", content: NEXT_CONFIG_TS },
      { name: "README.md", content: AGENCY_README },
    ],
  },
  {
    id: "landing",
    name: "Landing Page",
    description: "Page d'accueil complète avec navigation, hero, section fonctionnalités et footer. Idéale pour un produit SaaS ou une application.",
    tags: ["Marketing", "SaaS", "Produit"],
    components: ["TopNav", "HeroCtaSection", "SectionHeader", "FeatureListSection", "FooterBar", "BrandSlogan"],
    component: LandingPageTemplate,
    zipName: "brickslab-landing-page.zip",
    zipFiles: [
      { name: "app/page.tsx", content: LANDING_PAGE_TSX },
      { name: "app/layout.tsx", content: LAYOUT_TSX },
      { name: "app/globals.css", content: GLOBALS_CSS },
      { name: "tokens.css", content: TOKENS_CSS },
      { name: "package.json", content: PACKAGE_JSON },
      { name: "tsconfig.json", content: TSCONFIG_JSON },
      { name: "next.config.ts", content: NEXT_CONFIG_TS },
      { name: "README.md", content: README_MD },
    ],
  },
];

// ── Scaled preview ────────────────────────────────────────────────────────────

const PREVIEW_WIDTH = 1280;
const PREVIEW_SCALE = 0.26;

function ScaledPreview({ component: Component, scale = PREVIEW_SCALE }: {
  component: React.FC;
  scale?: number;
}) {
  const containerW = PREVIEW_WIDTH * scale;
  const containerH = 680 * scale; // ~above the fold

  return (
    <div style={{
      width: containerW,
      height: containerH,
      overflow: "hidden",
      position: "relative",
      borderRadius: 8,
      border: "1px solid var(--c-border)",
      backgroundColor: "var(--c-surface-elevated)",
      flexShrink: 0,
    }}>
      <div style={{
        width: PREVIEW_WIDTH,
        transformOrigin: "top left",
        transform: `scale(${scale})`,
        pointerEvents: "none",
        userSelect: "none",
      }}>
        <Component />
      </div>
    </div>
  );
}

// ── Template card ─────────────────────────────────────────────────────────────

function TemplateCard({ template, onPreview }: {
  template: Template;
  onPreview: (t: Template) => void;
}) {
  const [hovering, setHovering] = useState(false);

  return (
    <div
      style={{
        background: "linear-gradient(180deg, var(--c-surface) 0%, var(--c-surface-elevated) 100%)",
        border: "1px solid var(--c-border)",
        borderRadius: 18,
        overflow: "hidden",
        transition: "box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease",
        boxShadow: hovering ? "var(--shadow-3, 0 24px 58px rgba(16,24,40,0.18))" : "var(--shadow-1, 0 6px 20px rgba(16,24,40,0.08))",
        transform: hovering ? "translateY(-4px)" : "none",
        borderColor: hovering ? "var(--c-brand-border)" : "var(--c-border)",
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Preview area */}
      <div style={{
        background: "linear-gradient(140deg, var(--c-surface-elevated) 0%, var(--c-surface) 100%)",
        borderBottom: "1px solid var(--c-border)",
        padding: 0,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        cursor: "pointer",
        position: "relative",
      }}
        onClick={() => onPreview(template)}
      >
        <ScaledPreview component={template.component} />

        {/* Hover overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundColor: "rgba(10,16,29,0.52)",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: hovering ? 1 : 0,
          transition: "opacity 0.25s ease",
          backdropFilter: "blur(2px)",
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            color: "#FBFBFB", fontWeight: 700, fontSize: 14,
          }}>
            <FiEye size={18} />
            Prévisualiser
          </div>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "22px 24px 24px" }}>
        {/* Tags */}
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          {template.tags.map((tag) => (
            <span key={tag} style={{
              fontSize: 10, fontWeight: 700, color: "var(--color-brand)",
              background: "var(--c-brand-subtle)",
              border: "1px solid var(--c-brand-border)",
              borderRadius: 999,
              padding: "3px 10px",
              letterSpacing: "0.03em",
            }}>{tag}</span>
          ))}
        </div>

        <h3 style={{ fontSize: 19, fontWeight: 800, color: "var(--color-fg)", marginBottom: 7, letterSpacing: "-0.01em" }}>
          {template.name}
        </h3>
        <p style={{ fontSize: 13, color: "var(--color-muted)", lineHeight: 1.65, marginBottom: 18 }}>
          {template.description}
        </p>

        {/* Components list */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
            Composants
          </div>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {template.components.map((c) => (
              <span key={c} style={{
                fontSize: 11, color: "var(--color-muted)",
                backgroundColor: "var(--c-surface-elevated)",
                border: "1px solid var(--c-border)",
                borderRadius: 999,
                padding: "3px 9px",
                fontFamily: "ui-monospace, monospace",
              }}>{c}</span>
            ))}
          </div>
        </div>

        {/* Files in ZIP */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
            Contenu du ZIP
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {template.zipFiles.map((f) => (
              <div key={f.name} style={{
                display: "flex", alignItems: "center", gap: 8,
                fontSize: 12, color: "var(--color-muted)", fontFamily: "ui-monospace, monospace",
              }}>
                <span style={{ color: "var(--color-brand)" }}>↳</span>
                {f.name}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => onPreview(template)}
            style={{
              flex: 1, padding: "10px 16px", fontSize: 13, fontWeight: 600,
              color: "var(--color-fg)", backgroundColor: "var(--c-surface-elevated)",
              border: "1px solid var(--c-border)", borderRadius: 10, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}
          >
            <FiEye size={14} /> Prévisualiser
          </button>
          <button
            onClick={() => downloadZip(template.zipName, template.zipFiles)}
            style={{
              flex: 1, padding: "10px 16px", fontSize: 13, fontWeight: 700,
              color: "#FBFBFB",
              background: "linear-gradient(135deg, var(--color-brand) 0%, #dd6b67 100%)",
              border: "none", borderRadius: 10, cursor: "pointer",
              boxShadow: "0 10px 24px rgba(204,74,72,0.28)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}
          >
            <FiDownload size={14} /> Télécharger .zip
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Full preview overlay ──────────────────────────────────────────────────────

const OVERLAY_SCALE = 0.65;

function PreviewOverlay({ template, onClose }: {
  template: Template;
  onClose: () => void;
}) {
  const Component = template.component;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        backgroundColor: "rgba(11,18,32,0.85)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "flex-start",
        paddingTop: 48,
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      {/* Toolbar */}
      <div
        style={{
          width: PREVIEW_WIDTH * OVERLAY_SCALE,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 16,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ color: "#FBFBFB", fontWeight: 600, fontSize: 15 }}>
          {template.name}
          <span style={{ fontWeight: 400, color: "rgba(255,255,255,0.5)", marginLeft: 12, fontSize: 13 }}>
            Aperçu — {Math.round(OVERLAY_SCALE * 100)}% de la taille réelle
          </span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => downloadZip(template.zipName, template.zipFiles)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 16px", fontSize: 13, fontWeight: 600,
              color: "#FBFBFB", backgroundColor: "#CC4A48",
              border: "none", borderRadius: 8, cursor: "pointer",
            }}
          >
            <FiDownload size={14} /> Télécharger .zip
          </button>
          <button
            onClick={onClose}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 36, height: 36,
              color: "#FBFBFB", backgroundColor: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 8, cursor: "pointer",
            }}
          >
            <FiX size={16} />
          </button>
        </div>
      </div>

      {/* Scaled template */}
      <div
        style={{
          width: PREVIEW_WIDTH * OVERLAY_SCALE,
          maxHeight: "calc(100vh - 140px)",
          overflow: "auto",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
          backgroundColor: "var(--color-bg)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          width: PREVIEW_WIDTH,
          transformOrigin: "top left",
          transform: `scale(${OVERLAY_SCALE})`,
        }}>
          <Component />
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TemplatesPage() {
  const [activePreview, setActivePreview] = useState<Template | null>(null);

  return (
    <>
      <PageHero
        eyebrow="Templates"
        title="Pages prêtes à déployer"
        subtitle={`Pages complètes construites exclusivement avec @brickslab./ui-web. Prévisualisez et téléchargez un ZIP avec le code source, les tokens CSS et le README.`}
        stats={[
          { value: TEMPLATES.length, label: "Templates disponibles" },
          { value: "ZIP", label: "Code source inclus" },
          { value: "100%", label: "Composants Brickslab" },
        ]}
      />

      <div style={{
        maxWidth: 1240,
        margin: "0 auto",
        padding: "34px 24px 48px",
      }}>
        {/* Coming soon banner */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "13px 18px", marginBottom: 30,
          background: "var(--c-brand-subtle)",
          border: "1px solid var(--c-brand-border)",
          borderRadius: 12, fontSize: 13, color: "var(--color-muted)",
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--color-brand)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            En cours
          </span>
          D&apos;autres templates arrivent : Marketplace, Healthcare, Event…
        </div>

        {/* Template grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(430px, 1fr))",
          gap: 22,
        }}>
          {TEMPLATES.map((t) => (
            <TemplateCard key={t.id} template={t} onPreview={setActivePreview} />
          ))}
        </div>
      </div>

      {/* Overlay */}
      {activePreview && (
        <PreviewOverlay template={activePreview} onClose={() => setActivePreview(null)} />
      )}
    </>
  );
}
