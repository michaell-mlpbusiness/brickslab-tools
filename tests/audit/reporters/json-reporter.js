/**
 * json-reporter.js
 * Génère le JSON détaillé exploitable par le dashboard Brickslab
 * Format : tableau de résultats complets par composant
 */

const fs = require("fs");
const path = require("path");

const LOGS_DIR = path.join(process.cwd(), "logs");
const JSON_PATH = path.join(LOGS_DIR, "audit-results.json");

// Note : le JSON est TOUJOURS écrasé à chaque run (voir audit-runner.js qui le supprime avant).
// C'est intentionnel : on ne garde que le dernier audit en JSON.
// L'historique est dans audit-results.csv (append-only).

function ensureLogsDir() {
  if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
  }
}

function writeJsonReport(results) {
  ensureLogsDir();
  const output = JSON.stringify(results, null, 2);
  fs.writeFileSync(JSON_PATH, output);
  return JSON_PATH;
}

/**
 * Construit le résultat complet d'un composant depuis les tests bruts.
 * @param {string} componentName
 * @param {Array} allTests - tous les tests toutes catégories confondues
 * @returns {object} - résultat structuré pour le dashboard
 */
function buildComponentResult(componentName, slug, allTests) {
  const timestamp = new Date().toISOString();

  // ── Comptages ─────────────────────────────────────────────────────────────
  const total = allTests.length;
  const passed = allTests.filter((t) => t.status === "passed").length;
  const failed = allTests.filter((t) => t.status === "failed").length;
  const skipped = allTests.filter((t) => t.status === "skipped").length;

  // ── Scores par catégorie ───────────────────────────────────────────────────
  // Catégories définies avec leur poids respectif (CDC Brickslab)
  const CATEGORY_WEIGHTS = {
    api: 0.20,
    render: 0.15,
    a11y: 0.15,
    tokens: 0.15,
    responsive: 0.10,
    security: 0.10,
    documentation: 0.10,
    perf: 0.05,
  };

  const categoryScores = {};
  for (const [cat, weight] of Object.entries(CATEGORY_WEIGHTS)) {
    const catTests = allTests.filter((t) => t.category === cat);
    const catExecutable = catTests.filter((t) => t.status !== "skipped");
    if (catExecutable.length === 0) {
      categoryScores[cat] = null; // Pas de tests exécutés dans cette catégorie
    } else {
      const catPassed = catExecutable.filter((t) => t.status === "passed").length;
      categoryScores[cat] = Math.round((catPassed / catExecutable.length) * 100);
    }
  }

  // ── Score global pondéré ──────────────────────────────────────────────────
  let weightedSum = 0;
  let totalWeight = 0;
  for (const [cat, weight] of Object.entries(CATEGORY_WEIGHTS)) {
    if (categoryScores[cat] !== null) {
      weightedSum += categoryScores[cat] * weight;
      totalWeight += weight;
    }
  }
  const globalScore = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;

  // ── Statut global ─────────────────────────────────────────────────────────
  let status;
  if (globalScore >= 80) status = "passed";
  else if (globalScore >= 50) status = "partial";
  else status = "failed";

  // ── Tests détaillés pour le dashboard ─────────────────────────────────────
  const tests = allTests.map((t) => {
    const entry = {
      name: t.name,
      category: t.category,
      status: t.status,
    };
    if (t.message) entry.message = t.message;
    if (t.severity) entry.severity = t.severity;
    if (t.detail && t.detail.length > 0) entry.detail = t.detail;
    return entry;
  });

  return {
    component: componentName,
    slug: slug || componentName.toLowerCase(),
    timestamp,
    globalScore,
    status,
    summary: { total, passed, failed, skipped },
    categories: categoryScores,
    tests,
  };
}

module.exports = { writeJsonReport, buildComponentResult, JSON_PATH };
