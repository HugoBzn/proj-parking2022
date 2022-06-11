import log from '../config/winston';

// Importando el modelo Project
import AdminModel from '../models/projectModels';

/* Action Methods */
// Lista los proyectos
// GET /admin | GET /admin/index
const index = async (req, res) => {
  // 1. Pedir a la base de datos que me de todos los proyectos que tiene
  // db.projects.find();
  try {
    log.info('Listando usuarios... ⌛');
    const adminDocs = await AdminModel.find();
    log.info('Usuarios listados con exito... 🎉');
    res.json(adminDocs);
  } catch (error) {
    log.error(`💥 Error al listar usuarios: ${error.message}`);
    res.status(500).json(error);
  }
};

// Agrega ideas de proyectos
// GET /admin/add
const add = (req, res) => {
  res.render('admin/addAdminView', {});
};

// Procesa el formulario que Agrega ideas de proyectos
// POST /admin/add
const addPost = async (req, res) => {
  // Desestructurando la informacion del formulario o de un posible error
  const { errorData, validData } = req;

  // Crear view models para este action method
  let project = {};
  let errorModel = {};

  // Verifico si hay error de validacion
  if (errorData) {
    log.error('💥 Se retorna objeto de error de validacion');
    // Rescatando el objeto validado
    project = errorData.value;
    // Usamos un reduce para generar un objeto de errores a partir de inner
    errorModel = errorData.inner.reduce((prev, curr) => {
      // Creamos una variable temporal para evitar el error "no-param-reassign"
      // el cual me exorta a evitar reasignar los valores de los argumentos de una función
      const newVal = prev;
      newVal[`${curr.path}Error`] = curr.message;
      return newVal;
    }, {});
    // La validacion falló
    return res.render('admin/addAdminView', { project, errorModel });
  }
  log.info('Se retorna objeto project valido');
  // Crear un documento con los datos provistos por
  // el formulario y guardar dicho documento en adminModel
  log.info('Se salva objeto Project');
  const projectModel = new AdminModel(validData);

  // Siempre que se ejecuta una aplicacion que depende de un tercero es una buena práctica
  // envolver esa operacion eun bloque try catch
  try {
    log.info('Salvando el usuario... ⌛');
    // Se salva el documento projecto
    project = await projectModel.save();
    log.info('🎉 Usuario salvado con exito 🎉');
    // Redireccionando al recurso que lista los proyectos
    // GET: /projects
    return res.redirect('/admin');
  } catch (error) {
    log.error(`Ha fallado el intendo de salvar un usuario ${error.message}`);
    return res.status(500).json({ error });
  }
};

// URL: GET /adminView
const adminView = (req, res) => {
  res.render('admin/adminView', {});
};

// Exportando el controlador
export default {
  index,
  add,
  addPost,
  adminView,
};
