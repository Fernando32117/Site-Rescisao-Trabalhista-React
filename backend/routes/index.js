// backend/routes/index.js  
import { Router } from 'express';  
import { calcularVerbas } from '../controllers/controller.js'; // Adicione .js aqui  

const router = Router();  

// Rota para cálculo de verbas rescisórias  
router.post('/calculo', calcularVerbas);  

export default router;