export interface HeatmapMatrixProps {
  rows: string[];
  cols: string[];
  values: number[][];
  min?: number;
  max?: number;
  showScale?: boolean;
  className?: string;
}
