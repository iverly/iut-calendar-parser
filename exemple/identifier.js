const publisher = require('../index').publisher;

publisher.getData('https://edt.iut-tlse3.fr/planning/info/g8659.xml')
    .then(
        data => {
            console.log(publisher.getWeekIdentifier(data, new Date()));
            console.log(publisher.getWeekIdentifier(data, new Date('12/16/2019'))); // Date is mm/dd/yyyy
        }
    );