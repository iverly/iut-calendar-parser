const publisher = require('../index').publisher;

publisher.getData('https://edt.iut-tlse3.fr/planning/info/g8659.xml')
    .then(data => {
            console.log(publisher.getDay(data, new Date()))
            console.log(publisher.getDay(data, new Date("12/18/2019"))) // Date is mm/dd/yyyy
        }
    );