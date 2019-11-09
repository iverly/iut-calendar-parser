const publisher = require('../index').publisher;

publisher.getData('https://edt.iut-tlse3.fr/planning/info/g8659.xml')
    .then(data => 
        publisher.getWeek(data, publisher.getIdentifier(data))
    );