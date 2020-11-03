const express = require("express");
const nthLine = require("nthline");
const app = express();
const cors = require("cors");
const port = 9991;
const hostname = "127.0.0.1";

app.use(cors());

app.get("/write", (req, res) => {
    let input = req.query.input;
    let answer;
    if (input === null) {
        res.send("Error: null!!! Please enter a number in the box above.");
        return;
    }
    if (!Number.isInteger(+input)) {
        res.send("Error: Invaled input!!! Please enter a number in the box above.");
        return;
    }
    if (+input < 1 || +input > 100) {
        res.send("Error: Please enter a number in range 1 to 100.");
        return;
    }

    nthLine(+input - 1, 'DB/text.txt')
        .then(line => {
            res.send(line);
            return;
        });
});


app.listen(port, () => {
    console.log(`App listening at http://${hostname}:${port}`);
})