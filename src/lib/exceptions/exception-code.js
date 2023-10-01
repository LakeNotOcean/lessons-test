export class cExceptionCode {
	static ConfigPropertyNotFound = new cExceptionCode(1);

	/**
	 * @param {number} iCode
	 */
	constructor(iCode) {
		this.iCode = iCode;
	}
}
