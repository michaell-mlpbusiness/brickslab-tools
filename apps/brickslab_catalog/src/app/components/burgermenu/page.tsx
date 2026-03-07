"use client";

import { useState } from "react";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  PropTag,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";
import { MobileNav } from "../../../catalog/MobileNav";

const props: PropDef[] = [
  {
    name: "isOpen",
    type: "boolean",
    required: true,
    description: "État du menu (ouvert ou fermé).",
  },
  {
    name: "onClose",
    type: "() => void",
    required: true,
    description: "Callback appelé lors de la fermeture du menu (clic sur overlay ou lien).",
  },
];

const usageCode = `import { MobileNav } from "@brickslab/catalog";  // Composant du catalog

function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <>    
      <button onClick={() => setOpen(true)}>Ouvrir menu</button>
      <MobileNav isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}`;

export default function BurgerMenuPage() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <ComponentHeader name="Burger Menu" description="Menu de navigation mobile qui s&apos;affiche lorsque la sidebar est masquée (écrans <1024px). Composant personnalisé du catalogue avec navigation complète et système d&apos;overlay semi-transparent." />

      <SectionTitle>Aperçu</SectionTitle>
      <SubLabel>Cliquez sur le bouton pour ouvrir/fermer</SubLabel>
      <Preview>
        <button onClick={() => setOpen(true)} style={{ padding: "8px 16px", cursor: "pointer" }}>
          Ouvrir le menu burger
        </button>
        <MobileNav isOpen={open} onClose={() => setOpen(false)} />
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Caractéristiques</SectionTitle>
      <div style={{ padding: "16px", backgroundColor: "var(--c-surface-secondary)", borderRadius: "8px", marginBottom: "24px" }}>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Navigation complète</strong> : Même structure qu&apos;une sidebar avec toutes les sections</li>
          <li><strong>Overlay semi-transparent</strong> : Fond assombri pour fermer en cliquant dessus</li>
          <li><strong>Position fixe</strong> : Couvre l&apos;écran depuis le haut de la barre jusqu&apos;en bas</li>
          <li><strong>Largeur responsive</strong> : 280px de largeur fixe avec scroll interne</li>
          <li><strong>Active state</strong> : Indique la page actuelle avec couleur et icône</li>
        </ul>
      </div>

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} language="tsx" />

      <SectionTitle>Notes</SectionTitle>
      <div style={{ padding: "16px", backgroundColor: "var(--c-surface-secondary)", borderRadius: "8px", borderLeft: "3px solid var(--color-brand)" }}>
        <p style={{ margin: 0, fontSize: "14px" }}>
          ⚠️ Le Burger Menu est un composant du catalogue, géré par la Topbar. Il s&apos;affiche automatiquement sous 1024px de largeur et ferme au clic sur un lien ou l&apos;overlay.
        </p>
      </div>
    </div>
  );
}
