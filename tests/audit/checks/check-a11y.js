/**
 * check-a11y.js
 * Axe C — Accessibilité (poids 15%)
 * Analyse statique : rôles sémantiques, labels, focus, aria-*
 */

const fs = require("fs");

function checkA11y(componentName, componentFilePath) {
  const tests = [];

  if (!fs.existsSync(componentFilePath)) {
    return [{ name: "a11y checks", category: "a11y", status: "skipped", message: "File not found", severity: "critical" }];
  }

  const content = fs.readFileSync(componentFilePath, "utf8");
  const lines = content.split("\n");

  // ── 1. Pas de div/span cliquable sans role ────────────────────────────────
  // Cherche onClick sur un div ou span sans role="button" ni role= sur la même ligne ou bloc
  const clickableDivViolations = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/onClick/.test(line)) {
      // Cherche si le contexte proche a un div/span sans role
      const contextStart = Math.max(0, i - 3);
      const contextEnd = Math.min(lines.length, i + 3);
      const ctx = lines.slice(contextStart, contextEnd).join("\n");

      const hasDivSpanClick = /<div\b[^>]*onClick|onClick[^>]*>.*<\/div/.test(ctx) ||
        (/<div/.test(ctx) && /onClick/.test(line) && !/role=/.test(ctx));

      if (hasDivSpanClick && !/role=/.test(ctx) && !/<button/.test(ctx) && !/<a\b/.test(ctx)) {
        clickableDivViolations.push(`L${i + 1}: ${line.trim().slice(0, 80)}`);
      }
    }
  }
  // Remove duplicates
  const uniqueDivViolations = [...new Set(clickableDivViolations)].slice(0, 5);
  tests.push({
    name: "no clickable div/span without role attribute",
    category: "a11y",
    status: uniqueDivViolations.length === 0 ? "passed" : "failed",
    message: uniqueDivViolations.length === 0
      ? null
      : `${uniqueDivViolations.length} clickable div/span without role — use <button> or add role="button"`,
    severity: "high",
    detail: uniqueDivViolations,
  });

  // ── 2. Images avec alt ────────────────────────────────────────────────────
  const imgTags = content.match(/<img\b[^>]*/g) || [];
  const imgWithoutAlt = imgTags.filter((tag) => !/alt\s*=/.test(tag));
  // Also check <Image (Next.js) without alt
  const nextImgTags = content.match(/<Image\b[^>]*/g) || [];
  const nextImgWithoutAlt = nextImgTags.filter((tag) => !/alt\s*=/.test(tag));
  const totalImgViolations = imgWithoutAlt.length + nextImgWithoutAlt.length;

  tests.push({
    name: "images have alt attribute",
    category: "a11y",
    status: totalImgViolations === 0 ? "passed" : "failed",
    message: totalImgViolations === 0
      ? null
      : `${totalImgViolations} <img>/<Image> without alt attribute`,
    severity: "high",
    detail: [...imgWithoutAlt, ...nextImgWithoutAlt].slice(0, 3).map((t) => t.slice(0, 80)),
  });

  // ── 3. Inputs ont un label ou aria-label ─────────────────────────────────
  // Cherche <input sans aria-label, aria-labelledby, ou id associé à un label
  const inputTags = content.match(/<input\b[^>]*/g) || [];
  const inputViolations = inputTags.filter((tag) => {
    const hasAriaLabel = /aria-label\s*=/.test(tag);
    const hasAriaLabelledBy = /aria-labelledby\s*=/.test(tag);
    const hasId = /\bid\s*=/.test(tag);
    const hasHidden = /type\s*=\s*["']hidden["']/.test(tag);
    const hasHiddenStyle = /opacity\s*:\s*0/.test(content) && /position.*absolute/.test(content);
    // Hidden inputs don't need labels
    if (hasHidden) return false;
    // Visually hidden checkbox (e.g. ToggleSwitch pattern) — has label wrapper
    if (/type\s*=\s*["']checkbox["']/.test(tag) && /<label/.test(content)) return false;
    return !hasAriaLabel && !hasAriaLabelledBy && !hasId;
  });
  tests.push({
    name: "inputs have accessible labels",
    category: "a11y",
    status: inputViolations.length === 0 ? "passed" : "failed",
    message: inputViolations.length === 0
      ? null
      : `${inputViolations.length} input(s) without aria-label, aria-labelledby, or id — add accessible label`,
    severity: "high",
    detail: inputViolations.slice(0, 3).map((t) => t.slice(0, 80)),
  });

  // ── 4. Boutons avec contenu ou aria-label ────────────────────────────────
  // Cherche <button sans text ni aria-label
  const buttonViolations = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/<button/.test(line) && !/aria-label\s*=/.test(line)) {
      // Check if button has children on subsequent lines
      const lookahead = lines.slice(i, i + 5).join(" ");
      const hasText = />\s*\{|\w+.*<\/button|{[^}]+}/.test(lookahead);
      const hasAriaLabel = /aria-label/.test(lookahead);
      if (!hasText && !hasAriaLabel) {
        buttonViolations.push(`L${i + 1}: ${line.trim().slice(0, 80)}`);
      }
    }
  }
  tests.push({
    name: "buttons have text content or aria-label",
    category: "a11y",
    status: buttonViolations.length === 0 ? "passed" : "failed",
    message: buttonViolations.length === 0
      ? null
      : `${buttonViolations.length} button(s) potentially without accessible text`,
    severity: "medium",
    detail: buttonViolations.slice(0, 3),
  });

  // ── 5. Liens avec texte ou aria-label ────────────────────────────────────
  const anchorTags = content.match(/<a\b[^>]*>/g) || [];
  const anchorViolations = anchorTags.filter((tag) => {
    const hasAriaLabel = /aria-label\s*=/.test(tag);
    // Links with just icons should have aria-label
    return !hasAriaLabel; // Conservative: flag for review
  });
  // We only flag truly empty-looking links (href but no apparent content nearby)
  // For static analysis, we trust that most links have text children
  tests.push({
    name: "links have accessible text or aria-label",
    category: "a11y",
    status: "skipped",
    message: "Manual review required — cannot verify link text content via static analysis",
    severity: "info",
  });

  // ── 6. Composants interactifs utilisent du HTML sémantique ───────────────
  // Vérifie que les composants "interactive" n'utilisent pas que des divs
  const hasButton = /<button/.test(content);
  const hasInput = /<input/.test(content);
  const hasSelect = /<select/.test(content);
  const hasTextarea = /<textarea/.test(content);
  const hasAnchor = /<a\b/.test(content);
  const hasNav = /<nav\b/.test(content);
  const hasMain = /<main\b/.test(content);
  const hasSection = /<section\b/.test(content);
  const hasArticle = /<article\b/.test(content);
  const hasHeader = /<header\b/.test(content);
  const hasFooter = /<footer\b/.test(content);
  const hasList = /<ul\b|<ol\b/.test(content);

  const isInteractive = hasButton || hasInput || hasSelect;
  const hasSemanticHtml =
    hasNav || hasMain || hasSection || hasArticle ||
    hasHeader || hasFooter || hasList || hasButton ||
    hasAnchor || hasInput;

  // For non-interactive display components, this check doesn't apply
  const isDisplayOnly = !isInteractive && !hasAnchor;

  tests.push({
    name: "uses semantic HTML elements",
    category: "a11y",
    status: hasSemanticHtml || isDisplayOnly ? "passed" : "failed",
    message: hasSemanticHtml || isDisplayOnly
      ? null
      : "No semantic HTML elements found — consider using nav, button, section, etc.",
    severity: "medium",
  });

  // ── 7. Navigation clavier — composants interactifs ────────────────────────
  // Vérifie l'absence de tabIndex={-1} sur les éléments focusables principaux
  const hasNegativeTabIndex = /tabIndex\s*=\s*\{?\s*-1/.test(content);
  // tabIndex=-1 peut être légitime (skip links, hidden elements)
  // On le note mais on ne le fail pas systématiquement
  tests.push({
    name: "keyboard navigation — no inappropriate tabIndex=-1",
    category: "a11y",
    status: hasNegativeTabIndex ? "failed" : "passed",
    message: hasNegativeTabIndex
      ? "Found tabIndex={-1} — verify this is intentional (should not hide primary interactive elements)"
      : null,
    severity: "low",
  });

  return tests;
}

module.exports = { checkA11y };
