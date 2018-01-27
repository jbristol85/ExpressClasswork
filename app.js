var express = require('express');
var app = express();


// app.get('/', function(request, response){
// 	response.sendFile(__dirname + '/public/index.html');
// });

app.use(express.static('public'));

var cities = require('./routes/cities');


app.use('/cities', cities);



app.get('/', function(request, response) {
	response.send('Hello World');
});

app.get('/name', function(request, response) {
	var name = "Josh Bristol";
	response.json(name);
});

app.get('/redirect', function(request, response) {
	response.redirect(301, '/surprise');
});

app.get('/date', function(request, response) {
	var date = new Date();
	response.send(date);
});


app.listen(process.env.PORT, function() {
	console.log('Listening on port ' + process.env.PORT);
	console.log('Local IP address is ' + process.env.IP);
});
