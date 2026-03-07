import { ElementType, CSSProperties } from "react";
import type { ReducedMotion } from "../animated_text.types";

export interface SegmentHighlight {
  match: string | RegExp;
  className?: string;
  effect?: "raise" | "glow" | "underline" | "gradient";
}

export interface SegmentEmphasisTextProps {
  children: string;
  as?: ElementType;
  className?: string;
  highlights: SegmentHighlight[];
  by?: "word" | "match";
  duration?: number;
  stagger?: number;
  startOnView?: boolean;
  reducedMotion?: ReducedMotion;
  style?: CSSProperties;
}
