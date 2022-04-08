const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json())

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get("/test", (req, res) => {
    const { a } = req.body

    if (!a) {
        res.status(418).send({ message: 'a needed!'})
    }

    res.status(200).send({
        test_a: a,
        test_b: "b",
    });   

});
