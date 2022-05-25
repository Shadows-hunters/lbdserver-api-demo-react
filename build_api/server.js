const formulas = require("./formulas");

var fs = require("fs");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
const PORT = 8080;

app.use(express.json());

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.post("/positions", (req, res) => {
  const { date, start, end, latitude, offset, interval } = req.body;

  if (!date) {
    res.status(418).send({ message: "date needed!" });
  }
  if (!start) {
    res.status(418).send({ message: "start needed!" });
  }
  if (!end) {
    res.status(418).send({ message: "end needed!" });
  }
  if (!latitude) {
    res.status(418).send({ message: "latitude needed!" });
  }
  if (!offset) {
    res.status(418).send({ message: "longitude needed!" });
  }
  if (!interval) {
    res.status(418).send({ message: "interval needed!" });
  }

  res
    .status(200)
    .send(formulas.sunPositions(date, start, end, latitude, offset, interval));
});

app.post("/map", (req, res) => {
  const { city, latitude, longitude, forced } = req.body;

  if (!city) {
    res.status(418).send({ message: "city needed!" });
  }
  if (!latitude) {
    res.status(418).send({ message: "latitude needed!" });
  }
  if (!longitude) {
    res.status(418).send({ message: "longitude needed!" });
  }

  //   let newData = { [city]: };

  var data = fs.readFileSync("./Cleaned BE arr.json");
  var myObject = JSON.parse(data);

  // check if alrealdy defined
  if (forced != true) {
    if (city in myObject) {
      res
        .status(423)
        .send({ message: "city already defined, prop 'forced':true " });
    }
  }

  // add to JSON
  myObject[city] = [latitude, longitude];
  fs.writeFile(
    "./Cleaned BE arr.json",
    JSON.stringify(myObject),
    (err) => {
      res.status(200).send({ message: "done" });
    }
  );
});

app.get("/map", (req, res) => {
  const { city } = req.body;
  if (!city) {
    res.status(418).send({ message: "city needed!" });
  }

  var data = fs.readFileSync("./Cleaned BE arr.json");
  var myObject = JSON.parse(data);

  // check if in list
  if (!(city in myObject)) {
    res.status(404).send({ message: "city not found" });
  }

  // send back
  res.status(200).send(myObject[city]);
});


app.get("/mapAlles", (req, res) => {
  var data = fs.readFileSync("./Cleaned BE arr.json");
  var myObject = JSON.parse(data);

  // send back
  res.status(200).send(myObject);
});
