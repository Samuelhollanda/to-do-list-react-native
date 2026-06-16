import app from './app'

const PORT = Number(process.env.API_PORT) || 3000

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor rodando na porta: ${PORT}`)
})