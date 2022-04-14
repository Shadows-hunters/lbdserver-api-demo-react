var SunCalc = require("suncalc");

var dayjs = require("dayjs");
//import dayjs from 'dayjs' // ES 2015
dayjs().format();

function sunPositions(date, start, end, latitude, longitude, interval ) {
    let i = start;
    var arr = [];
    var day = dayjs(date);

    while (i <= end) {
        const d = day.add(i * 60, "minute");
        let position = SunCalc.getPosition(d, latitude, longitude);
        let vector = [
        Math.sin(position.azimuth) * Math.cos(position.altitude),
        Math.cos(position.azimuth) * Math.cos(position.altitude),
        Math.sin(position.altitude),
        ];
        arr.push(vector);
        i += interval;
    }

    return JSON.stringify(arr);
}

module.exports = { sunPositions };