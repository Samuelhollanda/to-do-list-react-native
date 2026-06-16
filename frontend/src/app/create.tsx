import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '@/services/api';
import styles from '@/styles/create.Style';

export default function CreateTaskScreen() {
  const router = useRouter();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCreateTask() {
    if (!title.trim()) {
      Alert.alert('Aviso', 'O título da tarefa é obrigatório.');
      return;
    }

    setIsSubmitting(true);

    try {
      await api.post('/tasks', {
        title,
        description: description.trim() ? description : null,
      });

      Alert.alert('Sucesso ', 'Tarefa adicionada com sucesso!', [
        { 
          text: 'OK', 
          onPress: () => router.back()
        }
      ]);
    } catch (error) {
      console.error("❌ Erro ao criar tarefa:", error);
      Alert.alert('Erro', 'Não foi possível salvar a tarefa.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título da Tarefa *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Estudar Expo Router"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Descrição (Opcional)</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Detalhes sobre a tarefa..."
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleCreateTask}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Salvar Tarefa</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}