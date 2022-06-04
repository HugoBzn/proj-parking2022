/* Action Methods */
// Lista los proyectos
// GET /admin | GET /admin/index
const index = (req, res) => {
  res.render('admin/adminView', {});
};

// Agrega ideas de proyectos
// GET /admin/add
const add = (req, res) => {
  res.render('admin/addAdminView', {});
};

// Procesa el formulario que Agrega ideas de proyectos
// POST /admin/add
const addPost = (req, res) => {
  // Desestructurando la informacion
  // del formulario
  const { name, description } = req.body;
  // Regresar un objeto con los datos
  // obtenidos del formulario
  res.status(200).json({ name, description });
};

// Exportando el controlador
export default {
  index,
  add,
  addPost,
};
