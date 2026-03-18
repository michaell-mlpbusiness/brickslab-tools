import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { ButtonProps, ButtonVariant, ButtonSize } from './Button.type';
import { tokens } from '@/tokens';

const variantStyles = (variant: ButtonVariant, customBg?: string, customColor?: string): ViewStyle => {
  switch (variant) {
    case 'primary':
      return { backgroundColor: tokens.colorBrand, borderWidth: 0 };
    case 'secondary':
      return { backgroundColor: tokens.colorBg, borderWidth: 1, borderColor: tokens.colorMuted };
    case 'ghost':
      return { backgroundColor: 'transparent', borderWidth: 0 };
    case 'danger':
      return { backgroundColor: tokens.colorError, borderWidth: 0 };
    case 'custom':
      return { backgroundColor: customBg || tokens.colorBrand, borderWidth: 0 };
    default:
      return {};
  }
};

const sizeStyles = (size: ButtonSize): ViewStyle => {
  switch (size) {
    case 'sm':
      return { height: 28, paddingHorizontal: tokens.space3, paddingVertical: tokens.space2 };
    case 'md':
      return { height: tokens.heightInput, paddingHorizontal: tokens.space5, paddingVertical: tokens.space3 };
    case 'lg':
      return { height: 44, paddingHorizontal: tokens.space6, paddingVertical: tokens.space4 };
    default:
      return {};
  }
};

const textStyles = (variant: ButtonVariant, size: ButtonSize, customColor?: string): TextStyle => {
  const base: TextStyle = { fontWeight: '600' as TextStyle['fontWeight'] };
  switch (size) {
    case 'sm':
      base.fontSize = tokens.fontsizeXs;
      break;
    case 'md':
      base.fontSize = tokens.fontsizeSm;
      break;
    case 'lg':
      base.fontSize = tokens.fontsizeMedium;
      break;
  }
  switch (variant) {
    case 'primary':
    case 'danger':
      base.color = '#FBFBFB';
      break;
    case 'secondary':
      base.color = tokens.colorFg;
      break;
    case 'ghost':
      base.color = tokens.colorFg;
      break;
    case 'custom':
      base.color = customColor || tokens.colorFg;
      break;
  }
  return base;
};

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  onPress,
  children,
  customBg,
  customColor,
  style: userStyle,
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variantStyles(variant, customBg, customColor),
        sizeStyles(size),
        fullWidth && { width: '100%' },
        isDisabled && { opacity: 0.6 },
        userStyle,
      ]}
      onPress={isDisabled ? undefined : onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {isLoading ? <ActivityIndicator size="small" color={textStyles(variant, size, customColor).color} /> : leftIcon}
        <Text style={[styles.text, textStyles(variant, size, customColor)]}>{children}</Text>
        {!isLoading && rightIcon}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: tokens.radiusSm,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.space2,
  },
  text: {
    textAlign: 'center',
  },
});
