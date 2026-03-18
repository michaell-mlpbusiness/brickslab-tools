import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, TextStyle } from 'react-native';
import { CheckboxProps, CheckboxSize } from './Checkbox.type';
import { tokens } from '@/tokens';

const sizeMap: Record<CheckboxSize, number> = {
  sm: 14,
  md: 16,
  lg: 20,
};

const CheckIcon = () => (
  <Text style={styles.checkmark}>✓</Text>
);

export function Checkbox({
  checked,
  defaultChecked,
  onValueChange,
  label,
  disabled = false,
  size = 'md',
  style: userStyle,
}: CheckboxProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked || false);
  const isChecked = checked !== undefined ? checked : internalChecked;

  const handlePress = () => {
    if (disabled) return;
    const newChecked = !isChecked;
    if (checked === undefined) {
      setInternalChecked(newChecked);
    }
    onValueChange?.(newChecked);
  };

  const px = sizeMap[size];

  return (
    <TouchableOpacity
      style={[styles.container, userStyle]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.checkbox,
          { width: px, height: px },
          isChecked && styles.checked,
          disabled && styles.disabled,
        ]}
      >
        {isChecked && <CheckIcon />}
      </View>
      {label && <Text style={[styles.label, disabled && styles.disabledText]}>{label}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.space2,
  },
  checkbox: {
    borderWidth: 1.5,
    borderColor: tokens.colorMuted,
    borderRadius: 3,
    backgroundColor: tokens.colorBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: tokens.colorBrand,
    borderColor: tokens.colorBrand,
  },
  disabled: {
    opacity: 0.45,
  },
  checkmark: {
    color: '#FBFBFB',
    fontSize: 10,
    fontWeight: 'bold' as TextStyle['fontWeight'],
  },
  label: {
    fontSize: tokens.fontsizeSm,
    color: tokens.colorFg,
    lineHeight: 14,
  },
  disabledText: {
    opacity: 0.45,
  },
});
