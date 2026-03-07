import React from 'react';
import { ViewStyle } from 'react-native';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onValueChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  size?: CheckboxSize;
  style?: ViewStyle;
}