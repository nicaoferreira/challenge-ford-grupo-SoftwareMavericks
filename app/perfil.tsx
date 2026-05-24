import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { StorageService } from '../services/storage';
import { Vehicle } from '../types';
import Button from '../components/Button';
import Card from '../components/Card';

export default function Perfil() {
  const [savedVehicles, setSavedVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const vehicles = await StorageService.getData<Vehicle[]>(
        StorageService.keys.VEHICLES
      );
      setSavedVehicles(vehicles || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearData = () => {
    Alert.alert(
      'Confirmar',
      'Deseja realmente limpar todos os dados salvos?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: async () => {
            try {
              await StorageService.removeData(StorageService.keys.VEHICLES);
              setSavedVehicles([]);
              Alert.alert('Sucesso', 'Dados removidos com sucesso!');
            } catch (error) {
              console.error('Erro ao limpar dados:', error);
              Alert.alert('Erro', 'Não foi possível limpar os dados');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          💡 Esta tela demonstra o uso do AsyncStorage. Aqui você pode visualizar dados salvos localmente.
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{savedVehicles.length}</Text>
          <Text style={styles.statLabel}>Veículos Salvos</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {savedVehicles.length > 0 ? '✓' : '✗'}
          </Text>
          <Text style={styles.statLabel}>AsyncStorage</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Veículos Cadastrados</Text>
        {loading ? (
          <Text style={styles.emptyText}>Carregando...</Text>
        ) : savedVehicles.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Nenhum veículo cadastrado ainda.
            </Text>
            <Text style={styles.emptyHint}>
              Vá para a tela de Cadastro para adicionar veículos.
            </Text>
          </View>
        ) : (
          savedVehicles.map((vehicle) => (
            <Card
              key={vehicle.id}
              title={`${vehicle.brand} ${vehicle.model}`}
              subtitle={vehicle.version}
              description={`R$ ${vehicle.price.toLocaleString('pt-BR')} • ${vehicle.year}`}
              icon="car-sport"
            />
          ))
        )}
      </View>

      {savedVehicles.length > 0 && (
        <View style={styles.actions}>
          <Button
            title="Limpar Dados Salvos"
            onPress={handleClearData}
            variant="danger"
          />
        </View>
      )}

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>ℹ️ Sobre o AsyncStorage</Text>
        <Text style={styles.infoDescription}>
          O AsyncStorage é usado para salvar dados localmente no dispositivo.
          Os dados permanecem salvos mesmo após fechar o aplicativo.
          {'\n\n'}
          Este é um requisito obrigatório do Challenge!
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
  },
  infoBox: {
    backgroundColor: '#E8F0FF',
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#003478',
  },
  infoText: {
    fontSize: 13,
    color: '#003478',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
  flex: 1,
  backgroundColor: '#fff',
  padding: 22,
  borderRadius: 20,
  alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#003478',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  emptyContainer: {
    backgroundColor: '#fff',
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyHint: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  actions: {
    marginBottom: 20,
  },
  infoSection: {
  backgroundColor: '#fff',
  padding: 22,
  borderRadius: 20,
  marginBottom: 40,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});
