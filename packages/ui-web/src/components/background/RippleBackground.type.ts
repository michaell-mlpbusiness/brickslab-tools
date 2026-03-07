import React from "react";

export interface RippleBackgroundProps {
  className?: string;
  center?: { x: number; y: number }; // ripple origin (0..1)
  amplitude?: number; // ripple max radius
  frequency?: number; // number of concurrent ripples
  speed?: number; // 0..2, animation speed multiplier
  quality?: "low" | "medium" | "high"; // quality level
  interactive?: boolean; // enable pointer-based interactions
  theme?: "light" | "dark" | "auto"; // color theme
  reducedMotion?: "auto" | "always" | "never"; // motion preference
}
