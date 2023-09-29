import { config } from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

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
		path: join(__dirname, '..', 'configs', CONFIG_FILENAME),
		processEnv: oConfigData,
	});

	function fnGetOrThrow(sPropertyPath) {
		const sProperty = oConfigData[sPropertyPath];
		if (!sProperty) {
			throw new Error();
		}
		return sProperty;
	}

	function fnGet(sPropertyPath) {
		return oConfigData[sPropertyPath];
	}

	return { fnGet, fnGetOrThrow };
}
