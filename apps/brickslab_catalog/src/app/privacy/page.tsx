import { Callout } from "@brickslab./ui-web";

export default function PrivacyPage() {
  return (
    <div style={{ padding: "80px 24px", maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
      <h1 style={{ fontSize: "var(--fontsize-3xl)", fontWeight: "var(--fontweight-black)", marginBottom: 8 }}>
        Privacy Policy
      </h1>
      <Callout variant="tip" title="Aucune donnée collectée">
        Ce catalogue ne collecte aucune donnée personnelle. Aucun cookie de suivi, aucune analytique tiers.
      </Callout>
      <Callout variant="info" title="Document en cours de rédaction">
        Une politique de confidentialité formelle sera publiée prochainement. Revenez ultérieurement.
      </Callout>
    </div>
  );
}
