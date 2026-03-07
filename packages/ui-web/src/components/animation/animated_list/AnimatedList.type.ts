import React from "react";

export interface AnimatedListProps {
  items: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  direction?: "up" | "down";
  loop?: boolean;
  loopDelay?: number;
  maxVisible?: number;
  reducedMotion?: "auto" | "always" | "never";
  onCycle?: () => void;
}
