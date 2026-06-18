# ==========================================
# ESTÁGIO 1: Base (Comum para os dois ambientes)
# ==========================================
FROM node:22-alpine AS base

WORKDIR /usr/src/app

COPY package*.json ./

# Instala todas as dependências necessárias para rodar e compilar
RUN npm install

COPY . .

# Gera o cliente do Prisma baseado no seu schema
RUN npx prisma generate


# ==========================================
# ESTÁGIO 2: Desenvolvimento (Ambiente Local)
# ==========================================
FROM base AS development

EXPOSE 3000

# Localmente, rodamos o ts-node-dev (monitorando alterações de arquivos)
CMD ["npm", "run", "dev"]


# ==========================================
# ESTÁGIO 3: Produção (Render / Nuvem)
# ==========================================
FROM base AS production

# Compila o TypeScript em JavaScript puro (gera a pasta dist/)
RUN npm run build

EXPOSE 3000

# Em produção, rodamos o JavaScript puro direto com o Node (super leve!)
CMD ["node", "dist/server.js"]