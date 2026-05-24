import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  text: string;
  onRemove?: () => void;
};

export default function Chip({ text, onRemove }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      {!!onRemove && (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={`Remover ${text}`}
          onPress={onRemove}
          style={styles.remove}
          hitSlop={10}
        >
          <Ionicons name="close" size={14} color="#003478" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#E8F0FF',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  text: {
    color: '#003478',
    fontSize: 13,
    fontWeight: '600',
  },
  remove: {
    marginLeft: 6,
  },
});

