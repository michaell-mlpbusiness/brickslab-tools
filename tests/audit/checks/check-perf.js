/**
 * check-perf.js
 * Axe P — Performance rendu / FPS CPU (poids 5%)
 * Détecte les anti-patterns statiques causant des régressions FPS/CPU navigateur.
 */

const fs = require("fs");

function checkPerf(componentName, componentFilePath) {
  const tests = [];

  if (!fs.existsSync(componentFilePath)) {
    return [{
      name: "perf checks", category: "perf",
      status: "skipped", message: "File not found", severity: "critical",
    }];
  }

  const content = fs.readFileSync(componentFilePath, "utf8");
  const lines = content.split("\n");
  const hasUseEffect = /useEffect\s*\(/.test(content);

  // ── 1. requestAnimationFrame sans cancelAnimationFrame ───────────────────
  const hasRaf = /requestAnimationFrame/.test(content);
  const hasCaf = /cancelAnimationFrame/.test(content);
  tests.push({
    name: "requestAnimationFrame paired with cancelAnimationFrame",
    category: "perf",
    status: !hasRaf || hasCaf ? "passed" : "failed",
    message: hasRaf && !hasCaf
      ? "requestAnimationFrame used without cancelAnimationFrame — animation loop leaks CPU after unmount"
      : null,
    severity: "high",
  });

  // ── 2. setInterval / setTimeout hors useEffect ────────────────────────────
  const hasTimer = /\bsetInterval\s*\(|\bsetTimeout\s*\(/.test(content);
  tests.push({
    name: "timers (setInterval/setTimeout) wrapped in useEffect",
    category: "perf",
    status: !hasTimer || hasUseEffect ? "passed" : "failed",
    message: hasTimer && !hasUseEffect
      ? "setInterval/setTimeout found without useEffect — restarts on every render and is never cleared"
      : null,
    severity: "high",
  });

  // ── 3. Forced synchronous layout reads hors useEffect ─────────────────────
  const LAYOUT_READ_APIS = [
    "getBoundingClientRect", "offsetWidth", "offsetHeight",
    "offsetTop", "offsetLeft", "scrollHeight", "scrollWidth",
    "clientWidth", "clientHeight",
  ];
  const usedLayoutApis = LAYOUT_READ_APIS.filter((api) => content.includes(api));
  tests.push({
    name: "DOM layout reads (getBoundingClientRect etc.) inside useEffect only",
    category: "perf",
    status: usedLayoutApis.length === 0 || hasUseEffect ? "passed" : "failed",
    message: usedLayoutApis.length > 0 && !hasUseEffect
      ? `Forced synchronous layout read (${usedLayoutApis.join(", ")}) without useEffect — causes layout thrashing / jank`
      : null,
    severity: "medium",
  });

  // ── 4. document.querySelector dans le corps du composant ──────────────────
  const domQueryLines = [];
  for (let i = 0; i < lines.length; i++) {
    if (/document\.(querySelector|getElementById|getElementsBy)/.test(lines[i])) {
      const trimmed = lines[i].trim();
      if (!trimmed.startsWith("//") && !trimmed.startsWith("*")) {
        domQueryLines.push(`L${i + 1}: ${trimmed.slice(0, 70)}`);
      }
    }
  }
  tests.push({
    name: "no direct document.querySelector in component (use React refs)",
    category: "perf",
    status: domQueryLines.length === 0 ? "passed" : "failed",
    message: domQueryLines.length === 0
      ? null
      : `${domQueryLines.length} direct DOM quer(y|ies) — use React refs to avoid full DOM traversal`,
    severity: "medium",
    detail: domQueryLines.slice(0, 3),
  });

  // ── 5. Transitions CSS sur propriétés layout (non-composites) ─────────────
  const LAYOUT_PROPS = ["width", "height", "top", "left", "right", "bottom", "margin", "padding", "font-size"];
  const layoutTransitionRe = new RegExp(
    `transition['":\\s]+['"]?[^'"\\n]*\\b(${LAYOUT_PROPS.join("|")})\\b`, "i"
  );
  const badTransitionLines = [];
  for (let i = 0; i < lines.length; i++) {
    if (layoutTransitionRe.test(lines[i])) {
      const trimmed = lines[i].trim();
      if (!trimmed.startsWith("//") && !trimmed.startsWith("*")) {
        badTransitionLines.push(`L${i + 1}: ${trimmed.slice(0, 70)}`);
      }
    }
  }
  tests.push({
    name: "CSS transitions use compositor-only properties (transform / opacity)",
    category: "perf",
    status: badTransitionLines.length === 0 ? "passed" : "failed",
    message: badTransitionLines.length === 0
      ? null
      : "Transition on layout-triggering property (width/height/top...) — use transform/opacity for 60fps (no reflow)",
    severity: "medium",
    detail: badTransitionLines.slice(0, 3),
  });

  // ── 6. will-change manquant sur composants animés ─────────────────────────
  const hasAnimation = /transform|animation|transition/.test(content);
  const hasWillChange = /will-change/.test(content);
  tests.push({
    name: "animated components declare will-change compositor hint",
    category: "perf",
    status: !hasAnimation || hasWillChange ? "passed" : "failed",
    message: hasAnimation && !hasWillChange
      ? "Component uses transform/animation but no will-change hint — add will-change:'transform' or 'opacity' to promote to compositor layer"
      : null,
    severity: "low",
  });

  return tests;
}

module.exports = { checkPerf };
