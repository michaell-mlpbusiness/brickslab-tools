import type { TrendDirection, KPIFormat } from "../analytics.types";

export interface InsightCardItem {
  label: string;
  value: string | number;
  delta?: number;
  trend?: TrendDirection;
  format?: KPIFormat;
}

export type InsightCardsVariant = "solid" | "glass";

export interface InsightCardsProps {
  items: InsightCardItem[];
  variant?: InsightCardsVariant;
  className?: string;
}
