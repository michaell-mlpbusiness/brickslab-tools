import React from 'react';
import { ViewStyle } from 'react-native';

export interface AppShellProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  sidebarWidth?: number;
  headerHeight?: number;
  footerHeight?: number;
  style?: ViewStyle;
}