import { LatestComponentItem } from "./dashboard.types";

export type { LatestComponentItem };

export type LatestComponentsListProps = {
  items: LatestComponentItem[];
  title?: string;
  ctaLabel?: string;
  ctaHref?: string;
};
