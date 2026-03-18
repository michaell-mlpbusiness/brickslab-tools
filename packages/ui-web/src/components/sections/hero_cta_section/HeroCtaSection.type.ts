import { ReactNode } from "react";

export interface HeroCtaSectionProps {
  /** Variant de fond. "simple" = pas de media (défaut) */
  bg?: "simple" | "video" | "image";

  /** URL de la ressource media (requis si bg="video" ou bg="image") */
  src?: string;

  /** Texte alternatif pour bg="image" (accessibilité) */
  alt?: string;

  /** Poster image affichée avant le chargement de la vidéo */
  videoPoster?: string;

  /** Opacité de l'overlay sombre sur le media (0 à 1). Défaut: 0.45 */
  overlayOpacity?: number;

  /** Couleur de l'overlay. Défaut: #000000 */
  overlayColor?: string;
  
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  secondaryLabel?: string;
  onSecondaryClick?: () => void;
  align?: "left" | "center";
  hoverEffect?: boolean;
}