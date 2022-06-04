#!/usr/bin/env node
/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-unresolved */

/**
 * Module dependencies.
 */

import app from '@s/app';
// var debug = require('debug')('proj-parking2022:server');
import Debug from 'debug';
// var http = require('http');
import http from 'http';

// Importando nuestro logger winston
import winston from '../config/winston';

// Creando instancia del debugger
const debug = Debug('proj-parking2022:server');
/**
 * Get port from environment and store in Express.
 */

/**
 * Create HTTP server.
 */

const server = http.createServer(app); // Callback (req,res,next, err) => {}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || '3000');

// app es una instancia de ExpressJs[] [ NODE ]
app.set('port', port);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      // console.error(bind + ' requires elevated privileges');
      winston.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      // console.error(bind + ' is already in use');
      winston.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ' ${port}`;
  debug(`Listening on ${bind}`);
  winston.info(`Servidor escuchando... 🤖👂 en ${app.get('port')}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port); // Pone a escuchar al servidor
server.on('error', onError); // Se registran eventos
server.on('listening', onListening);
