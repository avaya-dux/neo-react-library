import { GoToPage } from "./Nodes";
import type { PaginationSharedProps } from "./PaginationTypes";

export const PaginationCondensed = (props: PaginationSharedProps) => {
	const {
		currentPageIndex,
		totalPages,
		onPageChange,

		// translations
		backIconButtonText,
		nextIconButtonText,
	} = props;

	const leftArrowDisabled = currentPageIndex <= 1;
	const rightArrowDisabled = currentPageIndex >= totalPages;

	return (
		<nav className="neo-pagination" aria-label="pagination">
			<button
				type="button"
				disabled={leftArrowDisabled}
				aria-label={backIconButtonText}
				onClick={(e) => onPageChange(e, currentPageIndex - 1)}
				className="neo-btn-square neo-pagination__arrow-btn neo-icon-chevron-left"
			/>

			<GoToPage {...props} />

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
