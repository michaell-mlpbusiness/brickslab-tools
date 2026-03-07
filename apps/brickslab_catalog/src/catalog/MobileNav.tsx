"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navSections } from "./navigation.data";
import { SearchCombobox } from "./SearchCombobox";



export function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  function toggleSection(sec: string) {
    setOpenSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 99,
        }}
      />

      {/* Menu */}
      <nav className="catalog-sidebar" style={{ width: 280, zIndex: 100 }}>
        {/* include search at top for mobile */}
        <div style={{ padding: "0 20px 16px 20px" }}>
          <SearchCombobox />
        </div>
        {navSections.map(({ section, items }) => (
          <div key={section} style={{ marginBottom: 28 }}>
            <button
              onClick={() => toggleSection(section)}
              aria-expanded={!!openSections[section]}
              aria-controls={`nav-${section}`}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "0 20px",
                marginBottom: 6,
                fontSize: 11,
                fontWeight: 600,
                color: "var(--color-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {section} {openSections[section] ? "▾" : "▸"}
            </button>

            <div
              id={`nav-${section}`}
              style={{ display: openSections[section] ? "block" : "none" }}
            >
              {items.map(({ label, href }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={onClose}
                    style={{
                      display: "block",
                      padding: "7px 20px",
                      fontSize: 14,
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "var(--color-fg)" : "var(--color-muted)",
                      textDecoration: "none",
                      borderLeft: isActive
                        ? "2px solid var(--color-brand)"
                        : "2px solid transparent",
                      backgroundColor: isActive ? "var(--c-brand-subtle)" : "transparent",
                      transition: "color 0.15s, background-color 0.15s",
                    }}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </>
  );
}
