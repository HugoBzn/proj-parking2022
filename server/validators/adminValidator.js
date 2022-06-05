// 1 Importaremos la biblioteca de validación
import * as Yup from 'yup';

// 2 Crear el esquema de validación
const projectSchema = Yup.object().shape({
  name: Yup.string().required('Se requiere un nombre'),
  control: Yup.string()
    .max(500, 'La descripción esta limitada a 9 caracteres')
    .required('Se requiere un numero de control'),
  marbete: Yup.string()
    .max(500, 'La descripción esta limitada a 3 caracteres')
    .required('Se requiere un numero de marbete'),
  rol: Yup.string().required('Se requiere un rol'),
});

// 3 Creamos el middleware de validacion
const getProject = (req) => {
  // Extraemos la info del formualrio
  const { name, control, marbete, rol } = req.body;
  // Armar un objeto con los datos del proyecto
  return {
    name,
    control,
    marbete,
    rol,
  };
};

export default { projectSchema, getProject };
