import React from "react";
import type { SearchResultsProps, SearchResult } from "./SearchResults.type";

export function SearchResults({ results, query, onSelect }: SearchResultsProps) {
  if (!query.trim() || results.length === 0) {
    return null;
  }

  return (
    <div
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
        zIndex: "var(--z-dropdown)",
        boxShadow: "var(--shadow-2)",
        marginTop: "-1px",
      }}
    >
      {results.map((result) => (
        <a
          key={result.href}
          href={result.href}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            onSelect?.(result);
          }}
          style={{
            display: "block",
            padding: "var(--space-2) var(--space-3)",
            borderBottom: "1px solid var(--c-border)",
            textDecoration: "none",
            color: "var(--color-fg)",
            transition: "background-color 0.2s",
            cursor: "pointer",
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
            (e.currentTarget as HTMLElement).style.backgroundColor =
              "var(--c-brand-subtle)";
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
            (e.currentTarget as HTMLElement).style.backgroundColor =
              "transparent";
          }}
        >
          <div style={{ fontWeight: "var(--fontweight-semibold)", fontSize: "var(--fontsize-sm)" }}>
            {result.label}
          </div>
          {result.description && (
            <div
              style={{
                fontSize: "var(--fontsize-xs)",
                color: "var(--color-muted)",
                marginTop: "var(--space-1)",
                lineHeight: "1.4",
              }}
            >
              {result.description}
            </div>
          )}
          {result.section && (
            <div
              style={{
                fontSize: "var(--fontsize-xs)",
                color: "var(--color-muted)",
                marginTop: "var(--space-1)",
              }}
            >
              {result.section}
              {result.type === "mobile" && " • Mobile"}
            </div>
          )}
        </a>
      ))}
    </div>
  );
}
