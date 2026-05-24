import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Serviço para gerenciar armazenamento local com AsyncStorage
 * Este é um exemplo funcional que os alunos podem expandir
 */

const STORAGE_KEYS = {
  VEHICLES: '@challenge-ford:vehicles',
  CUSTOMERS: '@challenge-ford:customers',
  SERVICES: '@challenge-ford:services',
  SPECS_HISTORY: '@challenge-ford:specs-history',
  SPECS_FAVORITES: '@challenge-ford:specs-favorites',
};

export const StorageService = {
  // Salvar dados
  async saveData<T>(key: string, data: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      throw error;
    }
  },

  // Buscar dados
  async getData<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error;
    }
  },

  // Remover dados
  async removeData(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Erro ao remover dados:', error);
      throw error;
    }
  },

  // Limpar todos os dados
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
      throw error;
    }
  },

  // Keys pré-definidas
  keys: STORAGE_KEYS,
};
