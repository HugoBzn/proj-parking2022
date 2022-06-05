// Importando el Router de Express
import { Router } from 'express';

// Importando el validador
import Validate from '../validators/validateFactory';

// Importamos el esquema de validacion
import adminValidator from '../validators/adminValidator';

// Importando el controlador de proyectos
import adminController from '../controllers/adminController';

// Creo una instancia del router
const router = new Router();

/* --- GET --- */
// Listar proyectos
// GET /admin/ | GET /admin/index
router.get(['/', '/index'], adminController.index);

// Envia el formulario para registrar una idea de proyecto
// GET /projects/add
router.get('/add', adminController.add);

/* ------ POST ------ */
// Procesa el formulario que Agrega ideas de proyectos
// POST /admin/add
router.post(
  '/add',
  Validate({
    shape: adminValidator.projectSchema,
    getObject: adminValidator.getProject,
  }),
  adminController.addPost
);

// Exportando en enrutador Projects
export default router;
