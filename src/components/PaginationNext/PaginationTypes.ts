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

// NOTE: all nodes get this context, thus why they have so few props
export type IPaginationContext = {
	totalPages: number;
} & Pick<
	PaginationProps,
	"currentPageIndex" | "onPageChange" | "onItemsPerPageChange"
>;

// left node
export interface PaginationItemCountProps {
	itemCount: number;
	itemsText?: string;

	itemsSelected?: number;
	itemsSelectedText?: string;
}

// center node
export type PaginationPageSelectionsProps = Pick<
	PaginationTranslations,
	"backIconButtonText" | "nextIconButtonText"
>;

// right node, first component
export type PaginationGoToPageProps = Pick<
	PaginationTranslations,
	"goToPageText" | "pagesText"
>;

// right node, second component
export type PaginationRowsSelectionProps = Pick<
	PaginationTranslations,
	"itemsPerPageLabel"
>;
