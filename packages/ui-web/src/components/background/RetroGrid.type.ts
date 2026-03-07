import React from "react";

export interface RetroGridProps {
  className?: string;
  perspective?: number; // 3D perspective value
  lineThickness?: number; // line width
  glow?: boolean; // enable glow effect
  speed?: number; // 0..2, animation speed multiplier
  color?: string; // grid color
  quality?: "low" | "medium" | "high"; // quality level
  intensity?: number; // 0..1, visual intensity
  interactive?: boolean; // enable pointer-based interactions
  theme?: "light" | "dark" | "auto"; // color theme
  reducedMotion?: "auto" | "always" | "never"; // motion preference
}
