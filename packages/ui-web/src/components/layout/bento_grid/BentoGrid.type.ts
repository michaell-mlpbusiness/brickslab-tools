import React from "react";

export interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
  columns?: number | "auto";
  minWidth?: number | string;
  gap?: number | string;
  dense?: boolean;
  autoRows?: string;
  reducedMotion?: "auto" | "always" | "never";
}
