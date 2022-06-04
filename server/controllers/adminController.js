/* Action Methods */
// Lista los proyectos
// GET /admin | GET /admin/index
const index = (req, res) => {
  res.send('Listando proyectos 🚧');
  //   TODO: Agregar codigo de listado de proyectos
};

// Agrega ideas de proyectos
// GET /admin/add
const add = (req, res) => {
  res.send('Agregando ideas de proyectos 🚧');
  // TODO: Agregar codigo para agregar proyectos
};

// Exportando el controlador
export default {
  index,
  add,
};
