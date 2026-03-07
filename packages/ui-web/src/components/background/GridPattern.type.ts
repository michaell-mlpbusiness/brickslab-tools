import React from "react";

export interface GridPatternProps {
  className?: string;
  size?: number; // grid cell size
  strokeWidth?: number; // line width
  dashed?: boolean; // dashed lines
  lineStyle?: "solid" | "dashed"; // preferred line style API
  contrastMode?: "custom" | "black-on-white" | "white-on-black"; // preset contrast pair
  color?: string; // grid color
  opacity?: number; // 0..1, line opacity
  quality?: "low" | "medium" | "high"; // quality level
  mask?: "none" | "radial" | "vignette"; // masking style
  interactive?: boolean; // enable pointer-based interactions
  theme?: "light" | "dark" | "auto"; // color theme
}
