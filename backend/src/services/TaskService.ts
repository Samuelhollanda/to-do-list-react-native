import { prisma } from '../config/prisma'

export class TaskService {
    async create(title: string, description?: string) {
        return await prisma.task.create({
            data: { title, description },
        });
    }

    async litAll() {
        return await prisma.task.findMany({
            orderBy: {
                createdAt: 'desc'
            },
        });
    }

    async toggleCompletion(id: string, isCompleted: boolean) {
        return await prisma.task.update({
            where: { id },
            data: { isCompleted },
        });
    }
}