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
  res.render('home/indexView', viewModel);
};

// URL: Get /about
const about = (req, res) => {
  res.render('home/aboutView', {
    name: 'HugoBzn',
    email: 'hugobazan1499@gmail.com',
    url: 'https://github.com/HugoBzn',
    description:
      'Aplicacion que nos permitirá tener un control de gestión vehicular. ',
    version: '0.0 alpha',
  });
};

export default {
  // Action Methods
  index,
  about,
};
