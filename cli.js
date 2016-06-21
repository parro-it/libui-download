#!/usr/bin/env node
var join = require('path').join;
var targz = require('./_targz');
var download = require('./');

download({version: process.argv[2]})
	.then(function (zipPath) {
		console.log('Downloaded zip:', zipPath);
		return targz(zipPath, join(process.cwd(), 'tmp'));
	})
	.then(function () {
		console.log('Libui binaries extracted to:', process.cwd());
	})
	.catch(function (err) {
		console.error(err.stack);
		process.exit(1);
	});

