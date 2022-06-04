// Importando el enrutador de Home
import homeRouter from './homeRouter';

// Funcion que agrega todos los enrutadores a la aplicacion de express
const addRoutes = (app) => {
  /* Agregando el enrutador a Home */
  app.use('/', homeRouter);
};

export default {
  addRoutes,
};
