# Usa a imagem oficial do Node.js (Versão 22)
FROM node:22-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta que a API vai rodar
EXPOSE 3000

# Comando para rodar a aplicação em modo de desenvolvimento
CMD ["npm", "run", "dev"]