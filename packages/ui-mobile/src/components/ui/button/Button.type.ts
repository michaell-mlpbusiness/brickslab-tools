import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'custom';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
  /**
   * complémentaire à `variant="custom"` ; couleur de fond
   */
  customBg?: string;
  /**
   * complémentaire à `variant="custom"` ; couleur du texte
   */
  customColor?: string;
  /**
   * style inline supplémentaire
   */
  style?: ViewStyle;
}