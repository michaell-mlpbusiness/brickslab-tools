"use client";

import React, { useState } from "react";
import { Alert } from "@brickslab./ui-web";
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
    type: "React.ReactNode",
    required: true,
    description: "Message principal affiché dans l'alerte.",
  },
  {
    name: "variant",
    type: '"info" | "success" | "warning" | "error"',
    default: '"info"',
    description: "Variante visuelle de l'alerte — détermine couleur et icône.",
  },
  {
    name: "title",
    type: "string",
    description: "Titre optionnel affiché en gras au-dessus du message.",
  },
  {
    name: "dismissible",
    type: "boolean",
    default: "false",
    description: "Affiche un bouton ✕ pour fermer l'alerte.",
  },
  {
    name: "onDismiss",
    type: "() => void",
    description: "Callback appelé quand l'utilisateur clique sur ✕. Requis si dismissible=true.",
  },
  {
    name: "icon",
    type: "boolean",
    default: "true",
    description: "Affiche l'icône correspondant à la variante.",
  },
  {
    name: "fullWidth",
    type: "boolean",
    default: "false",
    description: "Étire l'alerte sur toute la largeur disponible.",
  },
];

const usageCode = `import { Alert } from "@brickslab./ui-web";

// Variantes
<Alert variant="info">Mise à jour disponible.</Alert>
<Alert variant="success">Enregistrement réussi.</Alert>
<Alert variant="warning">Espace disque faible.</Alert>
<Alert variant="error">Échec de la connexion.</Alert>

// Avec titre
<Alert variant="success" title="Opération réussie">
  Vos modifications ont été enregistrées.
</Alert>

// Dismissible (contrôlé)
const [show, setShow] = useState(true);
{show && (
  <Alert variant="info" dismissible onDismiss={() => setShow(false)}>
    Cliquez ✕ pour fermer.
  </Alert>
)}

// Sans icône
<Alert variant="warning" icon={false}>
  Alerte sans icône.
</Alert>

// Full width
<Alert variant="error" fullWidth>
  Erreur critique sur toute la largeur.
</Alert>

// Contenu riche
<Alert variant="info" title="Conseil">
  Consultez la <a href="/docs">documentation</a> pour en savoir plus.
</Alert>`;

export default function AlertPage() {
  const [showDismiss, setShowDismiss] = useState(true);

  return (
    <div>
      <ComponentHeader
        name="Alert"
        description="Composant de feedback contextuel disponible en 4 variantes (info, success, warning, error). Contrôlé — le dismiss est géré par le parent via onDismiss. Supporte titre optionnel, icône, contenu riche et largeur complète."
      />

      {/* ── Aperçu ──────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>
      <SubLabel>4 variantes côte à côte</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
          <Alert variant="info">Mise à jour disponible pour votre application.</Alert>
          <Alert variant="success">Enregistrement réussi. Vos données sont sauvegardées.</Alert>
          <Alert variant="warning">Espace disque faible — moins de 500 Mo disponibles.</Alert>
          <Alert variant="error">Échec de la connexion. Vérifiez vos identifiants.</Alert>
        </div>
      </Preview>

      {/* ── Avec titre ──────────────────────────────────────────────── */}
      <SectionTitle>Avec titre</SectionTitle>
      <SubLabel>prop title — texte en gras au-dessus du message</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
          <Alert variant="info" title="Information">
            Une nouvelle version est disponible. Rechargez la page pour en profiter.
          </Alert>
          <Alert variant="success" title="Opération réussie">
            Vos modifications ont bien été enregistrées.
          </Alert>
          <Alert variant="warning" title="Attention">
            Cette action est irréversible. Confirmez avant de continuer.
          </Alert>
          <Alert variant="error" title="Erreur critique">
            La requête a échoué avec le code 500. Contactez le support.
          </Alert>
        </div>
      </Preview>

      {/* ── Dismissible ─────────────────────────────────────────────── */}
      <SectionTitle>Dismissible</SectionTitle>
      <SubLabel>dismissible + onDismiss — géré par useState dans le parent</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
          {showDismiss ? (
            <Alert
              variant="info"
              title="Notification"
              dismissible
              onDismiss={() => setShowDismiss(false)}
            >
              Cliquez sur ✕ pour fermer cette alerte.
            </Alert>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 14px",
                fontSize: 13,
                color: "var(--color-muted)",
                border: "1px dashed var(--c-border)",
                borderRadius: "var(--radius-md)",
              }}
            >
              Alerte fermée.{" "}
              <button
                onClick={() => setShowDismiss(true)}
                style={{
                  padding: "4px 10px",
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                  border: "1px solid var(--c-border)",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--c-surface-elevated)",
                  color: "var(--color-fg)",
                  fontFamily: "inherit",
                }}
              >
                Réafficher
              </button>
            </div>
          )}
        </div>
      </Preview>

      {/* ── Sans icône ──────────────────────────────────────────────── */}
      <SectionTitle>Sans icône</SectionTitle>
      <SubLabel>icon=false — retire l'icône de la variante</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>icon=true (défaut)</PropTag>
            <Alert variant="warning">Avec icône — comportement par défaut.</Alert>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>icon=false</PropTag>
            <Alert variant="warning" icon={false}>Sans icône — affichage épuré.</Alert>
          </div>
        </div>
      </Preview>

      {/* ── Full Width ──────────────────────────────────────────────── */}
      <SectionTitle>Full Width</SectionTitle>
      <SubLabel>fullWidth=true — s'étend sur toute la largeur du conteneur</SubLabel>
      <Preview>
        <Alert variant="error" fullWidth title="Erreur de chargement">
          Impossible de récupérer les données. Vérifiez votre connexion et réessayez.
        </Alert>
      </Preview>

      {/* ── Contenu riche ────────────────────────────────────────────── */}
      <SectionTitle>Contenu riche</SectionTitle>
      <SubLabel>children accepte du JSX — liens, strong, mise en forme</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
          <Alert variant="info" title="Conseil">
            Consultez la{" "}
            <a href="#" style={{ color: "var(--color-brand)", textDecoration: "underline" }}>
              documentation
            </a>{" "}
            pour en savoir plus sur cette fonctionnalité.
          </Alert>
          <Alert variant="warning">
            <strong>Attention :</strong> Cette opération supprimera{" "}
            <strong>définitivement</strong> toutes les données associées.
          </Alert>
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
