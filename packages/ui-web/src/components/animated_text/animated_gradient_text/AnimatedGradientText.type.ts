import { ElementType, ReactNode, CSSProperties } from "react";
import type { ReducedMotion } from "../animated_text.types";

export interface AnimatedGradientTextProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  colorStops?: string[];
  speed?: number;
  angle?: number;
  mode?: "linear" | "radial";
  animate?: "shift" | "rotate" | "pulse";
  reducedMotion?: ReducedMotion;
  style?: CSSProperties;
}
