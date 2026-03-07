import { Callout } from "@brickslab./ui-web";

export default function TermsPage() {
  return (
    <div style={{ padding: "80px 24px", maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
      <h1 style={{ fontSize: "var(--fontsize-3xl)", fontWeight: "var(--fontweight-black)", marginBottom: 8 }}>
        Terms of Service
      </h1>
      <Callout variant="info" title="Site de démonstration">
        Ce site est le catalogue de démonstration du design system Brickslab. Aucune condition d'utilisation formelle n'est applicable.
      </Callout>
      <Callout variant="warning" title="Conditions à venir">
        Des conditions d'utilisation officielles seront publiées prochainement. Revenez ultérieurement.
      </Callout>
    </div>
  );
}
