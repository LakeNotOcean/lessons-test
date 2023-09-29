export class cPagingParams {
	#iMaxPageSize = 50;
	#iPageSize = 50;

	get iPageSize() {
		return this.#iPageSize;
	}
	set iPageSize(iPageSize) {
		this.#iPageSize =
			iPageSize > this.#iPageSize ? this.#iMaxPageSize : this.#iPageSize;
	}

	#iPageNumber = 1;

	/**
	 * @param {number} iPageNumber
	 */
	set iPageNumber(iPageNumber) {
		this.#iPageNumber =
			iPageNumber > this.#iPageSize ? this.#iPageSize : iPageNumber;
	}

	get iPageNumber() {
		return this.#iPageNumber;
	}
}
