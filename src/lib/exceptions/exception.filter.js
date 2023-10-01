// eslint-disable-next-line no-unused-vars
import { cException } from './core/base-exceptions.js';
import { cExceptionType } from './core/exception.type.js';

const oExceptionTypesMap = new Map()
	.set(cExceptionType.NotFoundException, 404)
	.set(cExceptionType.BusinessException, 422)
	.set(cExceptionType.ClientException, 400)
	.set(cExceptionType.ServerException, 500);

/**
 *
 * @param {cException|object} err
 * @param {object} _req
 * @param {object} res
 * @param {object} _next
 */
// eslint-disable-next-line no-unused-vars
export function fnExceptionHandler(err, _req, res, _next) {
	const status = oExceptionTypesMap.get(err.sType) || 500;
	res.status(status).send(err);
}
