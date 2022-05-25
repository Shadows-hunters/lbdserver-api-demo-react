var SunCalc = require("suncalc");

var dayjs = require("dayjs");
//import dayjs from 'dayjs' // ES 2015
dayjs().format();

function sunPositions(date, start, end, latitude, offset, interval) {
  let i = start;
  var arr = [];
  var day = dayjs(date);

  while (i <= end) {
    const d = day.add(i * 60, "minute");
    let position = SunCalc.getPosition(d, latitude, 0);
    let vector = [
      0,
      position.azimuth + (offset * Math.PI) / 180.0 + Math.PI/2,
      position.altitude
    ];
    arr.push(vector);
    i += interval;
  }

  return arr;
}

module.exports = { sunPositions };
