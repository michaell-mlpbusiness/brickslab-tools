import React from 'react';
import { ViewStyle } from 'react-native';

export type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioProps {
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  label?: React.ReactNode;
  name?: string;
  disabled?: boolean;
  size?: RadioSize;
  style?: ViewStyle;
}

export interface RadioGroupProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
  direction?: 'vertical' | 'horizontal';
  gap?: number;
  style?: ViewStyle;
}