import { ElementType, CSSProperties } from "react";
import type { ReducedMotion } from "../animated_text.types";

export interface ProgressiveBlurTextProps {
  children: string;
  as?: ElementType;
  className?: string;
  maxBlur?: number;
  duration?: number;
  trigger?: "scroll" | "view";
  startOnView?: boolean;
  viewportMargin?: string;
  reducedMotion?: ReducedMotion;
  onComplete?: () => void;
  style?: CSSProperties;
}
