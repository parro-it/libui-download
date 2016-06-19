#!/usr/bin/env node
var download = require('./');

download({})
	.then(function (zipPath) {
		console.log('Downloaded zip:', zipPath);
		process.exit(0);
	})
	.catch(function (err) {
		console.error(err.stack);
		process.exit(1);
	});
