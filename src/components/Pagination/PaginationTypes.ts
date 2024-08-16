export interface PaginationTranslations {
	backIconButtonText?: string;
	itemsPerPageLabel?: string;
	nextIconButtonText?: string;
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

	onPageChange: (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
		pageIndex: number,
	) => void;
	onItemsPerPageChange?: (itemsPerPage: number) => void;

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
