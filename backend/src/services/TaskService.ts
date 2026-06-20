import { prisma } from '../config/prisma'

export class TaskService {
    async create(title: string, userId: string, description?: string) {
        return await prisma.task.create({
            data: { title, userId, description },
        });
    }

    async litAll(userId: string) {
        return await prisma.task.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: 'desc'
            },
        });
    }

    async toggleCompletion(id: string, isCompleted: boolean, userId: string) {
        const taskExists = await prisma.task.findFirst({
            where: { id, userId },
        });

        if (!taskExists) {
            throw new Error('Tarefa não encontrada ou não autorizada');
        }
        return await prisma.task.update({
            where: { id },
            data: { isCompleted },
        });
    }

    async delete(id: string, userId: string) {
        const taskExists = await prisma.task.findFirst({
            where: { id, userId },
        });

        if (!taskExists) {
            throw new Error('Tarefa não encontrada ou não autorizada');
        }
        return await prisma.task.delete({
            where: { id },
        });
    }
}