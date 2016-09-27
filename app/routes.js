module.exports = (function() {
	'use strict';

	var routes = require('express').Router();
	var path = require('path');

	routes.get('/', function(req,res) {
		res.sendFile(path.resolve('./public/index.html'));
	});

	//TODO add more routes if needed

	//TODO add upload api


})();