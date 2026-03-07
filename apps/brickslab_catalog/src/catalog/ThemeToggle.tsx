"use client";

import { useEffect, useState } from "react";
import { ThemeToggler } from "@brickslab./ui-web";

function getInitialMode(): "light" | "dark" {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function ThemeToggle() {
  const [mode, setMode] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    setMode(getInitialMode());
  }, []);

  const handleChange = (next: "light" | "dark" | "system") => {
    const m = next === "system" ? "light" : next;
    setMode(m);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(m);
    try { localStorage.setItem("theme", m); } catch {}
  };

  if (mode === null) return null;

  return (
    <ThemeToggler
      mode={mode}
      onChange={handleChange}
      rippleLayer="under"
    />
  );
}
