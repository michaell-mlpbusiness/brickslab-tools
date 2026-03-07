export interface HeroCtaSectionProps {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  secondaryLabel?: string;
  onSecondaryClick?: () => void;
  align?: "left" | "center";
  /**
   * When true the primary/secondary buttons get a simple hover effect
   * (brightness or opacity change). Defaults to false.
   */
  hoverEffect?: boolean;
}
