import React from "react";

export interface GlassAuroraBackgroundProps {
  className?: string;
  colors?: string[]; // gradient colors
  blur?: number; // blur amount (0..120)
  intensity?: number; // 0..1, opacity of aurora
  speed?: number; // 0..2, animation speed multiplier
  quality?: "low" | "medium" | "high"; // quality level
  border?: boolean; // show border
  interactive?: boolean; // enable pointer-based interactions
  theme?: "light" | "dark" | "auto"; // color theme
  reducedMotion?: "auto" | "always" | "never"; // motion preference
}
