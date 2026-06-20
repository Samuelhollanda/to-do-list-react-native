import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const taskController = new TaskController();

router.use(authMiddleware)

router.post('/tasks', (req, res) => taskController.create(req, res));

router.get('/tasks', (req, res) => taskController.list(req, res));

router.patch('/tasks/:id/toggle', (req, res) => taskController.toggleCompletion(req, res))

router.delete('/tasks/:id', (res, req) => taskController.delete(res, req));


export default router;