import React from "react";

export interface DotPatternProps {
  className?: string;
  dotSize?: number; // dot radius
  dotWeight?: "very-thin" | "thin" | "medium"; // preset dot thickness
  gap?: number; // spacing between dots
  offset?: number; // offset multiplier
  color?: string; // dot color
  quality?: "low" | "medium" | "high"; // quality level
  mask?: "none" | "radial" | "vignette"; // masking style
  opacity?: number; // 0..1, dot opacity
  interactive?: boolean; // enable pointer-based interactions
  theme?: "light" | "dark" | "auto"; // color theme
}
