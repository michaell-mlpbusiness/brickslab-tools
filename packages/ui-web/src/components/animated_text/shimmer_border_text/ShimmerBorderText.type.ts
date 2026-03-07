import { ElementType, CSSProperties } from "react";
import type { ReducedMotion } from "../animated_text.types";

export interface ShimmerBorderTextProps {
  children: string;
  as?: ElementType;
  className?: string;
  strokeWidth?: number;
  strokeColor?: string;
  shimmerColor?: string;
  speed?: number;
  fillMode?: "solid" | "transparent";
  reducedMotion?: ReducedMotion;
  style?: CSSProperties;
}
