import { ElementType, CSSProperties } from "react";
import type { ReducedMotion } from "../animated_text.types";

export interface TextAnimateProps {
  children: string;
  as?: ElementType;
  by?: "text" | "word" | "character" | "line";
  className?: string;
  segmentClassName?: string;
  preset?: "fade" | "blur" | "slide" | "scale" | "rise";
  delay?: number;
  stagger?: number;
  duration?: number;
  easing?: string | number[];
  startOnView?: boolean;
  once?: boolean;
  viewportMargin?: string;
  reducedMotion?: ReducedMotion;
  onStart?: () => void;
  onComplete?: () => void;
  id?: string;
  ariaLabel?: string;
  style?: CSSProperties;
}
