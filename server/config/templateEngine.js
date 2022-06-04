// Importamos dependencias
import ExpHbs from 'express-handlebars';
// Importamos el administrador de rutas
import path from 'path';

// Exportando funcion de configuracion
// app: Es una instancia de Express
export default (app) => {
  // 1. Registro el motor de plantillas
  app.engine(
    'hbs',
    ExpHbs({
      extname: '.hbs',
      defaultLayout: 'mainLayout',
    })
  );

  // 2. Establecer el motor de plantillas
  app.set('view engine', 'hbs');

  // 3. Watableciendo las rutas de las vistas
  app.set('views', path.join(__dirname, '..', 'views'));

  // 4. Retornando la referencia de la instancia de express
  return app;
};
