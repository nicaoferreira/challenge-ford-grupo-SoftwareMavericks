import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Vehicle } from '../types';
import { mockVehicles } from '../data/mockData';

export default function Detalhes() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    const foundVehicle = mockVehicles.find(
      (v) => v.id === id
    );

    setVehicle(foundVehicle || null);
  }, [id]);

  if (!vehicle) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons
          name="alert-circle-outline"
          size={90}
          color="#9ca3af"
        />

        <Text style={styles.errorTitle}>
          Veículo não encontrado
        </Text>

        <Text style={styles.errorSubtitle}>
          O sistema não conseguiu localizar
          as especificações solicitadas.
        </Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>
            Voltar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            FORD TECH SPECS
          </Text>
        </View>

        <Text style={styles.brand}>
          {vehicle.brand}
        </Text>

        <Text style={styles.model}>
          {vehicle.model}
        </Text>

        <Text style={styles.version}>
          {vehicle.version}
        </Text>

        <View style={styles.scoreCard}>
          <Text style={styles.scoreNumber}>
            89%
          </Text>

          <Text style={styles.scoreLabel}>
            Score de Retenção
          </Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>
          Informações Gerais
        </Text>

        <View style={styles.infoGrid}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>
              Ano
            </Text>

            <Text style={styles.infoValue}>
              {vehicle.year}
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>
              Categoria
            </Text>

            <Text style={styles.infoValue}>
              {vehicle.category}
            </Text>
          </View>
        </View>

        <View style={styles.priceBox}>
          <Text style={styles.priceLabel}>
            Valor estimado
          </Text>

          <Text style={styles.priceValue}>
            R$ {vehicle.price.toLocaleString('pt-BR')}
          </Text>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>
          Especificações Técnicas
        </Text>

        {vehicle.features.map((feature, index) => (
          <View
            key={index}
            style={styles.featureRow}
          >
            <View style={styles.featureIcon}>
              <Ionicons
                name="checkmark"
                size={16}
                color="#fff"
              />
            </View>

            <Text style={styles.featureText}>
              {feature}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.aiCard}>
        <Text style={styles.aiTitle}>
          Análise Inteligente
        </Text>

        <Text style={styles.aiText}>
          A inteligência artificial identificou
          alto potencial de fidelização para
          clientes deste modelo, com aumento
          significativo em revisões preventivas
          e recorrência pós-venda.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => router.back()}
      >
        <Ionicons
          name="arrow-back"
          size={20}
          color="#fff"
        />

        <Text style={styles.actionButtonText}>
          Voltar para consulta
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef3fa',
    padding: 20,
  },

  hero: {
    backgroundColor: '#003478',
    padding: 28,
    borderRadius: 28,
    marginBottom: 22,
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
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },

  brand: {
    color: '#9dc4ff',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 8,
  },

  model: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '900',
  },

  version: {
    color: '#dfe7ff',
    fontSize: 18,
    marginTop: 8,
    marginBottom: 24,
  },

  scoreCard: {
    backgroundColor: '#0d4ea6',
    padding: 22,
    borderRadius: 22,
    alignItems: 'center',
  },

  scoreNumber: {
    color: '#fff',
    fontSize: 42,
    fontWeight: '900',
  },

  scoreLabel: {
    color: '#dfe7ff',
    marginTop: 8,
    fontWeight: '600',
  },

  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#003478',
    marginBottom: 20,
  },

  infoGrid: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 20,
  },

  infoBox: {
    flex: 1,
    backgroundColor: '#f4f7fc',
    padding: 18,
    borderRadius: 18,
  },

  infoLabel: {
    color: '#666',
    fontSize: 13,
    marginBottom: 8,
  },

  infoValue: {
    color: '#111827',
    fontSize: 20,
    fontWeight: '800',
  },

  priceBox: {
    backgroundColor: '#003478',
    padding: 24,
    borderRadius: 22,
  },

  priceLabel: {
    color: '#dfe7ff',
    marginBottom: 10,
    fontSize: 14,
  },

  priceValue: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '900',
  },

  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
  },

  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  featureIcon: {
    width: 28,
    height: 28,
    borderRadius: 20,
    backgroundColor: '#1c7c54',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  featureText: {
    flex: 1,
    color: '#333',
    fontSize: 15,
    lineHeight: 22,
  },

  aiCard: {
    backgroundColor: '#111827',
    padding: 26,
    borderRadius: 24,
    marginBottom: 24,
  },

  aiTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 14,
  },

  aiText: {
    color: '#d1d5db',
    lineHeight: 25,
    fontSize: 15,
  },

  actionButton: {
    backgroundColor: '#003478',
    padding: 18,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  actionButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
    marginLeft: 10,
  },

  errorContainer: {
    flex: 1,
    backgroundColor: '#eef3fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },

  errorTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#003478',
    marginTop: 24,
    marginBottom: 12,
  },

  errorSubtitle: {
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
    marginBottom: 30,
  },

  backButton: {
    backgroundColor: '#003478',
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 18,
  },

  backButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
});