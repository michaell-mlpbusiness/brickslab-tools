import { ElementType, CSSProperties } from "react";
import type { ReducedMotion } from "../animated_text.types";

export interface HyperTextProps {
  children: string;
  as?: ElementType;
  className?: string;
  duration?: number;
  delay?: number;
  intensity?: number;
  characterSet?: string[];
  trigger?: "hover" | "tap" | "auto" | "view";
  startOnView?: boolean;
  viewportMargin?: string;
  reducedMotion?: ReducedMotion;
  onComplete?: () => void;
  style?: CSSProperties;
}
