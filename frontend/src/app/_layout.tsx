import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF', // Cor de fundo do cabeçalho global
        },
        headerTintColor: '#fff', // Cor do texto do cabeçalho
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {/* Define o ecrã inicial e o título dele */}
      <Stack.Screen name="index" options={{ title: 'Minhas Tarefas' }} />
      {/* Define o ecrã de criação como um modal ou ecrã comum */}
      <Stack.Screen name="create" options={{ title: 'Nova Tarefa', presentation: 'modal' }} />
    </Stack>
  );
}