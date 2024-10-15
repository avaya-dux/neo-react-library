import type { AriaAttributes } from "react";
import type { TableInstance } from "react-table";

/**
 * If the table is sorted, return the aria-sort value.
 * @param {boolean} isSorted - boolean
 * @param {"descending" | "ascending"} [sortedDir] - The direction of the sort.
 * @returns "none"
 */
export const calculateAriaSortValue = (
	isSorted: boolean,
	sortedDir?: "descending" | "ascending",
): AriaAttributes["aria-sort"] => {
	let result: AriaAttributes["aria-sort"] = "none";

	if (isSorted && sortedDir === "descending") {
		result = "descending";
	} else if (isSorted && sortedDir === "ascending") {
		result = "ascending";
	} else if (isSorted) {
		result = "other";
	}

	return result;
};

/**
 * Given an array of row ids, return an object with the same keys and values.
 * @param rowIds - string[]
 * @returns An object with the rowIds as keys and true as values.
 */
export const convertRowIdsArrayToObject = (rowIds: string[]) => {
	const result: Record<string, boolean> = {};
	rowIds.forEach((rowId) => {
		result[rowId] = true;
	});

	return result;
};

/**
 * Sets all table rows to selected or unselected based on the `selected` parameter and return toggled row ids.
 * @param instance - TableInstance
 * @param selected - boolean, whether to select or unselect the rows.
 * @param handleRowToggled - (rowIds: string[]) => void, the user-defined callback
 * @returns void
 */
export const setTableRowsSelected = <T extends Record<string, unknown>>(
	instance: TableInstance<T>,
	selected: boolean,
	handleRowToggled?: (rowIds: string[]) => void,
) => {
	const { rows, toggleRowSelected } = instance;

	const enabledTableRowsIds = rows
		.filter((row) => !row.original.disabled)
		.map((row) => row.id);
	enabledTableRowsIds.forEach((id) => toggleRowSelected(id, selected));

	handleRowToggled?.(selected ? enabledTableRowsIds : []);
};

/**
 * Sets all page rows to selected or unselected based on the `selected` parameter and return toggled row ids.
 * @param instance - TableInstance
 * @param selected - boolean, whether to select or unselect the rows.
 * @param handleRowToggled - (rowIds: string[]) => void, the user-defined callback
 * @returns void
 */
export const setPageRowsSelected = <T extends Record<string, unknown>>(
	instance: TableInstance<T>,
	selected: boolean,
	handleRowToggled: (rowIds: string[]) => void,
) => {
	const {
		page,
		toggleRowSelected,
		state: { selectedRowIds },
	} = instance;

	const enabledPageRowsIds = page
		.filter((row) => !row.original.disabled)
		.map((row) => row.id);
	enabledPageRowsIds.forEach((id) => toggleRowSelected(id, selected));

	const selectedRowIdsArray = Object.keys(selectedRowIds);

	const adjustedSelectedRowIds = selected
		? [...selectedRowIdsArray, ...enabledPageRowsIds]
		: selectedRowIdsArray.filter((id) => !enabledPageRowsIds.includes(id));

	handleRowToggled?.(adjustedSelectedRowIds);
};
