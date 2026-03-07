import React from "react";

export interface InteractiveGridPatternProps {
  className?: string;
  cellSize?: number; // cell size
  radius?: number; // interaction radius
  intensity?: number; // 0..1, effect intensity
  quality?: "low" | "medium" | "high"; // quality level
  mask?: "none" | "radial" | "vignette"; // masking style
  color?: string; // cell color
  interactive?: boolean; // enable pointer-based interactions
  theme?: "light" | "dark" | "auto"; // color theme
  reducedMotion?: "auto" | "always" | "never"; // motion preference
}
