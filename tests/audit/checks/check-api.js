/**
 * check-api.js
 * Axe A — Conformité librairie / API (poids 20%)
 * Checks : export, typage, React import, CSV, .type.ts
 */

const fs = require("fs");
const path = require("path");

// CodeBlock/CopyButton/ThemeToggle légitimement clients (browser API)
const USE_CLIENT_ALLOWED = [
  "CodeBlock", "CopyButton", "ThemeToggle",
  "Topbar", "Sidebar", "SearchResults",
];

function checkApi(componentName, componentFilePath, indexContent, csvComponents) {
  const tests = [];

  const fileExists = fs.existsSync(componentFilePath);
  const content = fileExists ? fs.readFileSync(componentFilePath, "utf8") : null;
  const dir = path.dirname(componentFilePath);
  const baseName = path.basename(componentFilePath, ".tsx");

  // ── 1. Fichier .tsx existe ────────────────────────────────────────────────
  tests.push({
    name: "component .tsx file exists",
    category: "api",
    status: fileExists ? "passed" : "failed",
    message: fileExists ? null : `File not found: ${componentFilePath}`,
    severity: "critical",
  });

  if (!content) return tests;

  // ── 2. Fichier .type.ts ───────────────────────────────────────────────────
  const typeFile = [
    path.join(dir, `${baseName}.type.ts`),
    path.join(dir, `${baseName.toLowerCase()}.type.ts`),
    path.join(dir, `${baseName.charAt(0).toLowerCase() + baseName.slice(1)}.type.ts`),
  ].find(fs.existsSync);

  tests.push({
    name: "has .type.ts file",
    category: "api",
    status: typeFile ? "passed" : "failed",
    message: typeFile ? null : `Missing .type.ts for ${componentName} (props should be typed separately)`,
    severity: "high",
  });

  // ── 3. Exporté depuis index.tsx ───────────────────────────────────────────
  const exportedFromIndex =
    indexContent.includes(`/${baseName}"`) ||
    indexContent.includes(`/${baseName}';`) ||
    new RegExp(`from.*["'].*${baseName}["']`).test(indexContent);

  tests.push({
    name: "exported from package index",
    category: "api",
    status: exportedFromIndex ? "passed" : "failed",
    message: exportedFromIndex ? null : `${componentName} not found in index.tsx exports`,
    severity: "critical",
  });

  // ── 4. import React ───────────────────────────────────────────────────────
  const hasReactImport = /import React from ['"]react['"]/.test(content);
  tests.push({
    name: "imports React explicitly",
    category: "api",
    status: hasReactImport ? "passed" : "failed",
    message: hasReactImport
      ? null
      : "Missing `import React from 'react'` — required (JSX transform not configured)",
    severity: "high",
  });

  // ── 5. Export nommé (pas default) ────────────────────────────────────────
  const hasNamedExport = /export\s+function\s+[A-Z]|export\s+const\s+[A-Z]/.test(content);
  const hasDefaultExport = /export\s+default\s/.test(content);
  tests.push({
    name: "uses named export (not default)",
    category: "api",
    status: hasNamedExport ? "passed" : "failed",
    message: hasNamedExport
      ? null
      : `${componentName} should use named export — found ${hasDefaultExport ? "default export" : "no export"}`,
    severity: "medium",
  });

  // ── 6. Présent dans components.csv ───────────────────────────────────────
  const slug = componentName.toLowerCase().replace(/\s/g, "");
  const inCsv = csvComponents.some(
    (c) =>
      (c.label || "").toLowerCase().replace(/\s/g, "") === slug ||
      (c.href || "").replace("/components/", "") === slug
  );
  tests.push({
    name: "registered in components.csv",
    category: "api",
    status: inCsv ? "passed" : "failed",
    message: inCsv ? null : `${componentName} is not registered in components.csv — documentation gap`,
    severity: "high",
  });

  // ── 7. .type.ts contient une interface Props ──────────────────────────────
  if (typeFile) {
    const typeContent = fs.readFileSync(typeFile, "utf8");
    const hasInterface = /interface\s+\w+Props|type\s+\w+Props/.test(typeContent);
    tests.push({
      name: "type file defines Props interface/type",
      category: "api",
      status: hasInterface ? "passed" : "failed",
      message: hasInterface ? null : ".type.ts does not define a Props interface or type",
      severity: "medium",
    });
  } else {
    tests.push({
      name: "type file defines Props interface/type",
      category: "api",
      status: "skipped",
      message: "Skipped: no .type.ts file found",
      severity: "medium",
    });
  }

  return tests;
}

module.exports = { checkApi };
