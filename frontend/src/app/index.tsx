import React, { useCallback, useEffect, useState } from 'react';
import { Link, useFocusEffect } from 'expo-router';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { api } from '../services/api';
import type Task from '../types/task';
import styles from '../styles/index.Style';
import RenderTask from '@/components/RenderTask';


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

  // 4. O useEffect chama a função fetchTasks assim que o ecrã abre
  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

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
        renderItem={({ item }) => <RenderTask task={item} onToggle={handleToggle}/>}
        // O que mostrar se a base de dados estiver vazia
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma tarefa cadastrada ainda.</Text>
        }
      />
    </View>
  );
}