// TextCardProps Data structure
export interface TextCardProps {
  cardtitle?: string;
  texte: string;
  variant?: "default" | "opaque" | "blurred";
  opacity?: number;
  blurPx?: number;
  width?: number;
  height?: number;
}