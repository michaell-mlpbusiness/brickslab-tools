import React from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { TextareaProps, TextareaSize } from './Textarea.type';
import { tokens } from '@/tokens';

const sizeStyles = (size: TextareaSize) => {
  switch (size) {
    case 'sm':
      return { paddingHorizontal: tokens.space3, paddingVertical: tokens.space2, fontSize: tokens.fontsizeXs };
    case 'md':
      return { paddingHorizontal: tokens.space4, paddingVertical: tokens.space3, fontSize: tokens.fontsizeSm };
    case 'lg':
      return { paddingHorizontal: tokens.space5, paddingVertical: tokens.space4, fontSize: tokens.fontsizeMedium };
    default:
      return {};
  }
};

export function Textarea({
  value,
  onChangeText,
  label,
  placeholder,
  helperText,
  errorText,
  disabled = false,
  editable = true,
  size = 'md',
  fullWidth = false,
  numberOfLines = 4,
  maxLength,
  style: userStyle,
  inputStyle: userInputStyle,
}: TextareaProps) {
  const hasError = Boolean(errorText);
  const isEditable = editable && !disabled;
  const config = sizeStyles(size);
  const isAtLimit = maxLength !== undefined && value.length >= maxLength;

  return (
    <View style={[styles.container, fullWidth && { width: '100%' }, userStyle]}>
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={tokens.colorMuted}
        multiline
        numberOfLines={numberOfLines}
        editable={isEditable}
        maxLength={maxLength}
        style={[
          styles.input,
          config,
          { borderColor: hasError ? tokens.colorError : tokens.cBorder },
          !isEditable && { backgroundColor: tokens.colorMuted },
          userInputStyle,
        ]}
      />

      <View style={styles.footer}>
        {(errorText || helperText) && (
          <Text style={[styles.helper, hasError && { color: tokens.colorError }]}>
            {errorText ?? helperText}
          </Text>
        )}
        {maxLength !== undefined && (
          <Text style={[styles.counter, isAtLimit && { color: tokens.colorError }]}>
            {value.length}/{maxLength}
          </Text>
        )}
      </View>
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
    fontWeight: '500',
    color: tokens.colorFg,
  },
  input: {
    borderWidth: 1,
    borderRadius: tokens.radiusSm,
    backgroundColor: tokens.colorBg,
    color: tokens.colorFg,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: tokens.space1,
  },
  helper: {
    flex: 1,
    fontSize: tokens.fontsizeXs,
    color: tokens.colorMuted,
    lineHeight: 14,
  },
  counter: {
    fontSize: tokens.fontsizeXs,
    color: tokens.colorMuted,
    marginLeft: tokens.space2,
  },
});