import { ElementType, CSSProperties } from "react";
import type { ReducedMotion } from "../animated_text.types";

export interface WordRotateProps {
  words: string[];
  as?: ElementType;
  className?: string;
  interval?: number;
  transition?: "slide" | "fade" | "flip";
  duration?: number;
  easing?: string | number[];
  pauseOnHover?: boolean;
  loop?: boolean;
  reducedMotion?: ReducedMotion;
  onChange?: (index: number) => void;
  style?: CSSProperties;
}
