import { ElementType, CSSProperties } from "react";
import type { ReducedMotion } from "../animated_text.types";

export interface SparklesTextProps {
  children: string;
  as?: ElementType;
  className?: string;
  count?: number;
  size?: number;
  speed?: number;
  colors?: string[];
  area?: "text" | "bounds";
  reducedMotion?: ReducedMotion;
  style?: CSSProperties;
}
