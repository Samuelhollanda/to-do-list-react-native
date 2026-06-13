import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '../services/api';

export default function CreateTaskScreen() {
  const router = useRouter(); // Hook do Expo Router para controlar a navegação
  
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
      // Faz a chamada POST para o backend no Docker
      await api.post('/tasks', {
        title,
        description: description.trim() ? description : null,
      });

      Alert.alert('Sucesso 🎉', 'Tarefa adicionada com sucesso!', [
        { 
          text: 'OK', 
          onPress: () => router.back() // Volta para a tela anterior automaticamente!
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', // Garante que o texto comece no topo no Android
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});