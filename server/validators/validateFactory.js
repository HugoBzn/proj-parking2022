// Usando el patron Factory para la creacion de un Middleware de validacion
const Validator =
  ({ shape, getObject }) =>
  async (req, res, next) => {
    // 1. Construir un objeto a validar
    const dataObject = getObject(req);
    // 2. Se realiza el proceso de validacion
    try {
      // 2.1 Se valida el objeto con el shape
      // validate = Acepta dos argumentos
      // El argumento 1: Es el objeto a validar
      // El argumento 2: Opciones de validacion
      const validData = await shape.validate(dataObject, {
        abortEarly: false,
      });
      // Incrustar el objeto valido en la peticion
      req.validData = validData;
    } catch (error) {
      // Crear un objeto que reporta el error
      req.errorData = error;
    }
    // 3. Continuamos la cadena de middlwares
    return next();
  };

// Exportando Factory de validación
export default Validator;
