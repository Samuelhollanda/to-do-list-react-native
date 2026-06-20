import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface TokenPayload {
    userId: string;
}

export interface AuthenticatedRequest extends Request {
    userId?: string;
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): any {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' })
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({ error: 'Erro no formato do token' });
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: 'Token mal formatado' });
    }

    try {
        const JWT_SECRET = process.env.JWT_SECRET as string;
        const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;

        req.userId = decoded.userId;
        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Token invalido ou expirado' });
    }
}