const { publisher } = require('../index');
const { calendar } = require('../index');

publisher.getData('https://edt.iut-tlse3.fr/planning/info/g8669.xml')
    .then(
        (data) => {
            console.log(publisher.getWeek(data, new Date()));
            console.log(publisher.getWeek(data, new Date('02/04/2020'))); // Date is mm/dd/yyyy
        },
    );

calendar.getData('InS2A', new Date()) // you can set specific date using mm/dd/yyyy
    .then((data) => {
        console.log(calendar.getWeek(data));
    });
