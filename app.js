var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended:false});
// app.get('/', function(request, response){
// 	response.sendFile(__dirname + '/public/index.html');
// });

var cities = {
	'Providence': 'Rhode Island',
	'Baltimore': 'Maryland',
	'Denver': 'Colorado',
	'Boston': 'Massachusetts',
	'Moab': 'Utah'
	};

app.use(express.static('public'));

app.get('/', function(request, response){
	response.send('Hello World');
});

app.get('/name', function(request, response){
	var name = "Josh Bristol";
	response.json(name);
});

app.get('/redirect', function(request, response){
	response.redirect(301, '/surprise');
});

app.get('/date', function(request, response){
	var date = new Date();
	response.send(date);
});


app.get('/cities', function(request, response){
	var city = Object.keys(cities);
	if(request.query.limit > city.length){
		response.status(400).json("There aren't that many cities.");
	}else if(request.query.limit > 0){
		response.json(city.slice(0, request.query.limit));
	}else{
		response.json(city);
	}
});

app.param('name', function(request, response, next){
	var name = request.params.name;
	var city = name[0].toUpperCase() + name.slice(1).toLowerCase();
	
	request.cityName = city;
	next();
});

app.get('/cities/:name', function(request, response){
	console.log(cities);
	var state= cities[request.cityName];
	if(!state){
		response.status(404).json("Not Found");
	}else{
		response.json(state);
	}
});

app.post('/cities', parseUrlencoded, function(request, response){
	console.log(request.body.name)
	console.log(request.body.state)
	var casedCity = request.body.name[0].toUpperCase() + request.body.name.slice(1).toLowerCase();
	var casedState = request.body.state[0].toUpperCase() + request.body.state.slice(1).toLowerCase()
	if(casedCity.length >= 4 && casedState.length >=2){
	var newCity = createCity(casedCity, casedState);
	console.log(newCity);
	
	response.status(201).json(newCity);
	}else
	response.status(400).json("Invalid City");
});

app.delete('/cities/:name', function(request, response){
	delete cities[request.cityName];
	response.sendStatus(200)
})

var createCity = function(name, state){
	// console.log(name, state);
	cities[name] = state;
	// console.log(cities)
	return name;
};

app.listen(process.env.PORT, function(){
	console.log('Listening on port '+ process.env.PORT);
	console.log('Local IP address is ' + process.env.IP);
});
