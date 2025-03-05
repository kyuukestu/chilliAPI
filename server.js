var express = require('express');
var cors = require('cors');

var app = express();

app.use(express.json());
app.use(cors());
app.use(express.json());

let chillies = [];
var count = 0;
app.get('/chillies', (req, res) => {
	console.log('get all chillies');

	res.send(chillies);
});

app.get('/chillies/:id', (req, res) => {
	console.log(`get a chilli with id ${req.params.id}`);

	// check if a chilli with matching id was found
	var chilliMatch = chillies.find((c) => c.id == req.params.id);

	if (chilliMatch) {
		return res.send(chilliMatch);
	} else {
		res.sendStatus(400);
	}
});

app.post('/chillies', (req, res) => {
	console.log('add a chilli');

	// add a new chilli
	const newChilli = {
		id: count,
		...req.body,
	};

	count++;
	chillies.push(newChilli);
	res.send(newChilli);
});

app.put('/chillies/:id', (req, res) => {
	console.log(`update a chilli with id ${req.params.id}`);

	let chilliIndex = chillies.findIndex((c) => c.id == req.params.id);

	if (chilliIndex != -1) {
		chillies[chilliIndex] = req.body;
		console.log(req.body);
		res.send(chillies[chilliIndex]);
	} else {
		res.sendStatus(400);
	}
});

app.delete('/chillies/:id', (req, res) => {
	console.log(`delete a chilli with id ${req.params.id}`);

	let chilliIndex = chillies.findIndex((c) => c.id == req.params.id);

	if (chilliIndex != -1) {
		chillies = chillies.filter((c) => c.id != req.params.id);
		res.sendStatus(chillies[chilliIndex]);
	} else {
		res.sendStatus(400);
	}
});

app.all('/', (req, res) => {
	res.sendStatus('404');
});

app.listen(3001, () => {
	console.log('listening running on port 3001');
});
