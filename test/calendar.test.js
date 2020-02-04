const { calendar } = require('../index');

const dataNotParsed = [
    {
        id: '1:385495:22',
        start: '2020-02-04T09:30:00',
        end: '2020-02-04T11:00:00',
        description: 'TDM\r\n\r\n<br />\r\n\r\nInM2103\r\n\r\n<br />\r\n\r\nInAmbre\r\n',
        department: 'Informatique',
        eventCategory: 'TDM',
        module: 'InM2103',
    },
    {
        id: '1:385495:22',
        start: '2020-02-05T10:30:00',
        end: '2020-02-05T11:20:00',
        description: 'TP\r\n\r\n<br />\r\n\r\nInM2104\r\n\r\n<br />\r\n\r\nInOpale\r\n',
        department: 'Informatique',
        eventCategory: 'TP',
        module: 'InM2104',
    },
];

describe('testing week', () => {
    const weekParsed = calendar.getWeek(dataNotParsed);

    it('should return data', (done) => {
        if (!Object.entries(weekParsed).length === 0 && weekParsed.constructor === Object) {
            done(false);
        }
        done();
    });

    it('should return 5 days', (done) => {
        if (!Object.entries(weekParsed).length === 5 && weekParsed.constructor === Object) {
            done('Not 5 entries');
        }
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        for (let i = 0; i < days.length; i += 1) {
            if (!weekParsed[days[i]]) return done(`${days[i]} is not in object`);
        }
        return done();
    });

    it('should return Monday correctly', () => {
        expect(weekParsed.Monday).toStrictEqual([]);
    });

    it('should return Thursday correctly', () => {
        expect(weekParsed.Thursday).toStrictEqual([]);
    });

    it('should return Tuesday correctly', () => {
        expect(weekParsed.Tuesday).toStrictEqual([{
            category: 'TDM',
            endTime: '11:00',
            group: 'Informatique',
            module: 'InM2103',
            room: 'InAmbre',
            staff: null,
            startTime: '09:30',
        }]);
    });

    it('should return Wednesday correctly', () => {
        expect(weekParsed.Wednesday).toStrictEqual([{
            category: 'TP',
            endTime: '11:20',
            group: 'Informatique',
            module: 'InM2104',
            room: 'InOpale',
            staff: null,
            startTime: '10:30',
        }]);
    });

    it('should return Friday correctly', () => {
        expect(weekParsed.Friday).toStrictEqual([]);
    });
});

describe('testing day', () => {
    const dayParsed = calendar.getDay(dataNotParsed, new Date('02-04-2020'));

    it('should return data', (done) => {
        if (!Object.entries(dayParsed).length === 0 && dayParsed.constructor === Object) {
            done(false);
        }
        done();
    });

    it('should return the day correctly', () => {
        expect(dayParsed).toStrictEqual([{
            category: 'TDM',
            endTime: '11:00',
            group: 'Informatique',
            module: 'InM2103',
            room: 'InAmbre',
            staff: null,
            startTime: '09:30',
        }]);
    });
});
