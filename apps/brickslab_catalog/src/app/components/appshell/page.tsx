"use client";

import { AppShell } from "@brickslab./ui-web";
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
    name: "children",
    type: "ReactNode",
    required: true,
    description: "Contenu principal de l'application, affiché dans la zone centrale.",
  },
  {
    name: "header",
    type: "ReactNode",
    description: "Slot pour la barre de navigation principale (HeaderBar ou équivalent).",
  },
  {
    name: "sidebar",
    type: "ReactNode",
    description: "Slot pour la navigation latérale (SidebarNav ou équivalent).",
  },
  {
    name: "footer",
    type: "ReactNode",
    description: "Slot pour la barre de pied de page (FooterBar ou équivalent).",
  },
  {
    name: "sidebarWidth",
    type: "number",
    default: "232",
    description: "Largeur en pixels de la sidebar. Affecte le décalage du contenu principal.",
  },
  {
    name: "headerHeight",
    type: "number",
    default: "60",
    description: "Hauteur en pixels du header. Affecte le padding-top du contenu principal.",
  },
  {
    name: "footerHeight",
    type: "number",
    default: "60",
    description: "Hauteur en pixels du footer. Affecte le padding-bottom du contenu principal.",
  },
];

const usageCode = `import { AppShell, HeaderBar, SidebarNav, FooterBar } from "@brickslab./ui-web";

<AppShell
  header={
    <HeaderBar
      logo={<span>BricksLab</span>}
      nav={<nav>...</nav>}
    />
  }
  sidebar={
    <SidebarNav
      sections={[
        { title: "Composants", items: [{ label: "Heading", href: "/components/heading" }] },
      ]}
      activePath="/components/heading"
    />
  }
  footer={
    <FooterBar />
  }
  sidebarWidth={232}
  headerHeight={60}
  footerHeight={60}
>
  <main>
    <p>Contenu principal de l'application</p>
  </main>
</AppShell>`;

export default function AppShellPage() {
  return (
    <div>
      <ComponentHeader
        name="AppShell"
        description="Coque d'application complète avec slots pour le header, sidebar, footer et contenu principal. Gère automatiquement les offsets de mise en page basés sur les hauteurs et largeurs configurées."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>AppShell complet — conteneur 400px, border, overflow hidden</SubLabel>
      <Preview>
        <div style={{ width: "100%", height: 400, border: "1px solid var(--color-muted)", borderRadius: "var(--radius-md)", overflow: "hidden", position: "relative" }}>
          <AppShell
            header={
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", height: "100%", background: "var(--color-surface)", borderBottom: "1px solid var(--color-muted)" }}>
                <span style={{ fontWeight: 700, color: "var(--color-brand)" }}>BricksLab</span>
                <nav style={{ display: "flex", gap: 16, fontSize: "0.85rem" }}>
                  <a href="#" style={{ textDecoration: "none" }}>Composants</a>
                  <a href="#" style={{ textDecoration: "none" }}>Docs</a>
                </nav>
              </div>
            }
            sidebar={
              <div style={{ padding: 16, borderRight: "1px solid var(--color-muted)", height: "100%", background: "var(--color-surface)" }}>
                <p style={{ margin: 0, fontSize: "0.8rem", fontWeight: 600, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.05em" }}>Navigation</p>
                <ul style={{ listStyle: "none", margin: "8px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                  <li><a href="#" style={{ fontSize: "0.85rem", textDecoration: "none" }}>Heading</a></li>
                  <li><a href="#" style={{ fontSize: "0.85rem", textDecoration: "none", color: "var(--color-brand)", fontWeight: 600 }}>AppShell</a></li>
                  <li><a href="#" style={{ fontSize: "0.85rem", textDecoration: "none" }}>SidebarNav</a></li>
                </ul>
              </div>
            }
            footer={
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", borderTop: "1px solid var(--color-muted)", background: "var(--color-surface)" }}>
                {/* footer intentionally left empty for preview */}
              </div>
            }
            sidebarWidth={180}
            headerHeight={52}
            footerHeight={48}
          >
            <div style={{ padding: 24 }}>
              <h2 style={{ margin: "0 0 8px", fontSize: "1.25rem" }}>Contenu principal</h2>
              <p style={{ margin: 0, opacity: 0.6, fontSize: "0.9rem" }}>Zone centrale gérée par AppShell. Les offsets header, sidebar et footer sont appliqués automatiquement.</p>
            </div>
          </AppShell>
        </div>
      </Preview>

      <SubLabel>sans sidebar</SubLabel>
      <Preview>
        <div style={{ width: "100%", height: 200, border: "1px solid var(--color-muted)", borderRadius: "var(--radius-md)", overflow: "hidden", position: "relative" }}>
          <AppShell
            header={
              <div style={{ display: "flex", alignItems: "center", padding: "0 20px", height: "100%", background: "var(--color-surface)", borderBottom: "1px solid var(--color-muted)" }}>
                <span style={{ fontWeight: 700, color: "var(--color-brand)" }}>BricksLab</span>
              </div>
            }
            headerHeight={48}
            footerHeight={44}
          >
            <div style={{ padding: 20, fontSize: "0.9rem", opacity: 0.6 }}>
              Contenu sans sidebar
            </div>
          </AppShell>
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
