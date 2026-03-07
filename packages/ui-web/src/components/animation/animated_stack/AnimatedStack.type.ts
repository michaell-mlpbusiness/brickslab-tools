import React from "react";

export interface AnimatedStackProps {
  items: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  maxVisible?: number;
  stackOffset?: number;
  scaleDecrement?: number;
  reducedMotion?: "auto" | "always" | "never";
}
