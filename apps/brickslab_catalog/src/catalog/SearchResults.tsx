"use client";

import Link from "next/link";
import { searchComponents } from "./components.data";

interface SearchResultsProps {
  query: string;
  onClose: () => void;
}

export function SearchResults({ query, onClose }: SearchResultsProps) {
  const results = searchComponents(query);

  if (!query.trim() || results.length === 0) {
    return null;
  }

  return (
    <>
      <style>{`
        .search-results { max-width: 100%; }
        @media (max-width: 600px) {
          .search-results { font-size: var(--fontsize-sm); }
        }
        .search-result-item:hover {
          background-color: var(--c-brand-subtle);
        }
      `}</style>
      <div className="search-results"
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          backgroundColor: "var(--c-surface)",
          border: "1px solid var(--c-border)",
          borderTop: "none",
          borderRadius: "0 0 var(--radius-md) var(--radius-md)",
          maxHeight: "500px",
          overflowY: "auto",
          zIndex: 200,
          boxShadow: "var(--shadow-2)",
          marginTop: "-1px",
        }}
      >
        {results.map((comp) => (
          <Link
            key={comp.href}
            href={comp.href}
            onClick={onClose}
            className="search-result-item"
            style={{
              display: "block",
              padding: "12px 16px",
              borderBottom: "1px solid var(--c-border)",
              textDecoration: "none",
              color: "var(--color-fg)",
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
        ))}
      </div>
    </>
  );
}
