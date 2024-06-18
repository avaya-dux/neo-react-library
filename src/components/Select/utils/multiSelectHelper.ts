import log from "loglevel";
const logger = log.getLogger("multiselect-helper-logger");
logger.disableAll();

// 120px is the space reserved for the badge chip, the 2 buttons and some padding
const MIN_CHIP_WIDTH = 120;
export function calculateWidthsUntilExceed(
	containerWidth: number,
	widths: number[],
	minChipWidth: number = MIN_CHIP_WIDTH,
) {
	let totalWidth = 0;
	let index = -1;
	logger.debug(
		`calculateWidthsUntilExceed 1: {containerWidth: ${containerWidth}, widths: ${JSON.stringify(widths)}, minChipWidth: ${minChipWidth}}`,
	);
	for (let i = 0; i < widths.length; i++) {
		const width = widths[i];
		const exceeds = totalWidth + width > containerWidth - minChipWidth;
		logger.debug(
			`calculateWidthsUntilExceed 2: {totalWidth: ${totalWidth}, index: ${index}, i=${i}, width=${width}, exceeds=${exceeds}`,
		);

		if (exceeds) {
			break;
		}

		totalWidth += width;
		index = i;
		logger.debug(
			`calculateWidthsUntilExceed 2.1: not exceeding: {totalWidth: ${totalWidth}, index: ${index}}`,
		);
	}

	const result = {
		totalWidth,
		index,
		hiddenCount: widths.length - index - 1,
	};

	logger.debug(`calculateWidthsUntilExceed 3: ${JSON.stringify(result)}`);
	return result;
}
