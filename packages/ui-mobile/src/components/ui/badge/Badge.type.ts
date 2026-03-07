import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';

export type BadgeVariant = 'default' | 'info' | 'success' | 'warning' | 'error';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children?: React.ReactNode;
  dot?: boolean;
  outlined?: boolean;
  max?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
}