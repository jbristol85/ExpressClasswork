var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

var cities = {
	'Providence': 'Rhode Island',
	'Baltimore': 'Maryland',
	'Denver': 'Colorado',
	'Boston': 'Massachusetts',
	'Moab': 'Utah'
};

router.route('/')
	.get(function(request, response) {
		var city = Object.keys(cities);
		if (request.query.limit > city.length) {
			response.status(400).json("There aren't that many cities.");
		}
		else if (request.query.limit > 0) {
			response.json(city.slice(0, request.query.limit));
		}
		else {
			response.json(city);
		}
	})
	.post(parseUrlencoded, function(request, response) {
		console.log(request.body.name)
		console.log(request.body.state)
		var casedCity = request.body.name[0].toUpperCase() + request.body.name.slice(1).toLowerCase();
		var casedState = request.body.state[0].toUpperCase() + request.body.state.slice(1).toLowerCase()
		if (casedCity.length >= 4 && casedState.length >= 2) {
			var newCity = createCity(casedCity, casedState);
			console.log(newCity);

			response.status(201).json(newCity);
		}
		else
			response.status(400).json("Invalid City");
	});

router.route('/:name')
	.all(function(request, response, next) {
		var name = request.params.name;
		var city = name[0].toUpperCase() + name.slice(1).toLowerCase();

		request.cityName = city;
		next();
	})
	.get(function(request, response) {
		console.log(cities);
		var state = cities[request.cityName];
		if (!state) {
			response.status(404).json("Not Found");
		}
		else {
			response.json(state);
		}
	})
	.delete(function(request, response) {
		delete cities[request.cityName];
		response.sendStatus(200);
	});

var createCity = function(name, state) {
	cities[name] = state;
	return name;
};


module.exports = router;