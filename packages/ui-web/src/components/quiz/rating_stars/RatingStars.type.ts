export type RatingIcon = "star" | "heart" | "bolt";

export interface RatingStarsProps {
  value?: number;
  onChange: (v: number) => void;
  max?: number;
  allowHalf?: boolean;
  icon?: RatingIcon;
  disabled?: boolean;
  className?: string;
}
