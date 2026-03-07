import { ElementType, ReactNode, CSSProperties } from "react";
import type { ReducedMotion } from "../animated_text.types";

export interface AuroraTextProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  colors?: string[];
  speed?: number;
  angle?: number;
  intensity?: number;
  blendMode?: "normal" | "screen" | "overlay";
  reducedMotion?: ReducedMotion;
  onComplete?: () => void;
  style?: CSSProperties;
}
