"use client";

import { Sidebar } from "../../../catalog/Sidebar";
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
    name: "children",
    type: "ReactNode (internal)",
    description: "La sidebar gère sa propre structure interne avec navigation organisée par sections.",
  },
];

const usageCode = `import { Sidebar } from "@brickslab/catalog";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1, marginLeft: "232px" }}>
        {children}
      </main>
    </div>
  );
}`;

export default function SidebarPage() {
  return (
    <div>
      <ComponentHeader
        name="Sidebar"
        description="Barre de navigation latérale fixe pour desktop avec sections organisées de composants du catalogue. Composant personnalisé du catalogue avec détection de page active et responsive."
      />

      {/* ── Caractéristiques ─────────────────────────────── */}
      <SectionTitle>Caractéristiques</SectionTitle>
      <div style={{ padding: "16px", backgroundColor: "var(--c-surface-secondary)", borderRadius: "8px", marginBottom: "24px" }}>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Navigation structurée</strong> : 9 sections organisées par type de composant</li>
          <li><strong>Position fixe</strong> : Reste visible lors du scroll (width: 232px)</li>
          <li><strong>Active state</strong> : Indicateur visuel de la page actuelle</li>
          <li><strong>Style actif</strong> : Couleur de marque (#CC4A48) avec fond subtil</li>
          <li><strong>Scroll interne</strong> : Navigation scrollable avec contenu long</li>
          <li><strong>Cachée sur mobile</strong> : Masquée au profit du BurgerMenu sur écrans de max 1024px</li>
        </ul>
      </div>

      {/* ── Sections de navigation ─────────────────────────────── */}
      <SectionTitle>Sections incluses</SectionTitle>
      <div style={{ padding: "16px", backgroundColor: "var(--c-surface-secondary)", borderRadius: "8px", marginBottom: "24px" }}>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Layout & Shell</strong> : Composants de structure (AppShell, HeaderBar, SidebarNav, TopNav, FooterBar, BurgerMenu)</li>
          <li><strong>Navigation</strong> : Éléments de navigation (LogoMark, SearchBar, MenuTree, Breadcrumb)</li>
          <li><strong>Catalogue / Docs</strong> : Composants de documentation (SectionGallery, PropsTable, CodeBlock, etc.)</li>
          <li><strong>Carrousel</strong> : Composants carousel</li>
          <li><strong>Cards & Contenus</strong> : Cartes et panels de contenu</li>
          <li><strong>Typographie</strong> : Composants texte (Heading, Text, TextBlock)</li>
          <li><strong>UI Controls</strong> : Contrôles UI (ToggleSwitch, TagChip, StatusLabel, etc.)</li>
          <li><strong>Footer</strong> : Composants footer</li>
          <li><strong>Sections</strong> : Grandes sections de page</li>
        </ul>
      </div>

      {/* ── Props ─────────────────────────────────────────────────── */}
      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Démonstration</SectionTitle>
      <SubLabel>Vous voyez la Sidebar à gauche de cette page</SubLabel>
      <Preview>
        <div style={{ padding: "16px", textAlign: "center", color: "var(--color-muted)" }}>
          La Sidebar est visible à gauche avec :
          <ul style={{ marginTop: "12px", marginBottom: "12px", lineHeight: "1.8" }}>
            <li>9 sections de composants</li>
            <li>Navigation complète du catalogue</li>
            <li>Indicateur de page active</li>
            <li>Largeur fixe de 232px</li>
          </ul>
        </div>
      </Preview>

      {/* ── Utilisation ────────────────────────────────────────────── */}
      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} language="tsx" />

      {/* ── Notes ────────────────────────────────────────────── */}
      <SectionTitle>Notes</SectionTitle>
      <div style={{ padding: "16px", backgroundColor: "var(--c-surface-secondary)", borderRadius: "8px", borderLeft: "3px solid var(--color-brand)" }}>
        <p style={{ margin: 0, fontSize: "14px" }}>
          ⚠️ La Sidebar est un composant personnalisé du catalogue. Elle est masquée sur mobile et remplacée par le BurgerMenu. 
          La détection de page active se fait via le hook <code>usePathname()</code> de Next.js.
        </p>
      </div>
    </div>
  );
}
