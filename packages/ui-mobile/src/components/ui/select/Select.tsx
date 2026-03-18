import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, TextStyle } from 'react-native';
import { SelectProps, SelectSize, SelectOption } from './Select.type';
import { tokens } from '@/tokens';

const sizeStyles = (size: SelectSize) => {
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

export function Select({
  value,
  onChange,
  options,
  label,
  placeholder,
  helperText,
  errorText,
  disabled = false,
  size = 'md',
  fullWidth = false,
  style: userStyle,
}: SelectProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const hasError = Boolean(errorText);
  const config = sizeStyles(size);

  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder || 'Select...';

  const handleSelect = (option: SelectOption) => {
    if (!option.disabled) {
      onChange(option.value);
      setModalVisible(false);
    }
  };

  return (
    <View style={[styles.container, fullWidth && { width: '100%' }, userStyle]}>
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}

      <TouchableOpacity
        style={[
          styles.select,
          config,
          hasError && { borderColor: tokens.colorError },
          disabled && { opacity: 0.5 },
        ]}
        onPress={() => !disabled && setModalVisible(true)}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Text style={[styles.selectText, { fontSize: config.fontSize, color: selectedOption ? tokens.colorFg : tokens.colorMuted }]}>
          {displayText}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      {(errorText || helperText) && (
        <Text style={[styles.helper, hasError && { color: tokens.colorError }]}>
          {errorText ?? helperText}
        </Text>
      )}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.option, item.disabled && styles.disabledOption]}
                  onPress={() => handleSelect(item)}
                  disabled={item.disabled}
                >
                  <Text style={[styles.optionText, item.disabled && styles.disabledText]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    fontWeight: '500' as TextStyle['fontWeight'],
    color: tokens.colorFg,
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: tokens.cBorder,
    borderRadius: tokens.radiusSm,
    backgroundColor: tokens.colorBg,
  },
  selectText: {
    flex: 1,
    color: tokens.colorFg,
  },
  arrow: {
    marginRight: tokens.space3,
    fontSize: 12,
    color: tokens.colorMuted,
  },
  helper: {
    marginTop: tokens.space1,
    fontSize: tokens.fontsizeXs,
    color: tokens.colorMuted,
    lineHeight: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: tokens.colorBg,
    borderTopLeftRadius: tokens.radiusMd,
    borderTopRightRadius: tokens.radiusMd,
    maxHeight: '50%',
  },
  option: {
    padding: tokens.space4,
    borderBottomWidth: 1,
    borderBottomColor: tokens.cBorder,
  },
  optionText: {
    fontSize: tokens.fontsizeSm,
    color: tokens.colorFg,
  },
  disabledOption: {
    opacity: 0.5,
  },
  disabledText: {
    color: tokens.colorMuted,
  },
  closeButton: {
    padding: tokens.space4,
    alignItems: 'center',
    backgroundColor: tokens.cSurfaceElevated,
  },
  closeText: {
    fontSize: tokens.fontsizeSm,
    color: tokens.colorBrand,
    fontWeight: '600' as TextStyle['fontWeight'],
  },
});
