/* eslint-disable no-console */

// Preámbulo
// Ayuda a manejar errores HTTP
import createError from 'http-errors';
// Ayuda a crear servidores web
import express from 'express';
// Nucleo de node, ayuda al manejo de las rutas
import path from 'path';
// Ayuda al manejo de las cookies
import cookieParser from 'cookie-parser';
// Maneja el log de peticiones http
import morgan from 'morgan';

// Las rutas
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import aboutRouter from './routes/about';

// Importando nuestro logger winston
import winston from './config/winston';

// Importando modulos de Webpack
// Nucleo de Webpack
// Permite incrustar Webpack en Express
// Permite la actualizacion dinamica de la pagina
// Configuración
import WebpackConfig from '../webpack.dev.config';

// Aquí se crea la instancia de Express (req,res,next)=>{...}
const app = express();

// Recuperar el modo de ejecución
const nodeEnv = process.env.NODE_ENV || 'development';

// Decidiendo si embebemos el Webpack Middleware
if (nodeEnv === 'development') {
  // Emebebiendo Webpack a mi aplicación
  console.log(`✍ Ejecutando en modo desarrollo 🤱👶`);
  // Estableciendo el modo de webpack en desarrollo en el configurador
  WebpackConfig.mode = 'development';
  // Configurando la ruta del HMR (Hot Module Replacement)
  // reload = true (Habilita la recarga automatica cuando un archivo JS cambia)
  // timeout=1000 (Tiempo de refresco de página)
  WebpackConfig.entry = [
    'webpack-hot-middleware/client?reload=true&timeout=1000',
    WebpackConfig.entry,
  ];
  // Agregando el plugin a la configuración de desarrollo
  WebpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  // Creando el empaquetador a partir de un objeto de configuración
  const bundler = webpack(WebpackConfig);
  // Habilitando el middleware en Express
  app.use(
    webpackDevMiddleware(bundler, {
      publicPath: WebpackConfig.output.publicPath,
    })
  );
  // Habilitando el Middleware del Webpack HMR
  app.use(WebpackHotMiddleware(bundler));
} else {
  console.log(`✍ Ejecutando en modo producción ⚙⚙`);
}

// Configuración del motor de plantillas (Template engine)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Todos los middlewares globales van primero que cualquier otro middleware de la aplicación
app.use(morgan('dev', { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Middleware de archivos estaticos
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Registrando las rutas en la APP
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  // Registrando el error 404 en el log
  // winston.error(
  //   `404 -  Not Found: ${req.method} ${req.originalUrl} : IP: ${req.ip}`
  // );

  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Registramos el error en Winston
  winston.error(
    `${err.status || 500} : ${err.message} : ${req.method} 
      ${req.originalUrl} : 
      IP: ${req.ip}`
  );

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Exportando instancia de app usando JS moderno
export default app;
