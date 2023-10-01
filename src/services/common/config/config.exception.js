import { fnServerException } from '#src/lib/exceptions/core/base-exceptions.js';
import { cExceptionCode } from '#src/lib/exceptions/exception-code.js';

/**
 * @param {string} sPropertyPath
 */
export function fnConfigPropertyNotFound(sPropertyPath) {
	return fnServerException(cExceptionCode.ConfigPropertyNotFound, {
		propertyPath: sPropertyPath,
	});
}
