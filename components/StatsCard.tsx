import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

interface Props {
  title: string;
  value: string;
}

export default function StatsCard({
  title,
  value,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>
        {value}
      </Text>

      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#003478',
    padding: 22,
    borderRadius: 22,
    marginHorizontal: 6,
  },

  value: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
  },

  title: {
    color: '#dfe7ff',
    marginTop: 8,
    fontSize: 15,
    fontWeight: '600',
  },
});