import log from "loglevel";
const logger = log.getLogger("multiselect-helper-logger");
logger.disableAll();

// 120px is the space reserved for the badge chip, the 2 buttons and some padding
const MIN_RESERVED_SPACE = 60;
/**
 * Calculate the number of chips that can be displayed in the container
 * @param {number} containerWidth - The width of the container.
 * @param {number[]} chipWidths - Array containing the widths of chips of selected items.
 * @param {number} [reservedSpace=MIN_RESERVED_SPACE] - Space reserved for the badge chip that shows the number of collapsed items.
 * @returns {{totalVisibleWidth: number, lastVisibleIndex: number, collapsedCount: number}} An object containing the total width of visible chips, the index of the last visible chip, and the count of collapsed chips.
 */
export function calculateVisibleChips(
	containerWidth: number,
	chipWidths: number[],
	reservedSpace: number = MIN_RESERVED_SPACE,
) {
	let totalVisibleWidth = 0;
	let index = -1;
	logger.debug(
		`calculateVisibleChips 1: {containerWidth: ${containerWidth}, chipWidths: ${JSON.stringify(chipWidths)}, reservedSpace: ${reservedSpace}}`,
	);
	for (let i = 0; i < chipWidths.length; i++) {
		const width = chipWidths[i];
		const exceeds = totalVisibleWidth + width > containerWidth - reservedSpace;
		logger.debug(
			`calculateVisibleChips 2: {totalVisibleWidth: ${totalVisibleWidth}, index: ${index}, i=${i}, width=${width}, exceeds=${exceeds}`,
		);

		if (exceeds) {
			break;
		}

		totalVisibleWidth += width;
		index = i;
		logger.debug(
			`calculateVisibleChips 2.1: not exceeding: {totalVisibleWidth: ${totalVisibleWidth}, index: ${index}}`,
		);
	}

	const result = {
		totalVisibleWidth,
		lastVisibleIndex: index,
		collapsedCount: chipWidths.length - index - 1,
	};

	logger.debug(`calculateVisibleChips 3: ${JSON.stringify(result)}`);
	return result;
}
