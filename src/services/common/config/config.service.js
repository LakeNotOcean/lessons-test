import { config } from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { fnConfigPropertyNotFound } from './config.exception.js';

export function fnGetConfigSerivce() {
	const env = process.env.NODE_ENV;

	if (!env) {
		throw Error('NODE_ENV is undefined');
	}
	const CONFIG_FILENAME = 'config.' + env + '.env';

	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);

	const oConfigData = {};
	config({
		path: join(__dirname, '..', '..', '..', 'configs', CONFIG_FILENAME),
		// @ts-ignore
		processEnv: oConfigData,
	});

	/**
	 * @param {string} sPropertyPath
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
	 */
	function fnGet(sPropertyPath) {
		return oConfigData[sPropertyPath];
	}

	return { fnGet, fnGetOrThrow };
}
