import { dirname } from 'path';
import { fileURLToPath } from 'url';
/**
 * @returns {string}
 * @param {string} sUrl
 */
export function fnGetDirName(sUrl) {
	const __filename = fileURLToPath(sUrl);
	return dirname(__filename);
}
