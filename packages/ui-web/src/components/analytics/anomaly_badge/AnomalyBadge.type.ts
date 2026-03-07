import type { AnomalyLevel } from "../analytics.types";

export interface AnomalyBadgeProps {
  level?: AnomalyLevel;
  message: string;
  confidence?: number;
  onClick?: () => void;
  className?: string;
}
