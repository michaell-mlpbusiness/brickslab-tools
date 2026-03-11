/**
 * audit-runner.js
 * Orchestrateur principal de l'audit Brickslab
 * Exécute les 7 axes de contrôle sur tous les composants de ui-web
 */

const fs = require("fs");
const path = require("path");

const { checkApi } = require("./checks/check-api");
const { checkTokens } = require("./checks/check-tokens");
const { checkA11y } = require("./checks/check-a11y");
const { checkSecurity } = require("./checks/check-security");
const { checkRender } = require("./checks/check-render");
const { checkResponsive } = require("./checks/check-responsive");
const { checkDocs } = require("./checks/check-docs");
const { checkPerf } = require("./checks/check-perf");
const { writeCsvReport, CSV_PATH } = require("./reporters/csv-reporter");
const { writeJsonReport, buildComponentResult, JSON_PATH } = require("./reporters/json-reporter");

// ── Chemins ────────────────────────────────────────────────────────────────
const ROOT = process.cwd();
const UI_WEB_COMPONENTS = path.join(ROOT, "packages", "ui-web", "src", "components");
const INDEX_PATH = path.join(ROOT, "packages", "ui-web", "src", "index.tsx");
const CSV_SOURCE = path.join(ROOT, "components_docs", "components.csv");

// ── Composants exclus de l'audit (démo/interne) ───────────────────────────
const EXCLUDED_FILES = ["HelloBrickslab.tsx"];

// ── Chargement du CSV ──────────────────────────────────────────────────────
function loadCsv() {
  if (!fs.existsSync(CSV_SOURCE)) return [];
  const raw = fs.readFileSync(CSV_SOURCE, "utf8").trim();
  const lines = raw.split("\n");
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const cols = line.split(",");
    const obj = {};
    headers.forEach((h, i) => (obj[h.trim()] = (cols[i] || "").trim()));
    return obj;
  });
}

// ── Découverte des composants ──────────────────────────────────────────────
function discoverComponents() {
  const components = [];

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (
        entry.isFile() &&
        entry.name.endsWith(".tsx") &&
        !entry.name.endsWith(".type.tsx") &&
        !EXCLUDED_FILES.includes(entry.name)
      ) {
        const componentName = path.basename(entry.name, ".tsx");
        // Ignore les fichiers de type (*.type.ts)
        if (!componentName.includes(".type")) {
          components.push({
            name: componentName,
            filePath: fullPath,
            slug: componentName.toLowerCase(),
          });
        }
      }
    }
  }

  walk(UI_WEB_COMPONENTS);
  return components.sort((a, b) => a.name.localeCompare(b.name));
}

// ── Slug depuis le CSV (href = /components/slug) ──────────────────────────
function getSlugFromCsv(componentName, csvComponents) {
  const match = csvComponents.find(
    (c) =>
      (c.label || "").toLowerCase().replace(/\s/g, "") === componentName.toLowerCase() ||
      (c.href || "").replace("/components/", "") === componentName.toLowerCase()
  );
  return match ? (match.href || "").replace("/components/", "") : componentName.toLowerCase();
}

// ── Audit d'un seul composant ──────────────────────────────────────────────
function auditComponent(component, indexContent, csvComponents) {
  const { name, filePath } = component;
  const slug = getSlugFromCsv(name, csvComponents);

  const allTests = [
    ...checkApi(name, filePath, indexContent, csvComponents),
    ...checkRender(name, filePath),
    ...checkA11y(name, filePath),
    ...checkTokens(name, filePath),
    ...checkResponsive(name, filePath),
    ...checkSecurity(name, filePath),
    ...checkDocs(name, slug),
    ...checkPerf(name, filePath),
  ];

  return buildComponentResult(name, slug, allTests);
}

// ── Runner principal ───────────────────────────────────────────────────────
function runAudit(options = {}) {
  const { verbose = false, componentFilter = null } = options;

  console.log("\n🔬 Brickslab Component Audit — Starting\n");
  console.log(`   Components: ${UI_WEB_COMPONENTS}`);
  console.log(`   Index:      ${INDEX_PATH}`);
  console.log(`   CSV:        ${CSV_SOURCE}`);

  // ── Nettoyage du JSON précédent (mais pas du CSV historique) ──────────────
  if (fs.existsSync(JSON_PATH)) {
    fs.unlinkSync(JSON_PATH);
    console.log(`   🗑  Cleared old audit-results.json\n`);
  } else {
    console.log();
  }

  const indexContent = fs.existsSync(INDEX_PATH)
    ? fs.readFileSync(INDEX_PATH, "utf8")
    : "";

  const csvComponents = loadCsv();
  let components = discoverComponents();

  if (componentFilter) {
    components = components.filter((c) =>
      c.name.toLowerCase().includes(componentFilter.toLowerCase())
    );
  }

  console.log(`   Found ${components.length} component(s) to audit\n`);
  console.log("─".repeat(80));

  const results = [];
  let passedCount = 0;
  let partialCount = 0;
  let failedCount = 0;

  for (const component of components) {
    const result = auditComponent(component, indexContent, csvComponents);
    results.push(result);

    // ── Log console par composant ────────────────────────────────────────
    const icon =
      result.status === "passed" ? "✅" :
      result.status === "partial" ? "⚠️ " : "❌";

    const catStr = Object.entries(result.categories)
      .filter(([, v]) => v !== null)
      .map(([k, v]) => `${k.slice(0, 4)}:${v}%`)
      .join(" ");

    console.log(
      `${icon} ${result.component.padEnd(32)} ${String(result.globalScore).padStart(3)}%  [${catStr}]`
    );

    if (verbose) {
      const failedTests = result.tests.filter((t) => t.status === "failed");
      for (const t of failedTests) {
        console.log(`     ✗ [${t.category}] ${t.name}`);
        if (t.message) console.log(`       → ${t.message}`);
      }
    }

    if (result.status === "passed") passedCount++;
    else if (result.status === "partial") partialCount++;
    else failedCount++;
  }

  // ── Résumé global ─────────────────────────────────────────────────────
  const avg = results.length > 0
    ? Math.round(results.reduce((s, r) => s + r.globalScore, 0) / results.length)
    : 0;

  console.log("\n" + "─".repeat(80));
  console.log(`\n📊 Audit Summary`);
  console.log(`   Components audited : ${results.length}`);
  console.log(`   ✅ Passed (≥80%)   : ${passedCount}`);
  console.log(`   ⚠️  Partial (50-79%): ${partialCount}`);
  console.log(`   ❌ Failed (<50%)   : ${failedCount}`);
  console.log(`   📈 Average score   : ${avg}%`);

  // ── Écriture des fichiers de résultats ────────────────────────────────
  const csvPath = writeCsvReport(results);
  const jsonPath = writeJsonReport(results);
  console.log(`\n   📄 CSV  → ${csvPath}`);
  console.log(`   📋 JSON → ${jsonPath}\n`);

  return { results, avg, passedCount, partialCount, failedCount };
}

// ── Analyse des risques ────────────────────────────────────────────────────
function analyzeRisks(results) {
  const risks = {
    critical: [],
    high: [],
    medium: [],
  };

  for (const result of results) {
    const criticalFails = result.tests.filter(
      (t) => t.status === "failed" && t.severity === "critical"
    );
    const highFails = result.tests.filter(
      (t) => t.status === "failed" && t.severity === "high"
    );
    const mediumFails = result.tests.filter(
      (t) => t.status === "failed" && t.severity === "medium"
    );

    if (criticalFails.length > 0) {
      risks.critical.push({
        component: result.component,
        issues: criticalFails.map((t) => t.name),
      });
    }
    if (highFails.length > 0) {
      risks.high.push({
        component: result.component,
        issues: highFails.map((t) => t.name),
      });
    }
    if (mediumFails.length > 0) {
      risks.medium.push({
        component: result.component,
        issues: mediumFails.map((t) => t.name),
      });
    }
  }

  return risks;
}

// ── CLI direct ────────────────────────────────────────────────────────────
if (require.main === module) {
  const verbose = process.argv.includes("--verbose") || process.argv.includes("-v");
  const filterArg = process.argv.find((a) => a.startsWith("--component="));
  const filter = filterArg ? filterArg.replace("--component=", "") : null;

  const { results, avg, passedCount, partialCount, failedCount } = runAudit({
    verbose,
    componentFilter: filter,
  });

  const risks = analyzeRisks(results);

  if (risks.critical.length > 0) {
    console.log("\n🚨 P0 — Critical Issues:");
    risks.critical.forEach((r) => {
      console.log(`   ${r.component}: ${r.issues.join(", ")}`);
    });
  }

  if (risks.high.length > 0) {
    console.log("\n⚠️  P1 — High Priority Issues:");
    risks.high.slice(0, 10).forEach((r) => {
      console.log(`   ${r.component}: ${r.issues.join(", ")}`);
    });
  }

  process.exit(failedCount > 0 ? 1 : 0);
}

module.exports = { runAudit, discoverComponents, loadCsv, analyzeRisks };
