/**
 *
 * @param  {object} oBuilder
 * @param {Date} oDateStart
 * @param  {Date} oDateEnd
 */
export function setDatetimeParams(oBuilder, oDateStart, oDateEnd) {
	if (oDateStart && oDateEnd) {
		oBuilder.whereBetween('date', [oDateStart, oDateEnd]);
		return;
	}
	if (oDateStart) {
		oBuilder.where('date', '>', oDateStart);
		return;
	}
	if (oDateEnd) {
		oBuilder.where('date', '<', oDateEnd);
		return;
	}
}
