import React from "react";

export interface NoiseMeshBackgroundProps {
  className?: string;
  colors?: string[]; // gradient colors
  noise?: number; // 0..1, noise intensity
  grainSize?: number; // grain size multiplier
  animate?: boolean; // enable animation
  speed?: number; // 0..2, animation speed multiplier
  quality?: "low" | "medium" | "high"; // quality level
  mask?: "none" | "radial" | "vignette"; // masking style
  interactive?: boolean; // enable pointer-based interactions
  theme?: "light" | "dark" | "auto"; // color theme
  reducedMotion?: "auto" | "always" | "never"; // motion preference
}
