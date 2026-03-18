import React from 'react';
import { ScrollView, TouchableOpacity, Text, View, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { TabsProps, TabPanelProps, TabsVariant, TabsSize } from './Tabs.type';
import { tokens } from '@/tokens';

const sizeMap = {
  sm: { fontSize: tokens.fontsizeXs, paddingHorizontal: tokens.space3, paddingVertical: tokens.space2 },
  md: { fontSize: tokens.fontsizeSm, paddingHorizontal: tokens.space4, paddingVertical: tokens.space2 },
  lg: { fontSize: tokens.fontsizeMedium, paddingHorizontal: tokens.space5, paddingVertical: tokens.space3 },
};

const getVariantStyles = (variant: TabsVariant) => {
  switch (variant) {
    case 'underline':
      return {
        container: { borderBottomWidth: 1, borderBottomColor: tokens.cBorder },
        tab: { borderBottomWidth: 2, borderBottomColor: 'transparent' },
        activeTab: { borderBottomColor: tokens.colorBrand },
      };
    case 'pills':
      return {
        container: {},
        tab: { borderRadius: tokens.radiusSm },
        activeTab: { backgroundColor: tokens.cBrandSubtle },
      };
    case 'boxed':
      return {
        container: { backgroundColor: tokens.cSurfaceElevated, padding: 4, borderRadius: tokens.radiusMd },
        tab: { borderRadius: tokens.radiusSm },
        activeTab: { backgroundColor: tokens.colorBg, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 3, elevation: 1 },
      };
    default:
      return {};
  }
};

export function Tabs({
  tabs,
  value,
  onChange,
  variant = 'underline',
  size = 'md',
  fullWidth = false,
  style: userStyle,
}: TabsProps) {
  const config = sizeMap[size];
  const variantStyles = getVariantStyles(variant);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.container, variantStyles.container, userStyle]}
      contentContainerStyle={fullWidth ? { flex: 1 } : undefined}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === value;
        return (
          <TouchableOpacity
            key={tab.value}
            style={[
              styles.tab,
              config,
              variantStyles.tab,
              isActive && variantStyles.activeTab,
              fullWidth && { flex: 1 },
              tab.disabled && styles.disabled,
            ]}
            onPress={() => !tab.disabled && onChange(tab.value)}
            disabled={tab.disabled}
            activeOpacity={0.8}
          >
            {tab.icon}
            <Text style={[styles.label, { fontSize: config.fontSize, color: isActive ? tokens.colorFg : tokens.colorMuted }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

export function TabPanel({ value, activeValue, children, style: userStyle }: TabPanelProps) {
  if (value !== activeValue) return null;
  return <View style={userStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginRight: 2,
  },
  label: {
    fontWeight: '500' as TextStyle['fontWeight'],
  },
  disabled: {
    opacity: 0.4,
  },
});
