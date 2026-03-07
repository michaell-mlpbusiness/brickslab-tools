"use client";

import { useState, useEffect } from "react";
import { PageHero } from "@brickslab./ui-web";
import Link from "next/link";
import { componentsData } from "../../catalog/components.data";

// ── Types ──────────────────────────────────────────────────────────────────
interface AuditTest {
  name: string;
  category: string;
  status: "passed" | "failed" | "skipped";
  message?: string;
  severity?: string;
  detail?: string[];
}

interface AuditResult {
  component: string;
  slug?: string;
  timestamp: string;
  globalScore: number;
  status: "passed" | "partial" | "failed";
  summary: { total: number; passed: number; failed: number; skipped: number };
  categories: Record<string, number | null>;
  tests: AuditTest[];
}

const ADDED_AT_BY_LABEL = new Map<string, string>();
const ADDED_AT_BY_SLUG = new Map<string, string>();

for (const component of componentsData) {
  if (!component.addedAt) continue;
  ADDED_AT_BY_LABEL.set(component.label.toLowerCase(), component.addedAt);
  ADDED_AT_BY_SLUG.set(component.href.replace("/components/", "").toLowerCase(), component.addedAt);
}

function getAddedAt(result: AuditResult): string | undefined {
  return (
    ADDED_AT_BY_LABEL.get(result.component.toLowerCase()) ||
    ADDED_AT_BY_SLUG.get((result.slug || result.component.toLowerCase()).toLowerCase())
  );
}

function parseAddedAt(addedAt?: string): number | null {
  if (!addedAt) return null;
  const parsed = Date.parse(`${addedAt}T00:00:00Z`);
  return Number.isNaN(parsed) ? null : parsed;
}

function formatAddedAt(addedAt?: string): string {
  const parsed = parseAddedAt(addedAt);
  if (parsed === null) return "";
  return new Date(parsed).toLocaleDateString("fr-FR");
}

// ── Constantes ─────────────────────────────────────────────────────────────
const CATEGORY_LABELS: Record<string, string> = {
  api: "API / Librairie",
  render: "Rendu",
  a11y: "Accessibilité",
  tokens: "Tokens",
  responsive: "Responsive",
  security: "Sécurité",
  documentation: "Documentation",
  perf: "Performance FPS/CPU",
};

const CATEGORY_ORDER = ["api", "render", "a11y", "tokens", "responsive", "security", "documentation", "perf"];

const SEVERITY_COLOR: Record<string, string> = {
  critical: "var(--color-error)",
  high: "var(--color-warning)",
  medium: "var(--color-muted)",
  low: "var(--color-muted)",
  info: "var(--color-muted)",
};

function scoreColor(score: number): string {
  if (score >= 90) return "var(--color-excellent)";
  if (score >= 80) return "var(--color-info)";
  if (score >= 50) return "var(--color-warning)";
  return "var(--color-error)";
}

function scoreLabel(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Bon";
  if (score >= 50) return "Partiel";
  return "Faible";
}

function statusIcon(status: string): string {
  if (status === "passed") return "✅";
  if (status === "partial") return "⚠️";
  return "❌";
}

// ── Barre de progression catégorie ─────────────────────────────────────────
function CategoryBar({ label, score }: { label: string; score: number | null }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (score === null) return;
    const id = requestAnimationFrame(() => setWidth(score));
    return () => cancelAnimationFrame(id);
  }, [score]);

  if (score === null) return null;
  const color = scoreColor(score);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
      <span style={{ width: 110, fontSize: 12, color: "var(--color-muted)", flexShrink: 0 }}>
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: 6,
          background: "var(--c-border)",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${width}%`,
            height: "100%",
            background: color,
            borderRadius: 3,
            transition: "width 0.5s ease",
          }}
        />
      </div>
      <span style={{ width: 36, fontSize: 12, fontWeight: 600, color, textAlign: "right", flexShrink: 0 }}>
        {score}%
      </span>
    </div>
  );
}

// ── Panneau de détail d'un composant ───────────────────────────────────────
function DetailPanel({ result }: { result: AuditResult }) {
  const failedTests = result.tests.filter((t) => t.status === "failed");
  const skippedTests = result.tests.filter((t) => t.status === "skipped" && t.message);

  return (
    <div
      style={{
        padding: "20px 24px",
        background: "var(--c-surface)",
        borderTop: "1px solid var(--c-border)",
        animation: "fadeIn 0.15s ease",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        {/* Colonne gauche : barres de catégories */}
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--color-muted)",
              margin: "0 0 14px 0",
            }}
          >
            Score par catégorie
          </p>
          {CATEGORY_ORDER.map((cat) => (
            <CategoryBar
              key={cat}
              label={CATEGORY_LABELS[cat] ?? cat}
              score={result.categories[cat] ?? null}
            />
          ))}

          {/* Résumé compteurs */}
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 16,
              paddingTop: 12,
              borderTop: "1px solid var(--c-border)",
            }}
          >
            {[
              { label: "Total", value: result.summary.total, color: "var(--color-fg)" },
              { label: "Passés", value: result.summary.passed, color: "var(--color-success)" },
              { label: "Échoués", value: result.summary.failed, color: "var(--color-error)" },
              { label: "Ignorés", value: result.summary.skipped, color: "var(--color-muted)" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color }}>{value}</div>
                <div style={{ fontSize: 11, color: "var(--color-muted)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne droite : tests échoués */}
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--color-muted)",
              margin: "0 0 14px 0",
            }}
          >
            {failedTests.length === 0 ? "Aucun échec ✓" : `Tests échoués (${failedTests.length})`}
          </p>

          {failedTests.length === 0 && (
            <p style={{ fontSize: 13, color: "var(--color-success)", margin: 0 }}>
              Tous les tests exécutés sont passés.
            </p>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 280, overflowY: "auto" }}>
            {failedTests.map((t, i) => (
              <div
                key={i}
                style={{
                  padding: "10px 12px",
                  borderRadius: "var(--radius-md)",
                  border: `1px solid ${SEVERITY_COLOR[t.severity ?? "medium"]}30`,
                  background: `${SEVERITY_COLOR[t.severity ?? "medium"]}08`,
                }}
              >
                {/* Catégorie + sévérité */}
                <div style={{ display: "flex", gap: 6, marginBottom: 4, alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "var(--color-muted)",
                      background: "var(--c-border)",
                      padding: "1px 5px",
                      borderRadius: 3,
                    }}
                  >
                    {t.category}
                  </span>
                  {t.severity && t.severity !== "info" && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        color: SEVERITY_COLOR[t.severity],
                      }}
                    >
                      {t.severity}
                    </span>
                  )}
                </div>

                {/* Nom du test */}
                <p style={{ fontSize: 12, fontWeight: 600, color: "var(--color-fg)", margin: "0 0 3px 0" }}>
                  {t.name}
                </p>

                {/* Message d'erreur */}
                {t.message && (
                  <p style={{ fontSize: 11, color: "var(--color-muted)", margin: "0 0 4px 0", lineHeight: 1.5 }}>
                    {t.message}
                  </p>
                )}

                {/* Détails (lignes de code, etc.) */}
                {t.detail && t.detail.length > 0 && (
                  <div
                    style={{
                      marginTop: 4,
                      padding: "4px 8px",
                      background: "var(--c-surface-elevated)",
                      borderRadius: 3,
                      fontFamily: "monospace",
                      fontSize: 10,
                      color: "var(--color-muted)",
                    }}
                  >
                    {t.detail.slice(0, 3).map((d, di) => (
                      <div key={di}>{d}</div>
                    ))}
                    {t.detail.length > 3 && (
                      <div style={{ opacity: 0.6 }}>+{t.detail.length - 3} autres…</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tests ignorés (revue manuelle) */}
          {skippedTests.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--color-muted)",
                  margin: "0 0 8px 0",
                }}
              >
                Revue manuelle requise ({skippedTests.length})
              </p>
              {skippedTests.slice(0, 3).map((t, i) => (
                <p key={i} style={{ fontSize: 11, color: "var(--color-muted)", margin: "0 0 4px 0" }}>
                  › {t.name}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Page principale ────────────────────────────────────────────────────────
export default function TestsPage() {
  const [auditResults, setAuditResults] = useState<AuditResult[]>([]);
  const [averageScore, setAverageScore] = useState(0);
  const [lastTestDate, setLastTestDate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState<"audit" | "legacy" | "none">("none");

  const [sortBy, setSortBy] = useState<"name" | "score" | "status" | "latest">("score");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [filterStatus, setFilterStatus] = useState<"all" | "passed" | "partial" | "failed">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedComponent, setExpandedComponent] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/test-results", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();

        setDataSource(data.source ?? "none");
        setAverageScore(data.average ?? 0);
        if (data.lastTestDate) setLastTestDate(data.lastTestDate);

        if (data.auditResults && Array.isArray(data.auditResults)) {
          setAuditResults(data.auditResults);
        } else if (data.results && Array.isArray(data.results)) {
          // Fallback legacy — on adapte en AuditResult minimal
          setAuditResults(
            data.results.map((r: { label: string; percent: number }) => ({
              component: r.label,
              timestamp: new Date().toISOString(),
              globalScore: r.percent,
              status: r.percent >= 80 ? "passed" : r.percent >= 50 ? "partial" : "failed",
              summary: { total: 0, passed: 0, failed: 0, skipped: 0 },
              categories: {},
              tests: [],
            }))
          );
        }
      } catch {
        // silent fail — aucune donnée
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  // ── Filtrage + tri ────────────────────────────────────────────────────────
  const displayed = [...auditResults]
    .filter((r) => {
      const matchSearch = r.component.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = filterStatus === "all" || r.status === filterStatus;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === "latest") {
        const aDate = parseAddedAt(getAddedAt(a));
        const bDate = parseAddedAt(getAddedAt(b));

        if (aDate === null && bDate === null) return a.component.localeCompare(b.component);
        if (aDate === null) return 1;
        if (bDate === null) return -1;

        const cmp = aDate - bDate;
        return sortDir === "desc" ? -cmp : cmp;
      }

      let cmp = 0;
      if (sortBy === "name") cmp = a.component.localeCompare(b.component);
      else if (sortBy === "score") cmp = a.globalScore - b.globalScore;
      else if (sortBy === "status") {
        const order = { failed: 0, partial: 1, passed: 2 };
        cmp = order[a.status] - order[b.status];
      }
      return sortDir === "desc" ? -cmp : cmp;
    });

  const newestAddedAtTs = displayed.reduce((max, result) => {
    const ts = parseAddedAt(getAddedAt(result));
    if (ts === null) return max;
    return Math.max(max, ts);
  }, 0);

  const webCatalogCount = componentsData.filter((c) => c.type === "web").length;
  const mobileCatalogCount = componentsData.filter((c) => c.type === "mobile").length;
  const passedCount = auditResults.filter((r) => r.status === "passed").length;
  const partialCount = auditResults.filter((r) => r.status === "partial").length;
  const failedCount = auditResults.filter((r) => r.status === "failed").length;
  const hasDetail = dataSource === "audit";

  const toggleExpand = (componentName: string) => {
    setExpandedComponent((prev) => (prev === componentName ? null : componentName));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <PageHero
        eyebrow="Audit qualité"
        title="Résultats des Tests"
        subtitle="8 axes d'analyse automatisée par composant — API, rendu, a11y, tokens, responsive, sécurité, docs, performance FPS/CPU."
        stats={
          isLoading
            ? undefined
            : [
                {
                  value: `${averageScore}%`,
                  label: "Score moyen global",
                  color: scoreColor(averageScore),
                },
                {
                  value: `${auditResults.length}/${webCatalogCount}`,
                  label: "Web audités",
                },
                {
                  value: mobileCatalogCount,
                  label: "Mobile catalogués",
                  color: "var(--color-muted)",
                },
                {
                  value: passedCount,
                  label: "Passed ≥ 80%",
                  color: "var(--color-success)",
                },
                {
                  value: failedCount,
                  label: "Failed < 50%",
                  color: failedCount > 0 ? "var(--color-error)" : "var(--color-muted)",
                },
              ]
        }
      />

      <section style={{ padding: "40px 24px" }}>
        {/* ── Avertissements source ────────────────────────────────────── */}
        {dataSource === "legacy" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 14px",
              border: "1px solid var(--color-warning)",
              borderRadius: "var(--radius-md)",
              background: "rgba(245,158,11,0.06)",
              marginBottom: 20,
              fontSize: 12,
              color: "var(--color-warning)",
              fontWeight: 600,
            }}
          >
            ⚠ Source CSV hérité — relancez <code style={{ fontFamily: "monospace", background: "rgba(0,0,0,0.1)", padding: "1px 4px", borderRadius: 3 }}>pnpm audit</code> pour les données complètes
          </div>
        )}
        {dataSource === "none" && !isLoading && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 14px",
              border: "1px solid var(--color-error)",
              borderRadius: "var(--radius-md)",
              background: "rgba(239,68,68,0.06)",
              marginBottom: 20,
              fontSize: 13,
              color: "var(--color-error)",
            }}
          >
            Aucune donnée — lancez <code style={{ fontFamily: "monospace", background: "rgba(0,0,0,0.1)", padding: "1px 4px", borderRadius: 3 }}>pnpm run audit</code>
          </div>
        )}

        {/* ── Mini-stats bar — Partial count + meta ───────────────────── */}
        {!isLoading && auditResults.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              padding: "14px 20px",
              border: "1px solid var(--c-border)",
              borderRadius: "var(--radius-md)",
              background: "var(--c-surface-elevated)",
              marginBottom: 28,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
              <div
                style={{
                  flex: 1,
                  height: 6,
                  background: "var(--c-border)",
                  borderRadius: 3,
                  overflow: "hidden",
                  minWidth: 120,
                }}
              >
                <div
                  style={{
                    width: `${averageScore}%`,
                    height: "100%",
                    background: scoreColor(averageScore),
                    borderRadius: 3,
                    transition: "width 0.6s ease",
                  }}
                />
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: scoreColor(averageScore), flexShrink: 0 }}>
                {averageScore}% global
              </span>
            </div>
            <div style={{ display: "flex", gap: 16, flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: "var(--color-warning)" }}>
                ⚠ {partialCount} partiels
              </span>
              {lastTestDate && (
                <span style={{ fontSize: 12, color: "var(--color-muted)" }}>
                  Audit : {new Date(lastTestDate).toLocaleDateString("fr-FR")}
                </span>
              )}
              {mobileCatalogCount > 0 && (
                <span style={{ fontSize: 12, color: "var(--color-muted)" }}>
                  Mobile : {mobileCatalogCount} composants suivis hors audit web
                </span>
              )}
            </div>
          </div>
        )}

        {/* ── Contrôles ───────────────────────────────────────────────── */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Rechercher un composant…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Rechercher un composant"
            style={{
              flex: "1 1 200px",
              padding: "8px 12px",
              border: "1px solid var(--c-border)",
              borderRadius: "var(--radius-md)",
              background: "var(--c-surface)",
              color: "var(--color-fg)",
              fontSize: 13,
              outline: "none",
            }}
          />

          {/* Filtre statut */}
          <div style={{ display: "flex", gap: 6 }}>
            {(["all", "passed", "partial", "failed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilterStatus(f)}
                style={{
                  padding: "6px 12px",
                  fontSize: 12,
                  fontWeight: 500,
                  borderRadius: "var(--radius-md)",
                  border: filterStatus === f ? "2px solid var(--color-brand)" : "1px solid var(--c-border)",
                  background: filterStatus === f ? "var(--c-brand-subtle)" : "transparent",
                  color: filterStatus === f ? "var(--color-brand)" : "var(--color-muted)",
                  cursor: "pointer",
                }}
              >
                {f === "all" ? "Tous" : f === "passed" ? "✅ Passed" : f === "partial" ? "⚠️ Partial" : "❌ Failed"}
              </button>
            ))}
          </div>

          {/* Tri */}
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "var(--color-muted)" }}>Trier :</span>
            {(["latest", "score", "name", "status"] as const).map((s) => (
              <button
                key={s}
                onClick={() => {
                  if (sortBy === s) setSortDir((d) => (d === "desc" ? "asc" : "desc"));
                  else { setSortBy(s); setSortDir("desc"); }
                }}
                style={{
                  padding: "6px 12px",
                  fontSize: 12,
                  borderRadius: "var(--radius-md)",
                  border: sortBy === s ? "2px solid var(--color-brand)" : "1px solid var(--c-border)",
                  background: sortBy === s ? "var(--c-brand-subtle)" : "transparent",
                  color: sortBy === s ? "var(--color-brand)" : "var(--color-muted)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                {s === "latest" ? "Récents" : s === "score" ? "Score" : s === "name" ? "Nom" : "Statut"}
                {sortBy === s && (
                  <span style={{ fontSize: 10, lineHeight: 1 }}>
                    {sortDir === "desc" ? "↓" : "↑"}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Table des résultats ─────────────────────────────────────── */}
        {isLoading ? (
          <div style={{ textAlign: "center", padding: 48, color: "var(--color-muted)" }}>
            <p style={{ fontSize: 15 }}>Chargement des résultats…</p>
          </div>
        ) : auditResults.length === 0 ? (
          <div style={{ textAlign: "center", padding: 48, color: "var(--color-muted)" }}>
            <p style={{ fontSize: 16, fontWeight: 600, color: "var(--color-fg)", margin: "0 0 8px 0" }}>
              Aucun résultat d&apos;audit
            </p>
            <p style={{ fontSize: 13, margin: 0 }}>
              Lancez <code style={{ background: "var(--c-border)", padding: "2px 6px", borderRadius: 3 }}>pnpm audit</code> depuis la racine du projet.
            </p>
          </div>
        ) : (
          <div
            style={{
              border: "1px solid var(--c-border)",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
            }}
          >
            {/* En-tête */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 80px 120px 1fr 80px",
                padding: "10px 16px",
                background: "var(--c-surface)",
                borderBottom: "1px solid var(--c-border)",
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--color-muted)",
              }}
            >
              <span>Composant</span>
              <span style={{ textAlign: "center" }}>Score</span>
              <span style={{ textAlign: "center" }}>Statut</span>
              <span style={{ textAlign: "center" }}>Catégories</span>
              <span style={{ textAlign: "center" }}>Actions</span>
            </div>

            {/* Lignes */}
            {displayed.map((result, idx) => {
              const isExpanded = expandedComponent === result.component;
              const rowBg = idx % 2 === 0 ? "transparent" : "var(--c-surface)";
              const addedAt = getAddedAt(result);
              const addedAtTs = parseAddedAt(addedAt);
              const isNewest = sortBy === "latest" && addedAtTs !== null && addedAtTs === newestAddedAtTs;

              return (
                <div key={result.component} style={{ borderBottom: "1px solid var(--c-border)" }}>
                  {/* Ligne principale */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 80px 120px 1fr 80px",
                      padding: "12px 16px",
                      background: isExpanded ? "var(--c-surface-elevated)" : rowBg,
                      alignItems: "center",
                      cursor: hasDetail ? "pointer" : "default",
                      transition: "background 0.15s",
                    }}
                    onClick={() => hasDetail && toggleExpand(result.component)}
                    onMouseEnter={(e) => {
                      if (!isExpanded)
                        (e.currentTarget as HTMLElement).style.background = "var(--c-surface)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isExpanded)
                        (e.currentTarget as HTMLElement).style.background = rowBg;
                    }}
                  >
                    {/* Nom */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {hasDetail && (
                        <span
                          style={{
                            fontSize: 10,
                            color: "var(--color-muted)",
                            transition: "transform 0.2s",
                            transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                            display: "inline-block",
                          }}
                        >
                          ▶
                        </span>
                      )}
                      <span style={{ fontSize: 14, fontWeight: 500, color: "var(--color-fg)" }}>
                        {result.component}
                      </span>
                      {addedAt && (
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            padding: "2px 6px",
                            borderRadius: 4,
                            border: "1px solid var(--c-border)",
                            background: isNewest ? "var(--c-brand-subtle)" : "var(--c-surface)",
                            color: isNewest ? "var(--color-brand)" : "var(--color-muted)",
                            whiteSpace: "nowrap",
                          }}
                          title={`Ajouté le ${formatAddedAt(addedAt)}`}
                        >
                          {isNewest ? "Nouveau" : formatAddedAt(addedAt)}
                        </span>
                      )}
                    </div>

                    {/* Score */}
                    <div style={{ textAlign: "center" }}>
                      <span style={{ fontSize: 16, fontWeight: 700, color: scoreColor(result.globalScore) }}>
                        {result.globalScore}%
                      </span>
                    </div>

                    {/* Statut badge */}
                    <div style={{ textAlign: "center" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "3px 10px",
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: 600,
                          background: `${scoreColor(result.globalScore)}18`,
                          color: scoreColor(result.globalScore),
                        }}
                      >
                        {statusIcon(result.status)} {scoreLabel(result.globalScore)}
                      </span>
                    </div>

                    {/* Mini-chips catégories */}
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
                      {CATEGORY_ORDER.map((cat) => {
                        const score = result.categories[cat];
                        if (score === null || score === undefined) return null;
                        return (
                          <span
                            key={cat}
                            title={`${CATEGORY_LABELS[cat]}: ${score}%`}
                            style={{
                              fontSize: 9,
                              padding: "1px 4px",
                              borderRadius: 3,
                              background: `${scoreColor(score)}20`,
                              color: scoreColor(score),
                              fontWeight: 700,
                            }}
                          >
                            {cat.slice(0, 3).toUpperCase()} {score}%
                          </span>
                        );
                      })}
                    </div>

                    {/* Actions */}
                    <div
                      style={{ textAlign: "center", display: "flex", gap: 8, justifyContent: "center" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {hasDetail && (
                        <button
                          onClick={() => toggleExpand(result.component)}
                          style={{
                            fontSize: 11,
                            color: isExpanded ? "var(--color-brand)" : "var(--color-muted)",
                            background: "transparent",
                            border: "1px solid var(--c-border)",
                            borderRadius: "var(--radius-md)",
                            padding: "3px 8px",
                            cursor: "pointer",
                            fontWeight: 500,
                          }}
                          title={isExpanded ? "Réduire" : "Voir les détails des tests"}
                        >
                          {isExpanded ? "Réduire" : "Détails"}
                        </button>
                      )}
                      <Link
                        href={`/components/${result.slug || result.component.toLowerCase()}`}
                        style={{ textDecoration: "none" }}
                        title="Aller à la page catalogue"
                      >
                        <span
                          style={{
                            fontSize: 11,
                            color: "var(--color-brand)",
                            border: "1px solid var(--c-border)",
                            borderRadius: "var(--radius-md)",
                            padding: "3px 8px",
                            fontWeight: 500,
                          }}
                        >
                          Voir
                        </span>
                      </Link>
                    </div>
                  </div>

                  {/* Panneau de détail expandable */}
                  {isExpanded && hasDetail && <DetailPanel result={result} />}
                </div>
              );
            })}

            {displayed.length === 0 && (
              <div style={{ padding: 32, textAlign: "center", color: "var(--color-muted)", fontSize: 14 }}>
                Aucun composant ne correspond aux filtres.
              </div>
            )}
          </div>
        )}

        {/* ── Légende ────────────────────────────────────────────────── */}
        {hasDetail && (
          <p style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 16 }}>
            Cliquer sur une ligne ou sur &quot;Détails&quot; pour afficher les 8 axes d&apos;audit et les tests échoués.
            {" "}Scores : <span style={{ color: "var(--color-excellent)" }}>≥90% Excellent</span>{" "}
            · <span style={{ color: "var(--color-info)" }}>≥80% Bon</span>{" "}
            · <span style={{ color: "var(--color-warning)" }}>≥50% Partiel</span>{" "}
            · <span style={{ color: "var(--color-error)" }}>&lt;50% Faible</span>
          </p>
        )}
      </section>
    </div>
  );
}
