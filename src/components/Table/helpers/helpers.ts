import type { AriaAttributes } from "react";
import type { Row, TableInstance } from "react-table";

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

const setRowsSelected = <T extends Record<string, unknown>>(
	instance: TableInstance<T>,
	selected: boolean,
	rows: Row<T>[],
	handleRowToggled?: (rowIds: string[]) => void,
) => {
	const {
		toggleRowSelected,
		state: { selectedRowIds },
	} = instance;

	const enabledRowsIds = rows
		.filter((row) => !row.original.disabled)
		.map((row) => row.id);
	enabledRowsIds.forEach((id) => toggleRowSelected(id, selected));

	const selectedRowIdsSet = new Set(Object.keys(selectedRowIds));

	if (selected) {
		enabledRowsIds.forEach((id) => selectedRowIdsSet.add(id));
	} else {
		enabledRowsIds.forEach((id) => selectedRowIdsSet.delete(id));
	}

	const adjustedSelectedRowIds = Array.from(selectedRowIdsSet);

	handleRowToggled?.(adjustedSelectedRowIds);
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
	setRowsSelected(instance, selected, instance.rows, handleRowToggled);
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
	handleRowToggled?: (rowIds: string[]) => void,
) => {
	setRowsSelected(instance, selected, instance.page, handleRowToggled);
};
