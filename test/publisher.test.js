const { publisher } = require('../index');

const dataNotParsed = {
    timetable: {
        span: [
            {
                _attributes: {
                    date: '03/02/2020',
                },
                alleventweeks: {
                    _text: 'NNNNNNNNNNNNNNNNNNNNNNYNNNNNNNNNNNNNNNNNNNNNNNNNNNNN',
                },
            },
        ],
        event: [
            {
                starttime: {
                    _text: '08:00',
                },
                endtime: {
                    _text: '09:30',
                },
                category: {
                    _text: 'CM',
                },
                day: {
                    _text: '0',
                },
                rawweeks: {
                    _text: 'NNNNNNNNNNNNNNNNNNNNNNYNNNNNNNNNNNNNNNNNNNNNNNNNNNNN',
                },
                resources: {
                    module: {
                        item: {
                            a: {
                                _attributes: {
                                    href: 'm76969.html',
                                },
                                _text: 'InM2105',
                            },
                        },
                    },
                    group: {
                        item: {
                            a: {
                                _attributes: {
                                    href: 'g8668.html',
                                },
                                _text: 'InS2',
                            },
                        },
                    },
                    room: {
                        item: {
                            a: {
                                _attributes: {
                                    href: 'r9861.html',
                                },
                                _text: 'IR028',
                            },
                        },
                    },
                    staff: {
                        item: {
                            a: {
                                _attributes: {
                                    href: 's9929.html',
                                },
                                _text: 'IUT A',
                            },
                        },
                    },
                },
            },
        ],
    },
};

describe('testing week', () => {
    const weekParsed = publisher.getWeek(dataNotParsed, new Date('02-03-2020'));

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
        expect(weekParsed.Monday).toStrictEqual([{
            category: 'CM',
            startTime: '08:00',
            endTime: '09:30',
            module: 'InM2105',
            group: 'InS2',
            room: 'IR028',
            staff: 'IUT A',
        }]);
    });

    it('should return Thursday correctly', () => {
        expect(weekParsed.Thursday).toStrictEqual([]);
    });

    it('should return Tuesday correctly', () => {
        expect(weekParsed.Tuesday).toStrictEqual([]);
    });

    it('should return Wednesday correctly', () => {
        expect(weekParsed.Wednesday).toStrictEqual([]);
    });

    it('should return Friday correctly', () => {
        expect(weekParsed.Friday).toStrictEqual([]);
    });
});

describe('testing day', () => {
    const dayParsed = publisher.getDay(dataNotParsed, new Date('02-03-2020'));

    it('should return data', (done) => {
        if (!Object.entries(dayParsed).length === 0 && dayParsed.constructor === Object) {
            done(false);
        }
        done();
    });

    it('should return the day correctly', () => {
        expect(dayParsed).toStrictEqual([{
            category: 'CM',
            startTime: '08:00',
            endTime: '09:30',
            module: 'InM2105',
            group: 'InS2',
            room: 'IR028',
            staff: 'IUT A',
        }]);
    });
});
