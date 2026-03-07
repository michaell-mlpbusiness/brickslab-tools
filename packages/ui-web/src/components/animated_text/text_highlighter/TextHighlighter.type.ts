import { ElementType, ReactNode, CSSProperties } from "react";
import type { ReducedMotion } from "../animated_text.types";

export interface TextHighlighterProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  color?: string;
  action?: "highlight" | "underline" | "box" | "circle" | "strike";
  strokeWidth?: number;
  padding?: number;
  duration?: number;
  iterations?: number;
  multiline?: boolean;
  trigger?: "view" | "hover" | "manual";
  startOnView?: boolean;
  viewportMargin?: string;
  reducedMotion?: ReducedMotion;
  onComplete?: () => void;
  style?: CSSProperties;
}
