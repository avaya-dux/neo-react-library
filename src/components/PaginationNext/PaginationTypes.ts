export interface PaginationTranslations {
	backIconButtonText?: string;
	nextIconButtonText?: string;
	goToPageText?: string;
	pagesText?: string;
	itemsPerPageLabel?: string;
}

export interface PaginationProps extends PaginationTranslations {
	id?: string;
	currentPageIndex: number;

	itemCount: number;
	itemsSelectedCount?: number;
	itemsPerPage?: number;
	itemsPerPageOptions?: number[];

	alwaysShowPagination?: boolean;
	forceCondensedView?: boolean;

	onPageChange: (
		event:
			| React.MouseEvent<HTMLButtonElement, MouseEvent>
			| React.KeyboardEvent<HTMLInputElement>
			| null,
		pageIndex: number,
	) => void;
	onItemsPerPageChange: (itemsPerPage: number) => void;
}

export interface PaginationSharedProps extends PaginationProps {
	totalPages: number;
}
