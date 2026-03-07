import { ElementType, CSSProperties } from "react";
import type { ReducedMotion } from "../animated_text.types";

export interface NoiseRevealTextProps {
  children: string;
  as?: ElementType;
  className?: string;
  duration?: number;
  intensity?: number;
  noiseScale?: number;
  direction?: "left" | "right" | "up" | "down";
  startOnView?: boolean;
  viewportMargin?: string;
  reducedMotion?: ReducedMotion;
  onComplete?: () => void;
  style?: CSSProperties;
}
