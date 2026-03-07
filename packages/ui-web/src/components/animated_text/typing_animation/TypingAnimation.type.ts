import { ElementType, CSSProperties } from "react";
import type { ReducedMotion } from "../animated_text.types";

export interface TypingAnimationProps {
  text?: string;
  words?: string[];
  as?: ElementType;
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  startDelay?: number;
  wordPause?: number;
  loop?: boolean;
  loopDelay?: number;
  showCursor?: boolean;
  cursor?: "line" | "block" | "underscore";
  cursorBlinkSpeed?: number;
  startOnView?: boolean;
  viewportMargin?: string;
  reducedMotion?: ReducedMotion;
  onWordChange?: (index: number) => void;
  onComplete?: () => void;
  ariaLabel?: string;
  style?: CSSProperties;
}
