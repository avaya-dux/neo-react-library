import { useEffect, useId, useMemo, useRef, useState } from "react";

import type { PaginationProps } from "./PaginationTypes";
import { PaginationContext } from "./PaginationContext";

import "./Pagination_shim.css";

/**
 * This component is used to render pagination.
 * It can be used as a standalone component.
 * Is also used by the Table component.
 * It is up to the implementer to provide the correct data,
 * Eg, `currentPageIndex`, `itemsPerPage`, ect.
 *
 * @example
 * <Pagination
    currentPageIndex={pageIndex}
    itemCount={itemArray.length}
    itemsPerPage={itemsPerPage}
    itemsPerPageOptions={[1, 5, 10]}
    onPageChange={(e, newIndex) => {
      e?.preventDefault();
      setPageIndex(newIndex);
    }}
    onItemsPerPageChange={(e, newItemsPerPage) => {
      e?.preventDefault();
      setItemsPerPage(newItemsPerPage);
    }}
 * />
 *
 * @see https://design.avaya.com/components/pagination
 */
export const Pagination = ({
	id = `pagination-${useId()}`,

	currentPageIndex,
	itemCount,
	itemsPerPage = 10,
	itemsPerPageOptions = [5, 10, 25, 50],

	alwaysShowPagination = false,
	forceCondensedView = false,

	// event handlers
	onPageChange,
	onItemsPerPageChange,

	// translations
	backIconButtonText = "back",
	nextIconButtonText = "next",
	goToPageText = "Go to page",
	pagesText = "pages",
	itemsPerPageLabel = "Rows",
}: PaginationProps) => {
	const totalPages = useMemo(
		() => Math.ceil(itemCount / itemsPerPage),
		[itemCount, itemsPerPage],
	);

	const rootRef = useRef<HTMLDivElement>(null);
	const [rootWidth, setRootWidth] = useState(0);
	useEffect(() => {
		// TODO: could add a debounce/throttle here
		// example: https://github.com/maslianok/react-resize-detector/blob/ccdb602d683e891386302e5436bf599645a16ba6/src/utils.ts#L16
		const updateRootWidth = () => {
			if (rootRef.current) {
				setRootWidth(rootRef.current.offsetWidth);
			}
		};

		// update root width on window resize
		window.addEventListener("resize", updateRootWidth);
		updateRootWidth();
		return () => window.removeEventListener("resize", updateRootWidth);
	}, []);

	const isCondensed = useMemo(() => {
		const requiredWidth = 400; // TODO: calculate if we must condense the pagination
		return forceCondensedView || rootWidth < requiredWidth;
	}, [forceCondensedView, rootWidth]);

	return (
		<PaginationContext.Provider
			value={{
				totalPages,
				currentPageIndex,
				onPageChange,
				onItemsPerPageChange,
			}}
		>
			<div className="neo-pagination__row" id={id} ref={rootRef}>
				{isCondensed ? "Condensed Mode" : "Full Mode"}
			</div>
		</PaginationContext.Provider>
	);
};
Pagination.displayName = "Pagination";
