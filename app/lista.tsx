import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { useRouter } from 'expo-router';
import { Vehicle } from '../types';
import { mockVehicles } from '../data/mockData';

export default function Lista() {
  const router = useRouter();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    setVehicles(mockVehicles);
  }, []);

  function renderVehicle({ item }: { item: Vehicle }) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.card}
        onPress={() =>
          router.push(`/detalhes?id=${item.id}`)
        }
      >
        <View style={styles.header}>
          <Text style={styles.brand}>
            {item.brand}
          </Text>

          <Text style={styles.price}>
            R$ {item.price.toLocaleString('pt-BR')}
          </Text>
        </View>

        <Text style={styles.model}>
          {item.model} {item.version}
        </Text>

        <Text style={styles.category}>
          {item.category} • {item.year}
        </Text>

        <View style={styles.featuresContainer}>
          {item.features.slice(0, 3).map((feature, index) => (
            <View key={index} style={styles.featureBadge}>
              <Text style={styles.featureText}>
                {feature}
              </Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Veículos Disponíveis
      </Text>

      <Text style={styles.subtitle}>
        Comparativo inteligente entre veículos concorrentes.
      </Text>

      <FlatList
        data={vehicles}
        renderItem={renderVehicle}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#003478',
    marginBottom: 8,
  },

  subtitle: {
    color: '#666',
    marginBottom: 24,
    lineHeight: 22,
  },

  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 18,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  brand: {
    color: '#003478',
    fontWeight: '800',
    fontSize: 13,
    textTransform: 'uppercase',
  },

  price: {
    color: '#111',
    fontWeight: '800',
  },

  model: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 6,
  },

  category: {
    color: '#666',
    marginBottom: 14,
  },

  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  featureBadge: {
    backgroundColor: '#E8F0FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },

  featureText: {
    color: '#003478',
    fontSize: 12,
    fontWeight: '600',
  },
});