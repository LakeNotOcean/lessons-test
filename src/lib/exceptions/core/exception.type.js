export class cExceptionType {
	static NotFoundException = new cExceptionType('not_found_exception');
	static ClientException = new cExceptionType('client_exception');
	static ServerException = new cExceptionType('server_exception');
	static BusinessException = new cExceptionType('business_exception');

	/**
	 * @param {string} name
	 */
	constructor(name) {
		this.name = name;
	}
}
