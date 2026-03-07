"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navSections } from "./navigation.data";
import { SearchCombobox } from "./SearchCombobox";
import { ThemeToggle } from "./ThemeToggle";
import { KineticUnderlineText } from "@brickslab./ui-web";
import uiWebPackage from "@brickslab./ui-web/package.json";

const topNavItems =
  (navSections.find((s) => s.section === "Navigation")?.items ?? []).filter(
    (item) => item.href !== "/mobile"
  );
const toolsNavItems = [
  { label: "Theme Builder", href: "/components/themebuilder" },
  { label: "Mockup Builder", href: "/components/mockupbuilder" },
];
const uiWebVersion = `v${uiWebPackage.version}`;

interface TopbarProps {
  sidebarOpen: boolean;
  onToggle: () => void;
}

export function Topbar({ sidebarOpen, onToggle }: TopbarProps) {
  const pathname = usePathname();
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);
  const isToolsActive = toolsNavItems.some(({ href }) => pathname === href);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (toolsRef.current?.contains(target)) return;
      setToolsOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setToolsOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <>
      <style>{`
        .topbar-nav { display: flex; align-items: center; gap: 2px; }
        @media (max-width: 768px) { .topbar-nav { display: none; } }
        .topbar-tools { position: relative; }
        .topbar-tools-btn {
          background: none;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .topbar-tools-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          min-width: 190px;
          border: 1px solid var(--c-border);
          border-radius: 10px;
          background: var(--c-surface);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
          padding: 6px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          z-index: 130;
        }
        .topbar-tools-item {
          text-decoration: none;
          border-radius: 7px;
          padding: 7px 10px;
          font-size: 12px;
          color: var(--color-muted);
          transition: background 0.15s, color 0.15s;
          white-space: nowrap;
        }
        .topbar-tools-item:hover {
          background: var(--c-brand-subtle);
          color: var(--color-fg);
        }
        .topbar-version {
          font-size: 11px;
          font-weight: 600;
          color: var(--color-brand);
          background: var(--c-brand-subtle);
          border: 1px solid var(--c-brand-border);
          border-radius: 999px;
          padding: 2px 8px;
          line-height: 1.2;
          white-space: nowrap;
        }
        @media (max-width: 900px) { .topbar-version { display: none; } }
        .topbar-search { width: min(240px, 28vw); flex-shrink: 0; }
        @media (max-width: 640px) { .topbar-search { display: none; } }
        .topbar-navlink {
          padding: 5px 11px 4px;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          border-bottom: 2px solid transparent;
          transition: color 0.15s, border-color 0.15s;
          white-space: nowrap;
        }
        .topbar-navlink:hover {
          color: var(--color-fg) !important;
        }
        .topbar-burger:hover { background: var(--c-surface-elevated); }
      `}</style>

      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 60,
          backgroundColor: "color-mix(in srgb, var(--c-surface) 70%, transparent)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid color-mix(in srgb, var(--c-border) 60%, transparent)",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 10,
          zIndex: 100,
          boxSizing: "border-box",
        }}
      >
        {/* Burger — toujours visible */}
        <button
          className="topbar-burger"
          onClick={onToggle}
          aria-label={sidebarOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={sidebarOpen}
          style={{
            background: sidebarOpen ? "var(--c-brand-subtle)" : "none",
            border: "none",
            cursor: "pointer",
            width: 36,
            height: 36,
            display: "flex",
            flexDirection: "column",
            gap: 5,
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            borderRadius: 6,
            transition: "background 0.15s",
          }}
        >
          <span
            style={{
              display: "block",
              width: 18,
              height: 1.5,
              backgroundColor: sidebarOpen ? "var(--color-brand)" : "var(--color-fg)",
              transition: "all 0.25s",
              transform: sidebarOpen ? "rotate(45deg) translateY(6.5px)" : "none",
              transformOrigin: "center",
            }}
          />
          <span
            style={{
              display: "block",
              width: 18,
              height: 1.5,
              backgroundColor: sidebarOpen ? "var(--color-brand)" : "var(--color-fg)",
              opacity: sidebarOpen ? 0 : 1,
              transition: "opacity 0.2s",
            }}
          />
          <span
            style={{
              display: "block",
              width: 18,
              height: 1.5,
              backgroundColor: sidebarOpen ? "var(--color-brand)" : "var(--color-fg)",
              transition: "all 0.25s",
              transform: sidebarOpen ? "rotate(-45deg) translateY(-6.5px)" : "none",
              transformOrigin: "center",
            }}
          />
        </button>

        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            flexShrink: 0,
            marginRight: 4,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" aria-hidden="true" width={44} height={44} style={{ minWidth: 44 }} />
          <span
            style={{
              fontFamily: "var(--font-brand), Montserrat, sans-serif",
              fontSize: 21,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            <span style={{ color: "var(--color-brand)" }}>Bricks</span>
            <span style={{ color: "var(--color-fg)" }}>lab</span>
            <span style={{ color: "var(--color-brand)" }}>.</span>
            <span style={{ color: "var(--color-fg)" }}>Tools</span>
          </span>
          <span className="topbar-version" aria-label={`Version @brickslab./ui-web ${uiWebVersion}`}>
            {uiWebVersion}
          </span>
        </Link>

        {/* Séparateur */}
        <div
          style={{
            width: 1,
            height: 18,
            backgroundColor: "var(--c-border)",
            flexShrink: 0,
          }}
        />

        {/* Liens de navigation */}
        <nav className="topbar-nav" aria-label="Navigation principale">
          {topNavItems.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="topbar-navlink"
                style={{
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "var(--color-brand)" : "var(--color-muted)",
                  borderBottomColor: isActive ? "var(--color-brand)" : "transparent",
                }}
              >
                <KineticUnderlineText trigger="hover">
                  {label}
                </KineticUnderlineText>
              </Link>
            );
          })}
          <div className="topbar-tools" ref={toolsRef}>
            <button
              type="button"
              className="topbar-navlink topbar-tools-btn"
              aria-haspopup="menu"
              aria-expanded={toolsOpen}
              onClick={() => setToolsOpen((prev) => !prev)}
              style={{
                fontWeight: isToolsActive ? 600 : 400,
                color: isToolsActive ? "var(--color-brand)" : "var(--color-muted)",
                borderBottomColor: isToolsActive ? "var(--color-brand)" : "transparent",
              }}
            >
              <KineticUnderlineText trigger="hover">Outils</KineticUnderlineText>
              <span aria-hidden="true" style={{ fontSize: 10, transform: toolsOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}>
                ▾
              </span>
            </button>
            {toolsOpen && (
              <div className="topbar-tools-menu" role="menu" aria-label="Outils">
                {toolsNavItems.map(({ label, href }) => {
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      role="menuitem"
                      className="topbar-tools-item"
                      onClick={() => setToolsOpen(false)}
                      style={{
                        color: isActive ? "var(--color-brand)" : "var(--color-muted)",
                        background: isActive ? "var(--c-brand-subtle)" : "transparent",
                        fontWeight: isActive ? 600 : 500,
                      }}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Recherche */}
        <div className="topbar-search">
          <SearchCombobox />
        </div>

        {/* Theme toggle */}
        <ThemeToggle />
      </header>
    </>
  );
}
