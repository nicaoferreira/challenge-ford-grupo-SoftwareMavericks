import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { useRouter } from 'expo-router';
import { mockVehicles } from '../../data/mockData';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Consulta() {
  const router = useRouter();

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [version, setVersion] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [score, setScore] = useState(0);

  async function handleSearch() {
    if (!brand || !model) {
      alert('Preencha marca e modelo');
      return;
    }

    setLoading(true);
    setResult(null);
    setNotFound(false);

    setTimeout(async () => {
      const vehicle = mockVehicles.find(
        (v) =>
          v.brand
            .toLowerCase()
            .includes(brand.toLowerCase()) &&
          v.model
            .toLowerCase()
            .includes(model.toLowerCase()) &&
          (
            !version ||
            v.version
              .toLowerCase()
              .includes(version.toLowerCase())
          )
      );

      setLoading(false);

      if (!vehicle) {
        setNotFound(true);
        return;
      }

      setResult(vehicle);

      setScore(
        Math.floor(Math.random() * 20) + 80
      );

      try {
        const existingHistory =
          await AsyncStorage.getItem(
            'history'
          );

        const history = existingHistory
          ? JSON.parse(existingHistory)
          : [];

        const newItem = {
          id: Date.now(),
          brand: vehicle.brand,
          model: vehicle.model,
          version: vehicle.version,
          date: new Date().toLocaleString(),
        };

        history.unshift(newItem);

        await AsyncStorage.setItem(
          'history',
          JSON.stringify(history)
        );
      } catch (error) {
        console.log(
          'Erro ao salvar histórico'
        );
      }
    }, 1200);
  }

  async function saveFavorite() {
    if (!result) return;

    try {
      const existing =
        await AsyncStorage.getItem(
          'favorites'
        );

      const favorites: any[] = existing
        ? JSON.parse(existing)
        : [];

      const alreadyExists =
        favorites.some(
          (item) =>
            item.brand === result.brand &&
            item.model === result.model &&
            item.version === result.version
        );

      if (alreadyExists) {
        alert(
          'Esse veículo já está nos favoritos'
        );
        return;
      }

      favorites.unshift({
        id: Date.now(),
        brand: result.brand,
        model: result.model,
        version: result.version,
      });

      await AsyncStorage.setItem(
        'favorites',
        JSON.stringify(favorites)
      );

      alert(
        'Veículo salvo nos favoritos'
      );
    } catch (error) {
      console.log(
        'Erro ao salvar favorito'
      );
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Consulta Inteligente
      </Text>

      <Text style={styles.subtitle}>
        IA preditiva para análise de
        veículos e retenção pós-venda.
      </Text>

      <View style={styles.availableContainer}>
        <Text style={styles.availableTitle}>
          Veículos disponíveis
        </Text>

        <View style={styles.availableList}>
          {mockVehicles.map((vehicle) => (
            <View
              key={vehicle.id}
              style={styles.availableBadge}
            >
              <Text
                style={
                  styles.availableBadgeText
                }
              >
                {vehicle.brand}{' '}
                {vehicle.model}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.label}>
        Marca
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Ford"
        placeholderTextColor="#888"
        value={brand}
        onChangeText={setBrand}
      />

      <Text style={styles.label}>
        Modelo
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Ranger"
        placeholderTextColor="#888"
        value={model}
        onChangeText={setModel}
      />

      <Text style={styles.label}>
        Versão
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Raptor"
        placeholderTextColor="#888"
        value={version}
        onChangeText={setVersion}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSearch}
      >
        <Text style={styles.buttonText}>
          Buscar Veículo
        </Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator
          size="large"
          color="#003478"
          style={{ marginTop: 30 }}
        />
      )}

      {notFound && (
        <View style={styles.notFoundCard}>
          <Text style={styles.notFoundText}>
            Nenhum veículo encontrado.
          </Text>
        </View>
      )}

      {result && !loading && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>
            {result.brand}{' '}
            {result.model}
          </Text>

          <Text style={styles.resultText}>
            Versão: {result.version}
          </Text>

          <Text style={styles.resultText}>
            Ano: {result.year}
          </Text>

          <Text style={styles.resultText}>
            Categoria: {result.category}
          </Text>

          <Text style={styles.resultText}>
            Preço: R${' '}
            {result.price.toLocaleString(
              'pt-BR'
            )}
          </Text>

          <Text style={styles.riskScore}>
            Score de Retenção: {score}%
          </Text>

          <Text style={styles.aiInsight}>
            IA detectou alta
            probabilidade de retorno
            para manutenção preventiva.
          </Text>

          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() =>
              router.push(
                `/detalhes?id=${result.id}`
              )
            }
          >
            <Text
              style={
                styles.detailsButtonText
              }
            >
              Ver detalhes completos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={saveFavorite}
          >
            <Text
              style={
                styles.favoriteButtonText
              }
            >
              Salvar nos Favoritos
            </Text>
          </TouchableOpacity>

          <Text
            style={styles.featuresTitle}
          >
            Especificações Técnicas
          </Text>

          {result.features.map(
            (
              item: string,
              index: number
            ) => (
              <Text
                key={index}
                style={styles.featureItem}
              >
                • {item}
              </Text>
            )
          )}
        </View>
      )}
    </ScrollView>
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
    fontSize: 15,
    color: '#666',
    marginBottom: 24,
    lineHeight: 22,
  },

  availableContainer: {
    marginBottom: 24,
  },

  availableTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#003478',
    marginBottom: 14,
  },

  availableList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  availableBadge: {
    backgroundColor: '#003478',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 30,
    marginRight: 10,
    marginBottom: 10,
  },

  availableBadgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },

  label: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: '#222',
  },

  input: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 15,
  },

  button: {
    backgroundColor: '#003478',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },

  resultCard: {
    backgroundColor: '#fff',
    padding: 22,
    borderRadius: 20,
    marginBottom: 30,
  },

  resultTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 14,
    color: '#003478',
  },

  resultText: {
    fontSize: 15,
    marginBottom: 10,
    color: '#444',
  },

  riskScore: {
    marginTop: 14,
    fontSize: 20,
    fontWeight: '800',
    color: '#1c7c54',
  },

  aiInsight: {
    marginTop: 10,
    marginBottom: 20,
    color: '#555',
    lineHeight: 22,
  },

  detailsButton: {
    backgroundColor: '#003478',
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 14,
  },

  detailsButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },

  favoriteButton: {
    backgroundColor: '#f4b400',
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 20,
  },

  favoriteButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },

  featuresTitle: {
    marginBottom: 12,
    fontWeight: '800',
    fontSize: 18,
    color: '#003478',
  },

  featureItem: {
    marginBottom: 8,
    color: '#333',
    lineHeight: 22,
  },

  notFoundCard: {
    backgroundColor: '#fff3f3',
    padding: 18,
    borderRadius: 16,
    marginTop: 10,
  },

  notFoundText: {
    color: '#d62828',
    fontWeight: '700',
    textAlign: 'center',
  },
});