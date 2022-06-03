// Importar Express
var express = require('express');
// Importamos el enrutador de Express
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //Render manda a renderizar (generar y entregar) ls vista al cliente

  res.render('about', 
  //Este es el View-Model
  {
    name: 'HugoBzn',
    email: 'hugobazan1499@gmail.com',
    url: "https://github.com/HugoBzn"
  });
});

module.exports = router;