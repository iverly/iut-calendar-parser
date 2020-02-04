const { publisher } = require('../index');
const { calendar } = require('../index');

publisher.getData('https://edt.iut-tlse3.fr/planning/info/g8669.xml')
    .then(console.log);

calendar.getData('InS2A', new Date()) // Date is mm/dd/yyyy
    .then(console.log);
