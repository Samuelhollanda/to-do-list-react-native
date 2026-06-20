import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";


const taskService = new TaskService();

export class TaskController {
    async create(req: AuthenticatedRequest, res: Response): Promise<any> {
        try {
            const { title, description } = req.body;
            const userId = req.userId;

            if (!userId) return res.status(401).json({ error: 'Utilizador não autenticado' });

            if (!title) {
                return res.status(400).json({ error: 'O titulo da tarefa é obrigatório.' });
            }


            const task = await taskService.create(title, userId, description);
            return res.status(201).json(task);
        } catch (error:any) {
            return res.status(400).json({ error: error.message });
        }
    }
    async list(req: AuthenticatedRequest, res: Response): Promise<any> {
        try {
            const userId = req.userId;
            if (!userId) return res.status(401).json({ error: 'Utilizador não autenticado' });

            const tasks = await taskService.litAll(userId);
            return res.status(200).json(tasks);
        } catch (error) {
            return res.status(500).json({ error: "Erro interno ao buscar as tarefas." });
        }
    }
    async toggleCompletion(req: AuthenticatedRequest, res: Response) {
        try {

            const id = req.params.id as string;
            const { isCompleted } = req.body;
            const userId = req.userId;

            if (!userId) return res.status(401).json({ error: 'Utilizador não autenticado' });

            if (typeof isCompleted !== 'boolean') {
                return res.status(400).json({ error: 'O campo isCompleted é obrigatório e deve ser true ou false.' });
            }
            const updatedTask = await taskService.toggleCompletion(id, isCompleted, userId);

            return res.status(200).json(updatedTask);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async delete(req: AuthenticatedRequest, res: Response) {
        try {
            const id = req.params.id as string;
            const userId = req.userId;

            if (!userId) return res.status(401).json({ error: 'Utilizador não autenticado' });

            await taskService.delete(id, userId);

            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno ao deletar a tarefa.' });
        }
    }
}