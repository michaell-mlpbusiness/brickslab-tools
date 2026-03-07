export type ComponentsCountCardSection = {
  label: string;
  count: number;
};

export type ComponentsCountCardProps = {
  count: number;
  subtitle?: string;
  variant?: "default" | "dark";
  animate?: boolean;
  sections?: ComponentsCountCardSection[];
  cta?: string;
};
