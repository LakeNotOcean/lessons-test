export const PAGINATION_HEADER = 'Pagination';

/**
 *
 * @param {object} oResponse
 * @param {number} iCurrentPage
 * @param {number} iItemsPerPage
 * @param {number} iTotalLessons
 * @param {number} iTotalPages
 */
export function addPaginationHeader(
	oResponse,
	iCurrentPage,
	iItemsPerPage,
	iTotalLessons,
	iTotalPages,
) {
	const paginationHeader = {
		currentPage: iCurrentPage,
		itemsPerPage: iItemsPerPage,
		totalLessons: iTotalLessons,
		totalPages: iTotalPages,
	};
	oResponse.set(PAGINATION_HEADER, JSON.stringify(paginationHeader));
}
