import type { TooltipPosition } from "components/Tooltip";

export interface PaginationTranslations {
	backIconButtonText?: string;
	itemsPerPageLabel?: string;
	nextIconButtonText?: string;
	tooltipForCurrentPage?: string;
	tooltipForShownPagesSelect?: string;
}

export type PaginationProps = {
	id?: string;

	currentPageIndex: number;
	itemCount: number;
	itemsPerPage: number;
	itemsPerPageOptions?: number[];
	manualPageCount?: number;

	alwaysShowPagination?: boolean;
	itemDisplayType?: "count" | "page" | "none";

	itemDisplayTooltipPosition?: TooltipPosition;
	itemsPerPageTooltipPosition?: TooltipPosition;

	onPageChange: (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
		pageIndex: number,
	) => void;
	onItemsPerPageChange?: (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		itemsPerPage: number,
	) => void;

	// table overrides
	centerNode?: React.ReactNode;
	leftNode?: React.ReactNode;
	rightNode?: React.ReactNode;
} & PaginationTranslations;

export type PaginationNavigationProps = {
	totalPages: number;
	paginationRootWidth: number;
} & Pick<PaginationTranslations, "backIconButtonText" | "nextIconButtonText"> &
	Pick<
		PaginationProps,
		"alwaysShowPagination" | "currentPageIndex" | "onPageChange"
	>;
