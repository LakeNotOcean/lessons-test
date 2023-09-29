export const PAGINATION_HEADER = 'Pagination';

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
