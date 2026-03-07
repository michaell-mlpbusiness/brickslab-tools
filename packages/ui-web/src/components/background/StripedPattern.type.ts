import React from "react";

export interface StripedPatternProps {
  className?: string;
  angle?: number; // stripe angle in degrees
  stripeWidth?: number; // stripe width
  gap?: number; // gap between stripes
  color?: string; // stripe color
  opacity?: number; // 0..1, stripe opacity
  animate?: boolean; // enable animation
  speed?: number; // 0..2, animation speed multiplier
  quality?: "low" | "medium" | "high"; // quality level
  mask?: "none" | "radial" | "vignette"; // masking style
  interactive?: boolean; // enable pointer-based interactions
  theme?: "light" | "dark" | "auto"; // color theme
  reducedMotion?: "auto" | "always" | "never"; // motion preference
}
