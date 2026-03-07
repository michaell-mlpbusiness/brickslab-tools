'use client';

import React, { useRef, useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { ThemeTogglerProps } from "./ThemeToggler.type";

const RIPPLE_DURATION = 650;

const animationStyles = `
  @keyframes bl-theme-ripple {
    from {
      clip-path: circle(0% at var(--bl-rx) var(--bl-ry));
      opacity: 1;
    }
    75% {
      clip-path: circle(150% at var(--bl-rx) var(--bl-ry));
      opacity: 1;
    }
    to {
      clip-path: circle(150% at var(--bl-rx) var(--bl-ry));
      opacity: 0;
    }
  }
  .bl-theme-ripple-overlay {
    position: fixed;
    inset: 0;
    z-index: 99999;
    pointer-events: none;
    animation: bl-theme-ripple ${RIPPLE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
`;

export function ThemeToggler({
  className = "",
  duration = 500,
  mode: initialMode = "light",
  onChange,
  reducedMotion = "auto",
  rippleLayer = "over",
}: ThemeTogglerProps) {
  const [mode, setMode] = useState<"light" | "dark">(
    initialMode === "system" ? "light" : (initialMode as "light" | "dark")
  );
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const shouldReduceMotion =
    reducedMotion === "always" ||
    (reducedMotion === "auto" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const nextMode: "light" | "dark" = mode === "light" ? "dark" : "light";

    const applyTheme = () => {
      setMode(nextMode);
      onChange?.(nextMode);
      document.documentElement.setAttribute("data-theme", nextMode);
    };

    if (shouldReduceMotion || !btnRef.current) {
      applyTheme();
      return;
    }

    const rect = btnRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    if (rippleLayer === "under" && typeof (document as any).startViewTransition === "function") {
      // View Transitions: captures real DOM snapshots — new theme expands as a circle,
      // content (text, images) stays visible through the wave.
      const vtStyle = document.createElement("style");
      vtStyle.textContent = `
        ::view-transition-new(root) {
          clip-path: circle(0% at ${x}px ${y}px);
          animation: bl-vt-ripple ${RIPPLE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        ::view-transition-old(root) { animation: none; }
        @keyframes bl-vt-ripple {
          to { clip-path: circle(150% at ${x}px ${y}px); }
        }
      `;
      document.head.appendChild(vtStyle);
      const vt = (document as any).startViewTransition(applyTheme);
      vt.finished.finally(() => vtStyle.remove());
      return;
    }

    // "over" mode (default): opaque colored overlay expands on top of everything
    const overlay = document.createElement("div");
    overlay.className = "bl-theme-ripple-overlay";
    overlay.style.setProperty("--bl-rx", `${x}px`);
    overlay.style.setProperty("--bl-ry", `${y}px`);
    overlay.style.background = nextMode === "dark" ? "#0d0d0d" : "#ffffff";
    document.body.appendChild(overlay);

    // Apply theme when overlay covers the page (~75% of animation)
    setTimeout(applyTheme, RIPPLE_DURATION * 0.55);

    // Remove overlay after animation
    setTimeout(() => overlay.remove(), RIPPLE_DURATION + 50);
  };

  if (!mounted) return null;

  const isDark = mode === "dark";

  return (
    <>
      <style>{animationStyles}</style>
      <button
        ref={btnRef}
        onClick={handleToggle}
        className={className}
        title={`Passer en mode ${isDark ? "clair" : "sombre"}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "2.25rem",
          height: "2.25rem",
          padding: 0,
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--color-fg)",
          borderRadius: "var(--radius-md)",
          transition: `color ${duration}ms ease, transform 0.2s ease`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.15)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
        }}
      >
        {isDark ? <FiMoon size={20} /> : <FiSun size={22} />}
      </button>
    </>
  );
}
