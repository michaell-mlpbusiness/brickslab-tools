import React from 'react';
import { ViewStyle } from 'react-native';

export type CalloutVariant = 'info' | 'warning' | 'tip' | 'danger';

export interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
}