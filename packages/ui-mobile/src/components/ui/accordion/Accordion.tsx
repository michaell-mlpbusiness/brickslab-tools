import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, Animated, StyleSheet, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { AccordionProps, AccordionItemProps, AccordionVariant, AccordionSize } from './Accordion.type';
import { tokens } from '@/tokens';

const sizeMap = {
  sm: { paddingVertical: 8, paddingHorizontal: 12, fontSize: tokens.fontsizeXs },
  md: { paddingVertical: 12, paddingHorizontal: 16, fontSize: tokens.fontsizeSm },
  lg: { paddingVertical: 16, paddingHorizontal: 20, fontSize: tokens.fontsizeMedium },
};

const getVariantStyles = (
  variant: AccordionVariant
): { container: ViewStyle; item: ViewStyle; separator: ViewStyle } => {
  switch (variant) {
    case 'bordered':
      return {
        container: {
          borderWidth: 1,
          borderColor: tokens.cBorder,
          borderRadius: tokens.radiusMd,
          overflow: 'hidden' as ViewStyle['overflow'],
        },
        item: {},
        separator: { borderTopWidth: 1, borderTopColor: tokens.cBorder },
      };
    case 'separated':
      return {
        container: { gap: 8 },
        item: {
          borderWidth: 1,
          borderColor: tokens.cBorder,
          borderRadius: tokens.radiusMd,
          overflow: 'hidden' as ViewStyle['overflow'],
        },
        separator: {},
      };
    case 'ghost':
      return {
        container: {},
        item: {},
        separator: { borderTopWidth: 1, borderTopColor: tokens.cBorder },
      };
    default:
      return {
        container: {},
        item: {},
        separator: {},
      };
  }
};

export function Accordion({
  children,
  variant = 'bordered',
  size = 'md',
  style: userStyle,
}: AccordionProps) {
  const variantStyles = getVariantStyles(variant);
  const containerStyle: StyleProp<ViewStyle> = [variantStyles.container, userStyle];

  return (
    <View style={containerStyle}>
      {React.Children.map(children, (child, index) => (
        <View key={index} style={variantStyles.item}>
          {index > 0 && <View style={variantStyles.separator} />}
          {child}
        </View>
      ))}
    </View>
  );
}

export function AccordionItem({
  title,
  children,
  open: controlledOpen,
  onToggle,
  disabled = false,
  icon,
  style: userStyle,
}: AccordionItemProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    if (disabled) return;
    const newOpen = !isOpen;
    if (isControlled) {
      onToggle?.(newOpen);
    } else {
      setInternalOpen(newOpen);
    }
  };

  React.useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOpen, animatedHeight]);

  const contentHeight = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200], // Adjust based on content
  });

  return (
    <View style={[styles.item, userStyle]}>
      <TouchableOpacity
        style={[styles.header, disabled && styles.disabled]}
        onPress={toggle}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <View style={styles.titleContainer}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text style={[styles.title, disabled && styles.disabledText]}>{title}</Text>
        </View>
        <Text style={[styles.arrow, { transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }]}>
          ▼
        </Text>
      </TouchableOpacity>
      <Animated.View style={[styles.content, { height: contentHeight }]}>
        <View style={styles.contentInner}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: tokens.fontsizeSm,
    fontWeight: '500' as TextStyle['fontWeight'],
    color: tokens.colorFg,
    flex: 1,
  },
  arrow: {
    fontSize: 12,
    color: tokens.colorMuted,
  },
  disabled: {
    opacity: 0.45,
  },
  disabledText: {
    opacity: 0.45,
  },
  content: {
    overflow: 'hidden',
  },
  contentInner: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
});
