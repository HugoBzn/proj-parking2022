// Importando Winston
import winston, { format } from 'winston';

// Se obtiene la ruta a la raiz de proyecto
import appRoot from 'app-root-path';

// Extraigo componentes para el formato personalizado
const { combine, timestamp, label, printf, colorize } = format;

// Definiendo una ruta de colores
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'magenta',
  http: 'magenta',
  debug: 'blue',
};

// Agregando el sistema de colores a winston
winston.addColors(colors);

// Creando formato para la consola
const myConsoleFormat = combine(
  // Agregando colores al formato
  colorize({ all: true }),
  // Agregando una etiqueta
  label({ label: '🎫' }),
  // Agregando la fecha
  timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  // Funcion de impresion
  printf(
    (info) => `${info.level}: ${info.label}: ${info.timestamp}: ${info.message}`
  )
);

// Creando formato para archivo
const myFileFormat = combine(
  // Sin color
  format.uncolorize(),
  // Agregando la fecha
  timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  // Salida en formato JSON
  format.json()
);

// Crear el objeto de configuración (Options Object)
const options = {
  infoFile: {
    level: 'info',
    filename: `${appRoot}/server/logs/info.log`,
    handleExceptions: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: myFileFormat,
  },
  warnFile: {
    level: 'warn',
    filename: `${appRoot}/server/logs/warn.log`,
    handleExceptions: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: myFileFormat,
  },
  errorFile: {
    level: 'error',
    filename: `${appRoot}/server/logs/error.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: myFileFormat,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: myConsoleFormat,
  },
};

// Creamos una instancia de Logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.infoFile),
    new winston.transports.File(options.warnFile),
    new winston.transports.File(options.errorFile),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // No finaliza en ecepciones NO manejadas
});

// Morgan ----> Consola
// Morgan ----> [winston] ----> {Transportes}
// Estableciendo un flujo de entrada que servirá para interceptar el log de Morgan
logger.stream = {
  write(message) {
    logger.info(message);
  },
};

// Finalizamos exportando el Logger
export default logger;
