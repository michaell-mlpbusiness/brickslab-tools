import React from "react";

export interface AnimatedGridPatternProps {
  className?: string;
  size?: number; // grid cell size
  speed?: number; // 0..2, animation speed multiplier
  strokeWidth?: number; // line width
  color?: string; // grid color
  quality?: "low" | "medium" | "high"; // quality level
  mask?: "none" | "radial" | "vignette"; // masking style
  intensity?: number; // 0..1, visual intensity
  interactive?: boolean; // enable pointer-based interactions
  theme?: "light" | "dark" | "auto"; // color theme
  reducedMotion?: "auto" | "always" | "never"; // motion preference
}
