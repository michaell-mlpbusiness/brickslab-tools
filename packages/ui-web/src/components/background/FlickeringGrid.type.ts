import React from "react";

export interface FlickeringGridProps {
  className?: string;
  cellSize?: number; // cell size in pixels
  gap?: number; // spacing between cells
  opacity?: number; // 0..1, base opacity
  flickerRate?: number; // 0..1, flicker speed
  rounded?: boolean; // rounded cells
  color?: string; // cell color
  quality?: "low" | "medium" | "high"; // quality level
  mask?: "none" | "radial" | "vignette"; // masking style
  interactive?: boolean; // enable pointer-based interactions
  theme?: "light" | "dark" | "auto"; // color theme
  reducedMotion?: "auto" | "always" | "never"; // motion preference
}
