export interface LogoMarkProps {
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon" | "both";

  // variant "full" ou "both"
  text?: string; // si absent → rendu par défaut "BricksLab"
  shape?: "square" | "circle",
  // variant "icon" ou "both"
  imgSrc?: string;  // si absent → rendu par défaut carré "B"
  imgAlt?: string;  // requis si imgSrc fourni (A11y)
}