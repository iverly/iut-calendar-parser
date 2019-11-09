const fetch = require('node-fetch');
const xml = require('xml-js');
const dateFormat = require('dateformat');
const shared = require('./shared');

async function getData(url) {
    const res = await fetch(url).then(res => res.text());
    return xml.xml2js(res, {compact: true});
}

function getIdentifier(data) {
    const mondayDate = shared.getMonday(new Date());
    const mondayDateString = dateFormat(mondayDate, 'dd/mm/yyyy');
    let identifierObj = data.timetable.span.filter(elem => elem._attributes.date == mondayDateString)[0];
    return identifierObj.alleventweeks._text;
}

module.exports = { getData, getIdentifier }