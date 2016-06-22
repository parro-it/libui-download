#!/usr/bin/env node
var join = require('path').join;
var download = require('./');
var exec = require('child_process').execSync;


download({version: process.argv[2]})
	.then(function (zipPath) {
		console.log('Downloaded zip:', zipPath);
		exec('tar -xzvf ' + zipPath + ' .', { stdio: 'inherit' });
	})
	.then(function () {

		console.log('Libui binaries extracted to:', process.cwd());
	})
	.catch(function (err) {
		console.error(err.stack);
		process.exit(1);
	});

