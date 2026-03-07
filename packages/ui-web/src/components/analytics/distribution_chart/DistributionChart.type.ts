import type { DistributionDataPoint } from "../analytics.types";

export type DistributionChartType = "bar" | "stack" | "hist";

export interface DistributionChartProps {
  data: DistributionDataPoint[];
  type?: DistributionChartType;
  normalize?: boolean;
  showLegend?: boolean;
  className?: string;
}
