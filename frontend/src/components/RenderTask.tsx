import { Text, View, TouchableOpacity } from 'react-native'
import styles from "@/styles/index.Style"
import dayjs from 'dayjs'
import type Task from '@/types/task'

interface RenderTasksProps {
    task: Task;
    onToggle: (id: string, currentStatus: boolean) => void;
    onDelete: (id: string) => void,
}

const RenderTask = ({ task, onToggle, onDelete}: RenderTasksProps) => {

    return (
        <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>{task.title}</Text>

            {/* 2. A MÁGICA ACONTECE AQUI */}
            <Text>
                Criado em: {dayjs(task.createdAt).format('DD/MM/YYYY [às] HH:mm')}
            </Text>

            {task.description && (
                <Text style={styles.taskDesc}>{task.description}</Text>
            )}

            <View style={styles.buttonsRow}>
        <TouchableOpacity 
          style={styles.statusButton} 
          onPress={() => onToggle(task.id, task.isCompleted)}
        >
          <Text style={styles.taskStatus}>
            {task.isCompleted ? "✅ Concluída" : "⏳ Pendente"}
          </Text>
        </TouchableOpacity>

        {/* 3. O BOTÃO DE DELETAR */}
        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={() => onDelete(task.id)
          }
        >
          <Text style={styles.deleteText}>🗑️ Excluir</Text>
        </TouchableOpacity>
      </View>
        </View>
    )
}

export default RenderTask;