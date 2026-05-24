import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Input from '../components/Input';
import Button from '../components/Button';
import { StorageService } from '../services/storage';
import { Vehicle } from '../types';

export default function Cadastro() {
  const router = useRouter();
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [version, setVersion] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const handleSave = async () => {
    // Validação simples
    if (!brand || !model || !version || !year || !price || !category) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      // Cria um novo veículo
      const newVehicle: Vehicle = {
        id: Date.now().toString(),
        brand,
        model,
        version,
        year: parseInt(year),
        price: parseFloat(price.replace(/[^0-9]/g, '')),
        category,
        features: [],
      };

      // Busca veículos existentes
      const existingVehicles = await StorageService.getData<Vehicle[]>(
        StorageService.keys.VEHICLES
      ) || [];

      // Adiciona o novo veículo
      const updatedVehicles = [...existingVehicles, newVehicle];

      // Salva no AsyncStorage
      await StorageService.saveData(
        StorageService.keys.VEHICLES,
        updatedVehicles
      );

      Alert.alert(
        'Sucesso',
        'Veículo cadastrado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Limpa os campos
              setBrand('');
              setModel('');
              setVersion('');
              setYear('');
              setPrice('');
              setCategory('');
              
              // Volta para a tela anterior
              router.back();
            },
          },
        ]
      );
    } catch (error) {
      console.error('Erro ao salvar:', error);
      Alert.alert('Erro', 'Não foi possível salvar o veículo');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          💡 Este é um exemplo de formulário com AsyncStorage. Personalize conforme seu desafio!
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.formTitle}>Dados do Veículo</Text>

        <Input
          label="Marca"
          value={brand}
          onChangeText={setBrand}
          placeholder="Ex: Ford, Chevrolet, Volkswagen"
        />

        <Input
          label="Modelo"
          value={model}
          onChangeText={setModel}
          placeholder="Ex: Mustang, Ranger, Territory"
        />

        <Input
          label="Versão"
          value={version}
          onChangeText={setVersion}
          placeholder="Ex: GT, Raptor, Titanium"
        />

        <Input
          label="Ano"
          value={year}
          onChangeText={setYear}
          placeholder="Ex: 2024"
          keyboardType="numeric"
        />

        <Input
          label="Preço (R$)"
          value={price}
          onChangeText={setPrice}
          placeholder="Ex: 350000"
          keyboardType="numeric"
        />

        <Input
          label="Categoria"
          value={category}
          onChangeText={setCategory}
          placeholder="Ex: SUV, Sedan, Picape"
        />
      </View>

      <View style={styles.actions}>
        <Button
          title="Salvar Veículo"
          onPress={handleSave}
          variant="primary"
        />
        <Button
          title="Cancelar"
          onPress={() => router.back()}
          variant="secondary"
        />
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
  form: {
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 22,
  marginBottom: 20,
  },
  formTitle: {
  fontSize: 24,
  fontWeight: '800',
  color: '#003478',
  marginBottom: 20,
  },
  actions: {
    marginBottom: 40,
  },
});
