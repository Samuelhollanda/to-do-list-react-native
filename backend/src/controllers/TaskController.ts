import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";
import { asyncWrapProviders } from "node:async_hooks";

const taskService = new TaskService();

export class TaskController {
    async create(req: Request, res: Response) {
        try {
            const { title, description } = req.body;

            if (!title) {
                return res.status(400).json({ error: 'O titulo da tarefa é obrigatório.' });
            }


            const task = await taskService.create(title, description);
            return res.status(200).json(task);
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno ao criar a tarefa.' });
        }
    }
    async list(req: Request, res: Response) {
        try {
            const tasks = await taskService.litAll();
            return res.json(tasks);
        } catch (error) {
            return res.status(500).json({ error: "Erro interno ao buscar as tarefas." });
        }
    }
    async toggleCompletion(req: Request, res: Response) {
        try {

            const id = req.params.id as string;
            const { isCompleted } = req.body;

            if (typeof isCompleted !== 'boolean') {
                return res.status(400).json({ error: 'O campo isCompleted é obrigatório e deve ser true ou false.' });
            }
            const updatedTask = await taskService.toggleCompletion(id, isCompleted);

            return res.status(200).json(updatedTask);
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno ao atualizar a tarefa.' });
        }
    }
}