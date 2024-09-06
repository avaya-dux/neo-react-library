import { useMemo } from "react";

import type { PaginationNavigationProps } from "../PaginationTypes";
import { buildNavItems, calculateMaxNavNodes } from "./helpers";

/**
 * Used to render the individual links that are displayed in
 * the Pagination component for the purpose of navigating to
 * individual "pages". This includes the "left" and "right"
 * arrows, and the "1", "2", "3", etc. links.
 *
 * @example
 * <PaginationNavigation
 *  backIconButtonText={backIconButtonText}
 *  nextIconButtonText={nextIconButtonText}
 *  currentPageIndex={currentPageIndex}
 *  totalPages={totalPages}
 *  onPageChange={onPageChange}
 *  paginationRootWidth={rootWidth}
 * />
 */
export const PaginationNavigation = ({
	backIconButtonText = "previous",
	nextIconButtonText = "next",
	alwaysShowPagination,
	currentPageIndex,
	totalPages,
	onPageChange,
	paginationRootWidth,
}: PaginationNavigationProps) => {
	const navListItems = useMemo(() => {
		const maxNavNodes = calculateMaxNavNodes(paginationRootWidth);

		return buildNavItems(
			currentPageIndex,
			maxNavNodes,
			onPageChange,
			totalPages,
		);
	}, [currentPageIndex, totalPages, paginationRootWidth, onPageChange]);

	const leftArrowDisabled = currentPageIndex <= 1;
	const rightArrowDisabled = currentPageIndex >= totalPages;

	return totalPages <= 1 && !alwaysShowPagination ? (
		<div />
	) : (
		<nav className="neo-pagination" aria-label="pagination">
			<button
				type="button"
				disabled={leftArrowDisabled}
				aria-label={backIconButtonText}
				onClick={(e) => onPageChange(e, currentPageIndex - 1)}
				className="neo-btn-square neo-pagination__arrow-btn neo-icon-chevron-left"
			/>

			<ul className="neo-pagination__list">{navListItems}</ul>

			<button
				type="button"
				disabled={rightArrowDisabled}
				aria-label={nextIconButtonText}
				onClick={(e) => onPageChange(e, currentPageIndex + 1)}
				className="neo-btn-square neo-pagination__arrow-btn neo-icon-chevron-right"
			/>
		</nav>
	);
};
