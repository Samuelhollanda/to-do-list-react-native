import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { api } from '../services/api'; // Ajuste o caminho se a sua pasta src estiver noutro local

// 1. Tipagem (TypeScript) - Exatamente igual ao modelo do Prisma!
interface Task {
  id: string;
  title: string;
  description: string | null;
  isCompleted: boolean;
}

export default function HomeScreen() {
  // 2. Estados da nossa aplicação
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // 3. Função para ir buscar as tarefas à API
  async function fetchTasks() {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error("❌ Erro ao buscar tarefas:", error);
      alert("Não foi possível carregar as tarefas. Verifique a ligação com a API.");
    } finally {
      setLoading(false); // Desliga o "loading" quer dê sucesso ou erro
    }
  }

  async function handleToggle(id: string, currentStatus: boolean) {
    try {
      // Envia o status inverso do atual (se era true, envia false, e vice-versa)
      await api.patch(`/tasks/${id}/toggle`, { isCompleted: !currentStatus });

      // Recarrega a lista para mostrar a mudança no ecrã
      fetchTasks();
    } catch (error) {
      console.error("❌ Erro ao atualizar tarefa:", error);
      alert("Não foi possível atualizar o status da tarefa.");
    }
  }

  // 4. O useEffect chama a função fetchTasks assim que o ecrã abre
  useEffect(() => {
    fetchTasks();
  }, []);

  // 5. O que mostrar enquanto os dados não chegam
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>A carregar tarefas...</Text>
      </View>
    );
  }

  // 6. O ecrã principal com a FlatList
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Minhas Tarefas</Text>

      {/* 2. ADICIONE O LINK DE NAVEGAÇÃO AQUI */}
      <Link href="/create" asChild>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Nova</Text>
        </TouchableOpacity>
      </Link>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            
            {item.description && (
              <Text style={styles.taskDesc}>{item.description}</Text>
            )}
            
            {/* TRANSFORMÁMOS O TEXTO NUM BOTÃO CLICÁVEL */}
            <TouchableOpacity 
              style={styles.statusButton} 
              onPress={() => handleToggle(item.id, item.isCompleted)}
            >
              <Text style={styles.taskStatus}>
                {item.isCompleted ? "✅ Concluída (Clique para reabrir)" : "⏳ Pendente (Clique para concluir)"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        // O que mostrar se a base de dados estiver vazia
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma tarefa cadastrada ainda.</Text>
        }
      />
    </View>
  );
}

// 7. Estilização usando StyleSheet (Flexbox nativo)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  statusButton: {
    marginTop: 10,
    paddingVertical: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombras no Android
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  taskDesc: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  taskStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#444',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 20,
  }
});