import { Router } from "express";
import taskRoutes from "./taskRoutes";
import authRoutes from "./authRoutes";

const router = Router();


router.use("/auth", authRoutes);
router.use(taskRoutes);


export default router;