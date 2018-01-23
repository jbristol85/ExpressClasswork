var express = require('express');
var app = express();

// app.get('/', function(request, response){
// 	response.sendFile(__dirname + '/public/index.html');
// });

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

var cities = {
	'Providence': 'Rhode Island',
	'Baltimore': 'Maryland',
	'Denver': 'Colorado',
	'Boston': 'Massachusetts',
	'Moab': 'Utah'
	};

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
	
	var description= cities[request.cityName];
	if(!description){
		response.status(404).json("Not Found");
	}else{
		response.json(description);
	}
});

app.listen(process.env.PORT, function(){
	console.log('Listening on port '+ process.env.PORT);
	console.log('Local IP address is ' + process.env.IP);
});