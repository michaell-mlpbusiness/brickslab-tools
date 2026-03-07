export type StatusVariant = "active" | "inactive" | "pending" | "error";
export interface StatusLabelProps {
  status: StatusVariant;
  label?: string;
}
