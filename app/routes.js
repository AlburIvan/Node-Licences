module.exports = (function() {
	'use strict';

	var routes = require('express').Router();
	var path = require('path');

	routes.get('/', function(req,res) {
		res.sendFile(path.resolve('./public/index.html'));
	});

	//TODO add more routes if needed
	routes.get('/file', function(req, res) {

		try {

			var fs = require('fs');
			fs.readFile('D:\\Projects\\Java\\android_workspace\\USSDNotifier\\app\\build.gradle', 'utf8', function (err, data) {
				if (err) {
					return console.log(err);
				}

				let indexOfDependenciesStart = data.indexOf('dependencies {');
				let indexOfDependenciesEnd = data.length;

				console.log(data.substring(indexOfDependenciesStart, indexOfDependenciesEnd));	

				res.send(data);
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