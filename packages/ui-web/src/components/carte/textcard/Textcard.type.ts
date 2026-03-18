// Changement : width/height passes de number a number | string
// pour la responsivite ("100%", "50vw", etc.)
// Ajout : imageUrl, imageAlt pour la variante bgImg

export type TextCardVariant = "default" | "opaque" | "blurred" | "bgImg";

export interface TextCardProps {
  cardtitle?: string;
  texte: string;
  variant?: TextCardVariant;
  // Variantes opaque / blurred
  opacity?: number;
  blurPx?: number;
  // Variante bgImg
  imageUrl?: string;
  imageAlt?: string; // vide = decoratif (cas le plus frequent)
  // Layout
  width?: number | string;
  height?: number | string;
}