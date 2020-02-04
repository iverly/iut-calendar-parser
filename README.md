# iut-calendar-parser

![build logo](https://travis-ci.com/iverly/iut-calendar-parser.svg?branch=master)
![size logo](https://img.shields.io/github/languages/code-size/iverly/iut-calendar-parser)
![last logo](https://img.shields.io/github/last-commit/iverly/iut-calendar-parser)
![license logo](https://img.shields.io/github/license/iverly/iut-calendar-parser)

Parser for calendar of IUT "A" Toulouse

## Installation

```bash
yarn add https://github.com/iverly/iut-calendar-parser
# or npm install iverly/iut-calendar-parser
```

## Usage

To know which one to choose between publisher and calendar, just look at the bottom of the schedule page. You should have either "CELCAT Calendar" in this case choose calendar or "CELCAT Web Publisher" in this case choose publisher.

```js
const publisher = require('iut-calendar-parser').publisher;
const calendar = require('iut-calendar-parser').calendar;

publisher.getData('https://edt.iut-tlse3.fr/planning/info/g8659.xml')
    .then((data) => {
            console.log(publisher.getDay(data, new Date()));
            console.log(publisher.getDay(data, new Date("12/18/2019")));
        }
    );

calendar.getData('GE_S1_g1', new Date("12/16/2019"))
    .then((data) => {
        console.log(calendar.getDay(data, new Date("12/18/2019")));
    })
```

## Methods

#### getData()

Return brut data from IUT's website.

```ts
publisher.getData(url: string): any
```

To find the url of your timetable, simply copy / paste it of the timetable page and replace .html in .xml

```ts
calendar.getData(group: string, date: Date): any
```

To find our group, simply copy / paste the one you use to find your timetable. Because we cannot get the entire timetable, you must provide a date. Then the associated week will be fetched.

#### publisher.getDay(data: any, date: Date): any

Return an Array containing all course of the day.

#### getWeek()

Return an Array containing all course by day of week.

```ts
publisher.getWeek(data: any, date: Date): any
calendar.getWeek(data: any): any
```

## Example of response

```js
// getDay() method
[
    {
        "category": "TD",
        "startTime": "14:00",
        "endTime": "15:30",
        "module": "InM1205",
        "group": "InS1E",
        "room": "IN210",
        "staff": "XXX"
    },
    {
        "category": "TP",
        "startTime": "15:30",
        "endTime": "17:00",
        "module": "InM1103",
        "group":[
            "InS1E1",
            "InS1E2"
        ],
        "room":[
            "InGrenat",
            "InJade"
        ],
        "staff": "XXX"
    },
    {
        "category": "cours de soutien",
        "startTime": "17:00",
        "endTime": "18:30",
        "module": null,
        "group": "InS1",
        "room": "IN022",
        "staff": "XXX"
    }
]
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate and follow Angular instruction for commit name ([here](https://github.com/angular/angular/blob/master/CONTRIBUTING.md)).

## License
[MIT License](https://choosealicense.com/licenses/mit/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
