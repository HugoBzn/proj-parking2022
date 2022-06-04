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

// URL: Get /about
const about = (req, res) => {
  res.render('home/aboutView', {
    name: 'HugoBzn',
    email: 'hugobazan14@hotmail.com',
    url: 'https://github.com/HugoBzn',
  });
};

export default {
  // Action Methods
  index,
  about,
};
