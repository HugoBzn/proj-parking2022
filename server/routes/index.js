const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  // Render manda a renderizar (generar y entregar) ls vista al cliente
  const emojieDataset = [
    '💻',
    '👨‍💻',
    '🎈',
    '🎄',
    '🦺',
    '🚵‍♀️',
    '🎁',
    '🚆',
    '🌐',
    '♥',
  ];
  const emojie =
    emojieDataset[Math.floor(Math.random() * emojieDataset.length)];

  res.render(
    'index',
    // Este es el View-Model
    {
      title: 'Express',
      author: 'HugoBzn',
      emojie,
    }
  );
});

module.exports = router;
