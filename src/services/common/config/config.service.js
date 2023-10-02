import { fnGetDirName } from '#src/utils/path.util.js';
import { config } from 'dotenv';
import { join } from 'path';
import { fnConfigPropertyNotFound } from './config.exception.js';

/**
 *
 * @returns {{fnGet : function(string): string,  fnGetOrThrow: function(string): string}}
 */
export function fnGetConfigSerivce() {
	const env = process.env.NODE_ENV;

	if (!env) {
		throw Error('NODE_ENV is undefined');
	}
	const CONFIG_FILENAME = 'config.' + env + '.env';
	const oConfigData = {};

	config({
		path: join(
			fnGetDirName(import.meta.url),
			'..',
			'..',
			'..',
			'configs',
			CONFIG_FILENAME,
		),
		// @ts-ignore
		processEnv: oConfigData,
	});

	/**
	 * @param {string} sPropertyPath
	 * @returns {string}
	 */
	function fnGetOrThrow(sPropertyPath) {
		const sProperty = oConfigData[sPropertyPath];
		if (!sProperty) {
			throw fnConfigPropertyNotFound(sPropertyPath);
		}
		return sProperty;
	}

	/**
	 * @param {string } sPropertyPath
	 * @returns {string}
	 */
	function fnGet(sPropertyPath) {
		return oConfigData[sPropertyPath];
	}

	return { fnGet, fnGetOrThrow };
}
