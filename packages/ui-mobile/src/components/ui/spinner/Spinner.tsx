import React from 'react';
import { ActivityIndicator, View, StyleSheet, ViewStyle } from 'react-native';
import { SpinnerProps, SpinnerVariant } from './Spinner.type';
import { tokens } from '@/tokens';

const variantMap: Record<SpinnerVariant, string> = {
  default: tokens.colorMuted,
  brand: tokens.colorBrand,
  success: tokens.colorSuccess,
  warning: tokens.colorWarning,
  error: tokens.colorError,
  white: '#FBFBFB',
};

export function Spinner({
  size = 'large',
  variant = 'brand',
  label = 'Loading...',
  style: userStyle,
}: SpinnerProps) {
  const color = variantMap[variant];

  return (
    <View style={[styles.container, userStyle]} accessible accessibilityRole="progressbar" accessibilityLabel={label}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});