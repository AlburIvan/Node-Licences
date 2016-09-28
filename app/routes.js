module.exports = (function() {
	'use strict';

	var routes = require('express').Router();
	var path = require('path');
	var googleapis = require('googleapis');

	routes.get('/', function(req,res) {
		res.sendFile(path.resolve('./public/index.html'));
	});

	//TODO add more routes if needed
	routes.get('/file', function(req, res) {

		try {

			var fs = require('fs');
			fs.readFile('D:\\Trabajos\\Java\\Raworks\\SuperFavorito\\app\\build.gradle', 'utf8', function (err, data) {
				if (err) {
					return console.log(err);
				}

				let indexOfDependenciesStart = data.indexOf('dependencies {');
				let indexOfDependenciesEnd = data.length;


				let dependencies = data.substring(indexOfDependenciesStart, indexOfDependenciesEnd);


				// compiles
				let singleDependencies = dependencies.split('compile');

				for (var i = 0; i < singleDependencies.length; i++) {
					console.log(singleDependencies[i]);


					googleapis.discover(singleDependencies[i], 'v1').execute(function(err, client) {
					  // set api key
					  client.withApiKey('...');
					  client.search.cse.list({ q: '...' }).execute(console.log);
					});
				}




				res.send(dependencies);
			});
		}
		catch(e)
		{
			let jsonRes = JSON.stringify({ Error: 'No file found with that name' }, null, 3);
			res.send(jsonRes);
		}

	});

	//TODO add upload api

	return routes;

})();