var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //Render manda a renderizar (generar y entregar) ls vista al cliente
  let emojieDataset = ['💻','👨‍💻', '🎈','🎄','🦺','🚵‍♀️','🎁','🚆','🌐','♥'];
  let emojie = emojieDataset[Math.floor(Math.random() * emojieDataset.length)]; 

  res.render('index', 
  //Este es el View-Model
  {
    title: 'Express',
    author: 'HugoBzn',
    emojie 
  });
});

module.exports = router;