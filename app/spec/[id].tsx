import React, { useEffect, useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Button from '../../components/Button';
import { StorageService } from '../../services/storage';
import { SPEC_FIELDS } from '../../data/specFields';
import { SpecRun } from '../../types/specs';

export default function SpecDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [run, setRun] = useState<SpecRun | null>(null);

  const title = useMemo(() => {
    if (!run) return 'Especificações';
    return `${run.input.brand} ${run.input.model} ${run.input.version}`;
  }, [run]);

  useEffect(() => {
    (async () => {
      const history =
        (await StorageService.getData<SpecRun[]>(StorageService.keys.SPECS_HISTORY)) ||
        [];
      const found = history.find((x) => x.id === id) || null;
      setRun(found);
    })();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    Alert.alert('Remover', 'Deseja remover este item do histórico?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          const history =
            (await StorageService.getData<SpecRun[]>(
              StorageService.keys.SPECS_HISTORY
            )) || [];
          const updated = history.filter((x) => x.id !== id);
          await StorageService.saveData(StorageService.keys.SPECS_HISTORY, updated);
          router.back();
        },
      },
    ]);
  };

  if (!run) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Item não encontrado</Text>
          <Text style={styles.text}>
            Este item pode ter sido removido do histórico.
          </Text>
          <Button title="Voltar" onPress={() => router.back()} />
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.meta}>
          Fonte: {run.source} • {new Date(run.createdAt).toLocaleString('pt-BR')}
        </Text>
      </View>

      <View style={styles.card}>
        {SPEC_FIELDS.map((f) => (
          <View key={f.key} style={styles.row}>
            <Text style={styles.label}>{f.label}</Text>
            <Text style={styles.value}>{run.specs[f.key]}</Text>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <Button title="Remover do histórico" onPress={handleDelete} variant="danger" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 20, paddingBottom: 40 },
  header: {
    backgroundColor: '#003478',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  headerTitle: { color: '#fff', fontWeight: '900', fontSize: 16, marginBottom: 6 },
  meta: { color: '#fff', opacity: 0.9, fontSize: 12 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16 },
  row: { paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  label: { fontSize: 12, color: '#666', textTransform: 'uppercase', marginBottom: 4 },
  value: { fontSize: 15, color: '#1a1a1a', fontWeight: '600' },
  actions: { marginTop: 14 },
  title: { fontSize: 16, fontWeight: '900', color: '#1a1a1a', marginBottom: 6 },
  text: { color: '#666', lineHeight: 20, marginBottom: 12 },
});

