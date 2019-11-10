const publisher = require('../index').publisher;
const calendar = require('../index').calendar;

publisher.getData('https://edt.iut-tlse3.fr/planning/info/g8659.xml')
    .then(console.log);

calendar.getData('GE_S1_g1', new Date()) // Date is mm/dd/yyyy
    .then(console.log);