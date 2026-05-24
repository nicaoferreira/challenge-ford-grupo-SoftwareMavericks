import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#003478',
        },

        headerTintColor: '#fff',

        headerTitleStyle: {
          fontWeight: 'bold',
        },

        contentStyle: {
          backgroundColor: '#eef3fa',
        },
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="detalhes"
        options={{
          title: 'Detalhes do Veículo',
        }}
      />

      <Stack.Screen
        name="cadastro"
        options={{
          title: 'Cadastro',
        }}
      />

      <Stack.Screen
        name="perfil"
        options={{
          title: 'Perfil',
        }}
      />

      <Stack.Screen
        name="spec/[id]"
        options={{
          title: 'Especificações',
        }}
      />
    </Stack>
  );
}