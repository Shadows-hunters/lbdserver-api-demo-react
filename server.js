const formulas = require("./src/components/calculations/formulas");

const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json())

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get("/positions", (req, res) => {
    const { date } = req.body
    const { start } = req.body
    const { end } = req.body
    const { latitude } = req.body
    const { longitude } = req.body
    const { interval } = req.body

    if (!date) {
        res.status(418).send({ message: 'date needed!'})
    }
    if (!start) {
        res.status(418).send({ message: 'start needed!'})
    }
    if (!end) {
        res.status(418).send({ message: 'end needed!'})
    }
    if (!latitude) {
        res.status(418).send({ message: 'latitude needed!'})
    }
    if (!longitude) {
        res.status(418).send({ message: 'longitude needed!'})
    }
    if (!interval) {
        res.status(418).send({ message: 'interval needed!'})
    }

    res.status(200).send(
        formulas.sunPositions(date, start, end, latitude, longitude, interval)
    );   

});
