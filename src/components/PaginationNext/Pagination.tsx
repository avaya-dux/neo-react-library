import { useEffect, useId, useMemo, useRef, useState } from "react";

import type { PaginationProps } from "./PaginationTypes";

import { PaginationCondensed } from "./PaginationCondensed";
import {
	GoToPage,
	PaginationItemDisplay,
	PaginationItemsPerPageSelection,
	PaginationNavigation,
} from "./Nodes";

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
 *  currentPageIndex={pageIndex}
 *  itemCount={itemArray.length}
 *  itemsPerPage={itemsPerPage}
 *  itemsPerPageOptions={[5, 10, 50]}
 *  onPageChange={(e, newIndex) => {
 *   setPageIndex(newIndex);
 *  }}
 *  onItemsPerPageChange={(e, newItemsPerPage) => {
 *   setItemsPerPage(newItemsPerPage);
 *  }}
 * />
 *
 * @see https://design.avaya.com/components/pagination
 */
export const Pagination = (props: PaginationProps) => {
	const {
		id = `pagination-${useId()}`,

		itemCount,
		itemsPerPage = 10,

		forceCondensedView = false,
	} = props;

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
		const requiredWidth = 820; // TODO: calculate if we must condense the pagination
		return forceCondensedView || rootWidth < requiredWidth;
	}, [forceCondensedView, rootWidth]);

	return (
		<div className="neo-pagination__row" id={id} ref={rootRef}>
			{isCondensed ? (
				<PaginationCondensed {...props} totalPages={totalPages} />
			) : (
				<>
					<PaginationItemDisplay itemCount={itemCount} />

					<PaginationNavigation {...props} totalPages={totalPages} />

					<div className="neo-pagination__pages-selection">
						<GoToPage {...props} totalPages={totalPages} />

						<PaginationItemsPerPageSelection
							{...props}
							totalPages={totalPages}
						/>
					</div>
				</>
			)}
		</div>
	);
};
Pagination.displayName = "Pagination";
