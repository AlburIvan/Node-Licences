// Initial setup
var express			= require('express');
var app 			= express(); // create our app w/ express
var path 			= require('path'); // resolve path problems
var mongoose 		= require('mongoose'); // mongoose for mongodb
var morgan 			= require('morgan'); // log requests to the console (express4)
var bodyParser 		= require('body-parser'); // pull information from HTML POST (express4)
var methodOverride 	= require('method-override'); // simulate DELETE and PUT (express4)
var routes 			= require(path.resolve('./app/routes.js')); // define the application routes to be used
var env 			= require('dotenv').config(); // loads environment variables from a .env file into process.env


// set the static files location /public for use
app.use(express.static(__dirname + '/public'));

// log every request to the console
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ 'extended': 'true'}));

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

// Lets you use HTTP verbs such as PUT or DELETE
app.use(methodOverride());


app.use('/', routes);

var server = app.listen(8080, function() {

	var host = server.address().address
	var port = server.address().port

	console.log("%s server listening on port %s ...", host, port)
});