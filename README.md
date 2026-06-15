# Projeto Mobile React-Native Full Stack (Gerenciador de Tarefas)

<p>
Este é um aplicativo móvel Full Stack para gerenciamento de tarefas diárias.<br>
O projeto foi construído adotando as melhores práticas do mercado, com um back-end tipado em uma arquitetura de camadas e infraestrutura isolada em contêineres.
</p>

---

## Stack Utilizado

* **Front-end:** React Native utilizando o framework Expo e Expo Router (roteamento baseado em arquivos).
* **Back-end:** Node.js, TypeScript e Express.js.
* **Banco de Dados & ORM:** PostgreSQL manipulado via Prisma ORM.
* **Integrações Front-end:** Axios para consumo da API e Day.js para formatação dinâmica de fusos horários no aplicativo.
* **Infraestrutura:** Docker e Docker Compose para orquestrar o banco de dados e a API de forma isolada.

---

## 📂 Estrutura de Pastas (Monorepo)

<p>O projeto segue o padrão de Monorepo, com o código do front-end e do back-end mantidos em pastas isoladas na mesma raiz</p>

```

/
├── docker-compose.yml       # Orquestração do PostgreSQL e da API Node
├── .env                     # Variáveis de ambiente globais para o Docker Compose
├── backend/                 # Código-fonte da API
│   ├── Dockerfile           # Instruções de build da imagem do Node.js
│   ├── .env                 # Variáveis de ambiente do backend (acesso local ao Prisma)
│   ├── prisma/
│   │   └── schema.prisma    # Modelagem das tabelas do banco de dados (Prisma)
│   └── src/
│       ├── config/          # Instância do PrismaClient centralizada
│       ├── controllers/     # Camada de recepção de requisições e validação
│       ├── routes/          # Definição das rotas do Express
│       ├── services/        # Camada de regras de negócio e comunicação com o banco
│       ├── app.ts           # Configuração de middlewares do Express
│       └── server.ts        # Ponto de inicialização do servidor na porta definida
│
└── mobile/                  # Código-fonte do Aplicativo React Native (Expo)
    ├── .env                 # Variáveis públicas do Expo (EXPO_PUBLIC_API_URL)
    ├── app/                 # Telas e roteamento (Expo Router)
    │   ├── _layout.tsx      # Configuração global de navegação (Stack)
    │   ├── index.tsx        # Tela principal (Listagem de tarefas com FlatList)
    │   └── create.tsx       # Tela de criação de nova tarefa
    └── src/
        └── services/        # Configuração do Axios para comunicação com o backend

```