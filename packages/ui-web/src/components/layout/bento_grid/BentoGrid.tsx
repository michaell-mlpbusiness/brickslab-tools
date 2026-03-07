import React from "react";
import { BentoGridProps } from "./BentoGrid.type";

export const BentoGridContext = React.createContext<{ reducedMotion: boolean }>({
  reducedMotion: false,
});

function resolveReducedMotion(mode: "auto" | "always" | "never"): boolean {
  if (mode === "always") return true;
  if (mode === "never") return false;
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function BentoGrid({
  children,
  className = "",
  style,
  as: Component = "div",
  columns = "auto",
  minWidth = 250,
  gap = "var(--space-4)",
  dense = false,
  autoRows = "auto",
  reducedMotion = "auto",
}: BentoGridProps) {
  const shouldReduceMotion = resolveReducedMotion(reducedMotion);

  const gridTemplateColumns =
    columns === "auto"
      ? `repeat(auto-fit, minmax(${typeof minWidth === "number" ? `${minWidth}px` : minWidth}, 1fr))`
      : `repeat(${columns}, 1fr)`;

  return (
    <BentoGridContext.Provider value={{ reducedMotion: shouldReduceMotion }}>
      <Component
        style={{
          display: "grid",
          gridTemplateColumns,
          gridAutoRows: autoRows,
          gap: typeof gap === "number" ? `${gap}px` : gap,
          gridAutoFlow: dense ? "dense" : "row",
          ...style,
        }}
        className={className}
      >
        {children}
      </Component>
    </BentoGridContext.Provider>
  );
}
