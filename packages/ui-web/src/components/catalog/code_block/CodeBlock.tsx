"use client";

import React from "react";
import { useState } from "react";
import { CodeBlockProps } from "./CodeBlock.type";

// ── Variante simple (ancienne) ──────────────────────────────────────────────
function SimpleCodeBlock({ code, language, onCopy, copied }: {
  code: string;
  language: string;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div style={{ position: "relative", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
      <span
        style={{
          position: "absolute",
          top: 12,
          left: 16,
          fontSize: "var(--fontsize-xs)",
          fontWeight: 500,
          color: "var(--color-muted)",
          fontFamily: "var(--font-mono), ui-monospace, monospace",
          opacity: 0.7,
          zIndex: 1,
        }}
      >
        {language}
      </span>
      <button
        onClick={onCopy}
        style={{
          position: "absolute",
          top: 10,
          right: 12,
          zIndex: 1,
          padding: "var(--space-1) var(--space-3)",
          fontSize: "var(--fontsize-xs)",
          fontWeight: 600,
          fontFamily: "var(--font-brand), Montserrat, sans-serif",
          color: copied ? "var(--color-success)" : "var(--color-muted)",
          background: "var(--c-surface)",
          border: "1px solid var(--c-border)",
          borderRadius: "var(--radius-sm)",
          cursor: "pointer",
          transition: "color 0.2s, border-color 0.2s",
        }}
      >
        {copied ? "Copié !" : "Copier"}
      </button>
      <pre
        style={{
          backgroundColor: "var(--c-surface-elevated)",
          border: "1px solid var(--c-border)",
          borderRadius: "var(--radius-md)",
          padding: "var(--space-10) var(--space-5) var(--space-5)",
          overflowX: "auto",
          margin: 0,
          fontSize: "var(--fontsize-sm)",
          lineHeight: 1.65,
          fontFamily: "var(--font-mono), ui-monospace, 'JetBrains Mono', monospace",
          color: "var(--color-fg)",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ── Variante moderne (nouvelle default) ─────────────────────────────────────
function ModernCodeBlock({ code, language, filename, onCopy, copied }: {
  code: string;
  language: string;
  filename?: string;
  onCopy: () => void;
  copied: boolean;
}) {
  const lines = code.split("\n");

  return (
    <div
      style={{
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        border: "1px solid var(--c-border)",
      }}
    >
      {/* ── Header bar ───────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--space-2) var(--space-4)",
          background: "var(--c-surface)",
          borderBottom: "1px solid var(--c-border)",
          gap: "var(--space-4)",
        }}
      >
        {/* Dots décoratifs */}
        <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", flexShrink: 0 }}>
          {(["#CC4A48", "#F59E0B", "#4ADE80"] as const).map((color, i) => (
            <div
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: color,
                opacity: 0.75,
              }}
            />
          ))}
        </div>

        {/* Nom de fichier / langue */}
        <span
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: "var(--fontsize-xs)",
            color: "var(--color-muted)",
            fontFamily: "var(--font-mono), ui-monospace, monospace",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {filename ?? language}
        </span>

        {/* Bouton copier */}
        <button
          onClick={onCopy}
          style={{
            flexShrink: 0,
            padding: "var(--space-1) var(--space-3)",
            fontSize: "var(--fontsize-xs)",
            fontWeight: 600,
            color: copied ? "#4ADE80" : "var(--color-muted)",
            background: "transparent",
            border: `1px solid ${copied ? "#4ADE80" : "var(--c-border)"}`,
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            transition: "color 0.2s, border-color 0.2s",
            fontFamily: "var(--font-brand), Montserrat, sans-serif",
          }}
        >
          {copied ? "✓ Copié" : "Copier"}
        </button>
      </div>

      {/* ── Corps : numéros de ligne + code ──────────────────────────── */}
      <div
        style={{
          display: "flex",
          background: "var(--c-surface-elevated)",
          overflowX: "auto",
        }}
      >
        {/* Numéros de ligne */}
        <div
          aria-hidden="true"
          style={{
            padding: "var(--space-4) var(--space-3)",
            fontSize: "var(--fontsize-sm)",
            lineHeight: 1.65,
            fontFamily: "var(--font-mono), ui-monospace, monospace",
            color: "var(--color-muted)",
            textAlign: "right",
            userSelect: "none",
            opacity: 0.4,
            borderRight: "1px solid var(--c-border)",
            minWidth: "2.5rem",
            flexShrink: 0,
          }}
        >
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code */}
        <pre
          style={{
            flex: 1,
            margin: 0,
            padding: "var(--space-4) var(--space-5)",
            fontSize: "var(--fontsize-sm)",
            lineHeight: 1.65,
            fontFamily: "var(--font-mono), ui-monospace, 'JetBrains Mono', monospace",
            color: "var(--color-fg)",
            minWidth: 0,
          }}
        >
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

// ── Export principal ────────────────────────────────────────────────────────
export function CodeBlock({ code, language = "tsx", variant = "modern", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === "simple") {
    return <SimpleCodeBlock code={code} language={language} onCopy={handleCopy} copied={copied} />;
  }

  return <ModernCodeBlock code={code} language={language} filename={filename} onCopy={handleCopy} copied={copied} />;
}
