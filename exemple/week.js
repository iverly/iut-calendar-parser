const publisher = require('../index').publisher;

publisher.getData('https://edt.iut-tlse3.fr/planning/info/g8659.xml')
    .then(
        data => {
            const identifier = publisher.getWeekIdentifier(data, new Date());
            console.log(publisher.getWeek(data, identifier))
        }
    );