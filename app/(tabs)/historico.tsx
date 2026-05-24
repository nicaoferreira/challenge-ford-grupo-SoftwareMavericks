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

export default function Historico() {
  const [history, setHistory] = useState<any[]>([]);

  async function loadHistory() {
    try {
      const data = await AsyncStorage.getItem('history');

      if (data) {
        setHistory(JSON.parse(data));
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.log('Erro ao carregar histórico');
    }
  }

  async function clearHistory() {
    try {
      await AsyncStorage.removeItem('history');

      setHistory([]);
    } catch (error) {
      console.log('Erro ao limpar histórico');
    }
  }

  useEffect(() => {
    loadHistory();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.badge}>
        FORD ANALYTICS
      </Text>

      <Text style={styles.title}>
        Histórico Inteligente
      </Text>

      <Text style={styles.subtitle}>
        Monitoramento de consultas realizadas pelo usuário.
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statsCard}>
          <Text style={styles.statsNumber}>
            {history.length}
          </Text>

          <Text style={styles.statsLabel}>
            Consultas
          </Text>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsNumber}>
            {
              history.filter(
                (item) => item.brand === 'Ford'
              ).length
            }
          </Text>

          <Text style={styles.statsLabel}>
            Ford
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.clearButton}
        onPress={clearHistory}
      >
        <Text style={styles.clearButtonText}>
          Limpar Histórico
        </Text>
      </TouchableOpacity>

      <FlatList
        data={history}
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
              Nenhuma consulta encontrada
            </Text>

            <Text style={styles.emptyText}>
              O histórico de pesquisas aparecerá aqui automaticamente.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.topRow}>
              <Text style={styles.vehicle}>
                {item.brand} {item.model}
              </Text>

              <View style={styles.aiBadge}>
                <Text style={styles.aiBadgeText}>
                  IA
                </Text>
              </View>
            </View>

            <Text style={styles.version}>
              {item.version}
            </Text>

            <Text style={styles.date}>
              {item.date}
            </Text>

            <View style={styles.insightBox}>
              <Text style={styles.insightText}>
                Alta probabilidade de retorno para revisão preventiva.
              </Text>
            </View>
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
  },

  subtitle: {
    marginTop: 8,
    marginBottom: 24,
    color: '#666',
    lineHeight: 22,
  },

  statsContainer: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 20,
  },

  statsCard: {
    flex: 1,
    backgroundColor: '#003478',
    padding: 24,
    borderRadius: 22,
    alignItems: 'center',
  },

  statsNumber: {
    fontSize: 34,
    fontWeight: '900',
    color: '#fff',
  },

  statsLabel: {
    color: '#dfe7ff',
    marginTop: 8,
    fontWeight: '600',
  },

  clearButton: {
    backgroundColor: '#d62828',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 22,
  },

  clearButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },

  card: {
    backgroundColor: '#fff',
    padding: 22,
    borderRadius: 22,
    marginBottom: 16,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  vehicle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#003478',
  },

  aiBadge: {
    backgroundColor: '#003478',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },

  aiBadgeText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 12,
  },

  version: {
    marginTop: 8,
    color: '#555',
  },

  date: {
    marginTop: 10,
    color: '#888',
    fontSize: 13,
  },

  insightBox: {
    marginTop: 18,
    backgroundColor: '#eef4ff',
    padding: 16,
    borderRadius: 16,
  },

  insightText: {
    color: '#003478',
    lineHeight: 22,
    fontWeight: '600',
  },

  emptyCard: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 24,
    marginTop: 20,
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#003478',
    marginBottom: 10,
  },

  emptyText: {
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },
});