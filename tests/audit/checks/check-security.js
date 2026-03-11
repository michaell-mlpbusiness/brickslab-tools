/**
 * check-security.js
 * Axe F — Sécurité / Robustesse (poids 10%)
 * Checks : dangerouslySetInnerHTML, liens externes, eval, injection
 */

const fs = require("fs");

function checkSecurity(componentName, componentFilePath) {
  const tests = [];

  if (!fs.existsSync(componentFilePath)) {
    return [{ name: "security checks", category: "security", status: "skipped", message: "File not found", severity: "critical" }];
  }

  const content = fs.readFileSync(componentFilePath, "utf8");
  const lines = content.split("\n");

  // ── 1. Pas de dangerouslySetInnerHTML ─────────────────────────────────────
  const hasDangerousHtml = /dangerouslySetInnerHTML/.test(content);
  // Vérifie si c'est justifié par un commentaire
  const hasJustification = hasDangerousHtml &&
    /\/\/.*sanitize|\/\/.*safe|\/\/.*trusted|DOMPurify|sanitizeHtml/.test(content);

  tests.push({
    name: "no dangerouslySetInnerHTML without justification",
    category: "security",
    status: !hasDangerousHtml || hasJustification ? "passed" : "failed",
    message: !hasDangerousHtml
      ? null
      : hasJustification
        ? "dangerouslySetInnerHTML found but appears justified/sanitized"
        : "dangerouslySetInnerHTML detected — verify input is sanitized or justify usage",
    severity: "critical",
  });

  // ── 2. Liens externes avec rel sécurisé ───────────────────────────────────
  // target="_blank" doit avoir rel="noopener noreferrer"
  const blankLinkViolations = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/target\s*=\s*["']_blank["']/.test(line) || /target.*_blank/.test(line)) {
      // Cherche rel dans le contexte proche (2 lignes avant/après)
      const contextStart = Math.max(0, i - 3);
      const contextEnd = Math.min(lines.length, i + 3);
      const ctx = lines.slice(contextStart, contextEnd).join(" ");
      const hasRel = /rel\s*=\s*["'].*noopener/.test(ctx) ||
        /rel\s*=\s*["'].*noreferrer/.test(ctx);
      if (!hasRel) {
        blankLinkViolations.push(`L${i + 1}: ${line.trim().slice(0, 100)}`);
      }
    }
  }
  tests.push({
    name: "target=\"_blank\" links have rel=\"noopener noreferrer\"",
    category: "security",
    status: blankLinkViolations.length === 0 ? "passed" : "failed",
    message: blankLinkViolations.length === 0
      ? null
      : `${blankLinkViolations.length} link(s) with target="_blank" missing rel="noopener noreferrer"`,
    severity: "high",
    detail: blankLinkViolations,
  });

  // ── 3. Pas d'eval() ou new Function() ────────────────────────────────────
  const hasEval = /\beval\s*\(|\bnew\s+Function\s*\(/.test(content);
  tests.push({
    name: "no eval() or new Function()",
    category: "security",
    status: hasEval ? "failed" : "passed",
    message: hasEval
      ? "eval() or new Function() detected — critical security risk"
      : null,
    severity: "critical",
  });

  // ── 4. Pas d'innerHTML directe ────────────────────────────────────────────
  const hasInnerHtml = /\.innerHTML\s*=/.test(content);
  tests.push({
    name: "no direct .innerHTML assignment",
    category: "security",
    status: hasInnerHtml ? "failed" : "passed",
    message: hasInnerHtml
      ? "Direct .innerHTML assignment detected — use React rendering instead"
      : null,
    severity: "high",
  });

  // ── 5. Pas de href construit depuis une interpolation user-input directe ──
  // Cherche des patterns href={`/...${props.xxx}...`} avec des props "url", "link", "href"
  const unsafeHrefPattern = /href\s*=\s*\{`[^`]*\$\{[^}]*(url|link|href|path|src)[^}]*\}[^`]*`\}/i;
  const hasUnsafeHref = unsafeHrefPattern.test(content);
  tests.push({
    name: "no potentially unsafe dynamic href construction",
    category: "security",
    status: hasUnsafeHref ? "failed" : "passed",
    message: hasUnsafeHref
      ? "Dynamic href construction from prop — verify no javascript: URL injection is possible"
      : null,
    severity: "medium",
  });

  return tests;
}

module.exports = { checkSecurity };
