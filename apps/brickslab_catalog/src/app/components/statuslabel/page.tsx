"use client";

import { StatusLabel } from "@brickslab./ui-web";
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
    name: "status",
    type: '"active" | "inactive" | "pending" | "error"',
    required: true,
    description: "Statut à afficher. Détermine la couleur et l'icône associée au label.",
  },
  {
    name: "label",
    type: "string",
    description: "Texte personnalisé du label. Si omis, le composant utilise le libellé par défaut associé au statut.",
  },
];

const usageCode = `import { StatusLabel } from "@brickslab./ui-web";

// Les 4 statuts avec labels par défaut
<StatusLabel status="active" />
<StatusLabel status="inactive" />
<StatusLabel status="pending" />
<StatusLabel status="error" />

// Labels personnalisés
<StatusLabel status="active"   label="En ligne" />
<StatusLabel status="inactive" label="Hors ligne" />
<StatusLabel status="pending"  label="En attente de validation" />
<StatusLabel status="error"    label="Échec de connexion" />`;

export default function StatusLabelPage() {
  return (
    <div>
      <ComponentHeader
        name="StatusLabel"
        description="Indicateur visuel de statut avec couleur et icône associées. Utilisé pour communiquer l'état d'un système, service ou entité. Supporte 4 états prédéfinis avec possibilité de personnaliser le libellé."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>les 4 statuts — labels par défaut</SubLabel>
      <Preview>
        {(["active", "inactive", "pending", "error"] as const).map((status) => (
          <div key={status} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>{`status="${status}"`}</PropTag>
            <StatusLabel status={status} />
          </div>
        ))}
      </Preview>

      <SubLabel>labels personnalisés</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>active — label personnalisé</PropTag>
          <StatusLabel status="active" label="Service opérationnel" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>inactive — label personnalisé</PropTag>
          <StatusLabel status="inactive" label="Hors ligne" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>pending — label personnalisé</PropTag>
          <StatusLabel status="pending" label="Déploiement en cours" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>error — label personnalisé</PropTag>
          <StatusLabel status="error" label="Échec de build" />
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
