"use client";

import React, { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

type ThemeConfig = {
  // Polices
  fontPrimary: string;
  fontSecondary: string;
  // Palette identitaire (mood)
  palettePrimaire: string; paletteSecondaire: string; paletteAccent: string;
  paletteNeutre: string; paletteFond: string;
  // Couleurs
  colorBg: string; colorFg: string; colorMuted: string; colorBrand: string;
  colorSuccess: string; colorWarning: string; colorError: string; colorInfo: string;
  // Surfaces
  cSurface: string; cSurfaceElevated: string; cBorder: string;
  cBrandSubtle: string; cBrandBorder: string;
  // Fontsize fixes (px)
  fontsize2xs: string; fontsizeXs: string; fontsizeSm: string; fontsizeMedium: string;
  // Fontsize clamp — 3 parties par token
  fontsizeLgMin: string; fontsizeLgVw: string; fontsizeLgMax: string;
  fontsizeXlMin: string; fontsizeXlVw: string; fontsizeXlMax: string;
  fontsize2xlMin: string; fontsize2xlVw: string; fontsize2xlMax: string;
  fontsize3xlMin: string; fontsize3xlVw: string; fontsize3xlMax: string;
  fontsize4xlMin: string; fontsize4xlVw: string; fontsize4xlMax: string;
  fontsize5xlMin: string; fontsize5xlVw: string; fontsize5xlMax: string;
  // Fontweights
  fontweightThin: string; fontweightExtralight: string; fontweightLight: string;
  fontweightNormal: string; fontweightMedium: string; fontweightSemibold: string;
  fontweightBold: string; fontweightExtrabold: string; fontweightBlack: string;
  // Spacing (px)
  space1: string; space1_5: string; space2: string; space3: string; space4: string;
  space5: string; space6: string; space7: string; space8: string;
  space10: string; space12: string; space15: string; space20: string;
  // Bordures (px)
  borderXm: string; borderSm: string; borderMd: string;
  // Radius (px)
  radiusSm: string; radiusMd: string; radiusLg: string; radiusFull: string;
  // Ombres (décomposées)
  shadow1Y: string; shadow1Blur: string; shadow1Opacity: string;
  shadow2Y: string; shadow2Blur: string; shadow2Opacity: string;
  // Transitions
  transitionBgDuration: string; transitionBgEasing: string;
  transitionAllDuration: string; transitionAllEasing: string;
  // Focus ring
  focusRingSpread: string; focusRingColor: string; focusRingOpacity: string;
  // Z-index
  zBase: string; zDropdown: string; zModal: string; zDrawer: string;
};

// ── Valeurs par défaut (token-contract) ───────────────────────────────────────

const DEFAULTS: ThemeConfig = {
  fontPrimary: "Inter",
  fontSecondary: "Merriweather",
  palettePrimaire: "#CC4A48", paletteSecondaire: "#3B82F6", paletteAccent: "#F59E0B",
  paletteNeutre: "#52607a", paletteFond: "#ffffff",
  colorBg: "#ffffff", colorFg: "#0b1220", colorMuted: "#52607a",
  colorBrand: "#CC4A48", colorSuccess: "#4ADE80", colorWarning: "#F59E0B",
  colorError: "#CC4A48", colorInfo: "#3B82F6",
  cSurface: "#ffffff", cSurfaceElevated: "#f7f7f7", cBorder: "#e0e0e0",
  cBrandSubtle: "#fff0f0", cBrandBorder: "#f5c6c5",
  fontsize2xs: "10", fontsizeXs: "12", fontsizeSm: "14", fontsizeMedium: "16",
  fontsizeLgMin: "18", fontsizeLgVw: "5", fontsizeLgMax: "48",
  fontsizeXlMin: "20", fontsizeXlVw: "5", fontsizeXlMax: "48",
  fontsize2xlMin: "24", fontsize2xlVw: "5", fontsize2xlMax: "48",
  fontsize3xlMin: "30", fontsize3xlVw: "5", fontsize3xlMax: "48",
  fontsize4xlMin: "36", fontsize4xlVw: "5", fontsize4xlMax: "48",
  fontsize5xlMin: "32", fontsize5xlVw: "5", fontsize5xlMax: "48",
  fontweightThin: "100", fontweightExtralight: "200", fontweightLight: "300",
  fontweightNormal: "400", fontweightMedium: "500", fontweightSemibold: "600",
  fontweightBold: "700", fontweightExtrabold: "800", fontweightBlack: "900",
  space1: "2", space1_5: "4", space2: "8", space3: "12", space4: "16",
  space5: "20", space6: "24", space7: "28", space8: "32",
  space10: "40", space12: "48", space15: "60", space20: "80",
  borderXm: "1", borderSm: "2", borderMd: "4",
  radiusSm: "6", radiusMd: "12", radiusLg: "16", radiusFull: "999",
  shadow1Y: "1", shadow1Blur: "2", shadow1Opacity: "0.06",
  shadow2Y: "10", shadow2Blur: "30", shadow2Opacity: "0.10",
  transitionBgDuration: "0.2", transitionBgEasing: "ease",
  transitionAllDuration: "0.2", transitionAllEasing: "ease",
  focusRingSpread: "3", focusRingColor: "#CC4A48", focusRingOpacity: "0.25",
  zBase: "0", zDropdown: "100", zModal: "1000", zDrawer: "50",
};

// ── Fonctions de composition CSS ──────────────────────────────────────────────

const clampVal = (min: string, vw: string, max: string) =>
  `clamp(${min}px, ${vw}vw, ${max}px)`;

const shadowVal = (y: string, blur: string, opacity: string) =>
  `0 ${y}px ${blur}px rgba(0, 0, 0, ${opacity})`;

const transVal = (prop: string, dur: string, ease: string) =>
  `${prop} ${dur}s ${ease}`;

function focusRingVal(spread: string, hex: string, opacity: string): string {
  if (hex.length !== 7) return `0 0 0 ${spread}px rgba(204, 74, 72, ${opacity})`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `0 0 0 ${spread}px rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// ── Polices ───────────────────────────────────────────────────────────────────

const FONT_GROUPS = [
  {
    category: "Sans-serif — Moderne",
    fonts: [
      "Inter", "Geist", "DM Sans", "Plus Jakarta Sans", "Outfit",
      "Figtree", "Sora", "Urbanist", "Onest", "Bricolage Grotesque",
    ],
  },
  {
    category: "Sans-serif — Classique",
    fonts: [
      "Roboto", "Open Sans", "Lato", "Source Sans 3", "Noto Sans",
      "IBM Plex Sans", "Raleway", "Mulish", "Quicksand", "Nunito",
    ],
  },
  {
    category: "Sans-serif — Display",
    fonts: [
      "Poppins", "Montserrat", "Josefin Sans", "Exo 2", "Oxanium",
      "Space Grotesk", "Cabinet Grotesk", "Clash Display", "Satoshi", "Switzer",
    ],
  },
  {
    category: "Serif — Élégant",
    fonts: [
      "Playfair Display", "Cormorant Garamond", "EB Garamond", "Libre Baskerville",
      "Crimson Pro", "Fraunces", "Spectral", "Newsreader",
    ],
  },
  {
    category: "Serif — Éditorial",
    fonts: [
      "Merriweather", "Lora", "Source Serif 4", "Bitter", "PT Serif",
      "Noto Serif", "IBM Plex Serif", "Zilla Slab",
    ],
  },
  {
    category: "Monospace",
    fonts: [
      "JetBrains Mono", "Fira Code", "Source Code Pro", "IBM Plex Mono",
      "Roboto Mono", "Space Mono", "Inconsolata", "Geist Mono",
    ],
  },
  {
    category: "Système",
    fonts: ["system-ui", "-apple-system", "Georgia", "Times New Roman", "Arial", "Helvetica"],
  },
];

const SERIF_FONTS = new Set([
  "Playfair Display", "Cormorant Garamond", "EB Garamond", "Libre Baskerville",
  "Crimson Pro", "Fraunces", "Spectral", "Newsreader",
  "Merriweather", "Lora", "Source Serif 4", "Bitter", "PT Serif",
  "Noto Serif", "IBM Plex Serif", "Zilla Slab",
  "Georgia", "Times New Roman",
]);
const MONO_FONTS = new Set([
  "JetBrains Mono", "Fira Code", "Source Code Pro", "IBM Plex Mono",
  "Roboto Mono", "Space Mono", "Inconsolata", "Geist Mono",
]);
const SYS_FONTS   = new Set(["system-ui", "-apple-system", "Georgia", "Times New Roman", "Arial", "Helvetica"]);

function getFontStack(family: string): string {
  if (SYS_FONTS.has(family))  return family;
  if (MONO_FONTS.has(family))  return `'${family}', monospace`;
  if (SERIF_FONTS.has(family)) return `'${family}', serif`;
  return `'${family}', sans-serif`;
}

function loadGoogleFont(family: string) {
  if (SYS_FONTS.has(family) || family === "Georgia" || family === "Times New Roman") return;
  const id = `gfont-${family.replace(/\s+/g, "-")}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@400;500;600;700&display=swap`;
  document.head.appendChild(link);
}

function applyPalette(config: ThemeConfig): ThemeConfig {
  return {
    ...config,
    colorBrand: config.palettePrimaire,
    colorError: config.palettePrimaire,
    colorInfo: config.paletteSecondaire,
    colorWarning: config.paletteAccent,
    colorSuccess: config.paletteAccent,
    colorMuted: config.paletteNeutre,
    colorBg: config.paletteFond,
    cSurface: config.paletteFond,
  };
}

function generateCSS(c: ThemeConfig): string {
  const p1 = c.fontPrimary;
  const p2 = c.fontSecondary;
  const isGF = (f: string) => !SYS_FONTS.has(f) && f !== "Georgia" && f !== "Times New Roman";
  const gfImport = (f: string) =>
    `@import url('https://fonts.googleapis.com/css2?family=${encodeURIComponent(f)}:wght@400;500;600;700&display=swap');`;

  return `/*
 * ── Polices d'écriture ───────────────────────────────────────────────────────
 *
 * 1. Police principale — titres, labels, navigation
${isGF(p1) ? ` *    ${gfImport(p1)}\n` : ""} *    --font-primary: ${getFontStack(p1)};
 *
 * 2. Police secondaire — corps de texte, paragraphes
${isGF(p2) ? ` *    ${gfImport(p2)}\n` : ""} *    --font-secondary: ${getFontStack(p2)};
 *
 * ─────────────────────────────────────────────────────────────────────────── */

:root {
  /* ── Palette identitaire ─────────── */
  --palette-primaire: ${c.palettePrimaire};
  --palette-secondaire: ${c.paletteSecondaire};
  --palette-accent: ${c.paletteAccent};
  --palette-neutre: ${c.paletteNeutre};
  --palette-fond: ${c.paletteFond};

  /* ── Couleurs sémantiques ─────────── */
  --color-bg: ${c.colorBg};
  --color-fg: ${c.colorFg};
  --color-muted: ${c.colorMuted};
  --color-brand: ${c.colorBrand};
  --color-success: ${c.colorSuccess};
  --color-warning: ${c.colorWarning};
  --color-error: ${c.colorError};
  --color-info: ${c.colorInfo};
  --color-transparent: transparent;

  /* ── Surfaces & Bordures ─────────── */
  --c-surface: ${c.cSurface};
  --c-surface-elevated: ${c.cSurfaceElevated};
  --c-border: ${c.cBorder};
  --c-brand-subtle: ${c.cBrandSubtle};
  --c-brand-border: ${c.cBrandBorder};

  /* ── Typographie — Tailles ───────── */
  --fontsize-2xs: ${c.fontsize2xs}px;
  --fontsize-xs: ${c.fontsizeXs}px;
  --fontsize-sm: ${c.fontsizeSm}px;
  --fontsize-medium: ${c.fontsizeMedium}px;
  --fontsize-lg: ${clampVal(c.fontsizeLgMin, c.fontsizeLgVw, c.fontsizeLgMax)};
  --fontsize-xl: ${clampVal(c.fontsizeXlMin, c.fontsizeXlVw, c.fontsizeXlMax)};
  --fontsize-2xl: ${clampVal(c.fontsize2xlMin, c.fontsize2xlVw, c.fontsize2xlMax)};
  --fontsize-3xl: ${clampVal(c.fontsize3xlMin, c.fontsize3xlVw, c.fontsize3xlMax)};
  --fontsize-4xl: ${clampVal(c.fontsize4xlMin, c.fontsize4xlVw, c.fontsize4xlMax)};
  --fontsize-5xl: ${clampVal(c.fontsize5xlMin, c.fontsize5xlVw, c.fontsize5xlMax)};

  /* ── Typographie — Graisses ──────── */
  --fontweight-thin: ${c.fontweightThin};
  --fontweight-extralight: ${c.fontweightExtralight};
  --fontweight-light: ${c.fontweightLight};
  --fontweight-normal: ${c.fontweightNormal};
  --fontweight-medium: ${c.fontweightMedium};
  --fontweight-semibold: ${c.fontweightSemibold};
  --fontweight-bold: ${c.fontweightBold};
  --fontweight-extrabold: ${c.fontweightExtrabold};
  --fontweight-black: ${c.fontweightBlack};

  /* ── Espacements ─────────────────── */
  --space-1: ${c.space1}px;
  --space-1-5: ${c.space1_5}px;
  --space-2: ${c.space2}px;
  --space-3: ${c.space3}px;
  --space-4: ${c.space4}px;
  --space-5: ${c.space5}px;
  --space-6: ${c.space6}px;
  --space-7: ${c.space7}px;
  --space-8: ${c.space8}px;
  --space-10: ${c.space10}px;
  --space-12: ${c.space12}px;
  --space-15: ${c.space15}px;
  --space-20: ${c.space20}px;

  /* ── Bordures ────────────────────── */
  --border-solid: solid;
  --border-dotted: dotted;
  --border-double: double;
  --border-xm: ${c.borderXm}px;
  --border-sm: ${c.borderSm}px;
  --border-md: ${c.borderMd}px;

  /* ── Radius ──────────────────────── */
  --radius-sm: ${c.radiusSm}px;
  --radius-md: ${c.radiusMd}px;
  --radius-lg: ${c.radiusLg}px;
  --radius-full: ${c.radiusFull}px;

  /* ── Ombres ──────────────────────── */
  --shadow-1: ${shadowVal(c.shadow1Y, c.shadow1Blur, c.shadow1Opacity)};
  --shadow-2: ${shadowVal(c.shadow2Y, c.shadow2Blur, c.shadow2Opacity)};

  /* ── Transitions ─────────────────── */
  --transition-bg: ${transVal("background", c.transitionBgDuration, c.transitionBgEasing)};
  --transition-all: ${transVal("all", c.transitionAllDuration, c.transitionAllEasing)};

  /* ── Accessibilité ───────────────── */
  --focus-ring: ${focusRingVal(c.focusRingSpread, c.focusRingColor, c.focusRingOpacity)};

  /* ── Z-index ─────────────────────── */
  --z-base: ${c.zBase};
  --z-dropdown: ${c.zDropdown};
  --z-modal: ${c.zModal};
  --z-drawer: ${c.zDrawer};
}
`;
}

function downloadCSS(css: string) {
  const blob = new Blob([css], { type: "text/css" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "tokens.css";
  a.click();
  URL.revokeObjectURL(url);
}

// ── Primitives UI ─────────────────────────────────────────────────────────────

function FontPicker({ label, role, value, onChange }: {
  label: string; role: string; value: string; onChange: (v: string) => void;
}) {
  React.useEffect(() => { loadGoogleFont(value); }, [value]);

  return (
    <div style={{
      padding: "16px", background: "var(--c-surface-elevated)",
      border: "1px solid var(--c-border)", borderRadius: 10, marginBottom: 14,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-fg)" }}>{label}</span>
          <span style={{ fontSize: 11, color: "var(--color-muted)", marginLeft: 8 }}>{role}</span>
        </div>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            fontSize: 12, fontFamily: "ui-monospace, monospace",
            color: "var(--color-fg)", backgroundColor: "var(--c-surface)",
            border: "1px solid var(--c-border)", borderRadius: 6,
            padding: "5px 10px", outline: "none", cursor: "pointer", maxWidth: 180,
          }}
        >
          {FONT_GROUPS.map(({ category, fonts }) => (
            <optgroup key={category} label={category}>
              {fonts.map((f) => <option key={f} value={f}>{f}</option>)}
            </optgroup>
          ))}
        </select>
      </div>

      {/* Preview */}
      <div style={{
        padding: "14px 16px", background: "var(--c-surface)",
        border: "1px solid var(--c-border)", borderRadius: 8,
        fontFamily: `'${value}', sans-serif`,
      }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: "var(--color-fg)", marginBottom: 4, lineHeight: 1.2 }}>
          The quick brown fox
        </div>
        <div style={{ fontSize: 14, fontWeight: 400, color: "var(--color-muted)", marginBottom: 6, lineHeight: 1.5 }}>
          jumps over the lazy dog — 0123456789
        </div>
        <div style={{ fontSize: 11, fontWeight: 500, color: "var(--color-fg)", letterSpacing: "0.02em" }}>
          ABCDEFGHIJKLM abcdefghijklm
        </div>
      </div>

      <div style={{ marginTop: 8, fontSize: 11, color: "var(--color-muted)", fontFamily: "ui-monospace, monospace" }}>
        --font-{label === "Principale" ? "primary" : "secondary"}: {getFontStack(value)}
      </div>
    </div>
  );
}

function MoodSwatch({ label, desc, value, onChange }: {
  label: string; desc: string; value: string; onChange: (v: string) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState(value);

  // Sync draft when value changes externally (reset, apply palette…)
  React.useEffect(() => { setDraft(value); }, [value]);

  function handleHexInput(raw: string) {
    setDraft(raw);
    const normalized = raw.startsWith("#") ? raw : "#" + raw;
    if (/^#[0-9a-fA-F]{6}$/.test(normalized)) onChange(normalized);
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div
        onClick={() => inputRef.current?.click()}
        title={`Ouvrir le color picker — ${label}`}
        style={{
          width: "100%", minHeight: 72, backgroundColor: value,
          borderRadius: 14, cursor: "pointer",
          border: "2px solid rgba(0,0,0,0.08)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
          position: "relative", transition: "transform 0.15s, box-shadow 0.15s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "none";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.10)";
        }}
      >
        <input
          ref={inputRef} type="color" value={value}
          onChange={(e) => { onChange(e.target.value); setDraft(e.target.value); }}
          style={{ position: "absolute", opacity: 0, width: 0, height: 0, pointerEvents: "none" }}
        />
      </div>
      <div style={{ width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-fg)", marginBottom: 2, height: 18, overflow: "hidden" }}>{label}</div>
        <div style={{ fontSize: 10, color: "var(--color-muted)", marginBottom: 6, height: 14, overflow: "hidden" }}>{desc}</div>
        <input
          type="text"
          value={draft}
          onChange={(e) => handleHexInput(e.target.value)}
          maxLength={7}
          spellCheck={false}
          style={{
            width: "100%", fontSize: 11, fontFamily: "ui-monospace, monospace",
            textAlign: "center", color: "var(--color-fg)",
            backgroundColor: "var(--c-surface-elevated)",
            border: `1px solid ${/^#[0-9a-fA-F]{6}$/.test(draft) ? "var(--c-border)" : "#CC4A48"}`,
            borderRadius: 6, padding: "4px 6px", outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "28px 0 14px" }}>
      <span style={{
        fontSize: 11, fontWeight: 600, color: "var(--color-muted)",
        textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap",
      }}>
        {children}
      </span>
      <div style={{ flex: 1, height: 1, backgroundColor: "var(--c-border)" }} />
    </div>
  );
}

const tokenTag = {
  fontSize: 11, color: "var(--color-muted)",
  fontFamily: "ui-monospace, monospace",
  background: "var(--c-surface-elevated)",
  border: "1px solid var(--c-border)",
  borderRadius: 4, padding: "2px 8px",
} as const;

function ColorRow({ label, token, value, onChange }: {
  label: string; token: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)}
        style={{
          width: 34, height: 34, border: "1px solid var(--c-border)", borderRadius: 6,
          cursor: "pointer", padding: 2, backgroundColor: "var(--c-surface-elevated)", flexShrink: 0,
        }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: "var(--color-fg)", fontWeight: 500 }}>{label}</div>
        <div style={{ fontSize: 11, color: "var(--color-muted)", fontFamily: "ui-monospace, monospace" }}>{token}</div>
      </div>
      <span style={tokenTag}>{value}</span>
    </div>
  );
}

function SliderRow({ label, token, value, onChange, min, max, unit = "px", step = "1" }: {
  label: string; token: string; value: string; onChange: (v: string) => void;
  min: number; max: number; unit?: string; step?: string;
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <div>
          <span style={{ fontSize: 13, color: "var(--color-fg)", fontWeight: 500 }}>{label}</span>
          <span style={{ fontSize: 11, color: "var(--color-muted)", fontFamily: "ui-monospace, monospace", marginLeft: 8 }}>{token}</span>
        </div>
        <span style={tokenTag}>{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", accentColor: "#CC4A48" }} />
    </div>
  );
}

function SelectRow({ label, token, value, onChange, options }: {
  label: string; token: string; value: string;
  onChange: (v: string) => void; options: string[];
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: "var(--color-fg)", fontWeight: 500 }}>{label}</div>
        <div style={{ fontSize: 11, color: "var(--color-muted)", fontFamily: "ui-monospace, monospace" }}>{token}</div>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          fontSize: 12, fontFamily: "ui-monospace, monospace",
          color: "var(--color-fg)", backgroundColor: "var(--c-surface-elevated)",
          border: "1px solid var(--c-border)", borderRadius: 6,
          padding: "5px 10px", outline: "none", cursor: "pointer",
        }}
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function ClampRow({ label, token, minVal, onMin, vwVal, onVw, maxVal, onMax }: {
  label: string; token: string;
  minVal: string; onMin: (v: string) => void;
  vwVal: string; onVw: (v: string) => void;
  maxVal: string; onMax: (v: string) => void;
}) {
  const composed = clampVal(minVal, vwVal, maxVal);
  return (
    <div style={{ marginBottom: 18, padding: "12px 14px", background: "var(--c-surface-elevated)", borderRadius: 8, border: "1px solid var(--c-border)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div>
          <span style={{ fontSize: 13, color: "var(--color-fg)", fontWeight: 500 }}>{label}</span>
          <span style={{ fontSize: 11, color: "var(--color-muted)", fontFamily: "ui-monospace, monospace", marginLeft: 8 }}>{token}</span>
        </div>
        <span style={{ ...tokenTag, maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{composed}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        {[
          { sub: "min", unit: "px", val: minVal, onChange: onMin, min: 8, max: 48 },
          { sub: "viewport", unit: "vw", val: vwVal, onChange: onVw, min: 1, max: 20 },
          { sub: "max", unit: "px", val: maxVal, onChange: onMax, min: 20, max: 96 },
        ].map(({ sub, unit, val, onChange, min, max }) => (
          <div key={sub}>
            <div style={{ fontSize: 10, color: "var(--color-muted)", marginBottom: 4 }}>
              {sub} <span style={{ fontFamily: "ui-monospace, monospace" }}>{val}{unit}</span>
            </div>
            <input type="range" min={min} max={max} value={val}
              onChange={(e) => onChange(e.target.value)}
              style={{ width: "100%", accentColor: "#CC4A48" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function CompactGrid({ items }: {
  items: { label: string; token: string; value: string; onChange: (v: string) => void; min?: number; max?: number; step?: number }[];
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 8, marginBottom: 8 }}>
      {items.map(({ label, token, value, onChange, min = 0, max = 1000, step = 1 }) => (
        <div key={token} style={{
          background: "var(--c-surface-elevated)", border: "1px solid var(--c-border)",
          borderRadius: 8, padding: "10px 12px",
        }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-fg)", marginBottom: 2 }}>{label}</div>
          <div style={{ fontSize: 10, color: "var(--color-muted)", fontFamily: "ui-monospace, monospace", marginBottom: 6 }}>{token}</div>
          <input type="number" min={min} max={max} step={step} value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{
              width: "100%", fontSize: 13, fontFamily: "ui-monospace, monospace",
              color: "var(--color-fg)", backgroundColor: "var(--c-surface)",
              border: "1px solid var(--c-border)", borderRadius: 4, padding: "4px 6px", outline: "none",
            }} />
        </div>
      ))}
    </div>
  );
}

// ── Preview tabs ──────────────────────────────────────────────────────────────

type PreviewTab = "composants" | "typo" | "spacing" | "effets";

function LivePreview({ c }: { c: ThemeConfig }) {
  const [tab, setTab] = useState<PreviewTab>("composants");
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const shadow1 = shadowVal(c.shadow1Y, c.shadow1Blur, c.shadow1Opacity);
  const shadow2 = shadowVal(c.shadow2Y, c.shadow2Blur, c.shadow2Opacity);
  const focusRing = focusRingVal(c.focusRingSpread, c.focusRingColor, c.focusRingOpacity);
  const transAll = transVal("all", c.transitionAllDuration, c.transitionAllEasing);

  const tabs: { id: PreviewTab; label: string }[] = [
    { id: "composants", label: "Composants" },
    { id: "typo", label: "Typo" },
    { id: "spacing", label: "Espaces" },
    { id: "effets", label: "Effets" },
  ];

  return (
    <div style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: 10, overflow: "hidden" }}>
      {/* Tab bar */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--c-border)" }}>
        {tabs.map(({ id, label }) => (
          <button key={id} onClick={() => setTab(id)}
            style={{
              flex: 1, padding: "10px 4px", fontSize: 11, fontWeight: 600,
              color: tab === id ? c.colorBrand : c.colorMuted,
              backgroundColor: "transparent", border: "none",
              borderBottom: tab === id ? `2px solid ${c.colorBrand}` : "2px solid transparent",
              cursor: "pointer", transition: "color 0.15s",
            }}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ padding: 16, backgroundColor: c.colorBg }}>

        {/* ── Composants ── */}
        {tab === "composants" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Palette mood */}
            <div style={{ display: "flex", gap: 6, marginBottom: 2 }}>
              {[
                { label: "Primaire", color: c.palettePrimaire },
                { label: "Secondaire", color: c.paletteSecondaire },
                { label: "Accent", color: c.paletteAccent },
                { label: "Neutre", color: c.paletteNeutre },
                { label: "Fond", color: c.paletteFond },
              ].map(({ label, color }) => (
                <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ width: "100%", height: 32, backgroundColor: color, borderRadius: 6, border: "1px solid rgba(0,0,0,0.08)" }} />
                  <span style={{ fontSize: 9, color: c.colorMuted, textAlign: "center" }}>{label}</span>
                </div>
              ))}
            </div>
            <div style={{ height: 1, backgroundColor: c.cBorder }} />
            {/* Card */}
            <div style={{
              backgroundColor: c.cSurface, border: `${c.borderXm}px solid ${c.cBorder}`,
              borderRadius: Number(c.radiusMd) + "px", padding: 14, boxShadow: shadow1,
            }}>
              <div style={{ fontSize: Number(c.fontsizeMedium) + "px", fontWeight: Number(c.fontweightBold), color: c.colorFg, marginBottom: 4 }}>
                Titre du composant
              </div>
              <div style={{ fontSize: Number(c.fontsizeSm) + "px", color: c.colorMuted, lineHeight: 1.5, marginBottom: 10 }}>
                Description illustrant les tokens de couleur, typographie et bordures.
              </div>
              <div style={{
                backgroundColor: c.cSurfaceElevated, border: `${c.borderXm}px solid ${c.cBorder}`,
                borderRadius: Number(c.radiusSm) + "px", padding: `${c.space2}px ${c.space3}px`,
                fontSize: Number(c.fontsize2xs) + "px", color: c.colorMuted, fontFamily: "ui-monospace, monospace",
              }}>
                surface-elevated · radius-sm
              </div>
            </div>

            {/* Badges sémantiques */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {[
                { label: "Brand", color: c.colorBrand },
                { label: "Succès", color: c.colorSuccess },
                { label: "Warning", color: c.colorWarning },
                { label: "Info", color: c.colorInfo },
                { label: "Erreur", color: c.colorError },
              ].map(({ label, color }) => (
                <span key={label} style={{
                  fontSize: Number(c.fontsize2xs) + "px", fontWeight: Number(c.fontweightSemibold),
                  color, backgroundColor: color + "1a", border: `${c.borderXm}px solid ${color}40`,
                  borderRadius: Number(c.radiusSm) + "px", padding: "2px 8px",
                }}>{label}</span>
              ))}
            </div>

            {/* Brand subtle */}
            <div style={{
              backgroundColor: c.cBrandSubtle, border: `${c.borderXm}px solid ${c.cBrandBorder}`,
              borderRadius: Number(c.radiusSm) + "px", padding: `${c.space2}px ${c.space3}px`,
              fontSize: Number(c.fontsizeXs) + "px", color: c.colorBrand, fontWeight: Number(c.fontweightMedium),
            }}>
              Brand subtle + border
            </div>

            {/* Bouton interactif */}
            <button
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{
                width: "100%", padding: `${c.space2}px ${c.space4}px`,
                fontSize: Number(c.fontsizeSm) + "px", fontWeight: Number(c.fontweightSemibold),
                color: "#FBFBFB",
                backgroundColor: hovered ? c.colorBrand + "cc" : c.colorBrand,
                border: "none", borderRadius: Number(c.radiusSm) + "px", cursor: "pointer",
                boxShadow: focused ? focusRing : shadow1,
                transition: transAll,
                transform: hovered ? "translateY(-1px)" : "none",
              }}>
              Bouton — hover & focus moi
            </button>
            <div style={{ fontSize: 10, color: c.colorMuted, textAlign: "center", fontStyle: "italic" }}>
              ↑ Survole ou focus avec Tab pour tester transition + focus-ring
            </div>
          </div>
        )}

        {/* ── Typographie ── */}
        {tab === "typo" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {/* Font pair preview */}
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              {[
                { label: "Principale", font: c.fontPrimary, role: "titres" },
                { label: "Secondaire", font: c.fontSecondary, role: "corps" },
              ].map(({ label, font, role }) => (
                <div key={label} style={{
                  flex: 1, padding: "8px 10px", background: c.cSurfaceElevated,
                  border: `1px solid ${c.cBorder}`, borderRadius: Number(c.radiusSm) + "px",
                }}>
                  <div style={{ fontSize: 9, color: c.colorMuted, marginBottom: 4 }}>{label} · {role}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: c.colorFg, fontFamily: `'${font}', sans-serif`, lineHeight: 1.2 }}>
                    {font}
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 400, color: c.colorMuted, fontFamily: `'${font}', sans-serif` }}>
                    Aa Bb Cc 123
                  </div>
                </div>
              ))}
            </div>
            <div style={{ height: 1, backgroundColor: c.cBorder, marginBottom: 4 }} />
            {[
              { label: "2xs", size: c.fontsize2xs + "px", weight: c.fontweightNormal },
              { label: "xs", size: c.fontsizeXs + "px", weight: c.fontweightNormal },
              { label: "sm", size: c.fontsizeSm + "px", weight: c.fontweightNormal },
              { label: "medium", size: c.fontsizeMedium + "px", weight: c.fontweightMedium },
              { label: "lg", size: clampVal(c.fontsizeLgMin, c.fontsizeLgVw, c.fontsizeLgMax), weight: c.fontweightSemibold },
              { label: "xl", size: clampVal(c.fontsizeXlMin, c.fontsizeXlVw, c.fontsizeXlMax), weight: c.fontweightBold },
              { label: "2xl", size: clampVal(c.fontsize2xlMin, c.fontsize2xlVw, c.fontsize2xlMax), weight: c.fontweightBold },
              { label: "3xl", size: clampVal(c.fontsize3xlMin, c.fontsize3xlVw, c.fontsize3xlMax), weight: c.fontweightExtrabold },
            ].map(({ label, size, weight }) => (
              <div key={label} style={{ display: "flex", alignItems: "baseline", gap: 10, borderBottom: `1px solid ${c.cBorder}`, paddingBottom: 4 }}>
                <span style={{ fontSize: size, fontWeight: Number(weight), color: c.colorFg, lineHeight: 1.2 }}>Aa</span>
                <span style={{ fontSize: 10, color: c.colorMuted, fontFamily: "ui-monospace, monospace", flexShrink: 0 }}>
                  {label} · {weight}
                </span>
              </div>
            ))}
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: Number(c.fontsizeSm) + "px", color: c.colorFg, fontWeight: Number(c.fontweightNormal), marginBottom: 2 }}>
                Texte courant — fontweight-normal
              </div>
              <div style={{ fontSize: Number(c.fontsizeSm) + "px", color: c.colorMuted }}>
                Texte secondaire — color-muted
              </div>
            </div>
          </div>
        )}

        {/* ── Espacements ── */}
        {tab === "spacing" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { token: "--space-1", val: c.space1 },
              { token: "--space-1-5", val: c.space1_5 },
              { token: "--space-2", val: c.space2 },
              { token: "--space-3", val: c.space3 },
              { token: "--space-4", val: c.space4 },
              { token: "--space-5", val: c.space5 },
              { token: "--space-6", val: c.space6 },
              { token: "--space-7", val: c.space7 },
              { token: "--space-8", val: c.space8 },
              { token: "--space-10", val: c.space10 },
              { token: "--space-12", val: c.space12 },
              { token: "--space-15", val: c.space15 },
              { token: "--space-20", val: c.space20 },
            ].map(({ token, val }) => (
              <div key={token} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 10, color: c.colorMuted, fontFamily: "ui-monospace, monospace", width: 80, flexShrink: 0 }}>{token}</span>
                <div style={{
                  height: 14, width: Number(val) + "px",
                  backgroundColor: c.colorBrand + "60",
                  border: `1px solid ${c.colorBrand}`,
                  borderRadius: 2, flexShrink: 0,
                }} />
                <span style={{ fontSize: 10, color: c.colorMuted, fontFamily: "ui-monospace, monospace" }}>{val}px</span>
              </div>
            ))}
          </div>
        )}

        {/* ── Effets ── */}
        {tab === "effets" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Radius */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: c.colorMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Radius</div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
                {[
                  { label: "sm", r: c.radiusSm },
                  { label: "md", r: c.radiusMd },
                  { label: "lg", r: c.radiusLg },
                  { label: "full", r: c.radiusFull },
                ].map(({ label, r }) => (
                  <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{
                      width: 40, height: 40, backgroundColor: c.colorBrand + "30",
                      border: `2px solid ${c.colorBrand}`, borderRadius: Math.min(Number(r), 20) + "px",
                    }} />
                    <span style={{ fontSize: 9, color: c.colorMuted, fontFamily: "ui-monospace, monospace" }}>{r}px</span>
                    <span style={{ fontSize: 9, color: c.colorMuted }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Borders */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: c.colorMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Bordures</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  { label: "--border-xm", width: c.borderXm },
                  { label: "--border-sm", width: c.borderSm },
                  { label: "--border-md", width: c.borderMd },
                ].map(({ label, width }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 10, color: c.colorMuted, fontFamily: "ui-monospace, monospace", width: 90, flexShrink: 0 }}>{label}</span>
                    <div style={{ flex: 1, borderTop: `${width}px solid ${c.colorFg}` }} />
                    <span style={{ fontSize: 10, color: c.colorMuted, fontFamily: "ui-monospace, monospace" }}>{width}px</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shadows */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: c.colorMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Ombres</div>
              <div style={{ display: "flex", gap: 12 }}>
                {[
                  { label: "--shadow-1", shadow: shadow1 },
                  { label: "--shadow-2", shadow: shadow2 },
                ].map(({ label, shadow }) => (
                  <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{
                      width: "100%", height: 48, backgroundColor: c.cSurface,
                      border: `1px solid ${c.cBorder}`, borderRadius: Number(c.radiusSm) + "px",
                      boxShadow: shadow,
                    }} />
                    <span style={{ fontSize: 9, color: c.colorMuted, fontFamily: "ui-monospace, monospace", textAlign: "center" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Focus ring */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: c.colorMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Focus ring</div>
              <div style={{
                padding: `${c.space2}px ${c.space3}px`,
                fontSize: Number(c.fontsizeSm) + "px", color: c.colorFg,
                backgroundColor: c.cSurface, border: `${c.borderXm}px solid ${c.cBorder}`,
                borderRadius: Number(c.radiusSm) + "px", boxShadow: focusRing,
                fontFamily: "ui-monospace, monospace",
              }}>
                Focus ring actif
              </div>
            </div>

            {/* Transitions info */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: c.colorMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Transitions</div>
              <div style={{ fontSize: 11, color: c.colorMuted, fontFamily: "ui-monospace, monospace", display: "flex", flexDirection: "column", gap: 3 }}>
                <div>--transition-bg: {transVal("background", c.transitionBgDuration, c.transitionBgEasing)}</div>
                <div>--transition-all: {transVal("all", c.transitionAllDuration, c.transitionAllEasing)}</div>
              </div>
            </div>

            {/* Z-index */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: c.colorMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Z-index</div>
              <div style={{ display: "flex", gap: 6 }}>
                {[
                  { label: "base", val: c.zBase },
                  { label: "drawer", val: c.zDrawer },
                  { label: "dropdown", val: c.zDropdown },
                  { label: "modal", val: c.zModal },
                ].map(({ label, val }) => (
                  <div key={label} style={{ flex: 1, textAlign: "center", padding: "6px 4px", backgroundColor: c.cSurfaceElevated, border: `1px solid ${c.cBorder}`, borderRadius: Number(c.radiusSm) + "px" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: c.colorBrand, fontFamily: "ui-monospace, monospace" }}>{val}</div>
                    <div style={{ fontSize: 9, color: c.colorMuted }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Page principale ───────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  { id: "fonts", label: "Polices" },
  { id: "palette", label: "Palette" },
  { id: "colors", label: "Couleurs" },
  { id: "surfaces", label: "Surfaces" },
  { id: "fontsize-fixed", label: "Tailles fixes" },
  { id: "fontsize-clamp", label: "Tailles fluides" },
  { id: "fontweight", label: "Graisses" },
  { id: "spacing", label: "Espacements" },
  { id: "borders", label: "Bordures" },
  { id: "radius", label: "Radius" },
  { id: "shadows", label: "Ombres" },
  { id: "transitions", label: "Transitions" },
  { id: "accessibility", label: "A11y" },
  { id: "zindex", label: "Z-index" },
];

const EASING_OPTIONS = ["ease", "ease-in", "ease-out", "ease-in-out", "linear"];

export default function ThemeBuilderPage() {
  const [config, setConfig] = useState<ThemeConfig>(DEFAULTS);

  function set(key: keyof ThemeConfig) {
    return (value: string) => setConfig((prev) => ({ ...prev, [key]: value }));
  }

  const css = generateCSS(config);

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: "var(--color-fg)", letterSpacing: "-0.02em", marginBottom: 10 }}>
          Theme Builder
        </h1>
        <p style={{ fontSize: 15, color: "var(--color-muted)", lineHeight: 1.65, maxWidth: 640 }}>
          Personnalisez les design tokens CSS et téléchargez{" "}
          <code style={{ fontSize: 13, fontFamily: "ui-monospace, monospace", background: "var(--c-surface-elevated)", padding: "1px 6px", borderRadius: 4 }}>
            tokens.css
          </code>{" "}
          à importer par-dessus{" "}
          <code style={{ fontSize: 13, fontFamily: "ui-monospace, monospace", background: "var(--c-surface-elevated)", padding: "1px 6px", borderRadius: 4 }}>
            @brickslab./theme-default
          </code>.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 310px", gap: 20, alignItems: "start" }}>

        {/* ── Col 1 : navigation ── */}
        <nav style={{ position: "sticky", top: 80, background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: 10, padding: "12px 0" }}>
          {NAV_SECTIONS.map(({ id, label }) => (
            <a key={id} href={`#${id}`}
              style={{ display: "block", padding: "7px 16px", fontSize: 13, color: "var(--color-muted)", textDecoration: "none", borderLeft: "2px solid transparent", transition: "color 0.15s" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--color-fg)"; el.style.borderLeftColor = "#CC4A48"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--color-muted)"; el.style.borderLeftColor = "transparent"; }}>
              {label}
            </a>
          ))}
        </nav>

        {/* ── Col 2 : formulaire ── */}
        <div style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: 10, padding: "24px 28px" }}>

          {/* ── Polices ── */}
          <div id="fonts">
            <SectionLabel>Polices d'écriture</SectionLabel>
            <p style={{ fontSize: 13, color: "var(--color-muted)", lineHeight: 1.55, marginBottom: 16 }}>
              Choisissez 2 polices pour votre projet. Elles seront incluses en commentaires dans le CSS généré avec les instructions d'import.
            </p>
            <FontPicker label="Principale" role="titres, labels, navigation" value={config.fontPrimary} onChange={set("fontPrimary")} />
            <FontPicker label="Secondaire" role="corps de texte, paragraphes" value={config.fontSecondary} onChange={set("fontSecondary")} />
          </div>

          {/* ── Palette identitaire ── */}
          <div id="palette">
            <SectionLabel>Palette identitaire</SectionLabel>
            <p style={{ fontSize: 13, color: "var(--color-muted)", lineHeight: 1.55, marginBottom: 20 }}>
              Définissez les 5 couleurs qui expriment le mood du projet. Cliquez sur une couleur pour la modifier.
              Utilisez <strong style={{ color: "var(--color-fg)", fontWeight: 600 }}>Appliquer aux tokens</strong> pour propager automatiquement vers les couleurs sémantiques.
            </p>
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              <MoodSwatch label="Primaire" desc="Brand / identité" value={config.palettePrimaire} onChange={set("palettePrimaire")} />
              <MoodSwatch label="Secondaire" desc="Complémentaire" value={config.paletteSecondaire} onChange={set("paletteSecondaire")} />
              <MoodSwatch label="Accent" desc="Mise en avant" value={config.paletteAccent} onChange={set("paletteAccent")} />
              <MoodSwatch label="Neutre" desc="Texte / UI" value={config.paletteNeutre} onChange={set("paletteNeutre")} />
              <MoodSwatch label="Fond" desc="Arrière-plan" value={config.paletteFond} onChange={set("paletteFond")} />
            </div>
            {/* Bande de couleurs */}
            <div style={{ display: "flex", height: 8, borderRadius: 999, overflow: "hidden", marginBottom: 20 }}>
              {[config.palettePrimaire, config.paletteSecondaire, config.paletteAccent, config.paletteNeutre, config.paletteFond].map((c, i) => (
                <div key={i} style={{ flex: 1, backgroundColor: c }} />
              ))}
            </div>
            {/* Mapping preview */}
            <div style={{
              padding: "12px 16px", background: "var(--c-surface-elevated)",
              border: "1px solid var(--c-border)", borderRadius: 8, marginBottom: 16,
              fontSize: 12, color: "var(--color-muted)", lineHeight: 1.7,
            }}>
              <div style={{ fontWeight: 600, color: "var(--color-fg)", marginBottom: 6 }}>Mapping appliqué</div>
              {[
                { from: "Primaire", to: "--color-brand, --color-error", color: config.palettePrimaire },
                { from: "Secondaire", to: "--color-info", color: config.paletteSecondaire },
                { from: "Accent", to: "--color-warning, --color-success", color: config.paletteAccent },
                { from: "Neutre", to: "--color-muted", color: config.paletteNeutre },
                { from: "Fond", to: "--color-bg, --c-surface", color: config.paletteFond },
              ].map(({ from, to, color }) => (
                <div key={from} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: color, flexShrink: 0, border: "1px solid rgba(0,0,0,0.1)" }} />
                  <span style={{ fontWeight: 500, color: "var(--color-fg)", minWidth: 80 }}>{from}</span>
                  <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 11 }}>→ {to}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setConfig(applyPalette(config))}
              style={{
                width: "100%", padding: "10px 20px", fontSize: 13, fontWeight: 600,
                color: "var(--color-fg)", backgroundColor: "var(--c-surface-elevated)",
                border: "1px solid var(--c-border)", borderRadius: config.radiusSm + "px",
                cursor: "pointer",
              }}
            >
              Appliquer aux tokens sémantiques →
            </button>
          </div>

          <div id="colors">
            <SectionLabel>Couleurs sémantiques</SectionLabel>
            <ColorRow label="Arrière-plan" token="--color-bg" value={config.colorBg} onChange={set("colorBg")} />
            <ColorRow label="Texte principal" token="--color-fg" value={config.colorFg} onChange={set("colorFg")} />
            <ColorRow label="Texte secondaire" token="--color-muted" value={config.colorMuted} onChange={set("colorMuted")} />
            <ColorRow label="Brand" token="--color-brand" value={config.colorBrand} onChange={set("colorBrand")} />
            <ColorRow label="Succès" token="--color-success" value={config.colorSuccess} onChange={set("colorSuccess")} />
            <ColorRow label="Avertissement" token="--color-warning" value={config.colorWarning} onChange={set("colorWarning")} />
            <ColorRow label="Erreur" token="--color-error" value={config.colorError} onChange={set("colorError")} />
            <ColorRow label="Info" token="--color-info" value={config.colorInfo} onChange={set("colorInfo")} />
          </div>

          <div id="surfaces">
            <SectionLabel>Surfaces & Bordures</SectionLabel>
            <ColorRow label="Surface" token="--c-surface" value={config.cSurface} onChange={set("cSurface")} />
            <ColorRow label="Surface élevée" token="--c-surface-elevated" value={config.cSurfaceElevated} onChange={set("cSurfaceElevated")} />
            <ColorRow label="Bordure" token="--c-border" value={config.cBorder} onChange={set("cBorder")} />
            <ColorRow label="Brand subtle" token="--c-brand-subtle" value={config.cBrandSubtle} onChange={set("cBrandSubtle")} />
            <ColorRow label="Brand border" token="--c-brand-border" value={config.cBrandBorder} onChange={set("cBrandBorder")} />
          </div>

          <div id="fontsize-fixed">
            <SectionLabel>Typographie — Tailles fixes</SectionLabel>
            <SliderRow label="2XS" token="--fontsize-2xs" value={config.fontsize2xs} onChange={set("fontsize2xs")} min={8} max={14} />
            <SliderRow label="XS" token="--fontsize-xs" value={config.fontsizeXs} onChange={set("fontsizeXs")} min={10} max={16} />
            <SliderRow label="SM" token="--fontsize-sm" value={config.fontsizeSm} onChange={set("fontsizeSm")} min={11} max={18} />
            <SliderRow label="Medium" token="--fontsize-medium" value={config.fontsizeMedium} onChange={set("fontsizeMedium")} min={13} max={22} />
          </div>

          <div id="fontsize-clamp">
            <SectionLabel>Typographie — Tailles fluides (clamp)</SectionLabel>
            <ClampRow label="LG" token="--fontsize-lg" minVal={config.fontsizeLgMin} onMin={set("fontsizeLgMin")} vwVal={config.fontsizeLgVw} onVw={set("fontsizeLgVw")} maxVal={config.fontsizeLgMax} onMax={set("fontsizeLgMax")} />
            <ClampRow label="XL" token="--fontsize-xl" minVal={config.fontsizeXlMin} onMin={set("fontsizeXlMin")} vwVal={config.fontsizeXlVw} onVw={set("fontsizeXlVw")} maxVal={config.fontsizeXlMax} onMax={set("fontsizeXlMax")} />
            <ClampRow label="2XL" token="--fontsize-2xl" minVal={config.fontsize2xlMin} onMin={set("fontsize2xlMin")} vwVal={config.fontsize2xlVw} onVw={set("fontsize2xlVw")} maxVal={config.fontsize2xlMax} onMax={set("fontsize2xlMax")} />
            <ClampRow label="3XL" token="--fontsize-3xl" minVal={config.fontsize3xlMin} onMin={set("fontsize3xlMin")} vwVal={config.fontsize3xlVw} onVw={set("fontsize3xlVw")} maxVal={config.fontsize3xlMax} onMax={set("fontsize3xlMax")} />
            <ClampRow label="4XL" token="--fontsize-4xl" minVal={config.fontsize4xlMin} onMin={set("fontsize4xlMin")} vwVal={config.fontsize4xlVw} onVw={set("fontsize4xlVw")} maxVal={config.fontsize4xlMax} onMax={set("fontsize4xlMax")} />
            <ClampRow label="5XL" token="--fontsize-5xl" minVal={config.fontsize5xlMin} onMin={set("fontsize5xlMin")} vwVal={config.fontsize5xlVw} onVw={set("fontsize5xlVw")} maxVal={config.fontsize5xlMax} onMax={set("fontsize5xlMax")} />
          </div>

          <div id="fontweight">
            <SectionLabel>Typographie — Graisses</SectionLabel>
            <CompactGrid items={[
              { label: "Thin", token: "--fontweight-thin", value: config.fontweightThin, onChange: set("fontweightThin"), min: 100, max: 900, step: 100 },
              { label: "Extralight", token: "--fontweight-extralight", value: config.fontweightExtralight, onChange: set("fontweightExtralight"), min: 100, max: 900, step: 100 },
              { label: "Light", token: "--fontweight-light", value: config.fontweightLight, onChange: set("fontweightLight"), min: 100, max: 900, step: 100 },
              { label: "Normal", token: "--fontweight-normal", value: config.fontweightNormal, onChange: set("fontweightNormal"), min: 100, max: 900, step: 100 },
              { label: "Medium", token: "--fontweight-medium", value: config.fontweightMedium, onChange: set("fontweightMedium"), min: 100, max: 900, step: 100 },
              { label: "Semibold", token: "--fontweight-semibold", value: config.fontweightSemibold, onChange: set("fontweightSemibold"), min: 100, max: 900, step: 100 },
              { label: "Bold", token: "--fontweight-bold", value: config.fontweightBold, onChange: set("fontweightBold"), min: 100, max: 900, step: 100 },
              { label: "Extrabold", token: "--fontweight-extrabold", value: config.fontweightExtrabold, onChange: set("fontweightExtrabold"), min: 100, max: 900, step: 100 },
              { label: "Black", token: "--fontweight-black", value: config.fontweightBlack, onChange: set("fontweightBlack"), min: 100, max: 900, step: 100 },
            ]} />
          </div>

          <div id="spacing">
            <SectionLabel>Espacements</SectionLabel>
            <CompactGrid items={[
              { label: "space-1", token: "--space-1", value: config.space1, onChange: set("space1"), min: 0, max: 8 },
              { label: "space-1-5", token: "--space-1-5", value: config.space1_5, onChange: set("space1_5"), min: 0, max: 12 },
              { label: "space-2", token: "--space-2", value: config.space2, onChange: set("space2"), min: 0, max: 16 },
              { label: "space-3", token: "--space-3", value: config.space3, onChange: set("space3"), min: 0, max: 24 },
              { label: "space-4", token: "--space-4", value: config.space4, onChange: set("space4"), min: 0, max: 32 },
              { label: "space-5", token: "--space-5", value: config.space5, onChange: set("space5"), min: 0, max: 40 },
              { label: "space-6", token: "--space-6", value: config.space6, onChange: set("space6"), min: 0, max: 48 },
              { label: "space-7", token: "--space-7", value: config.space7, onChange: set("space7"), min: 0, max: 56 },
              { label: "space-8", token: "--space-8", value: config.space8, onChange: set("space8"), min: 0, max: 64 },
              { label: "space-10", token: "--space-10", value: config.space10, onChange: set("space10"), min: 0, max: 80 },
              { label: "space-12", token: "--space-12", value: config.space12, onChange: set("space12"), min: 0, max: 96 },
              { label: "space-15", token: "--space-15", value: config.space15, onChange: set("space15"), min: 0, max: 120 },
              { label: "space-20", token: "--space-20", value: config.space20, onChange: set("space20"), min: 0, max: 160 },
            ]} />
          </div>

          <div id="borders">
            <SectionLabel>Épaisseurs de bordure</SectionLabel>
            <SliderRow label="XM (fine)" token="--border-xm" value={config.borderXm} onChange={set("borderXm")} min={1} max={4} />
            <SliderRow label="SM" token="--border-sm" value={config.borderSm} onChange={set("borderSm")} min={1} max={6} />
            <SliderRow label="MD" token="--border-md" value={config.borderMd} onChange={set("borderMd")} min={1} max={12} />
          </div>

          <div id="radius">
            <SectionLabel>Radius</SectionLabel>
            <SliderRow label="SM" token="--radius-sm" value={config.radiusSm} onChange={set("radiusSm")} min={0} max={16} />
            <SliderRow label="MD" token="--radius-md" value={config.radiusMd} onChange={set("radiusMd")} min={0} max={24} />
            <SliderRow label="LG" token="--radius-lg" value={config.radiusLg} onChange={set("radiusLg")} min={0} max={32} />
            <SliderRow label="Full (pill)" token="--radius-full" value={config.radiusFull} onChange={set("radiusFull")} min={0} max={999} />
          </div>

          <div id="shadows">
            <SectionLabel>Ombres</SectionLabel>
            <div style={{ padding: "14px 16px", background: "var(--c-surface-elevated)", border: "1px solid var(--c-border)", borderRadius: 8, marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-fg)", marginBottom: 10 }}>
                --shadow-1
                <span style={{ ...tokenTag, marginLeft: 10 }}>{shadowVal(config.shadow1Y, config.shadow1Blur, config.shadow1Opacity)}</span>
              </div>
              <SliderRow label="Décalage Y" token="y" value={config.shadow1Y} onChange={set("shadow1Y")} min={0} max={20} />
              <SliderRow label="Blur" token="blur" value={config.shadow1Blur} onChange={set("shadow1Blur")} min={0} max={40} />
              <SliderRow label="Opacité" token="opacity" value={config.shadow1Opacity} onChange={set("shadow1Opacity")} min={0} max={1} step="0.01" unit="" />
            </div>
            <div style={{ padding: "14px 16px", background: "var(--c-surface-elevated)", border: "1px solid var(--c-border)", borderRadius: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-fg)", marginBottom: 10 }}>
                --shadow-2
                <span style={{ ...tokenTag, marginLeft: 10 }}>{shadowVal(config.shadow2Y, config.shadow2Blur, config.shadow2Opacity)}</span>
              </div>
              <SliderRow label="Décalage Y" token="y" value={config.shadow2Y} onChange={set("shadow2Y")} min={0} max={40} />
              <SliderRow label="Blur" token="blur" value={config.shadow2Blur} onChange={set("shadow2Blur")} min={0} max={80} />
              <SliderRow label="Opacité" token="opacity" value={config.shadow2Opacity} onChange={set("shadow2Opacity")} min={0} max={1} step="0.01" unit="" />
            </div>
          </div>

          <div id="transitions">
            <SectionLabel>Transitions</SectionLabel>
            <div style={{ padding: "14px 16px", background: "var(--c-surface-elevated)", border: "1px solid var(--c-border)", borderRadius: 8, marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-fg)", marginBottom: 10 }}>--transition-bg</div>
              <SliderRow label="Durée" token="duration" value={config.transitionBgDuration} onChange={set("transitionBgDuration")} min={0} max={1} step="0.05" unit="s" />
              <SelectRow label="Easing" token="easing" value={config.transitionBgEasing} onChange={set("transitionBgEasing")} options={EASING_OPTIONS} />
            </div>
            <div style={{ padding: "14px 16px", background: "var(--c-surface-elevated)", border: "1px solid var(--c-border)", borderRadius: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-fg)", marginBottom: 10 }}>--transition-all</div>
              <SliderRow label="Durée" token="duration" value={config.transitionAllDuration} onChange={set("transitionAllDuration")} min={0} max={1} step="0.05" unit="s" />
              <SelectRow label="Easing" token="easing" value={config.transitionAllEasing} onChange={set("transitionAllEasing")} options={EASING_OPTIONS} />
            </div>
          </div>

          <div id="accessibility">
            <SectionLabel>Accessibilité — Focus ring</SectionLabel>
            <div style={{ padding: "14px 16px", background: "var(--c-surface-elevated)", border: "1px solid var(--c-border)", borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: "var(--color-muted)", fontFamily: "ui-monospace, monospace", marginBottom: 12 }}>
                {focusRingVal(config.focusRingSpread, config.focusRingColor, config.focusRingOpacity)}
              </div>
              <ColorRow label="Couleur" token="focus color" value={config.focusRingColor} onChange={set("focusRingColor")} />
              <SliderRow label="Spread" token="spread" value={config.focusRingSpread} onChange={set("focusRingSpread")} min={1} max={10} />
              <SliderRow label="Opacité" token="opacity" value={config.focusRingOpacity} onChange={set("focusRingOpacity")} min={0} max={1} step="0.05" unit="" />
            </div>
          </div>

          <div id="zindex">
            <SectionLabel>Z-index</SectionLabel>
            <CompactGrid items={[
              { label: "Base", token: "--z-base", value: config.zBase, onChange: set("zBase"), min: 0, max: 100 },
              { label: "Drawer", token: "--z-drawer", value: config.zDrawer, onChange: set("zDrawer"), min: 0, max: 200 },
              { label: "Dropdown", token: "--z-dropdown", value: config.zDropdown, onChange: set("zDropdown"), min: 0, max: 500 },
              { label: "Modal", token: "--z-modal", value: config.zModal, onChange: set("zModal"), min: 0, max: 9999 },
            ]} />
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 12, marginTop: 36, paddingTop: 24, borderTop: "1px solid var(--c-border)" }}>
            <button
              onClick={() => downloadCSS(css)}
              style={{
                flex: 1, padding: "11px 20px", fontSize: 14, fontWeight: 600,
                color: "#FBFBFB", backgroundColor: "#CC4A48", border: "none",
                borderRadius: config.radiusSm + "px", cursor: "pointer",
              }}>
              Télécharger tokens.css
            </button>
            <button
              onClick={() => setConfig(DEFAULTS)}
              style={{
                padding: "11px 20px", fontSize: 14, fontWeight: 500,
                color: "var(--color-muted)", backgroundColor: "var(--c-surface-elevated)",
                border: "1px solid var(--c-border)", borderRadius: config.radiusSm + "px", cursor: "pointer",
              }}>
              Reset
            </button>
          </div>
        </div>

        {/* ── Col 3 : aperçu live + CSS ── */}
        <div style={{ position: "sticky", top: 80, display: "flex", flexDirection: "column", gap: 14 }}>
          <LivePreview c={config} />

          {/* CSS output */}
          <div style={{ background: "#0b1220", borderRadius: 10, padding: "14px 18px", overflow: "hidden" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#52607a", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
              CSS généré
            </div>
            <pre style={{ fontSize: 10, lineHeight: 1.6, color: "#FBFBFB", fontFamily: "ui-monospace, monospace", overflow: "auto", maxHeight: 280, margin: 0 }}>
              {css}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}
