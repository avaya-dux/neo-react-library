import { GoToPage } from "./";

import type { PaginationProps } from "../PaginationTypes";
import type { GoToPageProps } from "./";

import "./PaginationCondensed_shim.css";

export const PaginationCondensed = ({
	currentPageIndex,
	totalPages,
	onPageChange,

	// translations
	backIconButtonText,
	nextIconButtonText,
	pagesText,
	goToPageText,
}: Omit<GoToPageProps, "aria-label"> &
	Pick<
		PaginationProps,
		"backIconButtonText" | "nextIconButtonText" | "goToPageText"
	>) => {
	const leftArrowDisabled = currentPageIndex <= 1;
	const rightArrowDisabled = currentPageIndex >= totalPages;

	return (
		<nav className="neo-pagination neo-pagination__condensed">
			<button
				type="button"
				disabled={leftArrowDisabled}
				aria-label={backIconButtonText}
				onClick={(e) => onPageChange(e, currentPageIndex - 1)}
				className="neo-btn-square neo-pagination__arrow-btn neo-icon-chevron-left"
			/>

			<GoToPage
				aria-label={goToPageText as string}
				currentPageIndex={currentPageIndex}
				onPageChange={onPageChange}
				pagesText={pagesText}
				totalPages={totalPages}
			/>

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
