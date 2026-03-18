import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { TagChipProps } from './TagChip.type';
import { tokens } from '@/tokens';

const variantStyles = {
  default: { color: tokens.colorFg, backgroundColor: tokens.cSurfaceElevated },
  brand: { color: tokens.colorBrand, backgroundColor: tokens.cBrandSubtle },
  muted: { color: tokens.colorMuted, backgroundColor: 'transparent' },
};

const sizeStyles = {
  sm: { fontSize: tokens.fontsizeXs, paddingHorizontal: 8, paddingVertical: 2 },
  md: { fontSize: tokens.fontsizeXs, paddingHorizontal: 10, paddingVertical: 3 },
};

export function TagChip({
  label,
  variant = 'default',
  size = 'md',
  style: userStyle,
  textStyle: userTextStyle,
}: TagChipProps) {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <View style={[styles.chip, variantStyle, sizeStyle, userStyle]}>
      <Text style={[styles.label, { color: variantStyle.color }, userTextStyle]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    borderColor: tokens.cBorder,
    borderRadius: tokens.radiusSm,
    alignSelf: 'flex-start',
  },
  label: {
    fontWeight: '500' as TextStyle['fontWeight'],
  },
});
