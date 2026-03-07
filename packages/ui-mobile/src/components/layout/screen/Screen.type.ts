import React from 'react';
import { ViewStyle } from 'react-native';

export interface ScreenProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
}