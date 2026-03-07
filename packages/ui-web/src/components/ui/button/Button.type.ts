import React from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "custom";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  /**
   * complémentaire à `variant="custom"` ; couleur de fond (n'importe quel CSS color string)
   */
  customBg?: string;
  /**
   * complémentaire à `variant="custom"` ; couleur du texte
   */
  customColor?: string;
  /**
   * style inline supplémentaire, utile pour overrides plus précis (bordure, ombre, etc.)
   */
  style?: React.CSSProperties;
}
