import { type MutableRefObject, createContext } from "react";

import type { IFilterContext } from "../types";

export const FilterContext = createContext<IFilterContext>({
	allowToggleColumnVisibility: false,
	filterSheetVisible: false,
	draggableRows: false,
	resizableColumns: false,
	setFilterSheetVisible: () => null,
	toggleFilterSheetVisible: () => null,
	dataSyncOption: "no",
	setDataSyncOption: () => null,
	clearSortByFuncRef: null as unknown as MutableRefObject<(() => void) | null>,
	filterColumn: undefined,
	setFilterColumn: () => null,
	tableWidth: 0,
	lastColumnWidth: 0,
	setLastColumnWidth: () => null,
});
