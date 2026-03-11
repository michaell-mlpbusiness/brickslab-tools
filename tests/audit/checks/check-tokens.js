/**
 * check-tokens.js
 * Axe D — Design system / Tokens (poids 15%)
 * Vérifie l'absence de hardcode et l'usage cohérent des CSS variables
 */

const fs = require("fs");

// Valeurs hardcodées AUTORISÉES (documentées dans les conventions Brickslab)
const ALLOWED_HEX = [
  "#CC4A48", // brand red
  "#4ADE80", // green
  "#FBFBFB", // near-white
  "#F59E0B", // amber
  "#cc4a48",
  "#4ade80",
  "#fbfbfb",
  "#f59e0b",
];

// Couleurs CSS sémantiques acceptables
const ALLOWED_COLOR_KEYWORDS = [
  "white", "transparent", "inherit", "currentColor", "currentcolor",
  "black", "none",
];

// Pattern hex 3/4/6/8 chiffres
const HEX_PATTERN = /#([0-9A-Fa-f]{3,8})\b/g;

// Pattern rgb/rgba — on exclut rgba overlay (alpha < 1)
const RGB_PATTERN = /\brgb\s*\([^)]+\)/g;
const RGBA_PATTERN = /\brgba\s*\([^)]+\)/g;

// Pattern px hardcodés pour font-size (devrait être var(--fontsize-*))
const HARDCODED_FONTSIZE_PATTERN = /fontSize:\s*["']?(\d+)(px)?["']?(?!\s*,\s*"var)/g;

// Pattern px hardcodés pour border-radius (devrait être var(--radius-*))
const HARDCODED_RADIUS_PATTERN = /borderRadius:\s*["']?(\d+)(px)?["']?(?!\s*,\s*"var)/g;

function extractHardcodedColors(content) {
  const violations = [];

  // Hex colors
  const hexMatches = [...content.matchAll(HEX_PATTERN)];
  for (const match of hexMatches) {
    const fullHex = match[0];
    if (!ALLOWED_HEX.includes(fullHex) && !ALLOWED_HEX.includes(fullHex.toUpperCase())) {
      // Check if it's inside a var() fallback (acceptable but worth noting)
      const surroundingIdx = Math.max(0, match.index - 20);
      const surroundingCtx = content.slice(surroundingIdx, match.index);
      const inVarFallback = surroundingCtx.includes("var(--");
      violations.push({
        value: fullHex,
        context: content.slice(Math.max(0, match.index - 30), match.index + 20).trim(),
        inVarFallback,
      });
    }
  }

  return violations;
}

function extractHardcodedRgba(content) {
  const violations = [];
  // rgba with 0.5+ alpha on overlays is acceptable (backdrop)
  const rgbaMatches = [...content.matchAll(RGBA_PATTERN)];
  for (const match of rgbaMatches) {
    const val = match[0];
    // rgba(0,0,0,0.x) overlay — warn but not fail
    const isOverlay = /rgba\s*\(\s*0\s*,\s*0\s*,\s*0/.test(val);
    violations.push({ value: val, isOverlay });
  }
  return violations;
}

function checkTokens(componentName, componentFilePath) {
  const tests = [];

  if (!fs.existsSync(componentFilePath)) {
    return [{ name: "tokens checks", category: "tokens", status: "skipped", message: "File not found", severity: "critical" }];
  }

  const content = fs.readFileSync(componentFilePath, "utf8");

  // ── 1. Pas de hex hardcodé non autorisé ──────────────────────────────────
  const hexViolations = extractHardcodedColors(content);
  const nonFallbackHex = hexViolations.filter((v) => !v.inVarFallback);
  const fallbackHex = hexViolations.filter((v) => v.inVarFallback);

  tests.push({
    name: "no unauthorized hardcoded hex colors",
    category: "tokens",
    status: nonFallbackHex.length === 0 ? "passed" : "failed",
    message:
      nonFallbackHex.length === 0
        ? null
        : `Found ${nonFallbackHex.length} hardcoded color(s): ${nonFallbackHex.map((v) => v.value).join(", ")}`,
    severity: "high",
    detail: nonFallbackHex.length > 0 ? nonFallbackHex.map((v) => v.context) : undefined,
  });

  // ── 2. Avertissement sur les fallbacks hex dans var() ────────────────────
  tests.push({
    name: "no hex fallbacks in var() expressions",
    category: "tokens",
    status: fallbackHex.length === 0 ? "passed" : "failed",
    message:
      fallbackHex.length === 0
        ? null
        : `${fallbackHex.length} hex fallback(s) in var() — prefer token fallbacks: ${fallbackHex.map((v) => v.value).join(", ")}`,
    severity: "low",
  });

  // ── 3. Pas de rgba hardcodé non-overlay ──────────────────────────────────
  const rgbaViolations = extractHardcodedRgba(content);
  const nonOverlayRgba = rgbaViolations.filter((v) => !v.isOverlay);
  tests.push({
    name: "no hardcoded rgba colors (non-overlay)",
    category: "tokens",
    status: nonOverlayRgba.length === 0 ? "passed" : "failed",
    message:
      nonOverlayRgba.length === 0
        ? null
        : `${nonOverlayRgba.length} hardcoded rgba value(s) should use tokens: ${nonOverlayRgba.map((v) => v.value).join(", ")}`,
    severity: "medium",
  });

  // ── 4. Utilise des CSS variables ─────────────────────────────────────────
  const hasCssVars = /var\(--[\w-]+\)/.test(content);
  tests.push({
    name: "uses CSS custom properties (var(--...))",
    category: "tokens",
    status: hasCssVars ? "passed" : "failed",
    message: hasCssVars
      ? null
      : "Component uses no CSS custom properties — all styles may be hardcoded",
    severity: "high",
  });

  // ── 5. Font sizes via tokens (pas de px/number literal bruts) ────────────
  // On cherche fontSize: 14 ou fontSize: "14px" mais pas fontSize: "var(--fontsize-sm)"
  const fontsizeViolations = [];
  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // fontSize avec valeur numérique ou px qui n'est pas un var()
    if (/fontSize\s*:\s*["']?\d/.test(line) && !/var\(--fontsize/.test(line)) {
      // Exclure les petites valeurs qui sont clairement des unités relatives (ex: 11, 12 etc.)
      fontsizeViolations.push({ line: i + 1, content: line.trim() });
    }
  }
  tests.push({
    name: "font sizes use token variables",
    category: "tokens",
    status: fontsizeViolations.length === 0 ? "passed" : "failed",
    message:
      fontsizeViolations.length === 0
        ? null
        : `${fontsizeViolations.length} hardcoded fontSize(s) — use var(--fontsize-*)`,
    severity: "medium",
    detail: fontsizeViolations.map((v) => `L${v.line}: ${v.content}`),
  });

  // ── 6. Border radius via tokens ───────────────────────────────────────────
  const radiusViolations = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // borderRadius avec valeur numérique (ex: borderRadius: 8 ou "8px") sans var()
    if (/borderRadius\s*:\s*["']?\d/.test(line) && !/var\(--radius/.test(line)) {
      radiusViolations.push({ line: i + 1, content: line.trim() });
    }
  }
  tests.push({
    name: "border-radius uses token variables",
    category: "tokens",
    status: radiusViolations.length === 0 ? "passed" : "failed",
    message:
      radiusViolations.length === 0
        ? null
        : `${radiusViolations.length} hardcoded borderRadius value(s) — use var(--radius-*)`,
    severity: "medium",
    detail: radiusViolations.map((v) => `L${v.line}: ${v.content}`),
  });

  return tests;
}

module.exports = { checkTokens };
