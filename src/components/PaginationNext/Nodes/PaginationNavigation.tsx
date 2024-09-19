import type { PaginationSharedProps } from "../PaginationTypes";
import { NavListItemButton } from "./NavListItemButton";

/**
 * Used to render the individual links that are displayed in
 * the Pagination component for the purpose of navigating to
 * individual "pages". This includes the "left" and "right"
 * arrows, and the "1", "2", "3", etc. links.
 *
 * @example
 * <PaginationNavigation
 *  alwaysShowPagination={alwaysShowPagination}
 *  currentPageIndex={currentPageIndex}
 *  totalPages={totalPages}
 *  onPageChange={onPageChange}
 *  backIconButtonText={backIconButtonText}
 *  nextIconButtonText={nextIconButtonText}
 * />
 */
export const PaginationNavigation = ({
	alwaysShowPagination = false,

	currentPageIndex,
	totalPages,
	onPageChange,

	// translations
	backIconButtonText = "back",
	nextIconButtonText = "next",
}: PaginationSharedProps) => {
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

			<ul className="neo-pagination__list">
				<NavListItems
					totalPages={totalPages}
					currentPageIndex={currentPageIndex}
					onPageChange={onPageChange}
				/>
			</ul>

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

const NavListItems = ({
	currentPageIndex,
	totalPages,
	onPageChange,
}: {
	currentPageIndex: number;
	totalPages: number;
} & Pick<PaginationSharedProps, "onPageChange">) => {
	return (
		<ul className="neo-pagination__list">
			{Array.from({ length: Math.min(totalPages, 10) }, (_, index) => {
				const pageIndex = index + 1;
				return (
					<li key={pageIndex} className="neo-pagination__item">
						<NavListItemButton
							isCurrentPage={pageIndex === currentPageIndex}
							key={pageIndex}
							onPageChange={onPageChange}
							pageToNavigateTo={pageIndex}
						/>
					</li>
				);
			})}
		</ul>
	);
};
