import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,

        variant === 'primary' &&
          styles.primaryButton,

        variant === 'secondary' &&
          styles.secondaryButton,

        variant === 'danger' &&
          styles.dangerButton,

        disabled && styles.disabledButton,
      ]}
    >
      <Text
        style={[
          styles.buttonText,

          variant === 'secondary' &&
            styles.secondaryText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },

  primaryButton: {
    backgroundColor: '#003478',
  },

  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#003478',
  },

  dangerButton: {
    backgroundColor: '#d62828',
  },

  disabledButton: {
    backgroundColor: '#bdbdbd',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },

  secondaryText: {
    color: '#003478',
  },
});