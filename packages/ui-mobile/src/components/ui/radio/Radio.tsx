import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ViewStyle } from 'react-native';
import { RadioProps, RadioGroupProps, RadioSize } from './Radio.type';
import { tokens } from '@/tokens';

const sizeMap: Record<RadioSize, number> = {
  sm: 14,
  md: 16,
  lg: 20,
};

export function Radio({
  value,
  checked,
  onChange,
  label,
  name,
  disabled = false,
  size = 'md',
  style: userStyle,
}: RadioProps) {
  const handlePress = () => {
    if (disabled) return;
    onChange?.(value);
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
          styles.radio,
          { width: px, height: px },
          checked && styles.checked,
          disabled && styles.disabled,
        ]}
      >
        {checked && <View style={styles.dot} />}
      </View>
      {label && <Text style={[styles.label, disabled && styles.disabledText]}>{label}</Text>}
    </TouchableOpacity>
  );
}

export function RadioGroup({
  name,
  value,
  onChange,
  children,
  direction = 'vertical',
  gap = 10,
  style: userStyle,
}: RadioGroupProps) {
  const cloned = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    const childProps = (child as React.ReactElement<RadioProps>).props;
    return React.cloneElement(child as React.ReactElement<RadioProps>, {
      name,
      ...(value !== undefined && { checked: childProps.value === value }),
      ...(onChange && { onChange }),
    });
  });

  return (
    <View
      style={[
        styles.group,
        { flexDirection: direction === 'horizontal' ? 'row' : 'column', gap },
        userStyle,
      ]}
    >
      {cloned}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.space2,
  },
  radio: {
    borderWidth: 1.5,
    borderColor: tokens.colorMuted,
    borderRadius: 50,
    backgroundColor: tokens.colorBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    borderColor: tokens.colorBrand,
  },
  disabled: {
    opacity: 0.45,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: tokens.colorBrand,
  },
  label: {
    fontSize: tokens.fontsizeSm,
    color: tokens.colorFg,
    lineHeight: 14,
  },
  disabledText: {
    opacity: 0.45,
  },
  group: {
    flexWrap: 'wrap',
  },
});