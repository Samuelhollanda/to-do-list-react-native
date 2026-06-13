import express from 'express';
import taskRoutes from './routes/taskRoutes';

const app = express();

app.use(express.json());

// 2. Rota de emergência (para testarmos se o servidor está vivo)
app.get('/ping', (req, res) => {
  res.send('PONG! O servidor Express está vivo!');
});


app.use('/api', taskRoutes);

export default app;