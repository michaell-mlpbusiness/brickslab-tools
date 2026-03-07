import React from "react";

export interface LightRaysBackgroundProps {
  className?: string;
  rayCount?: number; // number of rays
  speed?: number; // 0..2, animation speed multiplier
  blur?: number; // blur amount (0..20)
  opacity?: number; // 0..1, ray opacity
  color?: string; // ray color
  quality?: "low" | "medium" | "high"; // quality level
  mask?: "none" | "radial" | "vignette"; // masking style
  interactive?: boolean; // enable pointer-based interactions
  theme?: "light" | "dark" | "auto"; // color theme
  reducedMotion?: "auto" | "always" | "never"; // motion preference
}
