import log from "loglevel";
const logger = log.getLogger("multiselect-helper-logger");
logger.disableAll();

const MIN_CHIP_WIDTH = 50; // Minimum width of a chip
export function calculateWidthsUntilExceed(
	containerWidth: number,
	widths: number[],
	minChipWidth: number = MIN_CHIP_WIDTH,
) {
	let totalWidth = 0;
	let index = -1;

	for (let i = 0; i < widths.length; i++) {
		const width = widths[i];
		const exceeds = totalWidth + width > containerWidth - minChipWidth;
		logger.debug(
			`{totalWidth: ${totalWidth}, index: ${index}, i=${i}, width=${width}, exceeds=${exceeds}`,
		);

		if (exceeds) {
			break;
		}

		totalWidth += width; // Update total width
		index = i; // Update index
		logger.debug(`not exceeding: {totalWidth: ${totalWidth}, index: ${index}}`);
	}

	const result = {
		totalWidth,
		index,
		hiddenCount: widths.length - index - 1,
	};

	logger.debug(`calculateWidthsUntilExceed returns ${JSON.stringify(result)}`);
	return result;
}
