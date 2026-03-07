import type { TrendSeries } from "../analytics.types";

export type CohortGranularity = "day" | "week" | "month";

export interface CohortTrendsProps {
  series: TrendSeries[];
  metric: string;
  granularity?: CohortGranularity;
  className?: string;
}
