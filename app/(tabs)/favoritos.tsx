import React, { useEffect, useState, useCallback } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

export default function Favoritos() {
  const [favorites, setFavorites] = useState<any[]>([]);

  async function loadFavorites() {
    try {
      const data = await AsyncStorage.getItem('favorites');

      if (data) {
        setFavorites(JSON.parse(data));
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.log('Erro ao carregar favoritos');
    }
  }

  async function removeFavorite(id: number | string) {
    try {
      const updated = favorites.filter(
        (item) => String(item.id) !== String(id)
      );

      setFavorites(updated);

      await AsyncStorage.setItem(
        'favorites',
        JSON.stringify(updated)
      );
    } catch (error) {
      console.log('Erro ao remover favorito');
    }
  }

  useEffect(() => {
    loadFavorites();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.badge}>
          FORD SMART MONITOR
        </Text>

        <Text style={styles.title}>
          Veículos Favoritos
        </Text>

        <Text style={styles.subtitle}>
          Veículos monitorados pelo sistema inteligente.
        </Text>
      </View>

      <View style={styles.counterCard}>
        <Text style={styles.counterNumber}>
          {favorites.length}
        </Text>

        <Text style={styles.counterText}>
          veículos salvos
        </Text>
      </View>

      <FlatList
        data={favorites}
        extraData={favorites}
        keyExtractor={(item, index) =>
          `${item.id}-${index}`
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              Nenhum favorito salvo
            </Text>

            <Text style={styles.emptyText}>
              Os veículos adicionados aparecerão aqui para monitoramento inteligente.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.leftContent}>
              <Text style={styles.vehicle}>
                {item.brand} {item.model}
              </Text>

              <Text style={styles.version}>
                {item.version}
              </Text>

              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>
                  IA monitorando
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFavorite(item.id)}
            >
              <Text style={styles.removeButtonText}>
                Remover
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef3fa',
    padding: 20,
  },

  header: {
    marginBottom: 24,
  },

  badge: {
    color: '#4f7bc7',
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#003478',
    marginBottom: 8,
  },

  subtitle: {
    color: '#666',
    lineHeight: 22,
  },

  counterCard: {
    backgroundColor: '#003478',
    padding: 24,
    borderRadius: 22,
    marginBottom: 24,
    alignItems: 'center',
  },

  counterNumber: {
    color: '#fff',
    fontSize: 42,
    fontWeight: '900',
  },

  counterText: {
    color: '#dfe7ff',
    marginTop: 8,
    fontSize: 15,
  },

  card: {
    backgroundColor: '#fff',
    padding: 22,
    borderRadius: 22,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftContent: {
    flex: 1,
    marginRight: 14,
  },

  vehicle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#003478',
  },

  version: {
    marginTop: 6,
    color: '#666',
    fontSize: 14,
  },

  statusBadge: {
    backgroundColor: '#e7f8ee',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 14,
  },

  statusText: {
    color: '#1c7c54',
    fontWeight: '700',
    fontSize: 12,
  },

  removeButton: {
    backgroundColor: '#d62828',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
  },

  removeButtonText: {
    color: '#fff',
    fontWeight: '800',
  },

  emptyCard: {
    backgroundColor: '#fff',
    padding: 28,
    borderRadius: 24,
    marginTop: 20,
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#003478',
    marginBottom: 12,
  },

  emptyText: {
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },
});