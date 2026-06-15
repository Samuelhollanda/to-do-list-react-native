import { Text, View, TouchableOpacity } from 'react-native'
import styles from "@/styles/index.Style"
import dayjs from 'dayjs'
import type Task from '@/types/task'

interface RenderTasksProps {
    task: Task,
    onToggle: (id: string, currentStatus: boolean) => void;
}

const RenderTask = ({ task, onToggle}: RenderTasksProps) => {

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

            {/* TRANSFORMÁMOS O TEXTO NUM BOTÃO CLICÁVEL */}
            <TouchableOpacity
                style={styles.statusButton}
                onPress={() => onToggle(task.id, task.isCompleted)}
            >
                <Text style={styles.taskStatus}>
                    {task.isCompleted ? "✅ Concluída (Clique para reabrir)" : "⏳ Pendente (Clique para concluir)"}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default RenderTask;