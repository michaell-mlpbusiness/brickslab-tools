import { ElementType, CSSProperties } from "react";
import type { ReducedMotion } from "../animated_text.types";

export interface TextRevealProps {
  children: string;
  as?: ElementType;
  className?: string;
  by?: "word" | "character" | "line";
  fade?: boolean;
  blur?: boolean;
  duration?: number;
  stagger?: number;
  startOnView?: boolean;
  viewportMargin?: string;
  threshold?: number;
  reducedMotion?: ReducedMotion;
  onComplete?: () => void;
  style?: CSSProperties;
}
