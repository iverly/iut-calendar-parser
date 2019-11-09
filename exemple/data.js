const publisher = require('../src/publisher');

publisher.getData('https://edt.iut-tlse3.fr/planning/info/g8659.xml').then(console.log);