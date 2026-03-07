import type { KPIFormat } from "../analytics.types";

export interface KPITrendWidgetProps {
  title: string;
  value: number | string;
  delta?: number;
  target?: number;
  sparkline?: number[];
  format?: KPIFormat;
  timeframe?: string;
  loading?: boolean;
  className?: string;
}
