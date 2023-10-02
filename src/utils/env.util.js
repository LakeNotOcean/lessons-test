/**
 * @returns {boolean}
 */
export function isDev() {
	return process.env.NODE_ENV?.match(/(dev|development|debug)/) ? true : false;
}
