export type DocPageHeaderBadgeVariant = "default" | "brand" | "success" | "warning" | "error";

export interface DocPageHeaderBadge {
  label: string;
  variant?: DocPageHeaderBadgeVariant;
}

export interface DocPageHeaderProps {
  name: string;
  description: string;
  packageName?: string;
  badges?: DocPageHeaderBadge[];
}
