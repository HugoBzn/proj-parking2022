// 1. Importando el ODM
import mongoose from 'mongoose';
// 2. IMportando el logger
import winston from './winston';

class MongooseODM {
  // Metodo especial constructor
  constructor(url) {
    // Crear la propiedad
    this.url = url;
  }

  // Methods
  async connect() {
    try {
      // Agregar el sistema de promesas de ES6
      mongoose.Promise = global.Promise;
      // Registremos el intento de conexion a la base de datos
      winston.info(`☢ Conectando a la base de datos: ${this.url}`);
      // Intento de conexion
      const connection = await mongoose.connect(this.url);
      return connection;
    } catch (error) {
      // La conexion falla
      winston.error(
        `🥀 No se pude realizar la conexion debido a : ${error.message}`
      );
      return false;
    }
  }
}

export default MongooseODM;
