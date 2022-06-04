// Importar Express
const express = require('express');
// Importamos el enrutador de Express
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  // Render manda a renderizar (generar y entregar) ls vista al cliente

  res.render(
    'about',
    // Este es el View-Model
    {
      name: 'HugoBzn',
      email: 'hugobazan1499@gmail.com',
      url: 'https://github.com/HugoBzn',
    }
  );
});

module.exports = router;
