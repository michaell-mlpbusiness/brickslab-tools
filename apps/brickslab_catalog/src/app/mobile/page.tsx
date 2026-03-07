import React from "react";
import { ComponentCard, PageHero, SectionHeader } from "@brickslab./ui-web";
import { componentsData, isNewComponent } from "../../catalog/components.data";

export default function MobileCatalogPage() {
  const mobileComponents = componentsData.filter((c) => c.type === "mobile");

  const grouped = mobileComponents.reduce<Record<string, typeof mobileComponents>>((acc, component) => {
    const key = component.section || "Mobile";
    if (!acc[key]) acc[key] = [];
    acc[key].push(component);
    return acc;
  }, {});

  const sectionEntries = Object.entries(grouped);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <PageHero
        eyebrow="UI Mobile"
        title={`${mobileComponents.length} composants mobile`}
        subtitle="Catalogue dédié ui-mobile. Présentation séparée des composants web pour un usage React Native."
        stats={[
          { value: mobileComponents.length, label: "Composants mobile" },
          { value: sectionEntries.length, label: "Sections mobile" },
          { value: "RN", label: "Cible principale" },
        ]}
      />

      <div style={{ padding: "32px clamp(24px, 4vw, 56px) 64px" }}>
        {sectionEntries.map(([section, items]) => (
          <div key={section} style={{ marginBottom: 42 }}>
            <SectionHeader variant="compact" title={section} count={items.length} />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 12,
              }}
            >
              {items.map((component) => (
                <ComponentCard
                  key={component.href}
                  label={component.label}
                  section={component.section}
                  description={component.description}
                  href={component.href}
                  type={component.type}
                  isNew={isNewComponent(component)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
