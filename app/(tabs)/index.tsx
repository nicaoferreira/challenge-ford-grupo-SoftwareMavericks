import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import StatsCard from '../../components/StatsCard';
import { mockVehicles } from '../../data/mockData';

export default function Home() {
  const router = useRouter();

  const totalVehicles = mockVehicles.length;

  const averagePrice =
    mockVehicles.reduce((acc, item) => acc + item.price, 0) /
    totalVehicles;

  const mostExpensive = [...mockVehicles].sort(
    (a, b) => b.price - a.price
  )[0];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.hero}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            FORD AI SYSTEM
          </Text>
        </View>

        <Text style={styles.heroTitle}>
          Ford PredictCare
        </Text>

        <Text style={styles.heroSubtitle}>
          Plataforma inteligente de retenção,
          monitoramento pós-venda e análise
          preditiva de comportamento automotivo.
        </Text>

        <TouchableOpacity
          style={styles.heroButton}
          onPress={() => router.push('/dashboard')}
          activeOpacity={0.8}
        >
          <Text style={styles.heroButtonText}>
            Abrir Dashboard
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <StatsCard
          title="Veículos"
          value={String(totalVehicles)}
        />

        <StatsCard
          title="VIN Share"
          value="78%"
        />
      </View>

      <View style={styles.statsRow}>
        <StatsCard
          title="Retenção"
          value="92%"
        />

        <StatsCard
          title="Leads"
          value="148"
        />
      </View>

      <Text style={styles.sectionTitle}>
        Central Operacional
      </Text>

      <TouchableOpacity
        style={styles.featureCard}
        onPress={() => router.push('/consulta')}
        activeOpacity={0.8}
      >
        <View style={styles.featureHeader}>
          <View style={styles.iconCircle}>
            <Ionicons
              name="search"
              size={22}
              color="#003478"
            />
          </View>

          <Text style={styles.featureTitle}>
            Consulta Inteligente
          </Text>
        </View>

        <Text style={styles.featureText}>
          Busca técnica de veículos com análise
          preditiva baseada em IA e histórico
          de comportamento.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.featureCard}
        onPress={() => router.push('/dashboard')}
        activeOpacity={0.8}
      >
        <View style={styles.featureHeader}>
          <View style={styles.iconCircle}>
            <Ionicons
              name="stats-chart"
              size={22}
              color="#003478"
            />
          </View>

          <Text style={styles.featureTitle}>
            Dashboard Executivo
          </Text>
        </View>

        <Text style={styles.featureText}>
          Indicadores estratégicos de retenção,
          pós-venda e comportamento dos clientes.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.featureCard}
        onPress={() => router.push('/historico')}
        activeOpacity={0.8}
      >
        <View style={styles.featureHeader}>
          <View style={styles.iconCircle}>
            <Ionicons
              name="time"
              size={22}
              color="#003478"
            />
          </View>

          <Text style={styles.featureTitle}>
            Histórico Inteligente
          </Text>
        </View>

        <Text style={styles.featureText}>
          Persistência local com rastreamento
          completo das consultas realizadas.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.featureCard}
        onPress={() => router.push('/favoritos')}
        activeOpacity={0.8}
      >
        <View style={styles.featureHeader}>
          <View style={styles.iconCircle}>
            <Ionicons
              name="star"
              size={22}
              color="#003478"
            />
          </View>

          <Text style={styles.featureTitle}>
            Favoritos Estratégicos
          </Text>
        </View>

        <Text style={styles.featureText}>
          Veículos monitorados para futuras
          ações automatizadas de retenção.
        </Text>
      </TouchableOpacity>

      <View style={styles.highlightCard}>
        <Text style={styles.highlightLabel}>
          VEÍCULO EM DESTAQUE
        </Text>

        <Text style={styles.highlightTitle}>
          {mostExpensive.brand} {mostExpensive.model}
        </Text>

        <Text style={styles.highlightVersion}>
          {mostExpensive.version}
        </Text>

        <Text style={styles.highlightPrice}>
          R$ {mostExpensive.price.toLocaleString('pt-BR')}
        </Text>
      </View>

      <View style={styles.aiCard}>
        <Text style={styles.aiTitle}>
          Insight da Inteligência Artificial
        </Text>

        <Text style={styles.aiText}>
          Detectamos aumento de 23% na procura
          por manutenção preventiva em veículos
          acima de 40 mil km durante o último
          trimestre.
        </Text>

        <View style={styles.aiDivider} />

        <Text style={styles.aiMiniText}>
          Ticket médio da frota monitorada:
        </Text>

        <Text style={styles.aiMiniValue}>
          R$ {averagePrice.toLocaleString('pt-BR', {
            maximumFractionDigits: 0,
          })}
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Ford Challenge • Mobile Development
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

  content: {
    paddingBottom: 40,
  },

  hero: {
    backgroundColor: '#003478',
    padding: 28,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    marginBottom: 24,
  },

  badge: {
    backgroundColor: '#0d4ea6',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
    marginBottom: 18,
  },

  badgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 1,
  },

  heroTitle: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '900',
    marginBottom: 16,
  },

  heroSubtitle: {
    color: '#dfe7ff',
    lineHeight: 25,
    fontSize: 16,
    marginBottom: 24,
  },

  heroButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 18,
    alignItems: 'center',
  },

  heroButtonText: {
    color: '#003478',
    fontWeight: '800',
    fontSize: 15,
  },

  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#003478',
    marginTop: 18,
    marginBottom: 18,
    paddingHorizontal: 20,
  },

  featureCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 22,
    borderRadius: 24,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  featureTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#003478',
    flex: 1,
  },

  featureText: {
    color: '#555',
    lineHeight: 24,
    fontSize: 15,
  },

  highlightCard: {
    backgroundColor: '#003478',
    marginHorizontal: 20,
    padding: 26,
    borderRadius: 26,
    marginTop: 6,
    marginBottom: 20,
  },

  highlightLabel: {
    color: '#9dc4ff',
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 10,
    fontSize: 12,
  },

  highlightTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
  },

  highlightVersion: {
    color: '#dfe7ff',
    fontSize: 16,
    marginTop: 6,
  },

  highlightPrice: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '900',
    marginTop: 18,
  },

  aiCard: {
    backgroundColor: '#111827',
    marginHorizontal: 20,
    padding: 26,
    borderRadius: 24,
    marginTop: 4,
    marginBottom: 30,
  },

  aiTitle: {
    color: '#fff',
    fontSize: 21,
    fontWeight: '900',
    marginBottom: 14,
  },

  aiText: {
    color: '#d1d5db',
    lineHeight: 25,
    fontSize: 15,
  },

  aiDivider: {
    height: 1,
    backgroundColor: '#2b3548',
    marginVertical: 20,
  },

  aiMiniText: {
    color: '#9ca3af',
    fontSize: 13,
    marginBottom: 6,
  },

  aiMiniValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
  },

  footer: {
    alignItems: 'center',
    marginBottom: 10,
  },

  footerText: {
    color: '#777',
    fontSize: 13,
  },
});