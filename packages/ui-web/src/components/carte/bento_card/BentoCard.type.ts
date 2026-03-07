import React from "react";

export interface BentoCardProps {
  name: string;
  description?: string;
  Icon?: React.ElementType;
  href?: string;
  cta?: string;
  background?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
  onClick?: () => void;
  target?: "_self" | "_blank";
  rel?: string;
  interactive?: boolean;
  hoverEffect?: "lift" | "glow" | "none";
  reducedMotion?: "auto" | "always" | "never";
  colSpan?: number;
  rowSpan?: number;
}
