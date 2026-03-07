import { ElementType, CSSProperties } from "react";
import type { ReducedMotion } from "../animated_text.types";

export interface FontAxes {
  wght?: [number, number];
  wdth?: [number, number];
  slnt?: [number, number];
}

export interface VariableFontWarpTextProps {
  children: string;
  as?: ElementType;
  className?: string;
  axes?: FontAxes;
  trigger?: "hover" | "scroll" | "view";
  duration?: number;
  easing?: string | number[];
  clamp?: boolean;
  reducedMotion?: ReducedMotion;
  style?: CSSProperties;
}
