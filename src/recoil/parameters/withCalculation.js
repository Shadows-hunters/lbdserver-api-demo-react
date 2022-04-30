import { selector } from "recoil";
import { sunPositions } from "../../components/calculations/formulas";
import {
  atomDate,
  atomInterval,
  atomLatitude,
  atomLongitude,
  atomRange,
} from "./";

const withCalculation = selector({
  key: "withCalculation",
  get: ({ get }) => {
    return sunPositions(
      get(atomDate),
      get(atomRange)[0],
      get(atomRange)[1],
      get(atomLatitude),
      get(atomLongitude),
      get(atomInterval)
    );
  },
});

export default withCalculation;

// -----------
// to use api for calculations
// -----------

// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// var raw = JSON.stringify({
//   date: date,
//   start: range[0],
//   end: range[1],
//   longitude: longitude,
//   latitude: latitude,
//   interval: interval,
// });

// var requestOptions = {
//   method: "POST",
//   headers: myHeaders,
//   body: raw,
//   redirect: "follow",
// };

// fetch("http://localhost:8080/positions", requestOptions)
//   .then((response) => response.text())
//   .then((result) => setResult(result))
//   .catch((error) => console.log("error", error));
