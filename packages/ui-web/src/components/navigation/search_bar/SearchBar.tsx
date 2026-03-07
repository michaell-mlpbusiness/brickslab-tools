import React from "react";
import { SearchBarProps } from "./SearchBar.type";

export function SearchBar({ value, onChange, placeholder, onSubmit, onClear, elevated, variant = "default" }: SearchBarProps) {
  const isGlass = variant === "glass";
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      style={{ width: "100%", position: "relative" }}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
        style={{
          position: "absolute",
          left: 14,
          top: "50%",
          transform: "translateY(-50%)",
          color: "var(--color-muted)",
          pointerEvents: "none",
        }}
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px 40px 10px 40px",
          fontSize: 14,
          background: isGlass
            ? "color-mix(in srgb, var(--c-surface) 55%, transparent)"
            : elevated
              ? "var(--c-surface-elevated)"
              : "var(--c-surface)",
          backdropFilter: isGlass ? "blur(14px)" : undefined,
          WebkitBackdropFilter: isGlass ? "blur(14px)" : undefined,
          border: isGlass
            ? "1px solid color-mix(in srgb, var(--c-border) 60%, transparent)"
            : "1px solid var(--c-border)",
          borderRadius: isGlass ? "var(--radius-lg, 12px)" : "var(--radius-md)",
          color: "var(--color-fg)",
          outline: "none",
          boxSizing: "border-box",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
        onFocus={(e) => {
          if (isGlass) {
            e.target.style.borderColor = "color-mix(in srgb, var(--color-brand) 60%, transparent)";
            e.target.style.boxShadow = "0 0 0 3px color-mix(in srgb, var(--color-brand) 15%, transparent)";
          } else {
            e.target.style.borderColor = "var(--color-brand)";
          }
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "";
          e.target.style.boxShadow = "";
        }}
      />
      {onClear && value && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Effacer la recherche"
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-muted)",
            fontSize: 16,
            lineHeight: 1,
            padding: "2px 4px",
          }}
        >
          ✕
        </button>
      )}
    </form>
  );
}
