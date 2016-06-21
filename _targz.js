var fs = require('fs');
var zlib = require('zlib');
var path = require('path');
var tar = require('tar');
var mkdirp = require('mkdirp');

var log = console.log;

module.exports = function extract(tarball, dest) {
	console.log(tarball)
	var stream = fs.createReadStream(tarball)
		.on('error', log)
		.pipe(new zlib.Unzip())
		.pipe(new tar.Parse());

	stream.on('entry', function (entry) {
		var isDir = entry.type === 'Directory';
		var fullpath = path.join(dest, entry.path);
		var directory = isDir ? fullpath : path.dirname(fullpath);

		mkdirp(directory, function (err) {
			if (err) {
				stream.emit('error', err);
			}
			if (!isDir) { // should really make this an `if (isFile)` check...
				entry.pipe(fs.createWriteStream(fullpath));
			}
		});
	});

	return new Promise(function (resolve, reject) {
		stream.on('end', resolve);
		stream.on('error', reject);
	});
};
