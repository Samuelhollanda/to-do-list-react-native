import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Minhas Tarefas' }} />
      <Stack.Screen name="create" options={{ title: 'Nova Tarefa', presentation: 'modal' }} />
    </Stack>
  );
}