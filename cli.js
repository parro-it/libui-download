#!/usr/bin/env node

var targz = require('tar.gz');
var download = require('./');

download({version: process.argv[2] || process.env.npm_package_libui})
	.then(function (zipPath) {
		console.log('Downloaded zip:', zipPath);
		return targz().extract(zipPath, '.');
	})
	.then(function () {
		console.log('Libui binaries extracted to:', process.cwd());
	})
	.catch(function (err) {
		console.error(err.stack);
		process.exit(1);
	});

