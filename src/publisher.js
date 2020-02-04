const fetch = require('node-fetch');
const xml = require('xml-js');
const dateFormat = require('dateformat');
const shared = require('./shared');

async function getData(url) {
    const data = await fetch(url).then((res) => res.text());
    return xml.xml2js(data, { compact: true });
}

function getWeekIdentifier(data, date) {
    const mondayDate = shared.getMonday(date);
    const mondayDateString = dateFormat(mondayDate, 'dd/mm/yyyy');
    const idObj = data.timetable.span.filter((e) => e._attributes.date === mondayDateString)[0];
    if (idObj) return idObj.alleventweeks._text;
    return null;
}

function getCategory(data) {
    if (data.category && data.category._text) return data.category._text;
    return null;
}

function getModule(data) {
    if (data === undefined) return null;
    if (data.item.a && data.item.a._text) return data.item.a._text;
    const modules = [];
    try {
        data.item.forEach((elem, index) => {
            modules[index] = elem.a._text;
        });
        return modules;
    } catch (err) {
        return null;
    }
}


function getGroup(data) {
    if (data === undefined) return null;
    if (data.item._text) return data.item._text;
    if (data.item.a && data.item.a._text) return data.item.a._text;
    if (data.item[0]._text) return data.item[0]._text;
    const groups = [];
    try {
        data.item.forEach((elem, index) => {
            if (elem.a && elem.a._text) groups[index] = elem.a._text;
            if (elem._text) groups[index] = elem._text;
        });
        return groups;
    } catch (err) {
        return null;
    }
}

function getRoom(data) {
    if (data === undefined) return null;
    if (data.item.a && data.item.a._text) return data.item.a._text;
    if (data.item._text && data.item._text) return data.item._text;
    const rooms = [];
    try {
        data.item.forEach((elem, index) => {
            if (elem.a && elem.a._text) rooms[index] = elem.a._text;
            else if (elem._text) rooms[index] = elem._text;
        });
        return rooms;
    } catch (err) {
        return null;
    }
}

function getStaff(data) {
    if (data === undefined) return null;
    if (data.item.a && data.item.a._text) return data.item.a._text;
    if (data.item._text) return data.item._text;
    const staffs = [];
    try {
        data.item.forEach((elem, index) => {
            if (elem.a && elem.a._text) staffs[index] = elem.a._text;
            else if (elem._text) staffs[index] = elem._text;
        });
        return staffs;
    } catch (err) {
        return null;
    }
}

function getWeek(data, date) {
    const identifier = getWeekIdentifier(data, date);
    if (identifier == null) return {};

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const allEvent = data.timetable.event.filter((elem) => elem.rawweeks._text === identifier);
    const result = {};

    try {
        days.forEach((day, i) => {
            const events = allEvent.filter((elem) => parseInt(elem.day._text, 10) === i);
            const dayParsed = [];

            events.forEach((elem, index) => {
                dayParsed[index] = {
                    category: getCategory(elem),
                    startTime: elem.starttime._text,
                    endTime: elem.endtime._text,
                    module: getModule(elem.resources.module),
                    group: getGroup(elem.resources.group),
                    room: getRoom(elem.resources.room),
                    staff: getStaff(elem.resources.staff),
                };

                dayParsed.sort((a, b) => parseInt(a.startTime.split(':')[0], 10) - parseInt(b.startTime.split(':')[0], 10));
                result[days[i]] = dayParsed;
            });
        });
    } catch (err) {
        return null;
    }

    return result;
}

function getDay(data, date) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const week = getWeek(data, date);
    const dateDiff = shared.getDiffWithMonday(shared.getMonday(date), date);
    return week[days[dateDiff]] ? week[days[dateDiff]] : [];
}

module.exports = { getData, getWeek, getDay };
