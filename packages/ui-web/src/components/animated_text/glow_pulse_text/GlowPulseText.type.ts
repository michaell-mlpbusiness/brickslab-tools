import { ElementType, ReactNode, CSSProperties } from "react";
import type { ReducedMotion } from "../animated_text.types";

export interface GlowPulseTextProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  glowColor?: string;
  intensity?: number;
  pulse?: boolean;
  pulseRate?: number;
  trigger?: "always" | "hover" | "view";
  reducedMotion?: ReducedMotion;
  style?: CSSProperties;
}
