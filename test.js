import test from 'ava';
import pify from 'pify';
import pathExists from 'path-exists';

import _download from './';

const download = pify(_download);

test('Download a release', async t => {
	const zipPath = await download({
		version: '0.25.1',
		arch: 'ia32',
		platform: 'win32'
	});

	t.true(pathExists(zipPath));
});

test('Throws error on 404', async t => {
	const ex = t.throws(() => download({
		version: '0.25.1',
		arch: 'ia32',
		platform: 'win32'
	}));

	t.is(ex.message, 'Failed to find Electron v0.25.1 for darwin-ia32 at https://github.com/electron/electron/releases/download/v0.25.1/electron-v0.25.1-darwin-ia32.zip');
});
