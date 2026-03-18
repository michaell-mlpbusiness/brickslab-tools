"use client";

import { NewsLetter } from "@brickslab./ui-web";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  PropTag,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

const props: PropDef[] = [
  {
    name: "onSubmit",
    type: "(email: string) => void | Promise<void>",
    required: true,
    description:
      "Callback déclenché à la soumission avec l'email validé. Si la fonction retourne une Promise, le composant gère automatiquement les états loading / success / error en interne.",
  },
  {
    name: "title",
    type: "string",
    description: "Titre affiché au-dessus du formulaire.",
  },
  {
    name: "description",
    type: "string",
    description: "Sous-titre ou description contextuelle.",
  },
  {
    name: "placeholder",
    type: "string",
    default: '"votre@email.com"',
    description: "Placeholder du champ email.",
  },
  {
    name: "buttonLabel",
    type: "string",
    default: '"S\'inscrire"',
    description: "Libellé du bouton CTA.",
  },
  {
    name: "successMessage",
    type: "string",
    default: '"Merci, vous êtes inscrit !"',
    description: "Message affiché à la place du formulaire après une soumission réussie.",
  },
  {
    name: "status",
    type: '"idle" | "loading" | "success" | "error"',
    default: '"idle"',
    description:
      "Statut contrôlé en externe. Lorsqu'il est fourni, il prime sur la gestion d'état interne.",
  },
  {
    name: "errorText",
    type: "string",
    description:
      "Message d'erreur externe (ex : erreur API). Prioritaire sur l'erreur de validation interne.",
  },
  {
    name: "layout",
    type: '"inline" | "stacked"',
    default: '"inline"',
    description:
      'Disposition du champ et du bouton. "inline" : sur la même ligne (bascule en colonne sous 480 px). "stacked" : empilés verticalement.',
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Taille partagée entre le composant Input et le composant Button.",
  },
  {
    name: "buttonVariant",
    type: '"primary" | "secondary" | "ghost" | "danger"',
    default: '"primary"',
    description: "Variante visuelle du bouton CTA.",
  },
  {
    name: "fullWidth",
    type: "boolean",
    default: "false",
    description: "Étend le container à 100 % de son parent.",
  },
  {
    name: "value",
    type: "string",
    description: "Valeur email en mode contrôlé. À combiner avec onChange.",
  },
  {
    name: "onChange",
    type: "(email: string) => void",
    description: "Handler de changement en mode contrôlé.",
  },
  {
    name: "style",
    type: "React.CSSProperties",
    description: "Styles inline sur le container racine.",
  },
  {
    name: "className",
    type: "string",
    description: "Classe CSS additionnelle sur le container racine.",
  },
];

// ---------------------------------------------------------------------------
// Usage code
// ---------------------------------------------------------------------------

const usageCode = `import { NewsLetter } from "@brickslab./ui-web";

// Basique — gestion d'état interne automatique
<NewsLetter
  onSubmit={async (email) => {
    await api.subscribe(email);
  }}
/>

// Avec titre et description
<NewsLetter
  title="Restez informé"
  description="Recevez nos actualités chaque semaine, sans spam."
  onSubmit={handleSubmit}
/>

// Layout stacked
<NewsLetter
  layout="stacked"
  title="Rejoignez la communauté"
  buttonLabel="Je m'inscris"
  fullWidth
  onSubmit={handleSubmit}
/>

// Tailles
<NewsLetter size="sm" buttonLabel="OK"            onSubmit={handleSubmit} />
<NewsLetter size="md"                              onSubmit={handleSubmit} />
<NewsLetter size="lg" buttonLabel="S'inscrire"    onSubmit={handleSubmit} />

// Variantes de bouton
<NewsLetter buttonVariant="primary"   onSubmit={handleSubmit} />
<NewsLetter buttonVariant="secondary" onSubmit={handleSubmit} />
<NewsLetter buttonVariant="ghost"     onSubmit={handleSubmit} />

// Statut contrôlé en externe
<NewsLetter status="loading"  value={email} onChange={setEmail} onSubmit={handleSubmit} />
<NewsLetter status="success"  successMessage="Bienvenue !" onSubmit={handleSubmit} />
<NewsLetter
  status="error"
  errorText="Cette adresse est déjà inscrite."
  value={email}
  onChange={setEmail}
  onSubmit={handleSubmit}
/>`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const noop = async (email: string) => {
  await new Promise<void>((resolve) => setTimeout(resolve, 1200));
  console.log("[NewsLetter] Submitted:", email);
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function NewsLetterPage() {
  return (
    <div>
      <ComponentHeader
        name="NewsLetter"
        section="Sections"
        description="Champ d'inscription newsletter composé de Input et Button. Gère le cycle loading / success / error en interne via une Promise, ou en externe via la prop status. Deux layouts disponibles : inline (défaut) et stacked. Responsive natif : bascule en colonne sous 480 px."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>layout</SubLabel>
      <Preview>
        {(["inline", "stacked"] as const).map((layout) => (
          <div
            key={layout}
            style={{ flex: 1, minWidth: 280, display: "flex", flexDirection: "column", gap: 6 }}
          >
            <PropTag>{`layout="${layout}"`}</PropTag>
            <NewsLetter
              layout={layout}
              placeholder="votre@email.com"
              buttonLabel="S'inscrire"
              onSubmit={noop}
              fullWidth
            />
          </div>
        ))}
      </Preview>

      <SubLabel>size</SubLabel>
      <Preview>
        {(["sm", "md", "lg"] as const).map((size) => (
          <div
            key={size}
            style={{ flex: 1, minWidth: 260, display: "flex", flexDirection: "column", gap: 6 }}
          >
            <PropTag>{`size="${size}"`}</PropTag>
            <NewsLetter size={size} buttonLabel="S'inscrire" onSubmit={noop} fullWidth />
          </div>
        ))}
      </Preview>

      <SubLabel>buttonVariant</SubLabel>
      <Preview>
        {(["primary", "secondary", "ghost"] as const).map((variant) => (
          <div
            key={variant}
            style={{ flex: 1, minWidth: 260, display: "flex", flexDirection: "column", gap: 6 }}
          >
            <PropTag>{`buttonVariant="${variant}"`}</PropTag>
            <NewsLetter buttonVariant={variant} buttonLabel="S'inscrire" onSubmit={noop} fullWidth />
          </div>
        ))}
      </Preview>

      <SubLabel>title + description</SubLabel>
      <Preview>
        <div style={{ minWidth: 320, display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>title + description</PropTag>
          <NewsLetter
            title="Restez informé"
            description="Recevez nos actualités chaque semaine, sans spam."
            layout="stacked"
            buttonLabel="Je m'inscris"
            onSubmit={noop}
            fullWidth
          />
        </div>
      </Preview>

      <SubLabel>status contrôlé</SubLabel>
      <Preview>
        <div style={{ flex: 1, minWidth: 260, display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`status="loading"`}</PropTag>
          <NewsLetter
            status="loading"
            value="utilisateur@exemple.com"
            onChange={() => {}}
            onSubmit={() => {}}
            fullWidth
          />
        </div>
        <div style={{ flex: 1, minWidth: 260, display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`status="success"`}</PropTag>
          <NewsLetter
            status="success"
            successMessage="Bienvenue, vous êtes inscrit !"
            onSubmit={() => {}}
          />
        </div>
        <div style={{ flex: 1, minWidth: 260, display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`status="error"`}</PropTag>
          <NewsLetter
            status="error"
            errorText="Cette adresse est déjà inscrite."
            value="utilisateur@exemple.com"
            onChange={() => {}}
            onSubmit={() => {}}
            fullWidth
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
