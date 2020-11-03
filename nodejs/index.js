var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
    path = require("path");
var crypto = require('crypto');
const { request } = require('http');
const nthLine = require("nthline");
const cors = require("cors");
const port = 9991;
const hostname = "127.0.0.1";

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true })); 

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

app.post('/nodejs/sha256',function(req, res){

	setTimeout(function(){
		var n1 = req.body.number1
		var n2 = req.body.number2

		if(n1 === undefined || n2 === undefined){
			res.status(400)
			res.send("You should provide both of the numbers")
		}
		else{
			if(!(/[0-9]+/.test(n1) && /[0-9]+/.test(n2))){
				res.status(400)
				res.send("error occured in regex")
			}
			var sumStr = String(parseInt(n1) + parseInt(n2))
			var hash = crypto.createHash("sha256").update(sumStr).digest("hex")
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify({
				sha256: hash || null
			}));
		}
	}, 0)
});

app.listen(port, () => {
    console.log(`App listening at http://${hostname}:${port}`);
})