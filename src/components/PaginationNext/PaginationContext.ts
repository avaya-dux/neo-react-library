import { createContext } from "react";

import type { IPaginationContext } from "./PaginationTypes";

export const PaginationContext = createContext<IPaginationContext>({
	totalPages: 1,
	currentPageIndex: 1,
	onPageChange: () => alert("onPageChange not implemented"),
	onItemsPerPageChange: () => alert("onItemsPerPageChange not implemented"),
});
