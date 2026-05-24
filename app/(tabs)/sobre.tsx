import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Sobre() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.headerCard}>
        <Text style={styles.title}>
          Ford Competitive Intelligence
        </Text>

        <Text style={styles.subtitle}>
          Plataforma mobile para análise
          competitiva automotiva
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Objetivo
        </Text>

        <Text style={styles.text}>
          O projeto foi desenvolvido para
          auxiliar na comparação técnica
          entre veículos concorrentes,
          permitindo consultas rápidas,
          armazenamento local e análise
          padronizada de informações.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Funcionalidades
        </Text>

        <Text style={styles.text}>
          • Consulta inteligente de veículos{'\n'}
          • Histórico persistente{'\n'}
          • Sistema de favoritos{'\n'}
          • Interface moderna{'\n'}
          • Simulação de analytics{'\n'}
          • Estrutura escalável
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Equipe
        </Text>

        <Text style={styles.text}>
          Software Mavericks{'\n\n'}

          Luiz Felipe Motta da Silva{'\n'}
          RM 559126{'\n\n'}

          Nicolas Lorenzo Ferreira da Silva{'\n'}
          RM 557962{'\n\n'}

          Pedro Henrique Faim dos Santos{'\n'}
          RM 557440
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  headerCard: {
    backgroundColor: '#003478',
    padding: 24,
    borderRadius: 20,
    marginBottom: 18,
  },

  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
  },

  subtitle: {
    color: '#dfe7ff',
    marginTop: 10,
    lineHeight: 22,
  },

  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 18,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#003478',
    marginBottom: 12,
  },

  text: {
    color: '#444',
    lineHeight: 24,
    fontSize: 15,
  },
});