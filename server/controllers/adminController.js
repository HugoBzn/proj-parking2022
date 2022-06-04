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

// Exportando el controlador
export default {
  index,
  add,
};
