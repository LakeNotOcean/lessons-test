export class cPageArray extends Array {
	constructor(aLessons, iCount, iCurrentPage, iPageSize) {
		super(...aLessons);
		Object.setPrototypeOf(this, cPageArray.prototype);

		this.iCurrentPage = iCurrentPage;
		this.iTotalPages = Math.ceil(iCount / iPageSize);
		this.pageSize = iPageSize;
		this.totalCount = iCount;
	}

	iCurrentPage;
	iTotalPages;
	iPageSize;
	iTotalCount;

	map(fnCallback, oThisArgs) {
		const newArray = new Array(this.length);

		this.forEach(
			(value, index) => (newArray[index] = fnCallback(value, index, this)),
			oThisArgs,
		);
		return new cPageArray(
			newArray,
			this.iTotalCount,
			this.iCurrentPage,
			this.iPageSize,
		);
	}

	static async CreateAsync(oSourceQuery, oPagingParams) {
		const result = await oSourceQuery
			.offset((oPagingParams.pageNumber - 1) * oPagingParams.pageSize)
			.limit(oPagingParams.pageSize)
			.getManyAndCount();
		if (result[1] == 0) {
			return new cPageArray([], 0, 1, 0);
		}
		return new cPageArray(
			result[0],
			result[1],
			oPagingParams.pageNumber,
			oPagingParams.pageSize,
		);
	}
}
