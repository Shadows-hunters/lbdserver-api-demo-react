const formulas = require("./src/components/calculations/formulas");

var fs = require("fs");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
const PORT = 8080;

app.use(express.json());

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.post("/positions", (req, res) => {
  const { date, start, end, latitude, longitude, interval } = req.body;

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
  if (!longitude) {
    res.status(418).send({ message: "longitude needed!" });
  }
  if (!interval) {
    res.status(418).send({ message: "interval needed!" });
  }

  res
    .status(200)
    .send(
      formulas.sunPositions(date, start, end, latitude, longitude, interval)
    );
});

app.post("/map", (req, res) => {
  const { city, latitude, longitude } = req.body;

  if (!city) {
    res.status(418).send({ message: "city needed!" });
  }
  if (!latitude) {
    res.status(418).send({ message: "latitude needed!" });
  }
  if (!longitude) {
    res.status(418).send({ message: "longitude needed!" });
  }

  var currentSearchResult = { city: city, latitude: latitude, longitude: longitude };

  fs.readFile("public\map_data\Cleaned BE.json", function (err, data) {
    var json = JSON.parse(data);
    json.push("search result: " + currentSearchResult);

    fs.writeFile("public\map_data\Cleaned BE.json", JSON.stringify(json));
  });

  res
    .status(200)
    .send("done");
});
