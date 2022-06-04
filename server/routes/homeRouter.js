// Import Express Router
import { Router } from 'express';
// Importando el controlador de Home
import homeController from '../controllers/homeController';

// Creo una instancia del router
const router = new Router();

// Get "/"
router.get('/', homeController.index);

// Exportando Router
export default router;
