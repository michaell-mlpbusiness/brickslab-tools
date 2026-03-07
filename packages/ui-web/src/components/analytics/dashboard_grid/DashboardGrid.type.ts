import type { WidgetLayout } from "../analytics.types";

export interface DashboardGridProps {
  items: WidgetLayout[];
  onLayoutChange?: (layout: WidgetLayout[]) => void;
  cols?: number;
  rowHeight?: number;
  gap?: number;
  editable?: boolean;
  className?: string;
}
