import { ElementType, ReactNode, CSSProperties } from "react";
import type { ReducedMotion } from "../animated_text.types";

export interface MagneticTextProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  strength?: number;
  radius?: number;
  friction?: number;
  trigger?: "pointer" | "tilt";
  disabledOnTouch?: boolean;
  reducedMotion?: ReducedMotion;
  style?: CSSProperties;
}
