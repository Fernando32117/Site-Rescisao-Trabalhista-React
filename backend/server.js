import express from 'express';  
import { config } from 'dotenv';  
import cors from 'cors';  

config();  

const app = express();  
const PORT = process.env.PORT || 3001;  

// Middleware  
app.use(cors());  
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));  

// Rotas  
import routes from './routes/index.js';  
app.use('/api', routes);  

// Iniciar o servidor  
app.listen(PORT, () => {  
    console.log(`Servidor rodando na porta ${PORT}`);  
});