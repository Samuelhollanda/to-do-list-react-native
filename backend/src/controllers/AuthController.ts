import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

const authService = new AuthService();

export class AuthController {
    async register(req: Request, res: Response): Promise<Response>{
        try {
            const { name, email, password } = req.body;
            if(!name || !email || !password) {
                return res.status(400).json({ error: 'Email e senha são obrigatórios' });
            }

            const user = await authService.register(name, email, password);
            return res.status(201).json(user);
        } catch (error: any) {
            return res.status(400).json({ error: error.message})
        }
    }
    
    async login(req: Request, res: Response): Promise<any>{
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: 'Email e senha são obrigatórios' });
            }

            const data = await authService.login(email, password)
            return res.status(200).json(data)
        } catch (error: any) {
            return res.status(400).json({ error: error.message})
        }
    }
}