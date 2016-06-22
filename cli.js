#!/usr/bin/env node
var exec = require('child_process').execSync;
var download = require('./');

download({version: process.argv[2]})
	.then(function (zipPath) {
		console.log('Downloaded zip:', zipPath);
		exec('tar -xzvf ' + zipPath, {stdio: 'inherit'});
	})
	.then(function () {
		console.log('Libui binaries extracted to:', process.cwd());
	})
	.catch(function (err) {
		console.error(err.stack);
		process.exit(1);
	});

