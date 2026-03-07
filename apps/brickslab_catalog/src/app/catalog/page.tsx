"use client";

import { useEffect, useMemo, useState } from "react";
import { componentsData, isNewComponent } from "../../catalog/components.data";
import { ComponentCard, PageHero, SearchBar, SectionHeader } from "@brickslab./ui-web";

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSection, setSelectedSection] = useState<string>("all");
  const [selectedPlatform, setSelectedPlatform] = useState<"all" | "web" | "mobile">("all");

  const baseComponents = useMemo(() => {
    if (selectedPlatform === "all") return componentsData;
    return componentsData.filter((c) => c.type === selectedPlatform);
  }, [selectedPlatform]);

  // Unique sections in order of appearance
  const sections = useMemo(() => {
    const seen = new Set<string>();
    const result: string[] = [];
    for (const c of baseComponents) {
      if (!seen.has(c.section)) {
        seen.add(c.section);
        result.push(c.section);
      }
    }
    return result;
  }, [baseComponents]);

  useEffect(() => {
    if (selectedSection === "all") return;
    if (!sections.includes(selectedSection)) setSelectedSection("all");
  }, [selectedSection, sections]);

  const isSearching = searchQuery.trim().length > 0;

  const filteredComponents = useMemo(() => {
    if (!isSearching && selectedSection === "all") return baseComponents;
    return baseComponents.filter((c) => {
      const matchSearch =
        !isSearching ||
        c.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSection = selectedSection === "all" || c.section === selectedSection;
      return matchSearch && matchSection;
    });
  }, [searchQuery, selectedSection, isSearching, baseComponents]);

  // Grouped by section (used when not searching, section = all)
  const grouped = useMemo(() => {
    if (isSearching || selectedSection !== "all") return null;
    const map = new Map<string, typeof baseComponents>();
    for (const c of baseComponents) {
      const arr = map.get(c.section) ?? [];
      arr.push(c);
      map.set(c.section, arr);
    }
    return map;
  }, [isSearching, selectedSection, baseComponents]);

  const countBySection = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of baseComponents) {
      map.set(c.section, (map.get(c.section) ?? 0) + 1);
    }
    return map;
  }, [baseComponents]);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <style>{`
        .catalog-platform-tab {
          padding: 5px 12px;
          font-size: 12px;
          font-weight: 600;
          border-radius: 18px;
          border: 1px solid var(--c-border);
          background: var(--c-surface);
          color: var(--color-muted);
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .catalog-platform-tab:hover {
          border-color: var(--c-brand-border);
          background: var(--c-brand-subtle);
          color: var(--color-fg);
        }
        .catalog-platform-tab.active {
          border-color: var(--color-brand);
          background: var(--c-brand-subtle);
          color: var(--color-brand);
        }
        .catalog-section-tab {
          padding: 5px 14px;
          font-size: 12px;
          font-weight: 500;
          border-radius: 20px;
          border: 1px solid var(--c-border);
          background: transparent;
          color: var(--color-muted);
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s;
          flex-shrink: 0;
        }
        .catalog-section-tab:hover {
          border-color: var(--c-brand-border);
          color: var(--color-fg);
          background: var(--c-brand-subtle);
        }
        .catalog-section-tab.active {
          border-color: var(--color-brand);
          background: var(--c-brand-subtle);
          color: var(--color-brand);
          font-weight: 600;
        }
      `}</style>

      <PageHero
        eyebrow="Catalogue Complet"
        title={`${baseComponents.length} composants`}
        subtitle="Composants documentés avec distinction explicite web/mobile et navigation dédiée par plateforme."
        stats={[
          { value: componentsData.filter((c) => c.type === "web").length, label: "Web" },
          { value: componentsData.filter((c) => c.type === "mobile").length, label: "Mobile" },
          { value: sections.length, label: "Catégories" },
        ]}
      />

      {/* ── Toolbar ──────────────────────────────────────────────────── */}
      <div
        style={{
          padding: "20px clamp(24px, 4vw, 56px)",
          borderBottom: "1px solid var(--c-border)",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          position: "sticky",
          top: 60,
          backgroundColor: "var(--c-surface)",
          zIndex: 20,
        }}
      >
        {/* Search */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery("")}
          placeholder="Rechercher un composant…"
          variant="glass"
        />

        {/* Platform tabs */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2 }}>
          <button
            className={`catalog-platform-tab${selectedPlatform === "all" ? " active" : ""}`}
            onClick={() => setSelectedPlatform("all")}
          >
            Tous · {componentsData.length}
          </button>
          <button
            className={`catalog-platform-tab${selectedPlatform === "web" ? " active" : ""}`}
            onClick={() => setSelectedPlatform("web")}
          >
            Web · {componentsData.filter((c) => c.type === "web").length}
          </button>
          <button
            className={`catalog-platform-tab${selectedPlatform === "mobile" ? " active" : ""}`}
            onClick={() => setSelectedPlatform("mobile")}
          >
            Mobile · {componentsData.filter((c) => c.type === "mobile").length}
          </button>
        </div>

        {/* Section tabs (hidden while searching) */}
        {!isSearching && (
          <div
            style={{
              display: "flex",
              gap: 6,
              overflowX: "auto",
              paddingBottom: 2,
              scrollbarWidth: "none",
            }}
          >
            <button
              className={`catalog-section-tab${selectedSection === "all" ? " active" : ""}`}
              onClick={() => setSelectedSection("all")}
            >
              Tous · {baseComponents.length}
            </button>
            {sections.map((sec) => (
              <button
                key={sec}
                className={`catalog-section-tab${selectedSection === sec ? " active" : ""}`}
                onClick={() => setSelectedSection(sec)}
              >
                {sec} · {countBySection.get(sec)}
              </button>
            ))}
          </div>
        )}

        {/* Search result count */}
        {isSearching && (
          <p style={{ fontSize: 13, color: "var(--color-muted)", margin: 0 }}>
            {filteredComponents.length} résultat{filteredComponents.length !== 1 ? "s" : ""} pour{" "}
            <strong style={{ color: "var(--color-fg)" }}>&ldquo;{searchQuery}&rdquo;</strong>
          </p>
        )}
      </div>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div style={{ padding: "32px clamp(24px, 4vw, 56px) 64px" }}>

        {/* Flat results — search or specific section */}
        {(isSearching || selectedSection !== "all") && (
          filteredComponents.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 16,
              }}
            >
              {filteredComponents.map((c) => (
                <ComponentCard
                  key={c.href}
                  label={c.label}
                  section={c.section}
                  description={c.description}
                  href={c.href}
                  type={c.type}
                  isNew={isNewComponent(c)}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "64px 24px", color: "var(--color-muted)" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 6px 0", color: "var(--color-fg)" }}>
                Aucun composant trouvé
              </h3>
              <p style={{ fontSize: 14, margin: 0 }}>
                Essayez un autre terme de recherche
              </p>
            </div>
          )
        )}

        {/* Grouped view — default */}
        {grouped && (
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {Array.from(grouped.entries()).map(([section, items]) => (
              <div key={section}>
                <SectionHeader variant="compact" title={section} count={items.length} />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: 12,
                  }}
                >
                  {items.map((c) => (
                    <ComponentCard
                      key={c.href}
                      label={c.label}
                      section={c.section}
                      description={c.description}
                      href={c.href}
                      type={c.type}
                      isNew={isNewComponent(c)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
