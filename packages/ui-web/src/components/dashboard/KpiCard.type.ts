import type { ReactNode } from "react";

export type KpiColorScheme = "auto" | "brand" | "green" | "amber" | "red";

export type KpiCardProps = {
  label: string;
  value: string;
  helper?: string;
  eyebrow?: string;
  icon?: ReactNode;
  suffix?: string;
  progress?: number;
  loading?: boolean;
  animate?: boolean;
  colorScheme?: KpiColorScheme;
};
