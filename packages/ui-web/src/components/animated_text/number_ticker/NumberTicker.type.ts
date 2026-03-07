import type { CSSProperties } from "react";
import type { ReducedMotion } from "../animated_text.types";

export interface NumberTickerProps {
  value: number;
  startValue?: number;
  direction?: "up" | "down";
  duration?: number;
  delay?: number;
  easing?: string | number[];
  decimalPlaces?: number;
  locale?: string;
  prefix?: string;
  suffix?: string;
  separator?: boolean;
  startOnView?: boolean;
  viewportMargin?: string;
  reducedMotion?: ReducedMotion;
  onComplete?: () => void;
  ariaLabel?: string;
  style?: CSSProperties;
}
