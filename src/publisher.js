const fetch = require('node-fetch');
const xml = require('xml-js');
const dateFormat = require('dateformat');
const shared = require('./shared');

async function getData(url) {
    const res = await fetch(url).then(res => res.text());
    return xml.xml2js(res, {compact: true});
}

function getWeekIdentifier(data, date) {
    const mondayDate = shared.getMonday(date);
    const mondayDateString = dateFormat(mondayDate, 'dd/mm/yyyy');
    let identifierObj = data.timetable.span.filter(elem => elem._attributes.date == mondayDateString)[0];
    if (identifierObj) return identifierObj.alleventweeks._text;
    return null;
}

function getWeek(data, date) {
    const identifier = getWeekIdentifier(data, date);
    if (identifier == null) return {};
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    let allEvent = data.timetable.event.filter(elem => elem.rawweeks._text == identifier);
    let result = {};
    
    for (index in days) {
        let events = allEvent.filter(elem => elem.day._text == index);
        let day = [];

        events.forEach((elem, index) => {            
            day[index] = {
                category: elem.category._text,
                startTime: elem.starttime._text,
                endTime: elem.endtime._text,
                module: getModule(elem.resources.module),
                group: getGroup(elem.resources.group),
                room: getRoom(elem.resources.room),
                staff: getStaff(elem.resources.staff)
            }
        });

        result[days[index]] = day;
    }

    return result;
}

function getDay(data, date) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    let week = getWeek(data, date);
    let dateDiff = shared.getDiffWithMonday(shared.getMonday(date), date);
    return week[days[dateDiff]] ? week[days[dateDiff]] : null;
}

function getModule(data) {
    if (data === undefined) return null;
    return data.item.a._text;
}

function getGroup(data) {
    if (data === undefined) return null;
    if (data.item._text) return data.item._text;
    if (data.item.a && data.item.a._text) return data.item.a._text;
    if (data.item[0]._text) return data.item[0]._text;
    let groups = [];
    data.item.forEach((elem, index) => {
        groups[index] = elem.a._text;
    })
    return groups;
}

function getRoom(data) {
    if (data === undefined) return null;
    if (data.item.a && data.item.a._text) return data.item.a._text;
    if (data.item._text && data.item._text) return data.item._text;
    let salles = [];
    data.item.forEach((elem, index) => {
        if (elem.a && elem.a._text) salles[index] = elem.a._text;
        else if (elem._text) salles[index] = elem._text;
    })
    return salles
}

function getStaff(data) {
    if (data === undefined) return null;
    if (data.item.a && data.item.a._text) return data.item.a._text;
    if (data.item._text) return data.item._text;
    let staffs = [];
    data.item.forEach((elem, index) => {
        if (elem.a && elem.a._text) staffs[index] = elem.a._text;
        else if (elem._text) staffs[index] = elem._text;
    })
    return staffs
}

module.exports = { getData, getWeek, getDay };