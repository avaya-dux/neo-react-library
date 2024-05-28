import { useMemo } from "react";

import { Tooltip } from "components/Tooltip";

import type { PaginationProps } from "..";

/**
 * Displays the currently selected item(s) out of the total number of items.
 * Ie, "1 / 10" for `itemDisplayType="page"`
 * or "1 - 10 / 100" for `itemDisplayType="count"`
 *
 * @example
 * <PaginationItemDisplay
 *  ariaLabelForCurrentPage={"Page Count"}
 *  currentPageIndex={3}
 *  itemCount={50}
 *  itemDisplayType="count"
 *  itemsPerPage={5}
 *  totalPages={10}
 * />
 */
export const PaginationItemDisplay = ({
	currentPageIndex,
	itemCount,
	itemDisplayTooltipPosition = "auto",
	itemDisplayType = "count",
	itemsPerPage,
	tooltipForCurrentPage = "Item count",
	totalPages,
}: { totalPages: number } & Pick<
	PaginationProps,
	| "currentPageIndex"
	| "itemCount"
	| "itemDisplayTooltipPosition"
	| "itemDisplayType"
	| "itemsPerPage"
	| "tooltipForCurrentPage"
>) => {
	const display = useMemo(() => {
		if (itemDisplayType === "count") {
			const startingItemIndex = (currentPageIndex - 1) * itemsPerPage + 1;
			const endingItemIndex = Math.min(
				startingItemIndex + itemsPerPage - 1,
				itemCount,
			);

			return (
				<bdi>
					{startingItemIndex}-{endingItemIndex} / {itemCount}
				</bdi>
			);
		} else if (itemDisplayType === "page") {
			return (
				<bdi>
					{currentPageIndex} / {totalPages}
				</bdi>
			);
		}

		return <></>;
	}, [currentPageIndex, itemCount, itemDisplayType, itemsPerPage, totalPages]);

	return (
		<Tooltip
			id={`pagination-item-display-${tooltipForCurrentPage}`}
			label={tooltipForCurrentPage}
			position={itemDisplayTooltipPosition}
		>
			{display}
		</Tooltip>
	);
};
