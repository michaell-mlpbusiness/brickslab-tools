export type SpinnerSize = "sm" | "md" | "lg" | "xl";
export type SpinnerVariant = "default" | "brand" | "success" | "warning" | "error" | "white";
export type SpinnerSpeed = "slow" | "normal" | "fast";

export interface SpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  speed?: SpinnerSpeed;
  label?: string;
}
