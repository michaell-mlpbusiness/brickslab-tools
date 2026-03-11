/**
 * audit.test.js
 * Suite de tests Node.js (node:test) intégrant l'audit complet
 * Exécution : node --test tests/audit/audit.test.js
 */

const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

const { runAudit, analyzeRisks } = require("./audit-runner");
const { CSV_PATH } = require("./reporters/csv-reporter");
const { JSON_PATH } = require("./reporters/json-reporter");

// ── Exécution de l'audit (une seule fois pour tous les tests) ─────────────
let auditResults;
let auditStats;
let risks;

test.before(() => {
  const stats = runAudit({ verbose: false });
  auditResults = stats.results;
  auditStats = stats;
  risks = analyzeRisks(auditResults);
});

// ── 1. Vérification des fichiers de sortie ────────────────────────────────
test("audit output files are generated", async (t) => {
  await t.test("CSV results file exists", () => {
    assert.ok(fs.existsSync(CSV_PATH), `CSV not found at ${CSV_PATH}`);
  });

  await t.test("JSON results file exists", () => {
    assert.ok(fs.existsSync(JSON_PATH), `JSON not found at ${JSON_PATH}`);
  });

  await t.test("CSV has correct header", () => {
    const content = fs.readFileSync(CSV_PATH, "utf8");
    assert.ok(
      content.includes("component_name,timestamp,global_score,status"),
      "CSV header is malformed"
    );
  });

  await t.test("JSON is valid and non-empty", () => {
    const content = fs.readFileSync(JSON_PATH, "utf8");
    const parsed = JSON.parse(content);
    assert.ok(Array.isArray(parsed), "JSON should be an array");
    assert.ok(parsed.length > 0, "JSON should contain at least one result");
  });

  await t.test("JSON results have required fields", () => {
    const content = fs.readFileSync(JSON_PATH, "utf8");
    const parsed = JSON.parse(content);
    for (const result of parsed) {
      assert.ok(result.component, `Missing 'component' field in result`);
      assert.ok(result.timestamp, `Missing 'timestamp' in ${result.component}`);
      assert.ok(typeof result.globalScore === "number", `Invalid globalScore in ${result.component}`);
      assert.ok(result.status, `Missing 'status' in ${result.component}`);
      assert.ok(result.summary, `Missing 'summary' in ${result.component}`);
      assert.ok(Array.isArray(result.tests), `'tests' should be array in ${result.component}`);
      assert.ok(result.categories, `Missing 'categories' in ${result.component}`);
    }
  });
});

// ── 2. Couverture de l'audit ──────────────────────────────────────────────
test("audit coverage", async (t) => {
  await t.test("at least 40 components audited", () => {
    assert.ok(
      auditResults.length >= 40,
      `Only ${auditResults.length} components audited — expected at least 40`
    );
  });

  await t.test("all results have a valid status", () => {
    const validStatuses = ["passed", "partial", "failed"];
    for (const result of auditResults) {
      assert.ok(
        validStatuses.includes(result.status),
        `Invalid status '${result.status}' for ${result.component}`
      );
    }
  });

  await t.test("all results have a global score between 0 and 100", () => {
    for (const result of auditResults) {
      assert.ok(
        result.globalScore >= 0 && result.globalScore <= 100,
        `Score ${result.globalScore} out of range for ${result.component}`
      );
    }
  });

  await t.test("each result has tests for all 7 categories", () => {
    const expectedCategories = ["api", "render", "a11y", "tokens", "responsive", "security", "documentation"];
    for (const result of auditResults) {
      for (const cat of expectedCategories) {
        const catTests = result.tests.filter((t) => t.category === cat);
        assert.ok(
          catTests.length > 0,
          `${result.component} has no tests for category '${cat}'`
        );
      }
    }
  });
});

// ── 3. Seuils de qualité globaux ──────────────────────────────────────────
test("global quality thresholds", async (t) => {
  await t.test("average global score >= 60%", () => {
    assert.ok(
      auditStats.avg >= 60,
      `Average score ${auditStats.avg}% is below minimum threshold of 60%`
    );
  });

  await t.test("no critical security violations", () => {
    const criticalSecurityFails = auditResults.flatMap((r) =>
      r.tests.filter(
        (t) =>
          t.category === "security" &&
          t.status === "failed" &&
          t.severity === "critical"
      ).map((t) => `${r.component}: ${t.name}`)
    );
    assert.strictEqual(
      criticalSecurityFails.length,
      0,
      `Critical security failures:\n${criticalSecurityFails.join("\n")}`
    );
  });

  await t.test("majority of components pass API checks", () => {
    const apiPassRate = auditResults.filter((r) => {
      const apiTests = r.tests.filter((t) => t.category === "api" && t.status !== "skipped");
      const apiPassed = apiTests.filter((t) => t.status === "passed").length;
      return apiPassed / apiTests.length >= 0.7;
    }).length;
    const rate = (apiPassRate / auditResults.length) * 100;
    assert.ok(
      rate >= 70,
      `Only ${Math.round(rate)}% of components pass API checks — expected 70%`
    );
  });

  await t.test("majority of components have catalog documentation", () => {
    const docPassRate = auditResults.filter((r) => {
      const docTests = r.tests.filter(
        (t) => t.category === "documentation" && t.status !== "skipped"
      );
      if (docTests.length === 0) return true;
      const docPassed = docTests.filter((t) => t.status === "passed").length;
      return docPassed / docTests.length >= 0.5;
    }).length;
    const rate = (docPassRate / auditResults.length) * 100;
    assert.ok(
      rate >= 80,
      `Only ${Math.round(rate)}% of components have adequate documentation`
    );
  });
});

// ── 4. Checks critiques individuels ──────────────────────────────────────
test("critical individual checks", async (t) => {
  await t.test("all components are exported from index.tsx", () => {
    const notExported = auditResults.filter((r) => {
      const exportTest = r.tests.find((t) => t.name === "exported from package index");
      return exportTest && exportTest.status === "failed";
    });
    assert.strictEqual(
      notExported.length,
      0,
      `Components not exported from index: ${notExported.map((r) => r.component).join(", ")}`
    );
  });

  await t.test("no components with zero score in security", () => {
    const securityFailed = auditResults.filter((r) => {
      const score = r.categories.security;
      return score !== null && score === 0;
    });
    assert.strictEqual(
      securityFailed.length,
      0,
      `Components with 0% security score: ${securityFailed.map((r) => r.component).join(", ")}`
    );
  });

  await t.test("no eval() or dangerouslySetInnerHTML without justification", () => {
    const evalFails = auditResults.flatMap((r) =>
      r.tests
        .filter(
          (t) =>
            t.status === "failed" &&
            (t.name.includes("eval()") || t.name.includes("dangerouslySetInnerHTML"))
        )
        .map((t) => `${r.component}: ${t.name}`)
    );
    assert.strictEqual(evalFails.length, 0, `Security violations:\n${evalFails.join("\n")}`);
  });
});

// ── 5. Conformité au CDC ──────────────────────────────────────────────────
test("CDC compliance checks", async (t) => {
  await t.test("all components have .tsx file", () => {
    const missing = auditResults.filter((r) =>
      r.tests.some((t) => t.name === "component .tsx file exists" && t.status === "failed")
    );
    assert.strictEqual(missing.length, 0, `Components missing .tsx file: ${missing.map((r) => r.component).join(", ")}`);
  });

  await t.test("at least 80% of components use CSS custom properties", () => {
    const withTokens = auditResults.filter((r) =>
      r.tests.some(
        (t) => t.name === "uses CSS custom properties (var(--...))" && t.status === "passed"
      )
    );
    const rate = (withTokens.length / auditResults.length) * 100;
    assert.ok(
      rate >= 80,
      `Only ${Math.round(rate)}% of components use CSS variables — CDC requires ≈100%`
    );
  });

  await t.test("at least 80% of components have .type.ts files", () => {
    const withTypes = auditResults.filter((r) =>
      r.tests.some((t) => t.name === "has .type.ts file" && t.status === "passed")
    );
    const rate = (withTypes.length / auditResults.length) * 100;
    assert.ok(
      rate >= 80,
      `Only ${Math.round(rate)}% of components have .type.ts — CDC requires TypeScript strict`
    );
  });
});
