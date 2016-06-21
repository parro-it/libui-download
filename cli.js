#!/usr/bin/env node
var read = require('fs').createReadStream;
var unpack = require('tar-pack').unpack;
var download = require('./');

download({version: process.argv[2]})
	.then(function (zipPath) {
		console.log('Downloaded zip:', zipPath);
		read(zipPath)
			.pipe(unpack(process.cwd(), function (err) {
				if (err) {
					return console.error(err.stack);
				}
				console.log('Libui binaries extracted to:', process.cwd());
			}));
	})
	.catch(function (err) {
		console.error(err.message);
		process.exit(1);
	});

