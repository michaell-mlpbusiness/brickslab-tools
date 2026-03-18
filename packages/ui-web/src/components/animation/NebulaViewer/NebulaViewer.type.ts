export interface NebulaModelOption {
  src: string;
  color?: string;
}

export interface NebulaViewerProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaLink?: string;

  models: NebulaModelOption[];

  /** Contrôle externe de la rotation automatique */
  isRotating?: boolean;
  /** Appelé quand l'utilisateur bascule la rotation */
  onRotateChange?: (rotating: boolean) => void;

  /** Modèle actif (src) — contrôle externe */
  selectedModel?: string;
  /** Appelé quand l'utilisateur sélectionne un modèle */
  onModelChange?: (src: string) => void;

  viewerWidth?: string;
  haloSize?: string;

  showPauseButton?: boolean;

  className?: string;
}
