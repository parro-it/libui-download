import test from 'ava';
import pify from 'pify';
import _rimraf from 'rimraf';
import 'babel-register';
import _Promise from 'pinkie-promise';
import download, {pathExists, cacheDir} from './index';

const rimraf = pify(_rimraf, global.Promise || _Promise);

test('Download a release', async t => {
	await rimraf(cacheDir());

	const zipPath = await download({
		version: '0.0.11',
		arch: 'x64',
		platform: 'linux'
	});
	t.true(await pathExists(zipPath));
});

test('Get file from cache', async t => {
	await rimraf(cacheDir());

	await download({
		version: '0.0.11',
		arch: 'x64',
		platform: 'linux'
	});

	const zipPath = await download({
		mirror: 'https://localhost/',
		version: '0.0.11',
		arch: 'x64',
		platform: 'linux'
	});
	t.true(await pathExists(zipPath));
});

test('Throws error on 404', async t => {
	await rimraf(cacheDir());

	const ex = await t.throws(download({
		version: '0.25.1',
		arch: 'ia32',
		platform: 'win32'
	}));
	t.is(ex.message, 'Failed to find libui 0.25.1 for win32-ia32 at https://github.com/parro-it/libui/releases/download/0.25.1/libui-shared-windows-ia32-0.25.1.tar.gz');
});
