const fetch = require('node-fetch');
const dateFormat = require('dateformat');
const shared = require('./shared');

async function getData(group, date) {
    const mondayDate = shared.getMonday(date);
    const dateStart = dateFormat(mondayDate, 'yyyy-mm-dd');
    mondayDate.setDate(mondayDate.getDate() + 7);
    const dateEnd = dateFormat(mondayDate, 'yyyy-mm-dd');
    return fetch('https://edt.iut-tlse3.fr/calendar/Home/GetCalendarData', {
        method: 'POST',
        body: `start=${dateStart}&end=${dateEnd}&resType=103&calView=agendaWeek&federationIds%5B%5D=${group}&colourScheme=1`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then((res) => res.json());
}

function getRoom(data) {
    let split = data.split('<br />');
    split = split[split.length - 1];
    return split.replace(/(\r\n|\n|\r)/gm, '');
}

function getWeek(data) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const mondayDate = shared.getMonday(new Date(data[0].start.split('T')[0]));
    const result = {};

    try {
        days.forEach((day, i) => {
            const now = dateFormat(mondayDate, 'yyyy-mm-dd');
            const events = data.filter((elem) => elem.start.split('T')[0] === now);
            const dayParsed = [];

            events.forEach((elem, index) => {
                dayParsed[index] = {
                    category: elem.eventCategory,
                    startTime: elem.start ? elem.start.split('T')[1].substring(0, 5) : null,
                    endTime: elem.end ? elem.end.split('T')[1].substring(0, 5) : null,
                    module: elem.module,
                    group: elem.department,
                    room: getRoom(elem.description),
                    staff: null,
                };
            });

            dayParsed.sort((a, b) => parseInt(a.startTime.split(':')[0], 10) - parseInt(b.startTime.split(':')[0], 10));
            result[days[i]] = dayParsed;
            mondayDate.setDate(mondayDate.getDate() + 1);
        });
    } catch (err) {
        return {};
    }

    return result;
}

function getDay(data, date) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const week = getWeek(data);
    const dateDiff = shared.getDiffWithMonday(shared.getMonday(date), date);
    return week[days[dateDiff]] ? week[days[dateDiff]] : [];
}

module.exports = { getData, getWeek, getDay };
