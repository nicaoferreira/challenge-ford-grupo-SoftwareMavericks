import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

interface CardProps {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
}

export default function Card({
  title,
  subtitle,
  description,
  icon,
  onPress,
}: CardProps) {
  const Content = () => (
    <>
      <View style={styles.header}>
        {icon && (
          <View style={styles.iconContainer}>
            <Ionicons
              name={icon}
              size={22}
              color="#003478"
            />
          </View>
        )}

        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {title}
          </Text>

          {subtitle && (
            <Text style={styles.subtitle}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {description && (
        <Text style={styles.description}>
          {description}
        </Text>
      )}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={styles.card}
      >
        <Content />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.card}>
      <Content />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E8F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
  },

  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 16,
    lineHeight: 22,
  },
});