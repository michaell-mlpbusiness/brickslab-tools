/**
 * check-render.js
 * Axe B — Rendu / Comportement (poids 20%)
 * Checks : export function, 'use client', props par défaut, console.log, patterns
 */

const fs = require("fs");

// Composants autorisés à utiliser 'use client' (browser API nécessaire)
const USE_CLIENT_ALLOWED = [
  "CodeBlock", "CopyButton", "ThemeToggle",
  "Topbar", "Sidebar", "SearchResults", "BurgerMenu",
  "MenuTree", "SearchBar",
];

// Fichiers de catalogue qui utilisent légitimement 'use client' dans le catalog
const CATALOG_ONLY_COMPONENTS = [
  "Topbar", "Sidebar", "SearchResults",
];

function checkRender(componentName, componentFilePath) {
  const tests = [];

  if (!fs.existsSync(componentFilePath)) {
    return [{ name: "render checks", category: "render", status: "skipped", message: "File not found", severity: "critical" }];
  }

  const content = fs.readFileSync(componentFilePath, "utf8");
  const lines = content.split("\n");

  // ── 1. Export nommé de fonction composant ─────────────────────────────────
  const hasExportFunction =
    /export\s+function\s+[A-Z]\w+/.test(content) ||
    /export\s+const\s+[A-Z]\w+\s*=\s*\(/.test(content) ||
    /export\s+const\s+[A-Z]\w+\s*=\s*React\./.test(content);

  tests.push({
    name: "has exported component function",
    category: "render",
    status: hasExportFunction ? "passed" : "failed",
    message: hasExportFunction
      ? null
      : "No exported React component function found",
    severity: "critical",
  });

  // ── 2. 'use client' seulement si autorisé ─────────────────────────────────
  const hasUseClient = /^['"]use client['"]/.test(content.trim()) ||
    content.trim().startsWith('"use client"') ||
    content.trim().startsWith("'use client'");

  const isAllowedUseClient = USE_CLIENT_ALLOWED.some(
    (name) => componentName.toLowerCase() === name.toLowerCase()
  );

  tests.push({
    name: "no unexpected 'use client' directive",
    category: "render",
    status: !hasUseClient || isAllowedUseClient ? "passed" : "failed",
    message: !hasUseClient
      ? null
      : isAllowedUseClient
        ? `'use client' is allowed for ${componentName} (browser API)`
        : `Unexpected 'use client' — component should be server-compatible; move interactive state to parent`,
    severity: "high",
  });

  // ── 3. Pas de console.log en production ───────────────────────────────────
  const consoleLogLines = [];
  for (let i = 0; i < lines.length; i++) {
    if (/console\.(log|warn|error|debug)\s*\(/.test(lines[i])) {
      // Ignore commented-out lines
      const trimmed = lines[i].trim();
      if (!trimmed.startsWith("//") && !trimmed.startsWith("*")) {
        consoleLogLines.push(`L${i + 1}: ${trimmed.slice(0, 60)}`);
      }
    }
  }
  tests.push({
    name: "no console.log statements in production code",
    category: "render",
    status: consoleLogLines.length === 0 ? "passed" : "failed",
    message: consoleLogLines.length === 0
      ? null
      : `${consoleLogLines.length} console.log/warn/error statement(s) found`,
    severity: "low",
    detail: consoleLogLines,
  });

  // ── 4. Props optionnelles avec valeurs par défaut ─────────────────────────
  // Détecte les props destructurées avec des defaults : { prop = 'default' }
  // C'est une bonne pratique, on vérifie qu'au moins une props a un défaut si le composant a des props
  const hasDestructuredProps = /\{\s*\w+[^}]*\}\s*:\s*\w+Props/.test(content) ||
    /function\s+\w+\s*\(\s*\{/.test(content);

  const hasDefaultValues = /=\s*['"\d\[\{]/.test(
    content.match(/function\s+\w+\s*\(\{([^}]+)\}/)?.[1] || ""
  ) || /=\s*(true|false|null|undefined|['"]|\d|\[|\{)/.test(content);

  // Check is informational — we don't fail on this alone
  tests.push({
    name: "optional props have default values",
    category: "render",
    status: hasDefaultValues ? "passed" : "failed",
    message: hasDefaultValues
      ? null
      : "No default prop values detected — consider adding defaults for optional props",
    severity: "low",
  });

  // ── 5. Gestion du rendu conditionnel (pas de undefined rendu) ─────────────
  // Cherche des accès à .map() sans vérification préalable
  const unsafeMapPatterns = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Détecte prop.something.map() sans optional chaining (?.) ou guard
    if (/\w+\.\w+\.map\(/.test(line) && !/\?\.\w+\.map\(|\w+\?\.\w+\.map/.test(line)) {
      // Check if there's a guard above (if (xxx), xxx && xxx.map, xxx || [])
      const guardCtx = lines.slice(Math.max(0, i - 5), i).join(" ");
      if (!/if\s*\(|&&\s*\w+\.map|\|\|\s*\[/.test(guardCtx)) {
        unsafeMapPatterns.push(`L${i + 1}: ${line.trim().slice(0, 80)}`);
      }
    }
  }
  tests.push({
    name: "safe array iteration (no unguarded .map on props)",
    category: "render",
    status: unsafeMapPatterns.length === 0 ? "passed" : "failed",
    message: unsafeMapPatterns.length === 0
      ? null
      : `${unsafeMapPatterns.length} potentially unsafe array map(s) — use optional chaining or guards`,
    severity: "medium",
    detail: unsafeMapPatterns.slice(0, 3),
  });

  // ── 6. Pas d'import de state global fragile ───────────────────────────────
  // Vérifie qu'il n'y a pas d'import de zustand, redux, context non-standard
  const globalStateImports = [];
  const statePatterns = [/from ['"]zustand/, /from ['"]redux/, /useStore\(/, /useContext\(/];
  for (const pattern of statePatterns) {
    if (pattern.test(content)) {
      globalStateImports.push(pattern.toString().replace(/[/\\^$.*+?()[\]{}|]/g, ""));
    }
  }
  tests.push({
    name: "no external global state dependency",
    category: "render",
    status: globalStateImports.length === 0 ? "passed" : "failed",
    message: globalStateImports.length === 0
      ? null
      : `Global state dependency found (${globalStateImports.join(", ")}) — component should be controlled via props`,
    severity: "high",
  });

  return tests;
}

module.exports = { checkRender };
