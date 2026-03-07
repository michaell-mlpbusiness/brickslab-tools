export interface MatrixRow {
  id: string;
  label: string;
}

export interface MatrixCol {
  id: string;
  label: string;
}

export type MatrixType = "single" | "multi";

export interface MatrixQuestionProps {
  value: Record<string, string | number>;
  onChange: (v: Record<string, string | number>) => void;
  rows: MatrixRow[];
  cols: MatrixCol[];
  type?: MatrixType;
  requiredRows?: boolean;
  disabled?: boolean;
  className?: string;
}
