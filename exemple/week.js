const publisher = require('../index').publisher;
const calendar = require('../index').calendar;

publisher.getData('https://edt.iut-tlse3.fr/planning/info/g8659.xml')
    .then(
        data => {
            console.log(publisher.getWeek(data, new Date()))
            console.log(publisher.getWeek(data, new Date("12/18/2019"))) // Date is mm/dd/yyyy
        }
    );

calendar.getData('GE_S1_g1', new Date()) // you can set specific date using mm/dd/yyyy
    .then(data => {
        console.log(calendar.getWeek(data));
    })