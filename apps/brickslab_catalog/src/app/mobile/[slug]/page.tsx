import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, PageHero, SectionHeader } from "@brickslab./ui-web";
import { componentsData } from "../../../catalog/components.data";

type MobileDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function MobileDetailPage({ params }: MobileDetailPageProps) {
  const { slug } = await params;
  const href = `/mobile/${slug}`;

  const component = componentsData.find((entry) => entry.type === "mobile" && entry.href === href);
  if (!component) notFound();

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <PageHero
        eyebrow="UI Mobile"
        title={component.label}
        subtitle={component.description}
        stats={[
          { value: "mobile", label: "Type" },
          { value: component.section, label: "Section" },
          { value: "@brickslab./ui-mobile", label: "Package" },
        ]}
      />

      <section style={{ padding: "36px clamp(24px, 4vw, 56px) 64px" }}>
        <div
          style={{
            border: "1px solid var(--c-border)",
            borderRadius: "var(--radius-lg)",
            background: "var(--c-surface)",
            padding: "24px",
            maxWidth: 980,
          }}
        >
          <SectionHeader
            variant="compact"
            eyebrow="Présentation mobile"
            title={component.label}
            subtitle="Cette page distingue explicitement les composants ui-mobile des composants web du design system."
          />

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            <Badge variant="default" size="sm">Plateforme: mobile</Badge>
            <Badge variant="success" size="sm">Package: @brickslab./ui-mobile</Badge>
          </div>

          <div
            style={{
              border: "1px solid var(--c-border)",
              borderRadius: "var(--radius-md)",
              background: "var(--c-surface-elevated)",
              padding: "14px 16px",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              fontSize: 13,
              color: "var(--color-fg)",
              marginBottom: 16,
            }}
          >
            import {"{"} {component.label.replace("Mobile", "")} {"}"} from "@brickslab./ui-mobile";
          </div>

          <p style={{ margin: 0, fontSize: 14, color: "var(--color-muted)", lineHeight: 1.65 }}>
            Source ui-mobile disponible dans <code>packages/ui-mobile/src</code>. Cette vue sert de point d&apos;entrée
            documentation pour séparer clairement web et mobile dans le catalogue et dans les workflows de test.
          </p>

          <div style={{ marginTop: 20 }}>
            <Link
              href="/mobile"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "9px 14px",
                borderRadius: 10,
                border: "1px solid var(--c-border)",
                background: "var(--c-surface-elevated)",
                color: "var(--color-fg)",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Retour au catalogue mobile
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
