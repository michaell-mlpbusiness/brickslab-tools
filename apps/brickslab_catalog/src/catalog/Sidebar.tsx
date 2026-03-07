"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navSections } from "./navigation.data";
import { componentsData, isNewComponent } from "./components.data";

const navLinks = navSections.find((s) => s.section === "Navigation")?.items ?? [];
const sidebarSections = navSections.filter((s) => s.section !== "Navigation");
const totalComponents = sidebarSections.reduce((n, s) => n + s.items.length, 0);
const newByHref = new Map(componentsData.map((c) => [c.href, isNewComponent(c)]));

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <style>{`
        .sidebar-link:hover {
          background-color: var(--c-surface-elevated) !important;
          color: var(--color-fg) !important;
        }
        .sidebar-close:hover {
          background: var(--c-surface-elevated) !important;
          color: var(--color-fg) !important;
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(2px)",
          zIndex: 49,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.25s",
        }}
      />

      {/* Drawer */}
      <aside
        aria-label="Navigation des composants"
        aria-hidden={!isOpen}
        style={{
          position: "fixed",
          top: 60,
          left: 0,
          bottom: 0,
          width: 260,
          backgroundColor: "var(--c-surface)",
          borderRight: "1px solid var(--c-border)",
          overflowY: "auto",
          boxSizing: "border-box",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 12px 14px 20px",
            borderBottom: "1px solid var(--c-border)",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "var(--color-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              opacity: 0.7,
            }}
          >
            Composants · {totalComponents}
          </span>
          <button
            className="sidebar-close"
            onClick={onClose}
            aria-label="Fermer"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 8px",
              color: "var(--color-muted)",
              fontSize: 15,
              lineHeight: 1,
              borderRadius: 5,
              transition: "color 0.15s, background 0.15s",
            }}
          >
            ✕
          </button>
        </div>

        {/* Sections */}
        <div style={{ padding: "16px 0 32px", flex: 1 }}>
          {/* Nav links (mobile only) */}
          <div
            style={{
              padding: "0 12px 12px",
              marginBottom: 8,
              borderBottom: "1px solid var(--c-border)",
            }}
          >
            {navLinks.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className="sidebar-link"
                  style={{
                    display: "block",
                    padding: "7px 8px",
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "var(--color-brand)" : "var(--color-fg)",
                    textDecoration: "none",
                    borderRadius: 6,
                    backgroundColor: isActive ? "var(--c-brand-subtle)" : "transparent",
                    transition: "all 0.15s",
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {sidebarSections.map(({ section, items }) => (
            <div key={section} style={{ marginBottom: 20 }}>
              <p
                style={{
                  padding: "0 20px",
                  marginBottom: 2,
                  fontSize: 10,
                  fontWeight: 700,
                  color: "var(--color-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  opacity: 0.55,
                }}
              >
                {section}
              </p>

              {items.map(({ label, href }) => {
                const isActive = pathname === href;
                const isNew = newByHref.get(href) ?? false;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={onClose}
                    className="sidebar-link"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 6,
                      padding: "6px 20px",
                      fontSize: 13,
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "var(--color-brand)" : "var(--color-muted)",
                      textDecoration: "none",
                      borderLeft: isActive
                        ? "2px solid var(--color-brand)"
                        : "2px solid transparent",
                      backgroundColor: isActive ? "var(--c-brand-subtle)" : "transparent",
                      transition: "all 0.15s",
                    }}
                  >
                    {label}
                    {isNew && (
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: "#4ADE80",
                          background: "rgba(74,222,128,0.12)",
                          border: "1px solid rgba(74,222,128,0.35)",
                          borderRadius: 20,
                          padding: "0px 5px",
                          flexShrink: 0,
                        }}
                      >
                        New
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
