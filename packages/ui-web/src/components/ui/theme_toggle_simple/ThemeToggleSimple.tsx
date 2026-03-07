'use client';

import React, { useState, useEffect } from "react";
import { ThemeToggleSimpleProps } from "./ThemeToggleSimple.type";

export function ThemeToggleSimple({
  className = "",
  mode: initialMode = "system",
  onChange,
  label,
}: ThemeToggleSimpleProps) {
  const [mode, setMode] = useState<"light" | "dark" | "system">(initialMode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const nextMode: "light" | "dark" | "system" =
      mode === "light" ? "dark" : mode === "dark" ? "system" : "light";
    setMode(nextMode);
    onChange?.(nextMode);

    // Apply theme to document
    if (nextMode === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", nextMode);
    }
  };

  if (!mounted) return null;

  const modeLabels: Record<string, string> = {
    light: "Light",
    dark: "Dark",
    system: "System",
  };

  return (
    <button
      onClick={handleToggle}
      style={{
        padding: "var(--space-2) var(--space-4)",
        backgroundColor: "var(--c-surface)",
        border: "1px solid var(--c-border)",
        borderRadius: "var(--radius-sm)",
        cursor: "pointer",
        fontSize: "var(--fontsize-sm)",
        color: "var(--color-fg)",
      }}
      title={`Current: ${modeLabels[mode]}`}
      className={className}
    >
      {label || modeLabels[mode]}
    </button>
  );
}
