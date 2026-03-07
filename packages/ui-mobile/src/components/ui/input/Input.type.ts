import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps {
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'url';
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  editable?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: InputSize;
  fullWidth?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
}