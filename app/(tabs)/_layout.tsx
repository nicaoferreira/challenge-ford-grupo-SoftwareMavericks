import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#003478',
        },

        headerTintColor: '#fff',

        headerTitleStyle: {
          fontWeight: '800',
        },

        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 6,
          backgroundColor: '#fff',
        },

        tabBarActiveTintColor: '#003478',
        tabBarInactiveTintColor: '#777',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="consulta"
        options={{
          title: 'Consulta',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="search"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="stats-chart"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="historico"
        options={{
          title: 'Histórico',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="time"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favoritos"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="star"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="sobre"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* ESCONDE TELAS AUXILIARES */}

      <Tabs.Screen
        name="lista"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="cadastro"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="detalhes"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}