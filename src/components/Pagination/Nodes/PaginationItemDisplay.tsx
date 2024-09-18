import type { PaginationProps } from "..";

/**
 * Displays the currently selected item(s) out of the total number of items.
 * Ie, "1 / 10" for `itemDisplayType="page"`
 * or "1 - 10 / 100" for `itemDisplayType="count"`
 *
 * @example
 * <PaginationItemDisplay
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
	itemDisplayType = "count",
	itemsPerPage,
	totalPages,
}: { totalPages: number } & Pick<
	PaginationProps,
	"currentPageIndex" | "itemCount" | "itemDisplayType" | "itemsPerPage"
>) => {
	if (itemDisplayType === "count") {
		const startingItemIndex = (currentPageIndex - 1) * itemsPerPage + 1;
		const endingItemIndex = Math.min(
			startingItemIndex + itemsPerPage - 1,
			itemCount,
		);

		return (
			<bdi>
				{startingItemIndex.toLocaleString()} -{" "}
				{endingItemIndex.toLocaleString()} / {itemCount.toLocaleString()}
			</bdi>
		);
	}
	if (itemDisplayType === "page") {
		return (
			<bdi>
				{currentPageIndex.toLocaleString()} / {totalPages.toLocaleString()}
			</bdi>
		);
	}

	return <></>;
};
