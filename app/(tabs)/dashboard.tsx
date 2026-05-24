import React, {
  useState,
  useCallback,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { mockVehicles } from '../../data/mockData';

import { useFocusEffect } from 'expo-router';

export default function Dashboard() {
  const [favoritesCount, setFavoritesCount] =
    useState(0);

  const [historyCount, setHistoryCount] =
    useState(0);

  const [topBrand, setTopBrand] =
    useState('Ford');

  const [totalVehicles, setTotalVehicles] =
    useState(0);

  const [averagePrice, setAveragePrice] =
    useState(0);

  const [recentHistory, setRecentHistory] =
    useState<any[]>([]);

  const [topFavorites, setTopFavorites] =
    useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadDashboard();
    }, [])
  );

  async function loadDashboard() {
    try {
      const favoritesData =
        await AsyncStorage.getItem(
          'favorites'
        );

      const historyData =
        await AsyncStorage.getItem(
          'history'
        );

      const favorites = favoritesData
        ? JSON.parse(favoritesData)
        : [];

      const history = historyData
        ? JSON.parse(historyData)
        : [];

      setFavoritesCount(favorites.length);

      setHistoryCount(history.length);

      const brands = history.map(
        (item: any) => item.brand
      );

      const count: any = {};

      brands.forEach((brand: string) => {
        count[brand] =
          (count[brand] || 0) + 1;
      });

      const mostSearched =
        Object.keys(count).length > 0
          ? Object.keys(count).reduce(
              (a, b) =>
                count[a] > count[b]
                  ? a
                  : b
            )
          : 'Ford';

      setTopBrand(mostSearched);

      setTotalVehicles(
        mockVehicles.length
      );

      const totalPrice =
        mockVehicles.reduce(
          (acc, item) =>
            acc + item.price,
          0
        );

      const avg =
        totalPrice /
        mockVehicles.length;

      setAveragePrice(avg);

      setRecentHistory(
        history.slice(0, 3)
      );

      const favoriteRanking: any = {};

      favorites.forEach((item: any) => {
        const key =
          `${item.brand} ${item.model}`;

        favoriteRanking[key] =
          (favoriteRanking[key] || 0) + 1;
      });

      const sortedFavorites =
        Object.entries(favoriteRanking)
          .sort(
            (a: any, b: any) =>
              b[1] - a[1]
          )
          .slice(0, 3);

      setTopFavorites(sortedFavorites);
    } catch (error) {
      console.log(
        'Erro ao carregar dashboard'
      );
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.badge}>
          FORD ANALYTICS
        </Text>

        <Text style={styles.title}>
          Dashboard Executivo
        </Text>

        <Text style={styles.subtitle}>
          Monitoramento inteligente
          de retenção, pós-venda e
          comportamento dos clientes.
        </Text>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricCardBlue}>
          <Text style={styles.metricNumber}>
            {historyCount}
          </Text>

          <Text style={styles.metricLabel}>
            Consultas
          </Text>
        </View>

        <View style={styles.metricCardGreen}>
          <Text style={styles.metricNumber}>
            {favoritesCount}
          </Text>

          <Text style={styles.metricLabel}>
            Favoritos
          </Text>
        </View>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricCardRed}>
          <Text style={styles.metricNumber}>
            {totalVehicles}
          </Text>

          <Text style={styles.metricLabel}>
            Veículos
          </Text>
        </View>

        <View style={styles.metricCardDark}>
          <Text style={styles.metricNumber}>
            {topBrand}
          </Text>

          <Text style={styles.metricLabel}>
            Marca Popular
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Inteligência Artificial
        </Text>

        <Text style={styles.cardText}>
          A IA detectou aumento de
          interesse em veículos de
          alta performance e modelos
          premium com conectividade
          inteligente.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Preço Médio da Base
        </Text>

        <Text style={styles.bigPrice}>
          R${' '}
          {averagePrice.toLocaleString(
            'pt-BR',
            {
              maximumFractionDigits: 0,
            }
          )}
        </Text>

        <Text style={styles.cardText}>
          Média calculada com base
          nos veículos cadastrados
          na plataforma.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Ranking de Veículos
        </Text>

        {mockVehicles.map(
          (vehicle, index) => (
            <View
              key={vehicle.id}
              style={styles.rankItem}
            >
              <Text
                style={
                  styles.rankPosition
                }
              >
                {index + 1}.
              </Text>

              <Text
                style={
                  styles.rankVehicle
                }
              >
                {vehicle.brand}{' '}
                {vehicle.model}
              </Text>
            </View>
          )
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Últimas Consultas
        </Text>

        {recentHistory.length ===
        0 ? (
          <Text style={styles.cardText}>
            Nenhuma consulta recente.
          </Text>
        ) : (
          recentHistory.map(
            (item, index) => (
              <View
                key={index}
                style={
                  styles.historyItem
                }
              >
                <Text
                  style={
                    styles.historyVehicle
                  }
                >
                  {item.brand}{' '}
                  {item.model}
                </Text>

                <Text
                  style={
                    styles.historyDate
                  }
                >
                  {item.date}
                </Text>
              </View>
            )
          )
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Mais Favoritados
        </Text>

        {topFavorites.length ===
        0 ? (
          <Text style={styles.cardText}>
            Nenhum favorito salvo.
          </Text>
        ) : (
          topFavorites.map(
            (
              item: any,
              index
            ) => (
              <View
                key={index}
                style={
                  styles.rankItem
                }
              >
                <Text
                  style={
                    styles.rankPosition
                  }
                >
                  {index + 1}.
                </Text>

                <Text
                  style={
                    styles.rankVehicle
                  }
                >
                  {item[0]}
                </Text>
              </View>
            )
          )
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Status Operacional
        </Text>

        <View style={styles.statusItem}>
          <View
            style={
              styles.statusDotGreen
            }
          />

          <Text style={styles.statusText}>
            APIs operacionais
          </Text>
        </View>

        <View style={styles.statusItem}>
          <View
            style={
              styles.statusDotGreen
            }
          />

          <Text style={styles.statusText}>
            Sistema IA ativo
          </Text>
        </View>

        <View style={styles.statusItem}>
          <View
            style={
              styles.statusDotYellow
            }
          />

          <Text style={styles.statusText}>
            Alto tráfego detectado
          </Text>
        </View>
      </View>

      <View style={styles.footerCard}>
        <Text style={styles.footerTitle}>
          Insight Estratégico
        </Text>

        <Text style={styles.footerText}>
          Clientes que favoritam
          veículos possuem maior
          tendência de retorno e
          engajamento dentro da
          plataforma.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef3fa',
  },

  header: {
    backgroundColor: '#003478',
    padding: 28,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 24,
  },

  badge: {
    color: '#9dc4ff',
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 12,
  },

  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 14,
  },

  subtitle: {
    color: '#dfe7ff',
    lineHeight: 24,
    fontSize: 15,
  },

  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  metricCardBlue: {
    backgroundColor: '#003478',
    width: '48%',
    padding: 22,
    borderRadius: 22,
  },

  metricCardGreen: {
    backgroundColor: '#1c7c54',
    width: '48%',
    padding: 22,
    borderRadius: 22,
  },

  metricCardRed: {
    backgroundColor: '#d62828',
    width: '48%',
    padding: 22,
    borderRadius: 22,
  },

  metricCardDark: {
    backgroundColor: '#111827',
    width: '48%',
    padding: 22,
    borderRadius: 22,
  },

  metricNumber: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '900',
  },

  metricLabel: {
    color: '#fff',
    marginTop: 10,
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 22,
    borderRadius: 22,
    marginBottom: 18,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#003478',
    marginBottom: 16,
  },

  cardText: {
    color: '#555',
    lineHeight: 24,
    fontSize: 15,
  },

  bigPrice: {
    fontSize: 34,
    fontWeight: '900',
    color: '#003478',
    marginBottom: 10,
  },

  rankItem: {
    flexDirection: 'row',
    marginBottom: 14,
  },

  rankPosition: {
    fontSize: 18,
    fontWeight: '800',
    color: '#003478',
    width: 30,
  },

  rankVehicle: {
    fontSize: 16,
    color: '#333',
  },

  historyItem: {
    backgroundColor: '#f5f7fb',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },

  historyVehicle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#003478',
  },

  historyDate: {
    marginTop: 6,
    color: '#666',
    fontSize: 13,
  },

  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  statusDotGreen: {
    width: 12,
    height: 12,
    borderRadius: 10,
    backgroundColor: '#1c7c54',
    marginRight: 12,
  },

  statusDotYellow: {
    width: 12,
    height: 12,
    borderRadius: 10,
    backgroundColor: '#f4b400',
    marginRight: 12,
  },

  statusText: {
    color: '#333',
    fontSize: 15,
  },

  footerCard: {
    backgroundColor: '#111827',
    marginHorizontal: 20,
    padding: 26,
    borderRadius: 24,
    marginBottom: 40,
  },

  footerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 14,
  },

  footerText: {
    color: '#d1d5db',
    lineHeight: 26,
    fontSize: 15,
  },
});