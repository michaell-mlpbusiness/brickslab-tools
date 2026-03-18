import React from 'react';
import { View, TextInput, Text, StyleSheet, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { InputProps, InputSize } from './Input.type';
import { tokens } from '@/tokens';

const sizeStyles = (size: InputSize) => {
  switch (size) {
    case 'sm':
      return { height: 28, paddingHorizontal: tokens.space3, fontSize: tokens.fontsizeXs };
    case 'md':
      return { height: tokens.heightInput, paddingHorizontal: tokens.space4, fontSize: tokens.fontsizeSm };
    case 'lg':
      return { height: 44, paddingHorizontal: tokens.space5, fontSize: tokens.fontsizeMedium };
    default:
      return {};
  }
};

export function Input({
  value,
  onChangeText,
  keyboardType = 'default',
  label,
  placeholder,
  helperText,
  errorText,
  disabled = false,
  editable = true,
  leftIcon,
  rightIcon,
  size = 'md',
  fullWidth = false,
  style: userStyle,
  inputStyle: userInputStyle,
}: InputProps) {
  const hasError = Boolean(errorText);
  const isEditable = editable && !disabled;
  const config = sizeStyles(size);

  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    fullWidth && { width: '100%' },
    !isEditable && { opacity: 0.5 },
    userStyle,
  ];

  const inputContainerStyle: StyleProp<ViewStyle> = [
    styles.inputContainer,
    { borderColor: hasError ? tokens.colorError : tokens.colorMuted },
    !isEditable && { backgroundColor: tokens.colorMuted },
  ];

  const textInputStyle: StyleProp<TextStyle> = [
    styles.input,
    config,
    { color: tokens.colorFg },
    userInputStyle,
  ];

  return (
    <View style={containerStyle}>
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}

      <View style={inputContainerStyle}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={tokens.colorMuted}
          keyboardType={keyboardType}
          editable={isEditable}
          style={textInputStyle}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>

      {(errorText || helperText) && (
        <Text style={[styles.helper, hasError && { color: tokens.colorError }]}>
          {errorText ?? helperText}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: tokens.space2,
  },
  label: {
    marginBottom: tokens.space1,
    fontSize: tokens.fontsizeSm,
    fontWeight: tokens.fontweightMedium as TextStyle['fontWeight'],
    color: tokens.colorFg,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: tokens.radiusSm,
    backgroundColor: tokens.colorBg,
  },
  input: {
    flex: 1,
    color: tokens.colorFg,
  },
  leftIcon: {
    marginLeft: tokens.space3,
  },
  rightIcon: {
    marginRight: tokens.space3,
  },
  helper: {
    marginTop: tokens.space1,
    fontSize: tokens.fontsizeXs,
    color: tokens.colorMuted,
    lineHeight: 14,
  },
});
