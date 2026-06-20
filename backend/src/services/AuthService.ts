import { prisma } from "../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
    console.error("Variável de ambiente JWT_SECRET não foi definida!")
    process.exit(1);
}

const JWT_SECRET: string = process.env.JWT_SECRET;

export class AuthService {
    async register(name: string, email: string, password: string){
        const userExists = await prisma.user.findUnique({ where: { email } });
        if(userExists) {
            throw new Error('E-mail já cadastrado');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return { id: newUser.id, name: newUser.name,  email: newUser.email}
    }

    async login(email: string, password: string) {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if(!user) {
            throw new Error('Email ou senha invalidos');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Email ou senha invalidos');
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

        return {
            user: { id: user.id, name:user.name, email: user.email },
            token,
        }
    }
}