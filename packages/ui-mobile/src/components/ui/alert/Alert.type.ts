import React from 'react';
import { ViewStyle } from 'react-native';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}