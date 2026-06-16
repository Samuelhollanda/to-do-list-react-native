import { useCallback, useState, } from 'react';
import { Link, useFocusEffect } from 'expo-router';
import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { api } from '@/services/api';
import type Task from '@/types/task';
import styles from '@/styles/index.Style';
import RenderTask from '@/components/RenderTask';


export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchTasks() {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error("❌ Erro ao buscar tarefas:", error);
      alert("Não foi possível carregar as tarefas. Verifique a ligação com a API.");
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  async function handleToggle(id: string, currentStatus: boolean) {
    try {
      await api.patch(`/tasks/${id}/toggle`, { isCompleted: !currentStatus });

      fetchTasks();
    } catch (error) {
      console.error("❌ Erro ao atualizar tarefa:", error);
      alert("Não foi possível atualizar o status da tarefa.");
    }
  }

  function handleDelete(id: string) {
    Alert.alert(
      "Excluir Tarefa",
      "Tem certeza que deseja excluir esta tarefa de forma permanente?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sim, Excluir", 
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/tasks/${id}`);
              fetchTasks();
            } catch (error) {
              console.error("❌ Erro ao deletar tarefa:", error);
              Alert.alert("Erro", "Não foi possível excluir a tarefa.");
            }
          }
        }
      ]
    );
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>A carregar tarefas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Minhas Tarefas</Text>

      <Link href="/create" asChild>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Nova</Text>
        </TouchableOpacity>
      </Link>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RenderTask task={item} onToggle={handleToggle} onDelete={handleDelete}/>}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma tarefa cadastrada ainda.</Text>
        }
      />
    </View>
  );
}