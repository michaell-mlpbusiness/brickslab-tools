"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchComponents } from "./components.data";

export function SearchCombobox({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = searchComponents(query);
  const hasResults = query.trim() !== "" && results.length > 0;

  // keyboard navigation
  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!hasResults) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        if (activeIndex >= 0) {
          e.preventDefault();
          router.push(results[activeIndex].href);
          setQuery("");
          setActiveIndex(-1);
        }
        break;
      case "Escape":
        setQuery("");
        setActiveIndex(-1);
        break;
    }
  }

  useEffect(() => {
    if (activeIndex >= 0 && resultsRef.current) {
      const option = resultsRef.current.querySelector(`[data-index="${activeIndex}"]`);
      if (option) {
        (option as HTMLElement).scrollIntoView({ block: "nearest" });
      }
    }
  }, [activeIndex, results]);

  // close when clicking outside
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setQuery("");
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ position: "relative" }}>
      <label htmlFor="catalog-search" className="sr-only">
        Rechercher un composant
      </label>
      <input
        id="catalog-search"
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(-1);
        }}
        onKeyDown={onKeyDown}
        placeholder="Rechercher un composant…"
        aria-autocomplete="list"
        aria-expanded={hasResults}
        aria-controls="search-results-list"
        aria-activedescendant={
          activeIndex >= 0 ? `search-option-${activeIndex}` : undefined
        }
        style={{
          width: "100%",
          padding: "8px 12px",
          fontSize: "14px",
          border: "1px solid color-mix(in srgb, var(--c-border) 60%, transparent)",
          borderRadius: "10px",
          backgroundColor: "color-mix(in srgb, var(--c-surface) 55%, transparent)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          color: "var(--color-fg)",
          outline: "none",
          fontFamily: "inherit",
          boxSizing: "border-box",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
        onFocus={(e) => {
          (e.target as HTMLInputElement).style.borderColor = "color-mix(in srgb, var(--color-brand) 60%, transparent)";
          (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px color-mix(in srgb, var(--color-brand) 15%, transparent)";
        }}
        onBlur={(e) => {
          (e.target as HTMLInputElement).style.borderColor = "";
          (e.target as HTMLInputElement).style.boxShadow = "";
        }}
      />
      {hasResults && (
        <div
          id="search-results-list"
          role="listbox"
          ref={resultsRef}
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            backgroundColor: "color-mix(in srgb, var(--c-surface) 80%, transparent)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid color-mix(in srgb, var(--c-border) 60%, transparent)",
            borderRadius: "12px",
            maxHeight: "500px",
            overflowY: "auto",
            zIndex: 200,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          }}
        >
          {results.map((comp, i) => {
            const isActive = i === activeIndex;
            return (
              <Link
                key={comp.href}
                href={comp.href}
                role="option"
                id={`search-option-${i}`}
                data-index={i}
                aria-selected={isActive}
                onClick={() => {
                  setQuery("");
                  setActiveIndex(-1);
                }}
                onMouseEnter={() => setActiveIndex(i)}
                style={{
                  display: "block",
                  padding: "12px 16px",
                  borderBottom: "1px solid var(--c-border)",
                  textDecoration: "none",
                  color: "var(--color-fg)",
                  backgroundColor: isActive ? "var(--c-brand-subtle)" : "transparent",
                  transition: "background-color 0.2s",
                }}
              >
                <div style={{ fontWeight: 600, fontSize: "var(--fontsize-sm)" }}>
                  {comp.label}
                </div>
                <div
                  style={{
                    fontSize: "var(--fontsize-xs)",
                    color: "var(--color-muted)",
                    marginTop: "4px",
                    lineHeight: "1.4",
                  }}
                >
                  {comp.description}
                </div>
                <div
                  style={{
                    fontSize: "var(--fontsize-xs)",
                    color: "var(--color-fg-secondary-muted, #888)",
                    marginTop: "4px",
                  }}
                >
                  {comp.section}
                  {comp.type === "mobile" && " • Mobile"}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
