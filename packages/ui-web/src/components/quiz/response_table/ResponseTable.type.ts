import type { ResponseRow, ColumnDef, FilterDef } from "../quiz.types";

export interface ResponseTablePagination {
  page: number;
  pageSize: number;
  total: number;
}

export interface ResponseTableProps {
  rows: ResponseRow[];
  columns: ColumnDef[];
  pagination?: ResponseTablePagination;
  onPageChange?: (page: number) => void;
  filters?: FilterDef[];
  onExport?: (format: "csv" | "xlsx") => void;
  className?: string;
}
