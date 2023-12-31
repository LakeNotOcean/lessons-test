/* eslint-disable no-unused-vars */
import { cExceptionCode } from '../exception-code.js';
import { cExceptionType } from './exception.type.js';

export class cException {
	/**
	 * @constructor
	 * @param {cExceptionCode} iCode
	 * @param {object} oPayload
	 * @param {object} oInner
	 * @param {cExceptionType} oType
	 * @returns
	 */
	constructor(iCode, oPayload, oInner, oType) {
		Object.assign(this, {
			iCode,
			oPayload,
			oInner,
			oType,
			...Object.freeze(oType),
		});
	}
}

/**
 * @param {cExceptionCode} iCode
 * @param {object} oPayload
 * @param {object} oInner
 */
export function fnNotFoundException(iCode, oPayload, oInner) {
	const oType = cExceptionType.NotFoundException;

	return new cException(iCode, oPayload, oInner, oType);
}

/**
 * @param {cExceptionCode} iCode
 * @param {object} oPayload
 * @param {object} oInner
 */
export function fnClientException(iCode, oPayload, oInner) {
	const oType = cExceptionType.ClientException;

	return new cException(iCode, oPayload, oInner, oType);
}

/**
 * @param {cExceptionCode} iCode
 * @param {object} oPayload
 * @param {object} oInner
 */
export function fnServerException(iCode, oPayload, oInner) {
	const oType = cExceptionType.ServerException;

	return new cException(iCode, oPayload, oInner, oType);
}

/**
 * @param {cExceptionCode} iCode
 * @param {object} oPayload
 * @param {object} oInner
 */
export function fnBusinessException(iCode, oPayload, oInner) {
	const oType = cExceptionType.BusinessException;

	return new cException(iCode, oPayload, oInner, oType);
}
