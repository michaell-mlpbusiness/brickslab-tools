"use client";

import { useState } from "react";
import { AnimatedStack } from "@brickslab./ui-web";
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
    name: "items",
    type: "React.ReactNode[]",
    required: true,
    description: "Items to stack. Le dernier élément est la carte du dessus (la plus récente).",
  },
  {
    name: "maxVisible",
    type: "number",
    default: "3",
    description: "Nombre maximum de cartes visibles dans la pile.",
  },
  {
    name: "stackOffset",
    type: "number",
    default: "10",
    description: "Décalage vertical en px entre chaque carte de la pile.",
  },
  {
    name: "scaleDecrement",
    type: "number",
    default: "0.06",
    description: "Réduction de scale par niveau dans la pile (0.06 = −6% par carte).",
  },
  {
    name: "className",
    type: "string",
    description: "Classe CSS du conteneur.",
  },
  {
    name: "itemClassName",
    type: "string",
    description: "Classe CSS appliquée à chaque carte.",
  },
  {
    name: "reducedMotion",
    type: '"auto" | "always" | "never"',
    default: '"auto"',
    description: 'Gestion du mouvement réduit. "auto" respecte prefers-reduced-motion.',
  },
];

const notifStyle = (color: string): React.CSSProperties => ({
  padding: "var(--space-3) var(--space-4)",
  backgroundColor: "var(--c-surface-elevated)",
  borderRadius: "var(--radius-md)",
  borderLeft: `3px solid ${color}`,
  boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-1)",
});

const appLabel: React.CSSProperties = {
  fontSize: "var(--fontsize-xs)",
  fontWeight: "var(--fontweight-semibold)",
  color: "var(--color-muted)",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
};

const msgStyle: React.CSSProperties = {
  fontSize: "var(--fontsize-sm)",
  color: "var(--color-fg)",
};

const usageCode = `import { AnimatedStack } from "@brickslab./ui-web";

const notifications = [
  <NotifCard key="1" title="Messages" body="Hey, tu es dispo ?" />,
  <NotifCard key="2" title="GitHub" body="PR approuvée — brickslab-v1" />,
  <NotifCard key="3" title="Slack" body="Nouveau message de Marie" />,
];

// Pile statique
<AnimatedStack items={notifications} />

// Pile plus serrée
<AnimatedStack items={notifications} stackOffset={6} scaleDecrement={0.04} />

// Ajout dynamique de notifications
const [notifs, setNotifs] = useState(initialNotifs);
const addNotif = () => setNotifs(prev => [...prev, <NewNotif />]);

<button onClick={addNotif}>Nouvelle notif</button>
<AnimatedStack items={notifs} maxVisible={3} />`;

export default function AnimatedStackPage() {
  const baseNotifs = [
    <div key="1" style={notifStyle("#CC4A48")}>
      <span style={appLabel}>Messages</span>
      <span style={msgStyle}>Hey, tu es dispo ce soir ?</span>
    </div>,
    <div key="2" style={notifStyle("#4ADE80")}>
      <span style={appLabel}>GitHub</span>
      <span style={msgStyle}>PR approuvée — brickslab-v1 #42</span>
    </div>,
    <div key="3" style={notifStyle("var(--color-brand)")}>
      <span style={appLabel}>Slack</span>
      <span style={msgStyle}>Marie: nouveau message dans #design</span>
    </div>,
  ];

  const [dynamicNotifs, setDynamicNotifs] = useState(baseNotifs);
  const notifPool = [
    { app: "Mail", msg: "Tu as 3 nouveaux emails", color: "#F59E0B" },
    { app: "Figma", msg: "Commentaire sur le composant Card", color: "#CC4A48" },
    { app: "Linear", msg: "Issue assignée : AnimatedStack docs", color: "#4ADE80" },
    { app: "Twitter", msg: "10 nouvelles mentions", color: "var(--color-brand)" },
  ];
  let poolIdx = 0;

  const addNotif = () => {
    const n = notifPool[poolIdx % notifPool.length];
    poolIdx++;
    setDynamicNotifs((prev) => [
      ...prev,
      <div key={Date.now()} style={notifStyle(n.color)}>
        <span style={appLabel}>{n.app}</span>
        <span style={msgStyle}>{n.msg}</span>
      </div>,
    ]);
  };

  return (
    <div>
      <ComponentHeader
        name="AnimatedStack"
        description="Empile des cartes comme des notifications téléphone. Chaque nouvel item pop depuis le haut avec un léger bounce ; les cartes précédentes se décalent et réduisent pour former une pile visible."
      />

      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>Pile de notifications (statique)</SubLabel>
      <Preview>
        <div style={{ maxWidth: 340, margin: "0 auto", paddingBottom: 28 }}>
          <AnimatedStack items={baseNotifs} maxVisible={3} stackOffset={10} scaleDecrement={0.06} />
        </div>
      </Preview>

      <SubLabel>Pile serrée (stackOffset 6, scaleDecrement 0.04)</SubLabel>
      <Preview>
        <div style={{ maxWidth: 340, margin: "0 auto", paddingBottom: 20 }}>
          <AnimatedStack
            items={baseNotifs}
            maxVisible={3}
            stackOffset={6}
            scaleDecrement={0.04}
          />
        </div>
      </Preview>

      <SubLabel>Ajout dynamique — cliquer pour ajouter une notification</SubLabel>
      <Preview>
        <div style={{ maxWidth: 340, margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <button
            onClick={addNotif}
            style={{
              padding: "var(--space-2) var(--space-4)",
              backgroundColor: "var(--color-brand)",
              color: "#FBFBFB",
              border: "none",
              borderRadius: "var(--radius-sm)",
              fontSize: "var(--fontsize-sm)",
              fontWeight: "var(--fontweight-semibold)",
              cursor: "pointer",
              alignSelf: "flex-start",
            }}
          >
            + Nouvelle notification
          </button>
          <div style={{ paddingBottom: 28 }}>
            <AnimatedStack items={dynamicNotifs} maxVisible={3} />
          </div>
        </div>
      </Preview>

      <SectionTitle>Props Table</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock code={usageCode} language="tsx" />
    </div>
  );
}
