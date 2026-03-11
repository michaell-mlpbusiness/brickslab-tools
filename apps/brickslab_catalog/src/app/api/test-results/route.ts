import { readFileSync, existsSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// ── Chemins robustes (local + Vercel + monorepo) ──────────────────────────
function buildCandidates(fileName: string): string[] {
  const roots = [
    join(process.cwd(), "public", "data"),
    join(process.cwd(), "apps", "brickslab_catalog", "public", "data"),
    join(process.cwd(), "../../apps/brickslab_catalog/public/data"),
    join(process.cwd(), ".next", "standalone", "apps", "brickslab_catalog", "public", "data"),
    join(process.cwd(), "logs"),
    join(process.cwd(), "../logs"),
    join(process.cwd(), "../../logs"),
  ];

  return [...new Set(roots.map((root) => join(root, fileName)))];
}

const AUDIT_JSON_CANDIDATES = buildCandidates("audit-results.json");
const AUDIT_CSV_CANDIDATES = buildCandidates("audit-results.csv");
const LEGACY_CSV_CANDIDATES = buildCandidates("components-test-log.csv");

function resolveExistingPath(candidates: string[]): string | null {
  for (const filePath of candidates) {
    if (existsSync(filePath)) return filePath;
  }
  return null;
}

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  "CDN-Cache-Control": "no-store",
  "Vercel-CDN-Cache-Control": "no-store",
};

function jsonNoStore(body: unknown, init: ResponseInit = {}) {
  return Response.json(body, {
    ...init,
    headers: {
      ...NO_STORE_HEADERS,
      ...((init.headers as Record<string, string> | undefined) ?? {}),
    },
  });
}

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
  timestamp: string;
  globalScore: number;
  status: "passed" | "partial" | "failed";
  summary: { total: number; passed: number; failed: number; skipped: number };
  categories: Record<string, number | null>;
  tests: AuditTest[];
}

// ── Lecture du JSON d'audit (source riche) ─────────────────────────────────
function readAuditJson(): AuditResult[] | null {
  const jsonPath = resolveExistingPath(AUDIT_JSON_CANDIDATES);
  if (!jsonPath) return null;
  try {
    return JSON.parse(readFileSync(jsonPath, "utf-8")) as AuditResult[];
  } catch {
    return null;
  }
}

// ── Lecture du CSV d'audit (synthèse historique) ───────────────────────────
function readAuditCsv(): Array<{ component: string; timestamp: string; globalScore: number; status: string }> {
  const csvPath = resolveExistingPath(AUDIT_CSV_CANDIDATES);
  if (!csvPath) return [];
  try {
    const lines = readFileSync(csvPath, "utf-8").trim().split("\n").slice(1);
    return lines
      .filter(Boolean)
      .map((line) => {
        const [component, timestamp, globalScore, status] = line.split(",");
        return {
          component: component?.trim() ?? "",
          timestamp: timestamp?.trim() ?? "",
          globalScore: parseInt(globalScore ?? "0", 10),
          status: status?.trim() ?? "unknown",
        };
      })
      .filter((e) => e.component);
  } catch {
    return [];
  }
}

// ── Fallback : ancien CSV (components-test-log.csv) ───────────────────────
function readLegacyCsv(): Array<{ component: string; percentage: number; date: string }> {
  const legacyPath = resolveExistingPath(LEGACY_CSV_CANDIDATES);
  if (!legacyPath) return [];
  try {
    const lines = readFileSync(legacyPath, "utf-8").trim().split("\n").slice(1);
    return lines
      .filter(Boolean)
      .map((line) => {
        const [component, date, percentage] = line.split(",");
        return {
          component: component?.trim() ?? "",
          date: date?.trim() ?? "",
          percentage: parseInt(percentage ?? "0", 10),
        };
      })
      .filter((e) => e.component && !isNaN(e.percentage));
  } catch {
    return [];
  }
}

// ── GET handler ─────────────────────────────────────────────────────────────
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const componentParam = url.searchParams.get("component");

    const auditResults = readAuditJson();

    // ── Source riche : audit-results.json présent ───────────────────────────
    if (auditResults && auditResults.length > 0) {
      // Détail d'un composant spécifique
      if (componentParam) {
        const match = auditResults.find(
          (r) => r.component.toLowerCase() === componentParam.toLowerCase()
        );
        if (!match) {
          return jsonNoStore({ error: `Component '${componentParam}' not found` }, { status: 404 });
        }
        return jsonNoStore({ source: "audit", result: match });
      }

      // Liste complète avec résumé
      const average =
        auditResults.length > 0
          ? Math.round(auditResults.reduce((s, r) => s + r.globalScore, 0) / auditResults.length)
          : 0;

      const lastTestDate =
        auditResults.length > 0
          ? auditResults.reduce((latest, r) =>
              r.timestamp > latest ? r.timestamp : latest, "")
          : null;

      // Backward-compat pour la page home (results:[{label,percent}])
      const results = auditResults.map((r) => ({ label: r.component, percent: r.globalScore }));

      // Historique depuis le CSV d'audit
      const history = readAuditCsv();

      return jsonNoStore({
        source: "audit",
        average,
        lastTestDate,
        results,           // backward-compat home page
        auditResults,      // données riches pour la page /tests
        history,           // historique CSV pour graphe futur
        summary: {
          total: auditResults.length,
          passed: auditResults.filter((r) => r.status === "passed").length,
          partial: auditResults.filter((r) => r.status === "partial").length,
          failed: auditResults.filter((r) => r.status === "failed").length,
        },
      });
    }

    // ── Fallback : ancien composants-test-log.csv ───────────────────────────
    const legacyEntries = readLegacyCsv();
    if (legacyEntries.length > 0) {
      // Déduplique : garder le dernier run par composant
      const seen = new Set<string>();
      const deduped: typeof legacyEntries = [];
      for (let i = legacyEntries.length - 1; i >= 0; i--) {
        if (!seen.has(legacyEntries[i].component)) {
          seen.add(legacyEntries[i].component);
          deduped.unshift(legacyEntries[i]);
        }
      }

      const average =
        deduped.length > 0
          ? Math.round(deduped.reduce((s, r) => s + r.percentage, 0) / deduped.length)
          : 0;

      const lastTestDate = legacyEntries.at(-1)?.date ?? null;

      return jsonNoStore({
        source: "legacy",
        average,
        lastTestDate,
        results: deduped.map((r) => ({ label: r.component, percent: r.percentage })),
        entries: legacyEntries,
        auditResults: null,
      });
    }

    // ── Aucune donnée ───────────────────────────────────────────────────────
    return jsonNoStore({
      source: "none",
      average: 0,
      lastTestDate: null,
      results: [],
      auditResults: null,
      error: "No test results found. Run `pnpm audit` to generate results.",
    });
  } catch (error) {
    console.error("API /test-results error:", error);
    return jsonNoStore(
      { error: "Failed to read test results", results: [], average: 0 },
      { status: 500 }
    );
  }
}
