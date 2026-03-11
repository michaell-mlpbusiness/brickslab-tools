/**
 * check-docs.js
 * Axe G — Documentation / Catalogue (poids 10%)
 * Checks : page catalogue, PropsTable, CodeBlock, preview
 */

const fs = require("fs");
const path = require("path");

const CATALOG_BASE = path.join(
  process.cwd(),
  "apps",
  "brickslab_catalog",
  "src",
  "app",
  "components"
);

function checkDocs(componentName, componentSlug) {
  const tests = [];

  const pagePath = path.join(CATALOG_BASE, componentSlug, "page.tsx");
  const pageExists = fs.existsSync(pagePath);

  // ── 1. Page catalogue existe ──────────────────────────────────────────────
  tests.push({
    name: "catalog page exists",
    category: "documentation",
    status: pageExists ? "passed" : "failed",
    message: pageExists
      ? null
      : `Missing catalog page at apps/brickslab_catalog/src/app/components/${componentSlug}/page.tsx`,
    severity: "high",
  });

  if (!pageExists) {
    // Les 4 tests suivants sont bloqués
    for (const name of ["catalog page has PropsTable", "catalog page has CodeBlock", "catalog page has ComponentHeader", "catalog page has preview/demo"]) {
      tests.push({
        name,
        category: "documentation",
        status: "skipped",
        message: "Skipped: catalog page does not exist",
        severity: "high",
      });
    }
    return tests;
  }

  const pageContent = fs.readFileSync(pagePath, "utf8");

  // ── 2. PropsTable ─────────────────────────────────────────────────────────
  const hasPropsTable = /PropsTable/.test(pageContent);
  tests.push({
    name: "catalog page has PropsTable",
    category: "documentation",
    status: hasPropsTable ? "passed" : "failed",
    message: hasPropsTable
      ? null
      : "PropsTable not found in catalog page — props should be documented",
    severity: "high",
  });

  // ── 3. CodeBlock ──────────────────────────────────────────────────────────
  const hasCodeBlock = /CodeBlock/.test(pageContent);
  tests.push({
    name: "catalog page has CodeBlock",
    category: "documentation",
    status: hasCodeBlock ? "passed" : "failed",
    message: hasCodeBlock
      ? null
      : "CodeBlock not found in catalog page — usage example should be shown",
    severity: "medium",
  });

  // ── 4. ComponentHeader ────────────────────────────────────────────────────
  const hasComponentHeader =
    /ComponentHeader/.test(pageContent) ||
    /SectionHeader/.test(pageContent) ||
    /<h1\b/.test(pageContent);
  tests.push({
    name: "catalog page has component header/title",
    category: "documentation",
    status: hasComponentHeader ? "passed" : "failed",
    message: hasComponentHeader
      ? null
      : "No ComponentHeader or heading found in catalog page",
    severity: "medium",
  });

  // ── 5. Preview / démo ─────────────────────────────────────────────────────
  const hasPreview =
    /Preview/.test(pageContent) ||
    /preview/.test(pageContent) ||
    // Cherche l'usage du composant lui-même dans la page (= démo)
    new RegExp(`<${componentName}[\\s/>]`).test(pageContent) ||
    /SectionExampleCard/.test(pageContent);
  tests.push({
    name: "catalog page has preview or demo",
    category: "documentation",
    status: hasPreview ? "passed" : "failed",
    message: hasPreview
      ? null
      : "No preview or demo found in catalog page — add a visual example",
    severity: "medium",
  });

  return tests;
}

module.exports = { checkDocs };
