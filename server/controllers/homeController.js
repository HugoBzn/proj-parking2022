// La URL es la GET de la raíz
// URL: Get /
const index = (req, res) => {
  // Calculando emojie
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

  // View-Models
  const viewModel = {
    title: 'SGV ITGAM',
    author: 'HugoBzn',
    emojie,
  };
  res.render('index', viewModel);
};

export default {
  // Action Methods
  index,
};
