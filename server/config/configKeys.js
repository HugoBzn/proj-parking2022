// Importar el paquete de dotenv
import dotenv from 'dotenv';

// Cargo las variables de entorno
// EN caso de no estar presentes, el modulo fallará de manera silenciosa
dotenv.config();

// Crear un objeto que contendrá los datos de configuracion que exraerá de las variables de entorno
export default {
  homeUrl: `${process.env.APP_URL}: ${process.env.PORT}`,
  port: process.env.PORT,
  ip: process.env.IP,
  databaseUrl: process.env.DATABASE_URL,
};
