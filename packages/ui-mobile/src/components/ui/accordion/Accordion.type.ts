import React from 'react';
import { ViewStyle } from 'react-native';

export type AccordionVariant = 'bordered' | 'separated' | 'ghost';
export type AccordionSize = 'sm' | 'md' | 'lg';

export interface AccordionProps {
  children: React.ReactNode;
  variant?: AccordionVariant;
  size?: AccordionSize;
  style?: ViewStyle;
}

export interface AccordionItemProps {
  title: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  onToggle?: (open: boolean) => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
}