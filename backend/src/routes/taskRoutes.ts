import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';

const router = Router();
const taskController = new TaskController();

router.post('/tasks', (req, res) => taskController.create(req, res));
router.get('/tasks', (req, res) => taskController.list(req, res));
router.patch('/tasks/:id/toggle', (req, res) => taskController.toggleCompletion(req, res))


export default router;