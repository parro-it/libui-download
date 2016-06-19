#!/usr/bin/env node
var minimist = require('minimist');
var download = require('./');

var opts = minimist(process.argv.slice(2));

if (opts['strict-ssl'] === false) {
	opts.strictSSL = false;
}

download(opts)
	.then(function (zipPath) {
		console.log('Downloaded zip:', zipPath);
		process.exit(0);
	})
	.catch(function (err) {
		console.error(err.stack);
		process.exit(1);
	});
