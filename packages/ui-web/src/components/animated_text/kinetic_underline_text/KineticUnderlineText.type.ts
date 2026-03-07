import { ElementType, ReactNode, CSSProperties } from "react";
import type { ReducedMotion } from "../animated_text.types";

export interface KineticUnderlineTextProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  underlineClassName?: string;
  thickness?: number;
  offset?: number;
  duration?: number;
  easing?: string | number[];
  trigger?: "hover" | "focus" | "active";
  reducedMotion?: ReducedMotion;
  style?: CSSProperties;
}
