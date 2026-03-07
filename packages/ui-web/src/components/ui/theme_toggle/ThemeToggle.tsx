"use client";

import React from "react";
import { useState, useEffect } from "react";
import { ToggleSwitch } from "../toggle_switch/ToggleSwitch";
import type { ThemeToggleProps } from "./ThemeToggle.type";

export function ThemeToggle({
  onThemeChange,
  lightLabel = "Clair",
  darkLabel = "Sombre",
  storageKey = "theme",
}: ThemeToggleProps) {
  // theme state: true = dark, false = light
  const [isDark, setIsDark] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  // initialize from localStorage or system preference
  useEffect(() => {
    setMounted(true);
    try {
      const stored = typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;
      if (stored === "light") {
        setIsDark(false);
      } else if (stored === "dark") {
        setIsDark(true);
      } else if (typeof window !== "undefined" && window.matchMedia) {
        const m = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDark(m.matches);
      }
    } catch (e) {
      // ignoring if localStorage isn't available
      if (typeof window !== "undefined" && window.matchMedia) {
        const m = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDark(m.matches);
      }
    }
  }, [storageKey]);

  // apply class & persist when state changes
  useEffect(() => {
    if (!mounted) return;

    if (typeof window !== "undefined") {
      const root = document.documentElement;
      if (isDark) {
        root.classList.remove("light");
        root.classList.add("dark");
        if (root.dataset) root.dataset.theme = "dark";
        try {
          localStorage.setItem(storageKey, "dark");
        } catch (e) {
          // ignore localStorage errors
        }
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
        if (root.dataset) root.dataset.theme = "light";
        try {
          localStorage.setItem(storageKey, "light");
        } catch (e) {
          // ignore localStorage errors
        }
      }

      onThemeChange?.(isDark ? "dark" : "light");
    }
  }, [isDark, mounted, storageKey, onThemeChange]);

  if (!mounted) {
    return null;
  }

  return (
    <ToggleSwitch
      checked={!isDark}
      onChange={(checked) => setIsDark(!checked)}
      label={isDark ? darkLabel : lightLabel}
      disabled={false}
    />
  );
}
