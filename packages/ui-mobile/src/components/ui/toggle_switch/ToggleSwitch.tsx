import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ViewStyle, Animated } from 'react-native';
import { ToggleSwitchProps } from './ToggleSwitch.type';
import { tokens } from '@/tokens';

export function ToggleSwitch({
  checked,
  onValueChange,
  label,
  disabled = false,
  style: userStyle,
}: ToggleSwitchProps) {
  const handlePress = () => {
    if (disabled) return;
    onValueChange(!checked);
  };

  return (
    <TouchableOpacity
      style={[styles.container, userStyle]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.switch,
          { backgroundColor: checked ? tokens.colorBrand : tokens.colorMuted },
          disabled && styles.disabled,
        ]}
      >
        <View
          style={[
            styles.thumb,
            { transform: [{ translateX: checked ? 18 : 0 }] },
          ]}
        />
      </View>
      {label && <Text style={[styles.label, disabled && styles.disabledText]}>{label}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.space3,
  },
  switch: {
    width: 40,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  thumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: tokens.colorBg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: tokens.fontsizeSm,
    color: tokens.colorFg,
  },
  disabledText: {
    opacity: 0.5,
  },
});