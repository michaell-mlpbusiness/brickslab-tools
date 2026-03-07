import React from "react";

export interface WarpBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  intensity?: number; // 0..1, intensity of visual effect
  speed?: number; // 0..2, animation speed multiplier
  quality?: "low" | "medium" | "high"; // quality level
  mask?: "none" | "radial" | "vignette"; // masking style
  interactive?: boolean; // enable pointer-based interactions
  theme?: "light" | "dark" | "auto"; // color theme
  reducedMotion?: "auto" | "always" | "never"; // motion preference
}
