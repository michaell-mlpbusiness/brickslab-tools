/**
 * check-responsive.js
 * Axe E — Responsive / Adaptabilité (poids 10%)
 * Checks : flexbox/grid, unités relatives, débordements, box-sizing
 */

const fs = require("fs");

function checkResponsive(componentName, componentFilePath) {
  const tests = [];

  if (!fs.existsSync(componentFilePath)) {
    return [{ name: "responsive checks", category: "responsive", status: "skipped", message: "File not found", severity: "critical" }];
  }

  const content = fs.readFileSync(componentFilePath, "utf8");
  const lines = content.split("\n");

  // ── 1. Utilise flexbox ou grid pour le layout ─────────────────────────────
  const hasFlexbox = /display\s*:\s*["']flex["']|flexDirection|justifyContent|alignItems/.test(content);
  const hasGrid = /display\s*:\s*["']grid["']|gridTemplate|gridColumn|gridRow/.test(content);
  const isDisplayComponent = !/<div\b/.test(content) && !/<section\b/.test(content);

  tests.push({
    name: "uses flexbox or grid for layout",
    category: "responsive",
    status: hasFlexbox || hasGrid || isDisplayComponent ? "passed" : "failed",
    message: hasFlexbox || hasGrid || isDisplayComponent
      ? null
      : "No flexbox or grid detected — layout may not be responsive",
    severity: "medium",
  });

  // ── 2. Pas de largeur fixe > 500px non justifiée ──────────────────────────
  // Cherche des valeurs width: NNN où NNN > 500 sans %
  const fixedWidthViolations = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const widthMatch = line.match(/width\s*:\s*["']?(\d+)(px)?["']?/);
    if (widthMatch) {
      const val = parseInt(widthMatch[1]);
      if (val > 500) {
        // Exception: maxWidth > 500 is fine (it's a max, not a fixed size)
        const isMaxWidth = /maxWidth/.test(line);
        if (!isMaxWidth) {
          fixedWidthViolations.push(`L${i + 1}: ${line.trim().slice(0, 80)}`);
        }
      }
    }
  }
  tests.push({
    name: "no fixed pixel width > 500px (except maxWidth)",
    category: "responsive",
    status: fixedWidthViolations.length === 0 ? "passed" : "failed",
    message: fixedWidthViolations.length === 0
      ? null
      : `${fixedWidthViolations.length} fixed width(s) > 500px — may break on narrow screens`,
    severity: "medium",
    detail: fixedWidthViolations.slice(0, 3),
  });

  // ── 3. box-sizing: border-box sur conteneurs significatifs ────────────────
  // Si le composant a des width: "100%" ou padding, il devrait avoir box-sizing: border-box
  const hasFull100Width = /width\s*:\s*["']100%["']/.test(content);
  const hasBoxSizing = /boxSizing\s*:\s*["']border-box["']/.test(content);

  tests.push({
    name: "box-sizing: border-box on full-width containers",
    category: "responsive",
    status: !hasFull100Width || hasBoxSizing ? "passed" : "failed",
    message: !hasFull100Width || hasBoxSizing
      ? null
      : "width: '100%' used without box-sizing: 'border-box' — may cause overflow with padding",
    severity: "low",
  });

  // ── 4. Pas de overflow: hidden non justifié sur conteneurs principaux ──────
  // overflow: hidden peut couper du contenu sur mobile
  const overflowHiddenLines = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/overflow\s*:\s*["']hidden["']/.test(line)) {
      // overflow: hidden sur un conteneur scrollable est OK (overflow: auto/scroll sur le parent)
      const ctx = lines.slice(Math.max(0, i - 5), i + 5).join(" ");
      const hasScroll = /overflowY\s*:\s*["']auto["']|overflowX\s*:\s*["']auto["']|overflow.*scroll/.test(ctx);
      if (!hasScroll) {
        overflowHiddenLines.push(`L${i + 1}: ${line.trim().slice(0, 80)}`);
      }
    }
  }
  tests.push({
    name: "no uncontrolled overflow: hidden (potential content clip on mobile)",
    category: "responsive",
    status: "skipped", // Informational — too many false positives statically
    message: overflowHiddenLines.length > 0
      ? `Manual review: ${overflowHiddenLines.length} overflow:hidden found — verify content is not clipped on mobile`
      : "Manual review required — verify overflow behavior at different viewports",
    severity: "info",
    detail: overflowHiddenLines.slice(0, 3),
  });

  // ── 5. Utilise des unités relatives pour les tailles de texte ────────────
  // Les font-size devraient utiliser var(--fontsize-*) ou rem — pas px hardcodés
  const hasRelativeTextSizes =
    /var\(--fontsize-/.test(content) ||
    /fontSize.*rem/.test(content);
  const hasFontSizes = /fontSize/.test(content);

  tests.push({
    name: "text sizes use relative units or tokens",
    category: "responsive",
    status: !hasFontSizes || hasRelativeTextSizes ? "passed" : "failed",
    message: !hasFontSizes || hasRelativeTextSizes
      ? null
      : "Text sizes use px or raw numbers — consider var(--fontsize-*) for better scaling",
    severity: "low",
  });

  return tests;
}

module.exports = { checkResponsive };
