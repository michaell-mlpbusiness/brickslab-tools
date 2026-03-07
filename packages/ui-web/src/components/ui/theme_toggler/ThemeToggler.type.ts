import React from "react";

export interface ThemeTogglerProps {
  className?: string;
  duration?: number;
  mode?: "light" | "dark" | "system";
  onChange?: (mode: "light" | "dark" | "system") => void;
  reducedMotion?: "auto" | "always" | "never";
  /** Controls whether the ripple wave passes over (opaque overlay) or under (reveals real content via View Transitions) page elements. Default: "over". */
  rippleLayer?: "over" | "under";
}
