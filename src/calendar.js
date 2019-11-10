const fetch = require('node-fetch');
const dateFormat = require('dateformat');
const shared = require('./shared');

async function getData(group, date) {
    const mondayDate = shared.getMonday(date);
    const dateStart = dateFormat(mondayDate, 'yyyy/mm/dd');
    mondayDate.setDate(mondayDate.getDate() + 7);
    const dateEnd = dateFormat(mondayDate, 'yyyy/mm/dd');
    const res = await fetch('https://edt.iut-tlse3.fr/calendar/Home/GetCalendarData', {
            method: 'POST',
            body: `start=${dateStart}&end=${dateEnd}&resType=103&calView=agendaWeek&federationIds%5B%5D=${group}&colourScheme=1`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(res => res.json());
    return res;
}

function getWeek(data) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const mondayDate = shared.getMonday(new Date(data[0].start.split('T')[0]));
    let result = {};

    for (index in days) {
        const now = dateFormat(mondayDate, 'yyyy-mm-dd');
        let events = data.filter(elem => elem.start.split('T')[0] == now);
        let day = [];

        events.forEach((elem, index) => {
            day[index] = {
                category: elem.eventCategory,
                startTime: elem.start.split('T')[1].substring(0, 5),
                endTime: elem.end.split('T')[1].substring(0, 5),
                module: elem.module,
                group: elem.department,
                room: getRoom(elem.description),
                staff: null
            }
        })

        day.sort((a, b) => {
            return parseInt(a.startTime.split(':')[0]) - parseInt(b.startTime.split(':')[0])
        });
        result[days[index]] = day;
        mondayDate.setDate(mondayDate.getDate() + 1);
    }

    return result;
}

function getDay(data, date) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    let week = getWeek(data);
    let dateDiff = shared.getDiffWithMonday(shared.getMonday(date), date);
    return week[days[dateDiff]] ? week[days[dateDiff]] : [];
}

function getRoom(data) {
    let split = data.split('<br />');
    split = split[split.length - 1];
    return split.replace(/(\r\n|\n|\r)/gm, '');
}

module.exports = { getData, getWeek, getDay }